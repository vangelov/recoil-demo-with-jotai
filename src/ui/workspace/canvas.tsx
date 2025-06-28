import { useEffect, PointerEvent, useRef, useMemo } from "react";
import { SelectionType } from "types";
import { State } from "state";
import { Data } from "data";
import { Widget } from "./widget";
import { BoundingBoxOverlay } from "./bounding-box-overlay";
import "./canvas.css";

export function Canvas() {
  const setPointerDown = State.Workspace.useSetPointerDown();
  const setPointerMove = State.Workspace.useSetPointerMove();
  const setPointerUp = State.Workspace.useSetPointerUp();
  const setWheel = State.Workspace.useSetWheel();
  const setKeyDown = State.Workspace.useSetKeyDown();
  const setKeyUp = State.Workspace.useSetKeyUp();

  const selectedItems = State.Workspace.useSelectedItems();
  const itemIds = State.Workspace.useItemIds();
  const zoom = State.Workspace.useZoom();
  const offset = State.Workspace.useOffset();
  const selectedItemsBoundingBox =
    State.Workspace.useSelectedItemsBoundingBox();
  const inDragMode = State.Workspace.useInPanMode();
  const inPanMode = State.Workspace.useInPanMode();
  const backgroundColor = State.Workspace.useBackgroundColor();

  State.Workspace.useSaveChanges();

  const ref = useRef<HTMLDivElement | null>(null);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!(event.target as HTMLElement).closest(".Canvas")) return;
    if (event.button !== 0) return;

    function getSelectionTypeAndWidgetId(): {
      selectionType: SelectionType;
      widgetId?: string;
    } {
      const widgetNode = (event.target as HTMLElement).closest(".Widget");
      const widgetId = widgetNode && widgetNode.getAttribute("data-id");
      if (widgetNode && widgetId) return { selectionType: "widget", widgetId };

      const handle = (event.target as HTMLElement).closest(
        ".BoundingBoxOverlay-Handle"
      );
      if (handle) return { selectionType: "resizeHandle" };

      const boundingBoxNode = (event.target as HTMLElement).closest(
        ".BoundingBoxOverlay"
      );
      if (boundingBoxNode) {
        const elements = document.elementsFromPoint(
          event.clientX,
          event.clientY
        );

        for (const element of elements) {
          if (element.className === "Widget") {
            const id = element.getAttribute("data-id");
            if (!id) continue;

            return { selectionType: "boundingBox", widgetId: id };
          }
        }

        return { selectionType: "boundingBox" };
      }

      return { selectionType: "canvas" };
    }

    const { selectionType, widgetId } = getSelectionTypeAndWidgetId();

    setPointerDown({
      screenPosition: { x: event.clientX, y: event.clientY },
      shiftKey: event.shiftKey,
      selectionType,
      widgetId,
    });
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = { screenPosition: { x: event.clientX, y: event.clientY } };
    setPointerMove(state);
  }

  function onPointerUp(event: PointerEvent) {
    if (!(event.target as HTMLElement).closest(".Canvas")) return;
    setPointerUp();
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement) return;
      setKeyDown({ code: event.code, metaKey: event.metaKey });
    }

    function onKeyUp(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement) return;
      setKeyUp({ code: event.code, metaKey: event.metaKey });
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [setKeyDown, setKeyUp]);

  useEffect(() => {
    function onWheel(event: WheelEvent) {
      setWheel({
        delta: event.deltaY,
        screenPosition: Data.Positions.fromUIEvent(event),
      });
    }

    const node = ref.current;
    if (!node) return;

    node.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      node.removeEventListener("wheel", onWheel);
    };
  }, [setWheel]);

  const widgetElements = useMemo(
    () => itemIds.map((id) => <Widget key={id} itemId={id} />),
    [itemIds]
  );

  return (
    <div
      ref={ref}
      className="Canvas"
      style={{
        userSelect: inDragMode ? "none" : undefined,
        cursor: inDragMode ? "grab" : undefined,
        backgroundColor,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          willChange: "transform",
          transformOrigin: "top left",
          transform: `matrix(${zoom}, 0, 0, ${zoom}, ${offset.width}, ${offset.height})`,
        }}
      >
        {widgetElements}

        {selectedItemsBoundingBox && (
          <BoundingBoxOverlay
            inPanMode={inPanMode}
            boundingBox={selectedItemsBoundingBox}
            zoom={zoom}
            selectedItems={selectedItems}
          />
        )}
      </div>
    </div>
  );
}
