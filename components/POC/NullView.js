"use client";
import React from 'react';
import Layout from './Layout';

const NullView = ({ pageData }) => {
    return (
        <Layout>
        <h6><b>{pageData._content_type_uid}</b> is not a known component or it has incomplete data from ContentStack</h6>
        </Layout>
    );
}

export default NullView;
