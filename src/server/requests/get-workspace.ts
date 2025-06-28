import { Lib } from "lib";
import { Workspace } from "types";

export async function getWorkspace(id: string) {
  await Lib.delay(500);

  const workspaceString = localStorage.getItem(`document_${id}`);
  if (!workspaceString) throw new Error("Workspace not found");

  let workspace: Workspace | null = null;

  try {
    workspace = JSON.parse(workspaceString);
  } catch (error) {
    console.warn(error);
    throw new Error("Internal error");
  }

  if (workspace && workspace.id !== id) throw new Error("Workspace not found");

  return workspace;
}
