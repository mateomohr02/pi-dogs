import React from 'react';
import {Link} from 'react-router-dom'
import style from './styles/card.module.css'

const Card= (dog) => {
  
  return (
    <div className={style.card}>
        <Link className={style.name} to={`/detail/${dog.detailID}`} ><h3>{dog.name}</h3></Link>
        <img className={style.img} src={dog.image} alt={`${dog.name} representation`}/>
        <div className={style.text} >
          <p className={style.data} >Temperament: {dog.temperament}</p>
          <p className={style.data} >Weight: {dog.weight} Kg.</p>
        </div>
    </div>
  );
};

export default Card;