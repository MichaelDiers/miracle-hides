import { ChangeEvent } from 'react';

export default function LabeledInput({
  label,
  name,
  value,
  onChange,
  show = true,
  type,
} : {
  label: string,
  name: string,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  show?: boolean,
  type: string,
}) {
  if (show) {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input type={type} id={name} name={name} value={value} onChange={onChange}></input>
      </>
    );
  }

  return null;
}