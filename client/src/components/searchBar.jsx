import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDog } from '../redux/actions';

const SearchBar = () => {

  const [name, setName] = useState("")
  
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchDog(name))
    setName("")
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }
  return (
    <div>
        <input value={name} onChange={handleChange} type='search'/>
        <button onClick={handleSubmit}>Search</button> 
    </div>
  );
};

export default SearchBar;