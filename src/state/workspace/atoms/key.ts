import { atom } from "jotai";
import { SettingsAtoms } from "./settings";
import { ItemsAtoms } from "./items";
import { SelectedItemsAtoms } from "./selected-items";

type SetKeyParams = {
  code: string;
  isModifierKeyOn: boolean;
};

export function createKeyAtoms(
  settingsAtoms: SettingsAtoms,
  itemsAtoms: ItemsAtoms,
  selectedItemsAtoms: SelectedItemsAtoms
) {
  const setKeyDownAtom = atom(null, (get, set, params: SetKeyParams) => {
    if (params.code === "Space" && !get(settingsAtoms.inPanModeAtom)) {
      set(settingsAtoms.savedOffsetAtom, get(settingsAtoms.offsetAtom));
      set(settingsAtoms.inPanModeAtom, true);
    } else if (params.isModifierKeyOn && !get(settingsAtoms.inZoomModeAtom)) {
      set(settingsAtoms.inZoomModeAtom, true);
    }
  });

  const setKeyUpAtom = atom(null, (get, set, params: SetKeyParams) => {
    if (!params.isModifierKeyOn) set(settingsAtoms.inZoomModeAtom, false);

    if (params.code === "Space") {
      set(settingsAtoms.inPanModeAtom, false);
      set(settingsAtoms.pointerDownScreenPositionAtom, null);
    } else if (params.code === "Escape") {
      const unconfirmedItemId = get(itemsAtoms.unconfirmedItemIdAtom);

      if (unconfirmedItemId) {
        set(itemsAtoms.unconfirmedItemIdAtom, null);
        set(settingsAtoms.pointerDownWorldPositionAtom, null);
        set(settingsAtoms.itemPositionsAtom, null);
      }
    } else if (params.code === "Backspace") {
      const selectedItemIds = get(selectedItemsAtoms.selectedItemIdsAtom);
      set(itemsAtoms.removeItemIdsAtom, selectedItemIds);
      set(selectedItemsAtoms.selectedItemIdsAtom, []);
    }
  });

  return { setKeyDownAtom, setKeyUpAtom };
}
