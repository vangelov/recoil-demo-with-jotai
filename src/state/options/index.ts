import { useAtomValue, useSetAtom } from "jotai";
import { previewAtom, workspaceIdAtom } from "./atoms";

export const Options = {
  usePreview: () => useAtomValue(previewAtom),
  useSetPreview: () => useSetAtom(previewAtom),

  useWorkspaceId: () => useAtomValue(workspaceIdAtom),
};
