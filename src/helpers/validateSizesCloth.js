
export const validateSizesCloth = (strSizes) => {
    const regex = /^(\d{1,2},)*\d{1,2}$/
    const isValidate = regex.test(strSizes)
    return isValidate
    
}
