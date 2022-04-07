import { useContext, useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import useForm from '../../shared/hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './Auth.css';

const Auth = () => {
  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    // initialInputs
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },

    // initialFormValidity
    false
  );

  const isLoginHandler = () => {
    if (!isLogin) {
      setIsLoading(true);
      delete formState.inputs.name;
      setFormData(
        { ...formState.inputs },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: '', isValid: false } },
        false
      );
    }

    setIsLogin((prevState) => !prevState);
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const route = isLogin ? 'login' : 'signup';

    try {
      const response = await fetch(`/api/users/${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.inputs.name ? formState.inputs.name.value : '',
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setIsLoading(false);
      authContext.loginHandler();
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'Something went wrong!');
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={() => setError(null)} />
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
