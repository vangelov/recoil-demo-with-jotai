import { atom } from "jotai";
import { atomFamily, loadable } from "jotai/utils";
import { getWorkspace } from "./requests/get-workspace";
import { getChartSeries } from "./requests/get-chart-series";

export type LoadParams = {
  id: string;
  enabled?: boolean;
};

const nullAtom = atom(null);

function getParamsAreEqual(paramsA: LoadParams, paramsB: LoadParams) {
  return paramsA.id === paramsB.id;
}

export const getLoadableChartAtom = atomFamily(
  ({ id, enabled = true }: LoadParams) => {
    return loadable(enabled ? atom(async () => getChartSeries(id)) : nullAtom);
  },
  getParamsAreEqual
);

export const getLoadableWorkspaceAtom = atomFamily(
  ({ id, enabled = true }: LoadParams) => {
    return loadable(enabled ? atom(async () => getWorkspace(id)) : nullAtom);
  },
  getParamsAreEqual
);
