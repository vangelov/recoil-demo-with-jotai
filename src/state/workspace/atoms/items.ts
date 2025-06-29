import { Data } from "data";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Workspace, WorkspaceItem } from "types";

type GetItemAtomParams = {
  id: string;
} & Partial<Omit<WorkspaceItem, "id">>;

type UpdateItemParams = {
  id: string;
  updates: Partial<Omit<WorkspaceItem, "id">>;
};

export function createItemsAtoms(initialWorkspace?: Workspace) {
  const getItemAtom = atomFamily(
    ({ id, ...rest }: GetItemAtomParams) =>
      atom({ id, ...rest } as WorkspaceItem),

    (paramsA: GetItemAtomParams, paramsB: GetItemAtomParams) =>
      paramsA.id === paramsB.id
  );

  const itemIdsAtom = atom<string[]>(
    initialWorkspace
      ? initialWorkspace.items.map((item) => {
          getItemAtom(item);
          return item.id;
        })
      : []
  );

  const itemsAtom = atom((get) => {
    const itemsIds = get(itemIdsAtom);
    return itemsIds.map((id) => get(getItemAtom({ id })));
  });

  const itemIdsWithUnconfirmedAtom = atom((get) => {
    const itemsIds = get(itemIdsAtom);
    const unconfirmedItemId = get(unconfirmedItemIdAtom);

    return unconfirmedItemId ? [...itemsIds, unconfirmedItemId] : itemsIds;
  });

  const addUnconfirmedItemAtom = atom(
    null,
    (_get, set, item: WorkspaceItem) => {
      getItemAtom(item);
      set(unconfirmedItemIdAtom, item.id);
    }
  );

  const confirmItemAtom = atom(null, (get, set) => {
    const unconfirmedItemId = get(unconfirmedItemIdAtom);

    if (unconfirmedItemId) {
      const itemAtom = getItemAtom({ id: unconfirmedItemId });
      set(addItemsAtom, [get(itemAtom)]);
    }
  });

  const addItemsAtom = atom(null, (_get, set, items: WorkspaceItem[]) => {
    const ids: Array<string> = [];
    for (const item of items) {
      ids.push(item.id);
      getItemAtom(item);
    }
    set(itemIdsAtom, (itemIds) => [...itemIds, ...ids]);
  });

  const removeItemIdsAtom = atom(
    null,
    (get, set, itemIdsToDelete: Array<string>) => {
      const shouldDeleteMap = new Map(itemIdsToDelete.map((id) => [id, true]));
      const itemIds = get(itemIdsAtom);

      set(
        itemIdsAtom,
        itemIds.filter((id) => !shouldDeleteMap.get(id))
      );

      itemIdsToDelete.forEach((id) => () => getItemAtom.remove({ id }));
    }
  );

  const updateItemAtom = atom(
    null,
    (get, set, { id, updates }: UpdateItemParams) => {
      const itemAtom = getItemAtom({ id });
      const updatedItem = Data.WorkspaceItems.applyUpdates(
        get(itemAtom),
        updates
      );
      set(itemAtom, updatedItem);
    }
  );

  const unconfirmedItemIdAtom = atom<string | null>(null);

  const unconfirmedItemTypeAtom = atom((get) => {
    const unconfirmedItemId = get(unconfirmedItemIdAtom);
    if (unconfirmedItemId === null) return null;

    const item = get(getItemAtom({ id: unconfirmedItemId }));
    return item.type;
  });

  return {
    itemIdsAtom,
    itemsAtom,
    itemIdsWithUnconfirmedAtom,

    getItemAtom,
    addItemsAtom,
    removeItemIdsAtom,
    updateItemAtom,

    addUnconfirmedItemAtom,
    confirmItemAtom,
    unconfirmedItemIdAtom,
    unconfirmedItemTypeAtom,
  };
}

export type ItemsAtoms = ReturnType<typeof createItemsAtoms>;
