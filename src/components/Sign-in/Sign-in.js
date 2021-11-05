import React, { Component } from 'react'

import FormInput from '../Form-Input/Form-Input';
import CustomButton from '../Custom-Button/Custom-Button';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './Sign-in.scss';

class SignIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password} = this.state

        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })
        } catch (error){
            console.log(error)
        }
        
    }

    handleChange = e => {
        const {value, name} = e.target;

        this.setState({ [name] : value })
    }
    render() {
        return (
            <div className ='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name = "email" 
                        type="email" 
                        value ={this.state.email} 
                        label = "email"
                        handleChange ={this.handleChange}
                        required 
                    />

                    <FormInput 
                        name = "password" 
                        type="password" 
                        value ={this.state.password} 
                        label = "password"
                        handleChange ={this.handleChange}
                        required 
                    />

                    <div className="buttons">
                        <CustomButton type="submit"> Sign In </CustomButton>
                        <CustomButton onClick = {signInWithGoogle} isGoogleSignIn>{''}Sign In With Google {''} </CustomButton>
                    </div>

                    
                </form>
            </div>
        )
    }
}

export default SignIn
