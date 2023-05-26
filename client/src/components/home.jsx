  import React, { useState,useEffect } from 'react';
  import Card from './card'
  import SearchBar from './searchBar';
  import Paginate from './paginate'
  import styles from './styles/home.module.css'

  import {motion} from "framer-motion"

  import { useLocation } from 'react-router-dom';

  import {useDispatch, useSelector} from 'react-redux'

  import { getAllDogs, getTemps, handleAlphabeticalOrder, handleFilterOrigin, handleFilterTemps, handleWeightOrder, resetHome } from "../redux/actions";



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

    const location = useLocation()

    useEffect(()=>{
      dispatch(getAllDogs())
      dispatch(getTemps())

      return () => dispatch(resetHome())
    },[dispatch])

    useEffect(() => {
      if (filteredDogs.length === 1) {
        setPage(1);
      }
    }, [filteredDogs]);

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

        setAlphabeticalOrder("");
        setWeightOrder(order);
        dispatch(handleWeightOrder(order));

      } else {

        setAlphabeticalOrder("");
        setWeightOrder("");

      }
    }

    //ANIMATION

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
  
      return () => {
        clearTimeout(timer);
      };
    }, []);

    const animationVariants = {
      hidden: { opacity: 0, y: 100 },
      visible: { opacity: 1, y: 0 }
    };



    return (
      //ORDEN ALFABÉTICO
      <div className={styles.displayer}>
        <motion.div className={styles.filters}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animationVariants}
          transition={{ duration: 0.5 }}        
        >
          <div>
            <label className={styles.nameFilter}>Alphabetical Order: </label>
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
            <label className={styles.nameFilter} >Weight Order: </label>
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
          <label className={styles.nameFilter} >Filter Temperaments: </label>
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
            <label className={styles.nameFilter} >Filter Origin: </label>
            <select value={selectedOrigin} onChange={handleOriginChange}>
                <option disabled value="ALL">
                  Choose...
                </option>
                <option value="ALL">All</option>
                <option value="API">API</option>
                <option value="DB">DataBase</option>
            </select>
          </div>

          {location.pathname === '/create' ? "" : <SearchBar/> }
        
        </motion.div>

          {/* BOTÓN BACK SEARCH */}
                
        <div>
          {showedDogs.length === 1 ? <button className={styles.btnBackSearch} onClick={handleclick}>Back</button> : "" }
        </div>

        {/* MOSTRAR LAS CARDS */}
        <motion.div className={styles.cards}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animationVariants}
          transition={{ duration: 0.5 }}        
        >
            {showedDogs.map((d) => {
              if (d.isInDB){
                const temperaments = d.temperaments.map((temperament) => temperament.name);
                const temperamentStr = temperaments.join(", ");

                return <Card 
                key = {d.id}
                name = {d.name}
                temperament = {temperamentStr}
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
        </motion.div>

          {filteredDogs.length > 8 ? 
              <Paginate pageCount={pageCount} currentPage={currentPage} changePage={handlePage} />
            : "" 
          }
            
        </div>
    );
  };

  export default Home;