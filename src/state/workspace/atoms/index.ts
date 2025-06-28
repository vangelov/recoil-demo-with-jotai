import { Position, Workspace } from "types";
import { createSelectedItemsAtoms } from "./selected-items";
import { createSettingsAtoms } from "./settings";
import { createItemsAtoms } from "./items";
import { createPointerAtoms } from "./pointer";
import { atom } from "jotai";
import { createKeyAtoms } from "./key";
import { createNewItemAtoms } from "./new-item";
import { createWheelAtoms } from "./wheel";

export type WheelState = {
  delta: number;
  screenPosition: Position;
};

export function createWorkspaceAtoms(initialWorkspace?: Workspace) {
  const itemsAtoms = createItemsAtoms(initialWorkspace);
  const settingsAtoms = createSettingsAtoms(initialWorkspace);
  const newItemAtoms = createNewItemAtoms(settingsAtoms, itemsAtoms);

  const selectedItemsAtoms = createSelectedItemsAtoms(itemsAtoms);
  const pointerAtoms = createPointerAtoms(
    settingsAtoms,
    itemsAtoms,
    selectedItemsAtoms
  );

  const keyAtoms = createKeyAtoms(
    settingsAtoms,
    itemsAtoms,
    selectedItemsAtoms
  );

  const backgroundColorAtom = atom(
    initialWorkspace ? initialWorkspace.backgroundColor : "white"
  );

  const wheelAtoms = createWheelAtoms(settingsAtoms);

  return {
    ...newItemAtoms,
    ...settingsAtoms,
    ...itemsAtoms,
    ...selectedItemsAtoms,
    ...pointerAtoms,
    ...keyAtoms,
    ...wheelAtoms,
    backgroundColorAtom,
  };
}

export type WorkspaceAtoms = ReturnType<typeof createWorkspaceAtoms>;
