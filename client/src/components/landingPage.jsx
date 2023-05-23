import React from 'react';
import {Link} from 'react-router-dom'


const LandingPage = () => {
  return (
    <div>
        <h1>Meet your Dog</h1>
        <img src='https://www.pngplay.com/wp-content/uploads/12/Dog-PNG-Background.png' alt='Landing Page Dog'></img>
        <h2>Here you will be able to know better your dog or find your perfect match for your next companion</h2>
        <Link to='/home'>Continue</Link>
    </div>
  );
};

export default LandingPage;