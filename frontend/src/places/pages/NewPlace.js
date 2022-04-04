import { useCallback, useReducer } from 'react';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './NewPlace.css';
import Button from '../../shared/components/FormElements/Button';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId)
          formIsValid = formIsValid && action.isValid;
        else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    // For placeSubmitHandler()
    // Able to clear state but not browser fields.
    // Unnecessary as we will be redirected after submitting the form.
    case 'INPUT_RESET':
      for (const inputId in state.inputs) {
        state.inputs[inputId].value = '';
        state.inputs[inputId].isValid = false;
        state.isValid = false;
      }
      return { ...state };

    default:
      return state;
  }
};

const initialFormState = {
  inputs: {
    title: { value: '', isValid: false },
    description: { value: '', isValid: false },
  },

  isValid: false,
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const inputHandler = useCallback(
    (id, value, isValid) =>
      dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id }),
    [dispatch]
  );

  const placeSubmitHandler = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formState, null, 2));

    /*
    dispatch({ type: 'INPUT_RESET' });
    console.log('Reset formstate', JSON.stringify(formState, null, 2));
    */
  };

  return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a minimun of 5 characters.'
        onInput={inputHandler}
      />
      <Input
        id='address'
        element='input'
        label='Address'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid address.'
        onInput={inputHandler}
      />

      <Button type='submit' disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
