import { atom } from "jotai";
import { SettingsAtoms } from "./settings";
import { SelectedItemsAtoms } from "./selected-items";
import { Data } from "data";
import { Position, SelectionType } from "types";
import { ItemsAtoms } from "./items";

type SetPointerDownParams = {
  screenPosition: Position;
  selectionType: SelectionType;
  shiftKey: boolean;
  widgetId?: string;
};

type SetPointerMoveParams = {
  screenPosition: Position;
};

export function createPointerAtoms(
  settingsAtoms: SettingsAtoms,
  itemsAtoms: ItemsAtoms,
  selectedItemsAtoms: SelectedItemsAtoms
) {
  let lastPointerDownTime: number = 0;

  const setPointerDownAtom = atom(
    null,
    (get, set, params: SetPointerDownParams) => {
      lastPointerDownTime = Date.now();

      const zoom = get(settingsAtoms.zoomAtom);
      const offset = get(settingsAtoms.offsetAtom);

      if (get(settingsAtoms.inPanModeAtom)) {
        set(settingsAtoms.pointerDownScreenPositionAtom, params.screenPosition);
      } else if (params.selectionType === "widget" && params.widgetId) {
        if (params.shiftKey)
          set(selectedItemsAtoms.addSelectedItemIdAtom, params.widgetId);
        else set(selectedItemsAtoms.selectedItemIdsAtom, [params.widgetId]);

        set(settingsAtoms.inMoveModeAtom, true);
      } else if (params.selectionType === "resizeHandle") {
        set(
          settingsAtoms.pointerDownWorldPositionAtom,
          Data.Positions.screenToWorld(params.screenPosition, offset, zoom)
        );
        set(settingsAtoms.inResizeModeAtom, true);
      } else if (params.selectionType === "boundingBox") {
        set(settingsAtoms.inMoveModeAtom, true);

        if (params.widgetId) {
          if (params.shiftKey) {
            if (
              !get(selectedItemsAtoms.selectedItemIdsAtom).includes(
                params.widgetId
              )
            )
              set(selectedItemsAtoms.addSelectedItemIdAtom, params.widgetId);
            else set(settingsAtoms.pendingItemIdToRemoveAtom, params.widgetId);
          } else {
            set(settingsAtoms.pendingItemIdToSelectAtom, params.widgetId);
          }
        }
      } else {
        set(selectedItemsAtoms.selectedItemIdsAtom, []);
      }

      if (!get(itemsAtoms.unconfirmedItemIdAtom)) {
        set(
          settingsAtoms.pointerWorldPositionAtom,
          Data.Positions.screenToWorld(params.screenPosition, offset, zoom)
        );
      }
    }
  );

  const setPointerMoveAtom = atom(
    null,
    (get, set, params: SetPointerMoveParams) => {
      // Sometimes the browser reports a 'pointerMove' almsot immediately after 'pointerDown'
      if (Date.now() - lastPointerDownTime < 50) return;

      const pointerDownScreenPosition = get(
        settingsAtoms.pointerDownScreenPositionAtom
      );
      const savedOffset = get(settingsAtoms.savedOffsetAtom);
      const pointerDownWorldPosition = get(
        settingsAtoms.pointerDownWorldPositionAtom
      );
      const zoom = get(settingsAtoms.zoomAtom);
      const offset = get(settingsAtoms.offsetAtom);

      if (
        get(settingsAtoms.inPanModeAtom) &&
        pointerDownScreenPosition &&
        savedOffset
      ) {
        const screenPositionsDelta = Data.Positions.subtract(
          params.screenPosition,
          pointerDownScreenPosition
        );
        set(
          settingsAtoms.offsetAtom,
          Data.Sizes.add(savedOffset, screenPositionsDelta)
        );
      } else if (
        get(settingsAtoms.inResizeModeAtom) &&
        pointerDownWorldPosition
      ) {
        if (!get(settingsAtoms.itemSizesAtom)) {
          set(
            settingsAtoms.itemSizesAtom,
            get(selectedItemsAtoms.selectedItemsAtom).map((item) => item.size)
          );
        }

        const worldPosition = Data.Positions.screenToWorld(
          params.screenPosition,
          offset,
          zoom
        );
        const worldPositionsDelta = Data.Positions.subtract(
          worldPosition,
          pointerDownWorldPosition
        );

        const sizes = get(settingsAtoms.itemSizesAtom);
        get(selectedItemsAtoms.selectedItemsAtom).forEach((item, i) => {
          if (sizes) {
            set(itemsAtoms.updateItemAtom, {
              id: item.id,
              updates: {
                size: Data.Sizes.add(sizes[i], worldPositionsDelta),
              },
            });
          }
        });
      } else {
        set(settingsAtoms.savedOffsetAtom, get(settingsAtoms.offsetAtom));
        if (!get(settingsAtoms.inMoveModeAtom)) return;

        const pointerWorldPosition = get(
          settingsAtoms.pointerWorldPositionAtom
        );
        if (!pointerWorldPosition) return;

        const unconfirmedItemId = get(itemsAtoms.unconfirmedItemIdAtom);

        const itemsToMove = unconfirmedItemId
          ? [get(itemsAtoms.getItemAtom({ id: unconfirmedItemId }))]
          : get(selectedItemsAtoms.selectedItemsAtom);

        if (!get(settingsAtoms.itemPositionsAtom)) {
          set(
            settingsAtoms.itemPositionsAtom,
            itemsToMove.map((item) => item.position)
          );
        }

        const worldPosition = Data.Positions.screenToWorld(
          params.screenPosition,
          offset,
          zoom
        );

        const worldPositionsDelta = Data.Positions.subtract(
          worldPosition,
          pointerWorldPosition
        );

        if (
          Math.abs(worldPositionsDelta.width) > 0.1 ||
          Math.abs(worldPositionsDelta.height) > 0.1
        ) {
          set(settingsAtoms.pendingItemIdToSelectAtom, null);
          set(settingsAtoms.pendingItemIdToRemoveAtom, null);
        }

        const positions = get(settingsAtoms.itemPositionsAtom);

        itemsToMove.forEach((item, i) => {
          if (positions) {
            set(itemsAtoms.updateItemAtom, {
              id: item.id,
              updates: {
                position: Data.Positions.addSize(
                  positions[i],
                  worldPositionsDelta
                ),
              },
            });
          }
        });
      }
    }
  );

  const setPointerUpAtom = atom(null, (get, set) => {
    const pendingId = get(settingsAtoms.pendingItemIdToSelectAtom);
    if (pendingId) set(selectedItemsAtoms.selectedItemIdsAtom, [pendingId]);

    const pendingIdToRemove = get(settingsAtoms.pendingItemIdToRemoveAtom);
    if (pendingIdToRemove)
      set(selectedItemsAtoms.removeSelectedItemIdAtom, pendingIdToRemove);

    const unconfiredItemId = get(itemsAtoms.unconfirmedItemIdAtom);
    if (unconfiredItemId) {
      set(itemsAtoms.updateItemAtom, {
        id: unconfiredItemId,
        updates: { opacity: 1.0 },
      });
    }

    set(settingsAtoms.resetSettingsAtom);
    set(itemsAtoms.unconfirmedItemIdAtom, null);
  });

  return { setPointerDownAtom, setPointerMoveAtom, setPointerUpAtom };
}
