import { ButtonHTMLAttributes, ReactNode } from "react";
import "./icon-button.css";

type Props = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({ children, ...rest }: Props) {
  return (
    <button className="IconButton" {...rest}>
      {children}
    </button>
  );
}
