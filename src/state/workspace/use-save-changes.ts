import { useWorkspaceContext } from "./context";
import { useCallback, useEffect, useRef } from "react";
import { getDefaultStore } from "jotai";
import { Workspace } from ".";
import { Server } from "server";
import { Lib } from "lib";

const store = getDefaultStore();

export function useSaveChanges() {
  const workspaceContext = useWorkspaceContext();
  const itemsIds = Workspace.useItemIds();
  const timeoutRef = useRef(0);

  const onWorkspaceChange = useCallback(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const backgroundColor = store.get(workspaceContext.backgroundColorAtom);
      const items = store.get(workspaceContext.itemsAtom);
      const offset = store.get(workspaceContext.offsetAtom);
      const zoom = store.get(workspaceContext.zoomAtom);
      const next = {
        items,
        backgroundColor,
        offset,
        zoom,
      };

      const id = await Server.saveWorkspace(next);
      Lib.replaceUrlParam("documentID", id);
    }, 500);
  }, [workspaceContext]);

  useEffect(() => {
    const atoms = [
      workspaceContext.backgroundColorAtom,
      workspaceContext.offsetAtom,
      workspaceContext.zoomAtom,
      workspaceContext.itemIdsAtom,
    ];
    const unsubFunctions = atoms.map((atom) =>
      store.sub(atom, onWorkspaceChange)
    );

    return () => {
      unsubFunctions.forEach((unsubFunction) => unsubFunction());
    };
  }, [onWorkspaceChange, workspaceContext]);

  useEffect(() => {
    const unsubFunctions = itemsIds.map((id) =>
      store.sub(workspaceContext.getItemAtom({ id }), onWorkspaceChange)
    );

    return () => {
      unsubFunctions.forEach((unsubFunction) => unsubFunction());
    };
  }, [workspaceContext, itemsIds, onWorkspaceChange]);
}
