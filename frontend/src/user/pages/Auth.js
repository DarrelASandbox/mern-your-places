import { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import useForm from '../../shared/hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
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

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formState, null, 2));
  };

  return (
    <Card className='authentication'>
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
        <Button inverse onClick={isLoginHandler}>
          {isLogin ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </form>
    </Card>
  );
};
export default Auth;
