'use client';
import React,{useState} from 'react';
import { SignInFlow } from '../types';
import { SignInCard } from './sign-in-card';
import { SignUpCard } from './sign-up-card';
const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("singIn");

  return (
    <>
      <div className="h-full flex items-center justify-center text-2xl bg-[#5C3B58]">
        <div className="md:h-auto md:w-[450px]">
          {state === "singIn"? <SignInCard setState={setState} />:<SignUpCard setState={setState}/>}
        </div>
          
      </div>
    </>
  )
}

export default AuthScreen