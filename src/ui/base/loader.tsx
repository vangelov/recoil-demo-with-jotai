import { HTMLAttributes } from "react";
import "./loader.css";

type Props = HTMLAttributes<HTMLDivElement>;

export function Loader({ ...rest }: Props) {
  return <div className="Loader" {...rest} />;
}
