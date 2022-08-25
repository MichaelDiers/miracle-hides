import { ChangeEvent, FocusEvent } from 'react';
import { ERROR_FALLBACK } from '../pages/BasePage';
import ITranslationsValidation from '../types/translations-validation';
import { EMAIL_REGEX } from '../validation/validation-constants';

export default function LabeledInput({
  checked,
  disabled = false,
  error,
  isReadOnly = false,
  label,
  maxlength,
  minlength,
  name,
  onBlur,
  onChange,
  onFocus,
  pattern,
  placeholder,
  required,
  show = true,
  type,
  value,
  errorUpdate,
  translations,
}: {
  checked?: boolean,
  disabled?: boolean,
  error?: string,
  isReadOnly?: boolean,
  label: string,
  maxlength?: number,
  minlength?: number,
  name: string,
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void,
  pattern?: string,
  placeholder?: string,
  required?: boolean,
  show?: boolean,
  type: string,
  value?: string,
  errorUpdate?: (error: string) => void,
  translations?: ITranslationsValidation,
}) {
  if (show) {
    const onChangeLocal = (event: ChangeEvent<HTMLInputElement>): void => {
      let localError: string|undefined = '';
      const current = event.target.value;

      if (required && !current) {
        localError = translations?.missingValue || ERROR_FALLBACK;
      } else if (current && minlength && current.length < minlength) {
        localError = (translations?.minLength && translations?.minLengthReplace)
          ? translations.minLength.replace(translations.minLengthReplace, `${minlength}`)
          : ERROR_FALLBACK;
      } else if (current && maxlength && current.length > maxlength) {
        localError = (translations?.maxLength && translations?.maxLengthReplace)
          ? translations.maxLength.replace(translations.maxLengthReplace, `${maxlength}`)
          : ERROR_FALLBACK;
      } else if (current && type === 'email' && !new RegExp(EMAIL_REGEX).test(current)) {
        localError = translations?.invalidEmail || ERROR_FALLBACK;
      }

      if (errorUpdate) {
        errorUpdate(localError);
      }

      if (onChange) {
        onChange(event);
      }
    }

    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          checked={checked}
          disabled={disabled}
          id={name}
          maxLength={maxlength}
          minLength={minlength}
          name={name}
          onBlur={onBlur}
          onChange={onChangeLocal}
          onFocus={onFocus}
          pattern={pattern}
          placeholder={placeholder}
          readOnly={isReadOnly}
          required={required}
          type={type}
          value={value}
        ></input>
        <div>{error}</div>
      </>
    );
  }

  return null;
}
