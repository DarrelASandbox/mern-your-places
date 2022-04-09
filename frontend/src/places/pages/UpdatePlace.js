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

const UpdatePlace = () => {
  const { userId, token } = useContext(AuthContext);
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
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`
      );
      setLoadedPlace(response.place);
    };
    callSendRequest();
  }, [sendRequest, placeId]);

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`,
      'PATCH',
      { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
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
