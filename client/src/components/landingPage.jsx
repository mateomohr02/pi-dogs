import React from 'react';
import {Link} from 'react-router-dom'
import style from './styles/landingPage.module.css'
import paw from './imgs_source/paw.png'
import {motion} from 'framer-motion'
import { useState, useEffect } from 'react';



const LandingPage = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldAnimate(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);



  
  return (
    <div className={style.container}>

      <motion.div
        className={shouldAnimate ? style.animate__backInUp : ''}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={style.contTitle}>
          <h1 className={style.title}>Meet your Dog</h1>
          <img className={style.icon} src={paw} alt="Icon" />  
        </div>
        <h2>Here you will be able to know better your dog or find your perfect match for your next companion</h2>
        
        <div>
          <img className={style.img}src='https://www.pngplay.com/wp-content/uploads/12/Dog-PNG-Background.png' alt='Landing Page Dog'></img>
        </div>

        <Link className={style.btn}to='/home'>Continue</Link>
      </motion.div>

    </div>

  );
};

export default LandingPage;