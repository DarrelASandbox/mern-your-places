import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import useForm from '../../shared/hooks/form-hook';
import useHttpClient from '../../shared/hooks/http-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';

// const PLACES = [
//   {
//     id: 'p1',
//     title: 'Pentagon',
//     description:
//       'The Pentagon is the headquarters building of the Shape of Solitude. ',
//     imageURL:
//       'https://images.unsplash.com/photo-1615692885947-94d720250cf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//     address: 'Alberta T0K 2M0, Canada',
//     location: {
//       lat: 49.0011354,
//       lng: -113.8429555,
//     },
//     creator: 'u1',
//   },
//   {
//     id: 'p2',
//     title: 'Hexagon',
//     description: 'The Hexagon is the Cookhouse of the Shape of Solitude. ',
//     imageURL:
//       'https://images.unsplash.com/photo-1600331574095-4a20d3d8dd77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//     address: 'Alberta T0K 2M0, Canada',
//     location: {
//       lat: 49.0011354,
//       lng: -113.8429555,
//     },
//     creator: 'u2',
//   },
// ];

const UpdatePlace = () => {
  const { userId } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();

  const { placeId } = useParams();
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  useEffect(() => {
    const callSendRequest = async () => {
      const response = await sendRequest(`/api/places/${placeId}`);
      setLoadedPlace(response.place);
    };

    callSendRequest();
  }, [sendRequest, placeId]);

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    await sendRequest(
      `/api/places/${placeId}`,
      'PATCH',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      })
    );

    navigate(`/${userId}/places`);
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {loadedPlace && !isLoading && (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            existingValue={loadedPlace.title}
            existingValidity={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a minimun of 5 characters.'
            onInput={inputHandler}
            existingValue={loadedPlace.description}
            existingValidity={true}
          />

          <Button type='submit' disabled={!formState.isValid}>
            UPDATE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
