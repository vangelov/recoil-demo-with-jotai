import { useAtomValue, useSetAtom } from "jotai";
import { useWorkspaceContext } from "./context";
import { useSaveChanges } from "./use-save-changes";

export const Workspace = {
  useAddSelectedItemId: () =>
    useSetAtom(useWorkspaceContext().addSelectedItemIdAtom),
  useRemoveSelectedItemId: () =>
    useSetAtom(useWorkspaceContext().removeSelectedItemIdAtom),
  useSelectedItemIds: () =>
    useAtomValue(useWorkspaceContext().selectedItemIdsAtom),
  useSelectedItems: () => useAtomValue(useWorkspaceContext().selectedItemsAtom),

  useRemoveItemIds: () => useSetAtom(useWorkspaceContext().removeItemIdsAtom),
  useItemWithId: (id: string) =>
    useAtomValue(useWorkspaceContext().getItemAtom({ id })),
  useUpdateItem: () => useSetAtom(useWorkspaceContext().updateItemAtom),
  useItemIds: () => useAtomValue(useWorkspaceContext().itemIdsAtom),
  useConfirmedItemIds: () =>
    useAtomValue(useWorkspaceContext().confirmedItemIdsAtom),
  useUnconfirmedItemId: () =>
    useAtomValue(useWorkspaceContext().unconfirmedItemIdAtom),
  useUnconfirmedItemType: () =>
    useAtomValue(useWorkspaceContext().unconfirmedItemTypeAtom),
  useAddItems: () => useSetAtom(useWorkspaceContext().addItemsAtom),

  useSetPointerDown: () => useSetAtom(useWorkspaceContext().setPointerDownAtom),
  useSetPointerMove: () => useSetAtom(useWorkspaceContext().setPointerMoveAtom),
  useSetPointerUp: () => useSetAtom(useWorkspaceContext().setPointerUpAtom),

  useSetWheel: () => useSetAtom(useWorkspaceContext().setWheelAtom),

  useSetKeyDown: () => useSetAtom(useWorkspaceContext().setKeyDownAtom),
  useSetKeyUp: () => useSetAtom(useWorkspaceContext().setKeyUpAtom),

  useSelectedItemsBoundingBox: () =>
    useAtomValue(useWorkspaceContext().selectedItemsBoundingBoxAtom),

  useOffset: () => useAtomValue(useWorkspaceContext().offsetAtom),
  useZoom: () => useAtomValue(useWorkspaceContext().zoomAtom),
  useInPanMode: () => useAtomValue(useWorkspaceContext().inPanModeAtom),

  useSetNewItem: () => useSetAtom(useWorkspaceContext().setNewItemAtom),

  useBackgroundColor: () =>
    useAtomValue(useWorkspaceContext().backgroundColorAtom),
  useSetBackgroundColor: () =>
    useSetAtom(useWorkspaceContext().backgroundColorAtom),

  useSaveChanges,
};
