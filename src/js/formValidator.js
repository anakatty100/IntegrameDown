const inputChangeHandler = (e, inputs, btn, isValidInputs) => {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] === e.target) {
            isValidInputs[i] = e.target.value ? true : false;
            break;
        }
    }
    validateInputHandler(isValidInputs, btn);
};

const validateInputHandler = (isValidInputs, btn) => {
    let allFormIsValid = true;
    for (let i = 0; i < isValidInputs.length; i++) {
        if (isValidInputs[i] === false) {
            allFormIsValid = false;
            break;
        }
    }
    console.log(isValidInputs);
    console.log("AllFormIsValid: ", allFormIsValid);
    btn.disabled = !allFormIsValid;
};



export const formValidatorHandler = (inputs, btn, isValidInputs) => {
    inputs.forEach((input, i) => {
        input.addEventListener("input", (ev) => {
            inputChangeHandler(ev, inputs, btn, isValidInputs);
        });
        isValidInputs[i] = input.value ? true : false;
    });
}

