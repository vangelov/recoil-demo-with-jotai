import { atom } from "jotai";
import { SettingsAtoms } from "./settings";
import { Position, WorkspaceItem } from "types";
import { Data } from "data";
import { ItemsAtoms } from "./items";

type SetNewItemParams = {
  screenPosition: Position;
  type: WorkspaceItem["type"];
};

export function createNewItemAtoms(
  settingsAtoms: SettingsAtoms,
  itemsAtoms: ItemsAtoms
) {
  const setNewItemAtom = atom(null, (get, set, params: SetNewItemParams) => {
    const unconfirmedItemId = get(itemsAtoms.unconfirmedItemIdAtom);
    if (unconfirmedItemId) {
      set(itemsAtoms.unconfirmedItemIdAtom, null);
      set(itemsAtoms.removeItemIdsAtom, [unconfirmedItemId]);
      set(settingsAtoms.resetSettingsAtom);
    }

    const offset = get(settingsAtoms.offsetAtom);
    const zoom = get(settingsAtoms.zoomAtom);
    const world = Data.Positions.screenToWorld(
      params.screenPosition,
      offset,
      zoom
    );
    set(settingsAtoms.pointerDownWorldPositionAtom, world);

    const item = Data.WorkspaceItems.createUnconfirmedItem(
      { x: world.x, y: world.y },
      params.type
    );

    set(itemsAtoms.addUnconfirmedItemAtom, item);
    set(settingsAtoms.inMoveModeAtom, true);
  });

  return { setNewItemAtom };
}
