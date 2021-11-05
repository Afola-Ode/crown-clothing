import React from 'react';
import SignIn from '../../components/Sign-in/Sign-in';
import SignUp from '../../components/Sign-Up/Sign-Up';

import './Sign-in-and-Sign-up.scss'

const SignInAndSignUp = () => {
    return (
        <div className ="sign-in-and-sign-up">
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInAndSignUp
