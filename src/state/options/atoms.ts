import { createUrlParamAtom } from "./url-param-atom";

export const previewAtom = createUrlParamAtom("preview", "false");
export const workspaceIdAtom = createUrlParamAtom("documentID");
