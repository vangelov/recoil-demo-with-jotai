import { ReactNode } from "react";
import "./section.css";

type Props = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: Props) {
  return (
    <div className="Section">
      <div className="Section-Title">{title}:</div>
      {children}
    </div>
  );
}
