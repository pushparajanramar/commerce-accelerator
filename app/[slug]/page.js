import LandingPage from "@/app/page"

import React from 'react';

function page({ searchParams, params }) {
    return <LandingPage searchParams={searchParams} pathname={params.slug ? '/' + params.slug : '/'} />;
}
export default page;

