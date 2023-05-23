import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './searchBar';




const NavBar = () => {

  const location = useLocation()
  
  return (
      <div>
            <h1>Dogs</h1>
            <Link to='/home' replace>Home</Link>
            <Link to='/create'>Create</Link>
            {location.pathname === '/create' ? "" : <SearchBar/> }
        </div>
  );
};

export default NavBar;