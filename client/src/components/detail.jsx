import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetail } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Detail = () => {

  const dispatch = useDispatch()

  const {detailId} = useParams()

  const detail = useSelector(state => state.detail)
  
  
  useEffect(() => {
    dispatch(getDetail(detailId))
  }, [dispatch, detailId])
  
  
  let detailBreed = detail[0]


  if (detailBreed?.isInDB){
    return (
    <div>
      <h3>{detailBreed?.name}</h3>
      <img src={detailBreed?.image} alt={detailBreed?.name}/>
      <p>Life expectation: {detailBreed?.lifeLength}</p>
      <p>Origin: {detailBreed?.origin ? detailBreed?.origin : "Unknown"}</p>
      <p>Temperament: {detailBreed?.temperament}</p>
      <p>Weight: {detailBreed?.weight}</p>
      <p>Height: {detailBreed?.height}</p>
  </div>)
  }else{
    return (
      <div>
          <h3>{detailBreed?.name}</h3>
          <img src={detailBreed?.image.url} alt={detailBreed?.name}/>
          <p>Life expectation: {detailBreed?.life_span}</p>
          <p>Origin: {detailBreed?.origin ? detailBreed?.origin : "Unknown"}</p>
          <p>Temperament: {detailBreed?.temperament}</p>
          <p>Weight: {detailBreed?.weight.metric}</p>
          <p>Height: {detailBreed?.height.metric}</p>
      </div>
  )}
  ;
};

export default Detail;