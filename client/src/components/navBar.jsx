import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/navBar.module.css'
import paw from './imgs_source/paw.png'

const NavBar = () => {
  
  return (
      <div className={style.container}>
            <h1 className={style.title}>Meet your dog</h1>
            <img className={style.icon}src={paw} alt="Icon" />
            <div className={style.links}>
              <Link className={style.link} to='/home' replace> Home </Link>
              <Link className={style.link}to='/create'> Create </Link>
            </div>
        </div>
  );
};

export default NavBar;