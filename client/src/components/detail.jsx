import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetail, resetDetail } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import style from './styles/detail.module.css'

const Detail = () => {

  const dispatch = useDispatch()

  const {detailId} = useParams()

  const detail = useSelector(state => state.detail)
  


  useEffect(() => {
    dispatch(getDetail(detailId))
    return () => dispatch(resetDetail())
  }, [dispatch, detailId])
  
  
  let detailBreed = detail[0]


  if (detailBreed?.isInDB){
    return (
    <div className={style.displayer}>
      <div className={style.card}>

        <img className={style.img} src={detailBreed?.image} alt={detailBreed?.name}/>

        <div className={style.dataContainer}>

          <h3 className={style.dataTitle}>{detailBreed?.name}</h3>
          <p className={style.dataText}>Life expectation: {detailBreed?.lifeLength}</p>
          <p className={style.dataText}>Origin: {detailBreed?.origin ? detailBreed?.origin : "Unknown"}</p>
          <p className={style.dataText}>Temperament: {detailBreed?.temperament}</p>
          <p className={style.dataText}>Weight: {detailBreed?.weight}</p>
          <p className={style.dataText}>Height: {detailBreed?.height}</p>
        </div>

      </div>
    </div>
  )
  }else{
    return (
      <div className={style.displayer}>
        <div className={style.card}>

            <img className={style.img} src={detailBreed?.image.url} alt={detailBreed?.name}/>
            
            <div className={style.dataContainer}>
            
            <h3 className={style.dataTitle}>{detailBreed?.name}</h3>
            
              <p className={style.dataText}>Life expectation: {detailBreed?.life_span}</p>
              <p className={style.dataText}>Origin: {detailBreed?.origin ? detailBreed?.origin : "Unknown"}</p>
              <p className={style.dataText}>Temperament: {detailBreed?.temperament}</p>
              <p className={style.dataText}>Weight: {detailBreed?.weight.metric}</p>
              <p className={style.dataText}>Height: {detailBreed?.height.metric}</p>
              
            </div>
        </div>
      </div>
  )}
  ;
};

export default Detail;