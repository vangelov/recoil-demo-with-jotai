import { WorkspaceTextItem } from "types";
import "./content-text.css";

type Props = {
  item: WorkspaceTextItem;
};

export function ContentText({ item }: Props) {
  return (
    <div className="ContentText">
      <div className="ContentText-Label">{item.label}</div>
    </div>
  );
}
