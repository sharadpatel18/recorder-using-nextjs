"use client"

import Axios from "axios";
import React,{useState} from "react";

const SignupPage = () => {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const responce = await Axios.post('/api/auth/signup' , {name , email , password});
    console.log(responce.data);
   } catch (error) {
    console.log(error.response.data);
   }
    console.log("asdasd");
    
  };

  return (
    <div className="h-screen w-full flex justify-center bg-gray-100">
    <div className="w-1/3 bg-white rounded shadow-lg p-8 m-4 md:m-16 self-center">
      <h1 className="text-3xl font-bold mb-6">Sign up</h1>
      <hr className='my-3'/>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 my-2">
            Name
          </label>
          <input
            type="name"
            id="email"
            name="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 my-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-medium text-gray-700 my-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit And Create Account
        </button>
      </form>
    </div>
  </div>

  );
};

export default SignupPage;
