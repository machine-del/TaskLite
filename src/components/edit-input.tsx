import type React from "react";

type EditInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

export function EditInput(props: EditInputProps) {
  return (
    <div>
      <input
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type="text"
      />
    </div>
  );
}
