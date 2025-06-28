import { State } from "state";
import { PanelLeft } from "./panel-left";
import { PanelRight } from "./panel-right";
import { Link } from "ui/base/link";
import { Canvas } from "./canvas";
import "./workspace.css";

export function Workspace() {
  const preview = State.Options.usePreview();
  const setPreview = State.Options.useSetPreview();

  return (
    <div className="Workspace">
      <Canvas />
      <PanelLeft />
      <PanelRight />

      {preview === "true" && (
        <Link
          className="Workspace-ShowAll"
          name="preview"
          value="false"
          onClick={() => setPreview("false")}
        >
          Show panel
        </Link>
      )}
    </div>
  );
}
