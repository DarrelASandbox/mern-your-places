import { useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import useForm from '../../shared/hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';

const PLACES = [
  {
    id: 'p1',
    title: 'Pentagon',
    description:
      'The Pentagon is the headquarters building of the Shape of Solitude. ',
    imageURL:
      'https://images.unsplash.com/photo-1615692885947-94d720250cf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    address: 'Alberta T0K 2M0, Canada',
    location: {
      lat: 49.0011354,
      lng: -113.8429555,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Hexagon',
    description: 'The Hexagon is the Cookhouse of the Shape of Solitude. ',
    imageURL:
      'https://images.unsplash.com/photo-1600331574095-4a20d3d8dd77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    address: 'Alberta T0K 2M0, Canada',
    location: {
      lat: 49.0011354,
      lng: -113.8429555,
    },
    creator: 'u2',
  },
];

const UpdatePlace = () => {
  const { placeId } = useParams();
  const identifiedPlace = PLACES.find((place) => place.id === placeId);

  const [formState, inputHandler] = useForm(
    // initialInputs
    {
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    },
    // initialFormValidity
    true
  );

  const placeUpdateSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div>
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
        existingValue={formState.inputs.title.value}
        existingValidity={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a minimun of 5 characters.'
        onInput={inputHandler}
        existingValue={formState.inputs.description.value}
        existingValidity={formState.inputs.description.isValid}
      />

      <Button type='submit' disabled={!formState.isValid}>
        UPDATE
      </Button>
    </form>
  );
};

export default UpdatePlace;
