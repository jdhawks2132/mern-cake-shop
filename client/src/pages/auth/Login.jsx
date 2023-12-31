import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { useQuery } from '@apollo/client'
import { QUERY_CAKES} from '../../utils/queries'
import Auth from '../../utils/auth';

import CardContainer from '../../components/cards/CardContainer';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const { data } = await login({
      variables: { ...formState },
    });

    Auth.login(data.login.token);
  } catch (e) {
    console.error(e);
  }
};

const { loading, data : cakeData } = useQuery(QUERY_CAKES)

if (loading) {
  return <div>Loading...</div>
}

return (
  <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h1>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">Email address:</label>
            <input
              id="email"
              name="email"
              type="email"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
              placeholder="Your email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
              placeholder="Your password"
              onChange={handleChange}
            />
          </div>
        </div>
        {error ? (
          <div className="mt-2 text-center text-sm text-red-600">
            <p>The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    <CardContainer  cakes={cakeData?.cakes || [] } page={'login'} />
  </div>

  )
}
export default Login