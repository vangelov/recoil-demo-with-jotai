import { ReactNode } from "react";
import { createWorkspaceAtoms } from "./atoms";
import { Workspace } from "types";
import { workspaceContext } from "./context";

type Props = {
  initialWorkspace?: Workspace;
  children: ReactNode;
};

export function WorkspaceProvider({ initialWorkspace, children }: Props) {
  const workspaceAtoms = createWorkspaceAtoms(initialWorkspace);

  return (
    <workspaceContext.Provider value={workspaceAtoms}>
      {children}
    </workspaceContext.Provider>
  );
}
