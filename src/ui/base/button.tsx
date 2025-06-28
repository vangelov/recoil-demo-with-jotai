import { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.css";

type Props = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...rest }: Props) {
  return (
    <button className="Button" {...rest}>
      {children}
    </button>
  );
}
