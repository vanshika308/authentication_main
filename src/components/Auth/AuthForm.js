import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {


  const signUpApiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvZIq-A0N_hH-2GVtOoec3EgmnERktZAk';
  const loginApiUrl ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvZIq-A0N_hH-2GVtOoec3EgmnERktZAk';
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };



  const submitHandler=(event)=>{
    event.preventDefault();
    setIsLoading(true)
    const enteredEmail= emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const apiUrl = isLogin ? loginApiUrl : signUpApiUrl;

    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        setIsLoading(false);
        return res.json(); // Return the parsed JSON response
      } else {
        return res.json().then(data => {
          console.log(data);
          alert(data.error.message);
          setIsLoading(false);
          throw new Error(data.error.message); // Throw an error to handle it in the next .catch()
        });
      }
    }).then(data => {
      // Console log the ID token here
      console.log('ID Token:', data.idToken);
    }).catch(error => {
      console.error('Error:', error);
    });
    
  }
 

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email'
           id='email'
           required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
        {isLoading ? 'Sending Request...' : (
          <button>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        )}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
