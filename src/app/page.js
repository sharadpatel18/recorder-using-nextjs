"use client"

import { useContext } from 'react';
import Recorder from './Recorder';
import { MyContext } from '@/context/MyContext';

function MyPage() {
  const {user} = useContext(MyContext);
 if (user) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Video and Screen Recorder</h1>
      <Recorder className="w-full max-w-md" />
    </div>
  );
 }else{
  return(
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">please Go to the login page.</h1>
  </div>
  )
 }
}

export default MyPage;