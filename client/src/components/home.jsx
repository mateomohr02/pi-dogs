  import React, { useState,useEffect } from 'react';
  import Card from './card'
  import ReactPaginate from 'react-paginate'



  import {useDispatch, useSelector} from 'react-redux'

  import { getAllDogs, getTemps, handleAlphabeticalOrder, handleFilterOrigin, handleFilterTemps, handleWeightOrder } from "../redux/actions";



  const Home = () => {

    const allDogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector (state => state.temperaments)
    const filteredDogs = useSelector(state => state.filteredDogs)


    const [currentPage, setPage] = useState(1);
    

    const dogsPage = 8
    
    const indexOfLastDog = currentPage * dogsPage;
    
    const indexOfFirstDog = indexOfLastDog - dogsPage;
    
    const showedDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog)

    const pageCount = Math.ceil(allDogs.length / dogsPage)

    const handlePage = (pageNum) => {
        setPage(pageNum)
    }

    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getAllDogs())
      dispatch(getTemps())
    },[dispatch])

    const [selectedAlphabeticalOrder, setAlphabeticalOrder] = useState("");

    const [selectedWeightOrder, setWeightOrder] = useState("");

    const [selectedTemp, setTemp] = useState("All");

    const [selectedOrigin, setOrigin] = useState("All")


    const handleTempChange = (e) => {
      const temp = e.target.value;
      setTemp(temp);
      dispatch(handleFilterTemps(temp));
    };

    const handleOriginChange = (e) => {
      const origin = e.target.value;
      setOrigin(origin);
      dispatch(handleFilterOrigin(origin))
    }


    const handleclick = () => (dispatch(getAllDogs()))


    const handleOrderChange = (e) => {
      const order = e.target.value;

      if (order === "A-Z" || order === "Z-A") {

        setAlphabeticalOrder(order);
        setWeightOrder("");
        dispatch(handleAlphabeticalOrder(order));

      } else if (order === "ASC" || order === "DESC") {

        setWeightOrder(order);
        setAlphabeticalOrder("");
        dispatch(handleWeightOrder(order));

      } else {

        setAlphabeticalOrder("");
        setWeightOrder("");

      }
    }

    return (
      //ORDEN ALFABÉTICO
      <div>
        <div>
          <label>Alphabetical Order</label>
          <select value={selectedAlphabeticalOrder} onChange={handleOrderChange}>
              <option disabled value="">
                Choose...
              </option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
          </select>
        </div>

        {/* ORDEN PESO */}
        <div>
          <label>Weight Order</label>
          <select value={selectedWeightOrder} onChange={handleOrderChange}>
              <option disabled value="">
                Choose...
              </option>
              <option value="DESC">DESC</option>
              <option value="ASC">ASC</option>
          </select>
        </div>

        {/* FILTRO TEMPS */}
        <div>
        <label>Filter Temperaments: </label>
        <select value={selectedTemp} onChange={handleTempChange}>
          <option value="All">All</option>
          {allTemperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>
          
        {/* FILTRO ORIGIN */}
        <div>
          <label>Filter Origin: </label>
          <select value={selectedOrigin} onChange={handleOriginChange}>
              <option disabled value="ALL">
                Choose...
              </option>
              <option value="ALL">ALL</option>
              <option value="API">API</option>
              <option value="DB">DataBase</option>
          </select>
        </div>

        {/* BOTÓN BACK SEARCH */}
        {showedDogs.length === 1 ? <button onClick={handleclick}>Back</button> : "" }
        
        {/* MOSTRAR LAS CARDS */}
        <div>
            {showedDogs.map((d) => {
              if (d.isInDB){
                return <Card 
                key = {d.id}
                name = {d.name}
                temperament = {d.temperament}
                image = {d.image}
                weight = {d.weight}
                height = {d.height}
                detailID = {d.id}
                />
              }else{
                return <Card
                key = {d.id}
                name = {d.name}
                temperament = {d.temperament}
                image = {d.image.url}
                height = {d.height.metric}
                weight = {d.weight.metric}
                detailID = {d.id}
              />
              }
            })}
        
            <ReactPaginate
              previousLaabel='Previous'
              nextLabel="Next"
              breakLabel="..."
              pageCount={pageCount}
              onPageChange={(page) => handlePage(page.selected + 1)}
              containerClassName="pagination"
              activeClassName="active"     
            />
        </div>
      </div>
    );
  };

  export default Home;