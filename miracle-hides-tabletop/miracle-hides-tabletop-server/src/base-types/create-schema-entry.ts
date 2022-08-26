export default function createSchemaEntry<Type>({
  stringEnum,
  index = false,
  lowercase,
  maxLength,
  minLength,
  name,
  required = true,
  type,
  unique = false,
  validate,
} : {
  stringEnum?: string[],
  index?: boolean;
  lowercase?: boolean,
  maxLength?: number;
  minLength?: number;
  name: string;
  required?: boolean;
  type: Type
  unique?: boolean;
  validate?: (value) => boolean,
}) {
  const entry = {
    enum: stringEnum,
    index,
    lowercase,
    maxLength,
    minLength,
    required,
    type,
    unique,
    validate: undefined,    
  };

  if (validate) {
    entry.validate = {
      validator: function (value) {
        return validate(value);
      },
    };
  }

  return {
    [name]: entry,
  };
}
