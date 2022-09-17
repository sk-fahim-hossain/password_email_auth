import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import app from './firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const auth = getAuth(app);


function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }

  const handleRegisterChange = (e) => {
    setRegistered(e.target.checked)
  }

  const handleFormSubmit = (e) => {

    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    console.log('hi')

    if (/(?=.*?[#?!@$%^&*-])/.test(password)) {
      return;
    }
    
    setValidated(true);
    setError('')

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('')
          setPassword('')
        })
        .catch(error => {
          console.log(error)
          setError(error.massage)
        })

    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.log(error)
          setError(error.massage)
        })
    }
    console.log('end')
    e.preventDefault();
  }


  

  return (
    <div className="App">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="w-50 mx-auto mt-3 registration">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h3>Please {registered ? 'Login' : 'Register'}</h3>
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onBlur={handlePasswordBlur} required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Already Registered?"
            feedback="You must agree before submitting."
            onChange={handleRegisterChange}
          />
        </Form.Group>
        <p>{error}</p>
        <Button variant="primary" type="submit">
          {registered ? 'Login' : 'Register'}
        </Button>
      </Form>
    </div>
  );
}

export default App;
