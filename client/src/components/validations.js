const validate = (dogForm) => {
    let errors = {}

    if (!dogForm.name || /\d/.test(dogForm.name) ){
        errors.name = 'The field name cannot be empty or contain numbers.'
    }

    if ((!dogForm.maxWeight || !dogForm.minWeight ) || ( dogForm.minWeight > dogForm.maxWeight )){
        errors.weight = 'The fields Max. Weight and Min. Weight cannot be empty and Min. Weight cannot be greater than Max. Weight.'
    }

    if ((!dogForm.maxHeight || !dogForm.minHeight ) || ( dogForm.minHeight > dogForm.maxHeight )){
        errors.height = 'The fields Max. Height and Min. Height cannot be empty and Min. Height cannot be greater than Max. Height.'
    }
    
    if (!dogForm.lifeLength){
        errors.lifeLength = 'The field Life Expectation cannot be empty.'
    }

    // if (!dogForm.temperaments){
    //     errors.temperaments = 'You must add at least one temperament.'
    // }
    
    if (!dogForm.image){
        errors.image = 'The field image cannot be empty.'
    }


    return errors;

}

export default validate