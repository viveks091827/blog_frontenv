import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/ResetPassword.module.css';
import axios from 'axios'
import resetPasswordDone from './resetPasswordDone';

const ResetPassword = () => {
  const router = useRouter();
  const { email } = router.query;

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState("")
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
        setAlertMessage('Please add same password')
      }
      else {  
        setAlertMessage('')
      }

      axios.post(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/resetPassword`, {
      email: email,
      password: password,
    }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        console.log('data: ', response.data.data.data)

        router.push('./resetPasswordDone')
           
      })
      .catch((error) => {
        console.error(error);
      });
  
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value)
    console.log('repeat Passwor: ', event.target.value)
    console.log('pass and rep pass: ', password, event.target.value)
    if (password !== event.target.value) {
      console.log('inside password not matching')
      setInputValue('Password is not matching');

    }
    else {
      setInputValue('')
    }
  };


  // ... rest of your code ...

  return (
    <div className={styles['form-container']}>
    <form onSubmit={handleSubmit}>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} required />
      </label>
      <label>
        Repeat Password:
        <input type="password" value={repeatPassword} onChange={handleRepeatPasswordChange} required />
      </label>
      {inputValue && <p>{inputValue} {alertMessage}</p>}
      <button type="submit">Submit</button>
    </form>
  </div>

  );
};

export default ResetPassword;
