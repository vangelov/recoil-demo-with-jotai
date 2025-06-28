import { Lib } from "lib";
import { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Swatch } from "ui/base/swatch";
import "./color-picker.css";

type Props = {
  color: string;
  onChange: (newColor: string) => void;
};

export function ColorPicker({ color, onChange }: Props) {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  Lib.useClickOutside(popover, close);

  return (
    <div className="ColorPicker">
      <Swatch color={color} onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="ColorPicker-Popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
