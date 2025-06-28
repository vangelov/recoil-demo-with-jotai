import { Lib } from "lib";
import { Workspace } from "types";

const defaultDocumentID = 1;

function getLastDocumentID() {
  const lastDocumentString = localStorage.getItem("lastDocumentId");
  const lastDocumentId = Number(lastDocumentString);

  return isNaN(lastDocumentId) ? defaultDocumentID : lastDocumentId;
}

export async function saveWorkspace(workspace: Workspace) {
  await Lib.delay(300);

  const lastDocumentId = getLastDocumentID();
  const newDocumentId = (lastDocumentId + 1).toString();

  const savedWorkspace: Workspace = {
    ...workspace,
    id: newDocumentId,
  };

  try {
    localStorage.clear();
    localStorage.setItem("lastDocumentId", newDocumentId);

    localStorage.setItem(
      `document_${newDocumentId}`,
      JSON.stringify(savedWorkspace)
    );
    return newDocumentId;
  } catch (error) {
    console.error(error);
    throw new Error("Cannot save document");
  }
}
