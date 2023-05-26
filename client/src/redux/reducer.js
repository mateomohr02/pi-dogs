const initialState = {
    dogs: [],
    detail: [],
    temperaments: [],
    filteredDogs: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case "GET_ALL_DOGS":
            return {...state, 
            dogs: action.payload,
            filteredDogs: action.payload
        }
        
        case "GET_TEMPS":
            return{...state,
            temperaments: action.payload}
            
        case "GET_BREED_DETAIL":
            return {...state,
            detail: action.payload}
        
        case "SEARCH_DOG":
            return {...state,
            filteredDogs: action.payload}

        case "ALPHABETICAL_ORDER":
            if (action.payload === 'A-Z'){
                return {
                    ...state,
                    filteredDogs: [...state.filteredDogs].sort((a, b) => a.name.localeCompare(b.name)),
                };
            }else{
                return {
                    ...state,
                    filteredDogs: [...state.filteredDogs].sort((a, b) => b.name.localeCompare(a.name)),
                };
            }
        case "RESET_DETAIL":
            return{
                ...state,
                detail: []
            }
        case "WEIGHT_ORDER":
                const { payload: order } = action;
              
            return {
                ...state,
                filteredDogs: [...state.filteredDogs].sort((a, b) => {
                    let weightA, weightB;
              
                    if (a.isInDB) {
                        const [minA] = a.weight.split(" - ");
                        weightA = parseFloat(minA);
                    } else {
                        const [minA] = a.weight.metric.split(" - ");
                        weightA = parseFloat(minA);
                    }
                    
                    if (b.isInDB) {
                        const [minB] = b.weight.split(" - ");
                        weightB = parseFloat(minB);
                    } else {
                        const [minB] = b.weight.metric.split(" - ");
                        weightB = parseFloat(minB);
                    }
                    
                    if (order === "ASC") {
                        if(isNaN(weightA)){
                            weightA = 0;
                            return weightA - weightB
                        }
                        if(isNaN(weightB)){
                            weightB = 0;
                            return weightA - weightB
                        }
                        else{
                            return weightA - weightB;
                        }
                    } else {
                        if(isNaN(weightA)){
                            weightA = 0;
                            return weightB - weightA

                        }
                        if(isNaN(weightB)){
                            weightB = 0;
                            return weightB - weightA
                        }
                        else{
                        return weightB - weightA;
                        }
                    }
                }),
            };

        case "TEMP_FILTERED":
        const { payload: temp } = action;

        let filteredDogs = []

        if (temp === "All") {
            filteredDogs = state.dogs;
        }else {
            for (let i = 0; i < state.dogs.length; i++) {
                if (state.dogs[i].temperament && state.dogs[i].temperament.includes(temp.trim())) {
                    filteredDogs.push(state.dogs[i])}
            }
          }
        
        return {
            ...state,
            filteredDogs: filteredDogs
        };
            
        case "ORIGIN_FILTERED":           

            const { payload: origin} = action;

            let filteredOrigin = []

            if (origin === "API"){
                filteredOrigin = state.dogs.filter(d => !d.isInDB)
            }else if(origin ==='DB'){
                filteredOrigin = state.dogs.filter(d => d.isInDB)
            }else{
                filteredOrigin = state.dogs
            }

            return{
                ...state,
                filteredDogs: filteredOrigin
            }


        default:
            return state;
    }
}

export default reducer;