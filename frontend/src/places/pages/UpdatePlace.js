import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import useForm from '../../shared/hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';
import Card from '../../shared/components/UIElements/Card';

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
  const [isLoading, setIsLoading] = useState(true);

  const { placeId } = useParams();

  // Fallback state for setFormData()
  const [formState, inputHandler, setFormData] = useForm(
    // initialInputs
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    // initialFormValidity
    false
  );

  const identifiedPlace = PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if (identifiedPlace)
      setFormData(
        // inputData
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
        // formValidity
        true
      );

    setIsLoading(false);

    // setFormData doesn't change because of useCallback() in form-hook.js
    // identifiedPlace logic will run every re-render cycle but
    // will always find the exact same object.
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  // Temporary workaround since existingValue & existingValidity
  // only run once in Input.js initialFormState which uses
  // fallback state values.
  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
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
