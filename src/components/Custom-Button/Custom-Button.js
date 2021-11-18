import React from 'react';

import './Custom-Button.scss';

const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => {
    return (
        <button className ={`${inverted ? 'inverted': ""} ${isGoogleSignIn ? "google-sign-in": ""} custom-button`} {...otherProps}>
            {children}
        </button>
    )
}

export default CustomButton;