import { memo } from "react";
import { State } from "state";
import { WorkspaceItem } from "types";
import { Lib } from "lib";
import { ContentChart } from "ui/workspace/widget/content-chart";
import { ContentImage } from "ui/workspace/widget/content-image";
import { ContentText } from "ui/workspace/widget/content-text";
import "./widget.css";

function getContentElement(item: WorkspaceItem) {
  const { type } = item;

  switch (type) {
    case "text":
      return <ContentText item={item} />;
    case "image":
      return <ContentImage item={item} />;
    case "chart":
      return <ContentChart item={item} />;

    default:
      return Lib.assertUnreachable(type);
  }
}

type Props = {
  itemId: string;
};

export const Widget = memo(({ itemId }: Props) => {
  const item = State.Workspace.useItemWithId(itemId);
  const { position, size } = item;

  return (
    <div
      className="Widget"
      data-id={item.id}
      style={{
        opacity: item.opacity ?? 1.0,

        transform: `translate(${position.x}px, ${position.y}px)`,
        width: size.width,
        height: size.height,
      }}
    >
      {getContentElement(item)}
    </div>
  );
});
