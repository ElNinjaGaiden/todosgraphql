import React from 'react';
import LoginView from './Login';

const AuthenticatedView = (view) => {
    let accessToken = localStorage.getItem('accessToken');
    console.log('This is nice', accessToken);
    if(!accessToken) {
        return LoginView;
    }
    return view;
}

export default AuthenticatedView;