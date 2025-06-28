import { WorkspaceImageItem } from "types";
import "./content-image.css";

type Props = {
  item: WorkspaceImageItem;
};

export function ContentImage({ item }: Props) {
  return <img className="ContentImage" src={item.src} />;
}
