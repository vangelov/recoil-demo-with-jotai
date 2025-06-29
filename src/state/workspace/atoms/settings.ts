import { atom } from "jotai";
import { Position, Size, Workspace } from "types";

export function createSettingsAtoms(initialWorkspace?: Workspace) {
  const inResizeModeAtom = atom(false);
  const inZoomModeAtom = atom(false);
  const inPanModeAtom = atom(false);
  const inMoveModeAtom = atom(false);
  const zoomAtom = atom(initialWorkspace ? initialWorkspace.zoom : 1);
  const offsetAtom = atom<Size>(
    initialWorkspace ? initialWorkspace.offset : { width: 0, height: 0 }
  );
  const savedOffsetAtom = atom<Size | null>(null);

  const pointerDownScreenPositionAtom = atom<Position | null>(null);
  const pointerDownWorldPositionAtom = atom<Position | null>(null);

  const pendingItemIdToSelectAtom = atom<string | null>(null);
  const pendingItemIdToRemoveAtom = atom<string | null>(null);

  const itemSizesAtom = atom<Array<Size> | null>(null);
  const itemPositionsAtom = atom<Array<Position> | null>(null);

  const resetSettingsAtom = atom(null, (_get, set) => {
    set(pointerDownScreenPositionAtom, null);
    set(pointerDownWorldPositionAtom, null);
    set(itemPositionsAtom, null);
    set(itemSizesAtom, null);
    set(savedOffsetAtom, null);
    set(pendingItemIdToSelectAtom, null);
    set(pendingItemIdToRemoveAtom, null);
    set(inMoveModeAtom, false);
    set(inResizeModeAtom, false);
  });

  return {
    inResizeModeAtom,
    inZoomModeAtom,
    inPanModeAtom,
    inMoveModeAtom,
    offsetAtom,
    savedOffsetAtom,
    zoomAtom,

    pointerDownScreenPositionAtom,
    pointerDownWorldPositionAtom,

    pendingItemIdToSelectAtom,
    pendingItemIdToRemoveAtom,

    itemSizesAtom,
    itemPositionsAtom,

    resetSettingsAtom,
  };
}

export type SettingsAtoms = ReturnType<typeof createSettingsAtoms>;
