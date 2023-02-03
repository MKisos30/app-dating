import axios from 'axios';
import React from 'react'
import { defer } from 'react-router-dom';

const LinkPage = () => {
  return (
    <div>LinkPage</div>
  )
}

export default LinkPage

const getData = async (type) => {
    const { data } = await axios.get(`/user/info/${type}`);
    console.log('%cLinkPage.jsx line:15 data', 'color: #007acc;', data);

    // const { userDetails } = data;
    // return userDetails;
  };
  
  export const getDataLoader = async ({ params }) => {
    const { type } = params;
  console.log('%cLinkPage.jsx line:19 type', 'color: #007acc;', type);

    return defer({
      user: await getData(type),
    });
  };