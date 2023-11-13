"use client"
import Script from 'next/script';
import React from 'react';

function CustomScript(props) {
    const gigyaApiKey = process.env.NEXT_PUBLIC_APP_GIGYA_API
    const gigyaSrc = "https://cdns.eu1.gigya.com/JS/gigya.js?apikey=" + gigyaApiKey

    return (
        <Script type="text/javascript"
            id="showGigya"
            strategy='beforeInteractive'
            src={gigyaSrc} />
    );
}

export default CustomScript;