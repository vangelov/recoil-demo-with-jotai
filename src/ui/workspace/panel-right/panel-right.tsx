import { State } from "state";
import { SectionSelection } from "./section-selection";
import { SectionDocument } from "./section-document";
import "./panel-right.css";
import { memo } from "react";

export const PanelRight = memo(() => {
  const selectedItems = State.Workspace.useSelectedItems();

  const singleSelectedItem =
    selectedItems.length === 1 ? selectedItems[0] : null;

  return (
    <div className="PanelRight">
      <SectionDocument />

      {singleSelectedItem && (
        <SectionSelection
          key={singleSelectedItem.id}
          singleSelectedItem={singleSelectedItem}
        />
      )}
    </div>
  );
});
