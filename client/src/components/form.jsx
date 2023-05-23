import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDog, getTemps } from '../redux/actions';

const Form = () => {

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeLength:"",
    image: "",
    //temperaments: []
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (event) => {

    let newDog = {
      name: form.name,
      height:`${form.minHeight} - ${form.maxHeight}`,
      weight:`${form.minWeight} - ${form.maxWeight}`,
      lifeLength: form.lifeLength,
      image: form.image,
      //temperaments: []
    }

    event.preventDefault()

    dispatch(createDog(newDog))
    
    alert(`You have created the ${form.name} breed!`)

    setForm({
      name: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
      lifeLength: "",
      image: "",
      //temperaments: []
  });
  }

  useEffect(() => {
    dispatch(getTemps())
  }, [dispatch])


  return (
    <div>
        <form id='form' onSubmit={(e) => handleSubmit(e)}>
          
          <label htmlFor="name">Breed Name: </label>
              <input type="text" name="name" value={form.name} onChange={handleChange} />
          
          <label htmlFor="minWeight">Min. Weigth: </label>
              <input type="text" name="minWeight" value={form.minWeight} onChange={handleChange} />
          
          <label htmlFor="maxWeight">Max. Weight: </label>
              <input type="text" name="maxWeight" value={form.maxWeight} onChange={handleChange} />
          
          <label htmlFor="minHeight">Min. Height: </label>
              <input type="text" name="minHeight" value={form.minHeight} onChange={handleChange} />
          
          <label htmlFor="maxHeight">Max. Height: </label>
              <input type="text" name="maxHeight" value={form.maxHeight} onChange={handleChange} />
          
          <label htmlFor="lifeLength">Life Expectation: </label>
              <input type="text" name="lifeLength" value={form.lifeLength} onChange={handleChange} />

          <label htmlFor="image">Image: </label>
              <input type="text" name="image" value={form.image} onChange={handleChange} />

          <button form="form" type='submit'>Done!</button>
        
        </form>
    </div>
  );
};

export default Form;