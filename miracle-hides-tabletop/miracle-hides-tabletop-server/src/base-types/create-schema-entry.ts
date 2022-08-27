export interface IEntry<Type> {
  stringEnum?: string[],
  index?: boolean;
  lowercase?: boolean,
  maxLength?: number;
  minLength?: number;
  name: string;
  required?: boolean;
  type: Type,
  unique?: boolean;
  validate?: { validator: (value) => boolean, },  
}

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
  const entry: IEntry<Type> = {
    name,
    type,
  };

  if (stringEnum) {
    entry.stringEnum = stringEnum;
  }

  if (index || unique) {
    entry.index = true;
  }

  if (lowercase) {
    entry.lowercase = lowercase;
  }

  if (maxLength) {
    entry.maxLength = maxLength;
  }

  if (minLength) {
    entry.minLength = minLength;
  }

  if (required) {
    entry.required = required;
  }

  if (unique) {
    entry.unique = unique;
  }

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
