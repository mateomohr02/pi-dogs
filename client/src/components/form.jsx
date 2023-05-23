import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDog, getTemps } from '../redux/actions';

import validate from './validations'


const Form = () => {

  const dispatch = useDispatch()

  //const [errors, setErrors] = useState()


  //FORM AND ERROR STATE
  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    lifeLength:"",
    image: "",
    temperaments: ""
  })


  const [form, setForm] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeLength:"",
    image: "",
    temperaments: []
  })


  //ONCHANGE HANDLER ERROR SETTER
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setErrors(validate({
      ...form,
      [e.target.name] : e.target.value
    }))
  }


  //DISPATCH ON SUBMIT AND CLEAR
  const handleSubmit = (event) => {

    let newDog = {
      name: form.name,
      height:`${form.minHeight} - ${form.maxHeight}`,
      weight:`${form.minWeight} - ${form.maxWeight}`,
      lifeLength: form.lifeLength,
      image: form.image,
      temperaments: []

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
      temperaments: []
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
          {form.name === "" ? "": errors.name && <p>{errors.name}</p>}

          <label htmlFor="minWeight">Min. Weigth: </label>
              <input type="text" name="minWeight" value={form.minWeight} onChange={handleChange} />

          <label htmlFor="maxWeight">Max. Weight: </label>
              <input type="text" name="maxWeight" value={form.maxWeight} onChange={handleChange} />
          {form.maxWeight === "" ? "": errors.weight && <p>{errors.weight}</p>}

          <label htmlFor="minHeight">Min. Height: </label>
              <input type="text" name="minHeight" value={form.minHeight} onChange={handleChange} />
          
          <label htmlFor="maxHeight">Max. Height: </label>
              <input type="text" name="maxHeight" value={form.maxHeight} onChange={handleChange} />
          {form.maxHeight === "" ? "": errors.height && <p>{errors.height}</p>}

          <label htmlFor="lifeLength">Life Expectation: </label>
              <input type="text" name="lifeLength" value={form.lifeLength} onChange={handleChange} />
          {form.lifeLength === "" ? "": errors.lifeLength && <p>{errors.lifeLength}</p>}

          <label htmlFor="image">Image: </label>
              <input type="text" name="image" value={form.image} onChange={handleChange} />
          {form.image === "" ? "": errors.image && <p>{errors.image}</p>}

          <button form="form" type='submit'>Done!</button>
        
        </form>
    </div>
  );
};

export default Form;