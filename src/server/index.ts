import { useAtomValue } from "jotai";
import { saveWorkspace } from "./requests/save-workspace";
import {
  getLoadableChartAtom,
  getLoadableWorkspaceAtom,
  LoadParams,
} from "./atoms";

export const Server = {
  useLoadChartSeries: (params: LoadParams) =>
    useAtomValue(getLoadableChartAtom(params)),

  useLoadWorkspace: (params: LoadParams) =>
    useAtomValue(getLoadableWorkspaceAtom(params)),

  saveWorkspace,
};
