"use client";

import React, { createContext, useEffect, useState } from 'react';

export const GigyaContext = createContext({ gigyaInstance: null })

function GigyaContextProvider({ children }) {

    const [gigyaInstance, setGigyaInstance] = useState(null)

    useEffect(() => {
        const timer = setInterval(() => {
            if (window && window.gigya) {
                setGigyaInstance(window.gigya)
                clearInterval(timer)
            }
        }, 2000)
        return () => clearInterval(timer)
    }, [])


    return (
        <GigyaContext.Provider value={{ gigyaInstance }}>
            {children}
        </GigyaContext.Provider>
    );
}

export default GigyaContextProvider;