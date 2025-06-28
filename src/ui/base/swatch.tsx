import { HTMLAttributes } from "react";
import "./swatch.css";

type Props = {
  color: string;
} & HTMLAttributes<HTMLDivElement>;

export function Swatch({ color, ...rest }: Props) {
  return (
    <div className="Swatch" {...rest}>
      <div className="Swatch-Color" style={{ background: color }} />
    </div>
  );
}
