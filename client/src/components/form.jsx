import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getTemps } from '../redux/actions';

import style from './styles/form.module.css'

import validate from './validations'


const Form = () => {


  const dispatch = useDispatch()

  //STATES

  const temperaments = useSelector((state) => state.temperaments)

  const [doneBtn, setDone] = useState(false)

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
    setDone(true)

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setErrors(validate({
      ...form,
      [e.target.name] : e.target.value
    }))
  }

  //HANDLER TEMPERAMENTOS

  const handleTemps = (e) => {
    
    setForm({
      ...form,
      temperaments : [...form.temperaments, e.target.value]
    })
  }

  const handleDelete = (temp) => {
    setForm({
      ...form,
      temperaments : form.temperaments.filter(t => t !== temp)
    })
  }


  //DISPATCH ON SUBMIT AND CLEAR
  const handleSubmit = (event) => {

    event.preventDefault()

    const validateSubmit = Object.values(errors).every((error) => error === "") && Object.values(form).every((value) => value !== null)

    if (!validateSubmit || !doneBtn){
      return alert('Los campos no se han llenado correctamente!')
    }

    let newDog = {
      name: form.name,
      height:`${form.minHeight} - ${form.maxHeight}`,
      weight:`${form.minWeight} - ${form.maxWeight}`,
      lifeLength: form.lifeLength,
      image: form.image,
      temperaments: form.temperaments.join(', ')
    }

    console.log(newDog);



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
    <div className={style.displayer}>
        <form className={style.form} id='form' onSubmit={(e) => handleSubmit(e)}>

          <div className={style.containerInputs}>
            <label className={style.text} htmlFor="name">Breed Name: </label>
                <input type="text" name="name" value={form.name} onChange={handleChange} />
            {form.name === "" ? "": errors.name && <p className={style.errors} >{errors.name}</p>}
          </div>

          <div className={style.containerInputs}>
            
              <label className={style.text} htmlFor="minWeight">Min. Weigth: </label>
                  <input type="text" name="minWeight" value={form.minWeight} onChange={handleChange} />
      
              <label className={`${style.text} ${style.twins}`} htmlFor="maxWeight">Max. Weight: </label>
                  <input type="text" name="maxWeight" value={form.maxWeight} onChange={handleChange} />
              {form.maxWeight === "" ? "": errors.weight && <p className={style.errors} >{errors.weight}</p>}
            
          </div>

          <div className={style.containerInputs}>
            
              <label className={style.text} htmlFor="minHeight">Min. Height: </label>
              <input type="text" name="minHeight" value={form.minHeight} onChange={handleChange} />
            
              <label className={`${style.text} ${style.twins}`} htmlFor="maxHeight">Max. Height: </label>
                  <input type="text" name="maxHeight" value={form.maxHeight} onChange={handleChange} />
              {form.maxHeight === "" ? "": errors.height && <p className={style.errors} >{errors.height}</p>}
            
          </div>

          <div className={style.containerInputs}>
            <label className={style.text} htmlFor="lifeLength">Life Expectation: </label>
                <input type="text" name="lifeLength" value={form.lifeLength} onChange={handleChange} />
            {form.lifeLength === "" ? "": errors.lifeLength && <p className={style.errors} >{errors.lifeLength}</p>}
          </div>

          <div className={style.containerInputs}>
            <label className={style.text} htmlFor="image">Image: </label>
                <input type="text" name="image" value={form.image} onChange={handleChange} />
            {form.image === "" ? "": errors.image && <p className={style.errors} >{errors.image}</p>}
          </div>

        
          <div className={style.tempMenu}>
            <span className={style.text}>Add your Dogs temperaments: </span>
              <select onChange={handleTemps}>
                  <option disabled value="">Temperaments</option>
                  {temperaments.map(t => (                      
                      <option value={t.name} key={t.id}>{t.name}</option>
                  ))}
              </select>
              
              <div className={style.showedTemps}>
                {form.temperaments.map(t => {
                  return <div className={style.tempBox} key={t} onClick={() => handleDelete(t)}>
                            <span>{t}</span>
                        </div>
                })}
              </div>
              <p className={style.text}>Note: To delete a temperament, just click it and it will pop!</p>

          </div>

        </form>
          
        <button className={style.btn}form="form" type='submit'>Done!</button>
        
    </div>
  );
};

export default Form;