import { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };

    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };

    default:
      return state;
  }
};

const Input = ({
  label,
  id,
  element,
  type,
  placeholder,
  rows,
  errorText,
  validators,
  onInput,
  existingValue,
  existingValidity,
}) => {
  const initialFormState = {
    value: existingValue || '',
    isTouched: false,
    isValid: existingValidity || false,
  };

  const [inputState, dispatch] = useReducer(inputReducer, initialFormState);

  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const changeHandler = (e) =>
    dispatch({ type: 'CHANGE', value: e.target.value, validators });

  const touchHandler = () => dispatch({ type: 'TOUCH' });

  const inputElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}>
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
