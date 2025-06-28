import { atom } from "jotai";
import { Lib } from "lib";

export function createUrlParamAtom(
  param: string,
  defaultValue: string | null = null
) {
  const initialValue = Lib.getUrlParam(param, defaultValue);
  const baseAtom = atom(initialValue);

  return atom(
    (get) => get(baseAtom),
    (_get, set, value: string) => {
      set(baseAtom, value);
      Lib.replaceUrlParam(param, value);
    }
  );
}
