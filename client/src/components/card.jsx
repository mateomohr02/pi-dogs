import React from 'react';
import {Link} from 'react-router-dom'


const Card= (dog) => {
  
  return (
    <div>
        <img src={dog.image} alt={`${dog.name} representation`}/>
        <Link to={`/detail/${dog.detailID}`} ><h3>{dog.name}</h3></Link>
        <p>Temperament: {dog.temperament}</p>
        <p>Weight: {dog.weight} Kg.</p>
    </div>
  );
};

export default Card;