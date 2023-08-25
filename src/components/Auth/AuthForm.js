import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {

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

    if(isLogin){
    }
    else{
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvZIq-A0N_hH-2GVtOoec3EgmnERktZAk',
         {
          method: "POST", 
          body: JSON.stringify({
            email :enteredEmail ,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers:{
            'Content-Type':"application/json"}
          }
          ).then(res=>{
            if(res.ok){
              setIsLoading(false);

            }
            else{
              res.json().then(data=>{
                  console.log(data);
                  alert(data.error.message);
                  setIsLoading(false);
                }
              );
            }
          });
        }
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
