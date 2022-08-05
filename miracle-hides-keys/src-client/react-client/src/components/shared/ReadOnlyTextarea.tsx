interface ReadOnlyTextareaProps {
  label: string;
  name: string;
  placeholder: string;
  rows: number;
  value: string;
}

const ReadOnlyTextarea = (props: ReadOnlyTextareaProps) => {
  return (
    <>
      <label
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <div
        className='textarea-container'
      >
        <textarea
          className='text'
          id={props.name}
          placeholder={props.placeholder}
          readOnly={true}
          rows={props.rows}
          value={props.value}
        ></textarea>
      </div>
    </>
  );
}

export default ReadOnlyTextarea;
