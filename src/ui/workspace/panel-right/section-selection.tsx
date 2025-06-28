import { Section } from "ui/base/section";
import { Field } from "ui/base/field";
import { State } from "state";
import { memo, useCallback, useEffect, useRef } from "react";
import { WorkspaceItem } from "types";

type Props = {
  singleSelectedItem: WorkspaceItem;
};

export const SectionSelection = memo(({ singleSelectedItem }: Props) => {
  const xInputRef = useRef<HTMLInputElement>(null);
  const yInputRef = useRef<HTMLInputElement>(null);
  const labelInputRef = useRef<HTMLInputElement>(null);
  const updateItem = State.Workspace.useUpdateItem();
  const formDidChangeRef = useRef(false);
  const suppressBlurRef = useRef(false);

  useEffect(() => {
    const { position, label } = singleSelectedItem;
    formDidChangeRef.current = false;

    if (xInputRef.current) xInputRef.current.value = position.x.toFixed(2);
    if (yInputRef.current) yInputRef.current.value = position.y.toFixed(2);
    if (labelInputRef.current) labelInputRef.current.value = label;
  }, [singleSelectedItem]);

  function onXBlur() {
    if (suppressBlurRef.current) return;

    if (xInputRef.current && Number.isNaN(xInputRef.current.value))
      xInputRef.current.value = singleSelectedItem.position.x.toFixed(2);

    submit();
  }

  function onYBlur() {
    if (suppressBlurRef.current) return;

    if (yInputRef.current && Number.isNaN(yInputRef.current.value))
      yInputRef.current.value = singleSelectedItem.position.y.toFixed(2);

    submit();
  }

  function onLabelBlur() {
    if (suppressBlurRef.current) return;
    submit();
  }

  function submit() {
    if (!xInputRef.current || !yInputRef.current || !labelInputRef.current)
      return;

    const x = xInputRef.current.value;
    const y = yInputRef.current.value;
    const label = labelInputRef.current.value;

    submitData(x, y, label);
  }

  const submitData = useCallback(
    (xString: string, yString: string, label: string) => {
      const x = Number(xString);
      const y = Number(yString);

      updateItem({
        id: singleSelectedItem.id,
        updates: {
          label,
          position: {
            x,
            y,
          },
        },
      });
    },
    [updateItem, singleSelectedItem.id]
  );

  useEffect(() => {
    const xInput = xInputRef.current;
    const yInput = yInputRef.current;
    const labelInput = labelInputRef.current;

    return () => {
      if (xInput && yInput && labelInput && formDidChangeRef.current)
        submitData(xInput.value, yInput.value, labelInput.value);
    };
  }, [submitData]);

  function onFormChange() {
    formDidChangeRef.current = true;
  }

  return (
    <Section title="Selection">
      <form
        onChange={onFormChange}
        className="Section-Form"
        onSubmit={(e) => {
          e.preventDefault();

          const activeElement = { document };
          if (activeElement instanceof HTMLElement) {
            suppressBlurRef.current = true;
            activeElement.blur();
            suppressBlurRef.current = false;
          }

          submit();
        }}
      >
        <div className="Section-FormRow">
          <Field name="X" inputRef={xInputRef} onInputBlur={onXBlur} />
          <Field name="Y" inputRef={yInputRef} onInputBlur={onYBlur} />
        </div>

        <Field
          name="Label"
          inputRef={labelInputRef}
          onInputBlur={onLabelBlur}
        />

        <input
          type="submit"
          style={{ display: "none" }}
          hidden
          value="Submit"
        />
      </form>
    </Section>
  );
});
