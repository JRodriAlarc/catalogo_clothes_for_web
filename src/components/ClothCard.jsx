import React, { useState } from 'react'
import { ButtonCustom } from "../components/";
import './ClothCardInfo.css';
import style from "./ClothCard.module.css"
import Swal from 'sweetalert2'
import { generarOptions, fomartNumber } from '../helpers';

export const ClothCard = ({ category, colorsCloth, imgCloth, nameCloth, priceCloth, sizesCloth}) => {

    <i class="fa-regular fa-heart"></i>
    const onClickShowInfo = () => {
        Swal.fire({
            
            html:
            `
            <div
                class="info"
            >
                <img src="${imgCloth}" class="info__img">
                <div class="info__text">
                    <div class="info__container">
                        
                        <div class="info__category">
                             ${category}
                        </div>

                        <div class="info__name-cloth">
                            ${nameCloth}
                        </div>

                        <div class="info__title-colors-cloth">
                            Colores disponibles
                        </div>

                        <div class="info__colors-cloth">
                            ${generarOptions(colorsCloth)}
                        </div>
                        
                        <div class="info__title-sizes-cloth">
                            Tallas disponibles:
                        </div>

                        <div class="info__sizes-cloth">
                            ${generarOptions(sizesCloth)}
                        </div>

                    </div>

                    <div class="info__price-cloth">
                        ${fomartNumber(priceCloth)}
                    </div>
                </div>
            </div>
            `,
            customClass: {
                 popup: 'popup',
                 container: 'container'
            },

            showCloseButton: true,
            showConfirmButton: false
        })
    }


    const [isFavoriteCloth, setIsFavoriteCloth] = useState(false)

    const onClickToggleFavoritCloth = () => setIsFavoriteCloth(!isFavoriteCloth)

    return (
        <div
            className={style["card-cloth"]}
            
        >

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
                    src={imgCloth}
                    alt="demo"
                />
                <div className={style['card-cloth__name-cloth']}>
                    {nameCloth}
                </div>

                <ButtonCustom
                    style={{
                        marginLeft:"auto",
                        marginRight:"auto",
                        paddingTop: ".5rem",
                        paddingBottom: ".5rem"
                    }}
                    type={`button`}
                    content={`Ver mas`}
                    onClick={onClickShowInfo}

                />

                
            </div>
        </div>
    )
}
