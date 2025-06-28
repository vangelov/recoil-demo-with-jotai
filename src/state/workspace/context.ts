import { createContext, useContext } from "react";
import { WorkspaceAtoms } from "./atoms";

export const workspaceContext = createContext<WorkspaceAtoms | undefined>(
  undefined
);

export function useWorkspaceContext() {
  const value = useContext(workspaceContext);
  if (!value) throw new Error("No context value");
  return value;
}
