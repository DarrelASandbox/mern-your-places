import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import useForm from '../../shared/hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    // initialInputs
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },

    // initialFormValidity
    false
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
        validators={[VALIDATOR_MINLENGTH(5)]}
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
