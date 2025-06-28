import { BoundingBox, WorkspaceItem } from "types";
import "./bounding-box-overlay.css";

type Props = {
  selectedItems: Array<WorkspaceItem>;
  zoom: number;
  boundingBox: BoundingBox;
  inPanMode: boolean;
};

export function BoundingBoxOverlay({
  selectedItems,
  zoom,
  boundingBox,
  inPanMode,
}: Props) {
  const borderWidth = 2;
  const { origin, size } = boundingBox;
  const translate = `translate(${origin.x}px, ${origin.y}px)`;
  const scale = `scale(calc(1/${zoom}))`;

  return (
    <div
      className="BoundingBoxOverlay"
      style={{
        borderWidth,
        cursor: inPanMode ? undefined : "move",
        transform: `${translate} ${scale}`,
        width: size.width * zoom,
        height: size.height * zoom,
      }}
    >
      {selectedItems.length === 1 && selectedItems[0].type !== "chart" && (
        <div
          className="BoundingBoxOverlay-Handle"
          style={{ cursor: inPanMode ? undefined : "nwse-resize" }}
        />
      )}
    </div>
  );
}
