

export const validateColorsCloth = (strColors) => {
    const regex = /^[a-zA-Z]+(,[a-zA-Z]+)*$/
    const isValidate = regex.test(strColors)
    return isValidate
    
}
