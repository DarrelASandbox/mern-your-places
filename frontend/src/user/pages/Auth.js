import { useContext, useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import useForm from '../../shared/hooks/form-hook';
import useHttpClient from '../../shared/hooks/http-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './Auth.css';

const Auth = () => {
  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    // initialInputs
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
      image: { value: null, isValid: false },
    },

    // initialFormValidity
    false
  );

  const isLoginHandler = () => {
    if (!isLogin) {
      delete formState.inputs.name;
      delete formState.inputs.image;
      setFormData(
        { ...formState.inputs },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: '', isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    }

    setIsLogin((prevState) => !prevState);
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(formState.inputs);

    const route = isLogin ? 'login' : 'signup';

    const response = await sendRequest(
      `/api/users/${route}`,
      'POST',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        name: formState.inputs.name ? formState.inputs.name.value : '',
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      })
    );

    authContext.loginHandler(response.existingUser._id);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        {isLogin ? <h2>Login</h2> : <h2>Sign Up</h2>}
        <hr />
        <form onSubmit={loginSubmitHandler}>
          {!isLogin && (
            <Input
              id='name'
              element='input'
              type='text'
              label='Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name.'
              onInput={inputHandler}
            />
          )}
          {!isLogin && <ImageUpload id='image' onInput={inputHandler} />}

          <Input
            id='email'
            element='input'
            type='text'
            label='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email.'
            onInput={inputHandler}
          />
          <Input
            id='password'
            element='input'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a minimun of 5 characters.'
            onInput={inputHandler}
          />

          <Button type='submit' disabled={!formState.isValid}>
            {isLogin ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={isLoginHandler}>
          {isLogin
            ? 'No account? Sign up now!'
            : 'Already have an account? Login now!'}
        </Button>
      </Card>
    </>
  );
};
export default Auth;
