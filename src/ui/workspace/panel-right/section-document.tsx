import { Section } from "ui/base/section";
import { ColorPicker } from "ui/base/color-picker";
import { State } from "state";
import "./panel-right.css";

export function SectionDocument() {
  const backgroundColor = State.Workspace.useBackgroundColor();
  const setBackgroundColor = State.Workspace.useSetBackgroundColor();

  return (
    <Section title="Document">
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <b>BackgroundColor:</b>
        <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
      </div>
    </Section>
  );
}
