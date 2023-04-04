export const fomartNumber = (number = 0) => {
    
    const formateado = number.toLocaleString("en", {
        style: "currency",
        currency: "MXN"
    });

    return formateado;
}
