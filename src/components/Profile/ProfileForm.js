import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useContext,useRef } from 'react';

const ProfileForm = () => {

   const authcntxt = useContext(AuthContext);
   const changedPasswordRef = useRef();

  const submitHandler=(event)=>{
     event.preventDefault();

     const enteredPassword = changedPasswordRef.current.value;

     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAvZIq-A0N_hH-2GVtOoec3EgmnERktZAk',{
      method: 'POST',
      body: JSON.stringify({
         idToken: authcntxt.token,
         password: enteredPassword,
         secureToken : true
      }),
      headers: {
        'Content-Type': 'application/json',
      }
     }).then(response => {
      if (response.ok) {
        alert('Password updated successfully!!');
      } else {
        return response.json().then(data => {
          console.log(data);
          alert(data.error.message);
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' required ref={changedPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
