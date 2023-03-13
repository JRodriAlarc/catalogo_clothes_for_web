export const validateNumberPhone = (numberPhone) => {
    const regex = /^\d{10}$/
    return regex.test(numberPhone)

}


