import axios from 'axios'

//ACTION GET DOGS

export function getAllDogs () {
    return async function (dispatch) {
        let dogs = await axios.get(`http://localhost:3001/dogs`)
        return dispatch({
            type: "GET_ALL_DOGS",
            payload: dogs.data
        })
    }
}
//ACTION GET DETAIL

export function getDetail (id) {
    return async function (dispatch) {
        let dogDetail = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: "GET_BREED_DETAIL",
            payload: dogDetail.data
        })
    }
}

//ACTION GET TEMPS

export function getTemps () {
    return async function (dispatch){
        let temps = await axios.get(`http://localhost:3001/temperaments`)
        return dispatch({
            type:"GET_TEMPS",
            payload: temps.data
        })
    }
}

//ACTION CREATE DOG

export function createDog (newDog) {
    return async function(dispatch) {
        const response = await axios.post("http://localhost:3001/dogs", newDog )
        return response.data;
    }
}


//ACTION GET BREED BY NAME

export function searchDog(name) {
    return async function(dispatch) {
        try {
            const match = await axios.get(`http://localhost:3001/dogs/name?name=${name}`)
            return dispatch({
                type: "SEARCH_DOG",
                payload: Array.isArray(match.data) ? match.data : [match.data]
            })
        } catch (error) {
            alert(`There was not any matches for the breed ${name}`)
        } 
    }
}

//ACTION ORDER AZ

export function handleAlphabeticalOrder (order) {
    return { 
        type: "ALPHABETICAL_ORDER",
        payload: order
    }
}

//ACTION ORDER WEIGHT

export function handleWeightOrder(order) {
    return{
        type:"WEIGHT_ORDER",
        payload: order
    }
}

//ACTION FILTER TEMPS

export function handleFilterTemps(temp) {
    return{
        type:"TEMP_FILTERED",
        payload: temp
    }
}

//ACTION FILTER ORIGIN

export function handleFilterOrigin(origin) {
    return{
        type:"ORIGIN_FILTERED",
        payload: origin
    }
}