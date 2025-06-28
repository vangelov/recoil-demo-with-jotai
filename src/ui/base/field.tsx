import { HTMLAttributes, RefObject } from "react";
import "./field.css";

type Props = {
  context?: string;
  name: string;
  value?: string;
  inputRef?: RefObject<HTMLInputElement>;
  onInputBlur?: (context?: string) => void;
} & HTMLAttributes<HTMLDivElement>;

export function Field({
  name,
  value,
  inputRef,
  context,
  onInputBlur,
  ...rest
}: Props) {
  return (
    <div
      className="Field"
      onBlur={() => onInputBlur && onInputBlur(context)}
      {...rest}
    >
      <label htmlFor={name}>
        <b>{name}</b>
      </label>

      <input ref={inputRef} id={name} value={value} />
    </div>
  );
}
