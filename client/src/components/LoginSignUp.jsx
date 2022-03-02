import { useState } from 'react';
import { useGlobalContext } from '../context/context';

const LoginSignUp = () => {
  const { isUserLoggedIn, loginUser, registerUser } = useGlobalContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [login, setLogin] = useState(true);

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!login && !name)) {
      return;
    }

    if (login) {
      loginUser({ email, password });
    } else {
      registerUser({ name, email, password });
    }
  };

  return (
    <aside className={isUserLoggedIn ? '' : 'open'}>
      <form className='section-center aside-container' onSubmit={onSubmit}>
        <h3>{login ? 'login' : 'sign up'}</h3>

        {!login && (
          <div className='form-control'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              className='grocery'
              id='name'
              placeholder='Name'
              value={name}
              onChange={onChange}
            />
          </div>
        )}

        <div className='form-control'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            className='grocery'
            id='email'
            placeholder='Email'
            value={email}
            onChange={onChange}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            className='grocery'
            id='password'
            placeholder='Password'
            value={password}
            onChange={onChange}
          />
        </div>

        <button type='submit' className='login-btn'>
          {login ? 'login' : 'sign up'}
        </button>

        <p>
          {login ? 'Not Registered ? ' : 'Already Registered ? '}
          <span onClick={() => setLogin(!login)}>
            {login ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </aside>
  );
};

export default LoginSignUp;
