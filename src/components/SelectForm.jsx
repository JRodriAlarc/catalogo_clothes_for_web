import style from "./SelectForm.module.css"

export const SelectForm = ({ arrOptions = [], onChange, name, value, }) => {
    return (
        <>
            <select

                className={style[`select`]}
                name={name}
                defaultValue={value}
                onChange={onChange}

            >
                <option
                    className={`${style[`option`]} ${style[`selected`]}`}
                    value={""}
                >
                    Categoria de Prenda
                </option>

                {
                    arrOptions.map((option, index) => (
                        <option
                            key={index}
                            className={style["option"]}
                            value={option}
                        >
                            {option}
                        </option>
                    ))
                }

            </select>
        </>
    )
}
