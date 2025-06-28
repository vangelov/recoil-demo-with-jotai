import { State } from "state";
import { Server } from "server";
import { Workspace } from "./workspace";

export function Root() {
  const workspaceId = State.Options.useWorkspaceId();
  const shouldLoadWorkspace = Boolean(workspaceId);

  const workspaceQuery = Server.useLoadWorkspace({
    id: workspaceId || "",
    enabled: shouldLoadWorkspace,
  });

  if (shouldLoadWorkspace) {
    if (workspaceQuery.state === "loading") return null;

    if (workspaceQuery.state === "hasError") {
      alert("Workspace not found");
      return null;
    }

    const initialWorkspace = workspaceQuery.data;

    if (workspaceQuery.state === "hasData" && initialWorkspace)
      return (
        <State.WorkspaceProvider initialWorkspace={initialWorkspace}>
          <Workspace />
        </State.WorkspaceProvider>
      );
  }

  return (
    <State.WorkspaceProvider>
      <Workspace />
    </State.WorkspaceProvider>
  );
}
