import { ChangeEvent, Fragment } from 'react';

interface RadioButton {
  label: string;
  value: string;
}

interface RadioButtonsProps {
  checkedValue: string;
  display?: boolean;
  label: string;
  name: string;
  radioButtons: RadioButton[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const RadioButtons = (props: RadioButtonsProps) => {
  if (props.display === false) {
    return (<></>);
  }

  return (
    <>      
      <label htmlFor={props.name}>{props.label}</label>
      <div
        id={props.name}
        className={`grid-form-row-${props.radioButtons.length * 2}`}
        onChange={props.onChange}
      >
        {
          props.radioButtons.map(({ label, value }, i) => {
            return (
              <Fragment key={i}>
                <input
                  className='radio'
                  defaultChecked={value === props.checkedValue}  
                  id={`${props.name}_${i}`}
                  name={props.name}
                  type='radio'
                  value={value}
                ></input>
                <label
                  htmlFor={`${props.name}_${i}`}
                >
                  {label}
                </label>
              </Fragment>
              );
          })
        }
      </div>
    </>
  )
}

export default RadioButtons;
