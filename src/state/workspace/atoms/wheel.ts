import { atom } from "jotai";
import { SettingsAtoms } from "./settings";
import { Data } from "data";
import { Position } from "types";
import { Lib } from "lib";

type SetWheelParams = {
  delta: number;
  screenPosition: Position;
};

export function createWheelAtoms(settingsAtoms: SettingsAtoms) {
  const setWheelAtom = atom(null, (get, set, params: SetWheelParams) => {
    const zoom = get(settingsAtoms.zoomAtom);
    const offset = get(settingsAtoms.offsetAtom);

    if (!get(settingsAtoms.inZoomModeAtom)) return;

    const newZoomUnclamped = zoom * Math.pow(2, params.delta * -0.005);
    const newZoom = Lib.clamp(newZoomUnclamped, 0.3, 6);

    const worldPosition = Data.Positions.screenToWorld(
      params.screenPosition,
      offset,
      zoom
    );
    const newScreenPosition = Data.Positions.worldToScreen(
      worldPosition,
      offset,
      newZoom
    );

    const screenPositionsDelta = Data.Positions.subtract(
      params.screenPosition,
      newScreenPosition
    );

    set(settingsAtoms.zoomAtom, newZoom);
    const newOffset = Data.Sizes.add(offset, screenPositionsDelta);
    set(settingsAtoms.offsetAtom, newOffset);
    set(settingsAtoms.savedOffsetAtom, newOffset);
  });

  return { setWheelAtom };
}
