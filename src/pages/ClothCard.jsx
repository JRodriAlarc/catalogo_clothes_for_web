import React, { useState } from 'react'
import imageDemo from "../images/image_pantalon_demo.jpg"
import style from "./ClothCard.module.css"

export const ClothCard = () => {

    <i class="fa-regular fa-heart"></i>


    const [isFavoriteCloth, setIsFavoriteCloth] = useState(false)

    const onClickToggleFavoritCloth = () => setIsFavoriteCloth(!isFavoriteCloth)

    return (
        <div className={style["card-cloth"]}>

            <div className={style["card-cloth__content"]}>
                <div className={style['card-cloth__container-btn-favorite']}>
                    <button
                        onClick={onClickToggleFavoritCloth}
                        className={style['card-cloth__btn-favorite']}
                    >
                        <i className={`fa-${isFavoriteCloth ? 'solid' : 'regular'}  fa-heart`}></i>
                    </button>
                </div>
                <img
                    className={style['card-cloth__img']}
                    src={imageDemo}
                    alt="demo"
                />
                <div className={style['card-cloth__name-cloth']}>
                    SHEIN BIZwear Pantalones Botón Liso Elegante
                </div>
            </div>
        </div>
    )
}
