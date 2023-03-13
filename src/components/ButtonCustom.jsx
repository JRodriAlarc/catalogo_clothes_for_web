import styles from './ButtonCustom.module.css'

export const ButtonCustom = ({ type = "", content = "", style = {} , onClick}) => {
    return (
        <button
            type={type}
            className={styles[`button-custom`]}
            style={style}
            onClick={onClick}
        >
            <span
                className={styles[`button-custom__span`]}
            >{content}</span>
        </button>
    )
}
