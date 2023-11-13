"use client"
import React from 'react';
import LoginScreen from './Screens/LoginScreen';

function ScreenSets(props) {
    return (
        <div className="gigya-screen" id="gigya-login-screen" data-width="365" data-height="565">
            <LoginScreen />
        </div>
    );
}

export default ScreenSets;