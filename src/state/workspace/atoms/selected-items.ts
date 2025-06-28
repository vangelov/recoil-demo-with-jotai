import { atom } from "jotai";
import { ItemsAtoms } from "./items";
import { Data } from "data";

export function createSelectedItemsAtoms(itemsAtoms: ItemsAtoms) {
  const selectedItemIdsAtom = atom<string[]>([]);

  const addSelectedItemIdAtom = atom(null, (get, set, id: string) => {
    const selectedItemIds = get(selectedItemIdsAtom);
    set(selectedItemIdsAtom, [...selectedItemIds, id]);
  });

  const removeSelectedItemIdAtom = atom(null, (get, set, id: string) => {
    const selectedItemIds = get(selectedItemIdsAtom);
    set(
      selectedItemIdsAtom,
      selectedItemIds.filter((x) => x !== id)
    );
  });

  const selectedItemsAtom = atom((get) => {
    const selectedItemIds = get(selectedItemIdsAtom);
    return selectedItemIds.map((id) => get(itemsAtoms.getItemAtom({ id })));
  });

  const selectedItemsBoundingBoxAtom = atom((get) => {
    const selectedItems = get(selectedItemsAtom);

    return Data.WorkspaceItems.getBoundingBox(selectedItems);
  });

  return {
    addSelectedItemIdAtom,
    removeSelectedItemIdAtom,
    selectedItemIdsAtom,
    selectedItemsAtom,
    selectedItemsBoundingBoxAtom,
  };
}

export type SelectedItemsAtoms = ReturnType<typeof createSelectedItemsAtoms>;
