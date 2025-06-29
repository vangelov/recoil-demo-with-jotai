import { useMemo, MouseEvent, memo } from "react";
import { State } from "state";
import { ItemPreview } from "./item-preview";
import { Data } from "data";
import { SquareIcon } from "ui/icons/square-icon";
import { ImageIcon } from "ui/icons/image-icon";
import { ChartIcon } from "ui/icons/chart-icon";
import "./panel-left.css";
import { ButtonLink } from "ui/base/button-link";
import { IconButton } from "ui/base/icon-button";
import { Button } from "ui/base/button";

const powers = [10, 11, 12];

export const PanelLeft = memo(() => {
  const itemIds = State.Workspace.useItemIds();
  const setNewItem = State.Workspace.useSetNewItem();
  const addItems = State.Workspace.useAddItems();
  const unconfirmedItemType = State.Workspace.useUnconfirmedItemType();
  const selectedItemIds = State.Workspace.useSelectedItemIds();
  const preview = State.Options.usePreview();
  const setPreview = State.Options.useSetPreview();

  const isSelectedMap = useMemo(
    () => new Map(selectedItemIds.map((id) => [id, true])),
    [selectedItemIds]
  );

  const itemElements = useMemo(
    () =>
      itemIds.map((itemId) => (
        <ItemPreview
          key={itemId}
          itemId={itemId}
          isSelected={!!isSelectedMap.get(itemId)}
        />
      )),
    [itemIds, isSelectedMap]
  );

  function onAddTextButtonClick(event: MouseEvent) {
    setNewItem({
      type: "text",
      screenPosition: Data.Positions.fromUIEvent(event),
    });
  }

  function onAddImageButtonClick(event: MouseEvent) {
    setNewItem({
      type: "image",
      screenPosition: Data.Positions.fromUIEvent(event),
    });
  }

  function onAddChartButtonClick(event: MouseEvent) {
    setNewItem({
      type: "chart",
      screenPosition: Data.Positions.fromUIEvent(event),
    });
  }

  function onCreateTestItems(count: number) {
    setPreview("true");
    const items = Data.WorkspaceItems.createRandomItems(count);
    addItems(items);
  }

  return (
    <div
      className={`PanelLeft ${
        preview === "true" ? "PanelLeft-Preview" : "PanelLeft-Full"
      }`}
    >
      <div className="PanelLeft-Buttons">
        <IconButton
          disabled={unconfirmedItemType === "text"}
          onClick={
            unconfirmedItemType === "text" ? undefined : onAddTextButtonClick
          }
        >
          <SquareIcon />
        </IconButton>

        <IconButton
          disabled={unconfirmedItemType === "image"}
          onClick={onAddImageButtonClick}
        >
          <ImageIcon />
        </IconButton>

        <IconButton
          disabled={unconfirmedItemType === "chart"}
          onClick={onAddChartButtonClick}
        >
          <ChartIcon />
        </IconButton>
      </div>

      {preview !== "true" && (
        <div className="PanelLeft-Items">{itemElements}</div>
      )}

      {preview !== "true" && (
        <>
          <ButtonLink
            name="preview"
            value="true"
            onClick={() => setPreview("true")}
          >
            Preview
          </ButtonLink>

          <div className="PanelLeft-PlusButtons">
            {powers.map((power) => {
              const count = Math.pow(2, power);

              return (
                <Button key={power} onClick={() => onCreateTestItems(count)}>
                  {`+${count}`}
                </Button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
});
