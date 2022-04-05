import { useCallback, useReducer } from 'react';

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

    // For placeSubmitHandler() in NewPlace.js
    // Able to clear state but not browser fields.
    // Unnecessary as we will be redirected after submitting the form.
    case 'INPUT_RESET':
      for (const inputId in state.inputs) {
        state.inputs[inputId].value = '';
        state.inputs[inputId].isValid = false;
        state.isValid = false;
      }
      return { ...state };

    case 'SET_DATA':
      return { inputs: action.inputs, isValid: action.formIsValid };

    default:
      return state;
  }
};

const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value,
        isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  // Data from DB
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};

export default useForm;
