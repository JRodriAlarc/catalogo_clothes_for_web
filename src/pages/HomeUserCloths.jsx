
import { db } from "../firebase/firebase"
import { collection, getDocs } from "firebase/firestore"
import { NavLink, } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ClothCard, LoadingSpinner } from "../components"
import style from './HomeUser.module.css'



export const HomeUserCloths = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [arrClothes, setArrClothes] = useState([])

    useEffect(() => {


        const getCloths = async () => {
            let temp = []

            try {
                setIsLoading(true)
                const querySnapshot = await getDocs(collection(db, "clothes"));
                querySnapshot.forEach((doc) => {
                    const objCloth = doc.data()
                    temp = [...temp, objCloth]
                })

                setIsLoading(false)

                setArrClothes(temp)

            } catch (error) {

            }

        }

        getCloths()
    }, [])

    
    useEffect(() => {
        document.title = "Home "
    })

   

    return (
        <section className={style[`home-user`]}>

            <aside className={style['aside']}>
                <nav className='menu-lateral'>

                    {/* <NavLink
                        to={`/homeUser/home`}
                        className={style['menu-lateral__link']}
                    >
                        <i className="fa-solid fa-house"></i>
                        Home
                    </NavLink> */}

                    <NavLink
                        to={`/homeCloths`}
                        className={style['menu-lateral__link']}
                    >
                        <i className="fa-solid fa-list"></i>
                        Clothes
                    </NavLink>

                    {/* <NavLink
                        to={`/homeUser/favorites`}
                        className={style['menu-lateral__link']}
                    >
                        <i className="fa-solid fa-heart"></i>
                        Favorites
                    </NavLink> */}

                    <NavLink
                        to={`/homeAcount`}
                        className={style['menu-lateral__link']}
                    >
                        <i className="fa-solid fa-circle-user"></i>
                        Acount
                    </NavLink>


                </nav>
            </aside>

            <div className={style['content']}>
                <header className={style['header']}>
                    <h1 className={style['main-title']}>
                        Categorias
                    </h1>
                    <form
                        className={style['form-search']}>
                        <input
                            type="text"
                            name=""
                            id=""
                            className={style['form-search__input-text']}
                            placeholder='Buscar Prenda'
                        />
                        <button
                            className={style['form-search__btn']}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>

                </header>

                <nav className={style['menu-main']}>

                    <a
                        href="#"
                        className={style['menu-main__link']}
                    >
                        Jeans
                    </a>

                    <a
                        href="#"
                        className={style['menu-main__link']}
                    >
                        Zapatos
                    </a>

                    <a
                        href="#"
                        className={style['menu-main__link']}
                    >
                        Camisas
                    </a>

                    <a
                        href="#"
                        className={style['menu-main__link']}
                    >
                        Blusas
                    </a>

                    <a
                        href="#"
                        className={style['menu-main__link']}
                    >
                        Playeras
                    </a>

                    <a
                        href="#"
                        className={style['menu-main__link']}
                    >
                        Sudaderas
                    </a>

                    <a
                        href="#"
                        className={style['menu-main__link']}
                    >
                        Vestidos
                    </a>

                    <a
                        href="#"
                        className={style['menu-main__link']}
                    >
                        Chamarras
                    </a>
                </nav>


                {
                    isLoading ?
                        <div className={style['contenedor-spinner']}>
                            <LoadingSpinner />
                        </div>
                        :
                        <div className={style['cards-clothes']}>

                            {
                                arrClothes.map(({ nameCloth, imgCloth, sizesCloth, colorsCloth, priceCloth, category }) => {
                                    return (
                                        <ClothCard
                                            key={crypto.randomUUID()}
                                            category={category}
                                            nameCloth={nameCloth}
                                            imgCloth={imgCloth}
                                            sizesCloth={sizesCloth}
                                            colorsCloth={colorsCloth}
                                            priceCloth={priceCloth}
                                        />
                                    )
                                })
                            }
                        </div>

                }
            </div>

            {/* <Routes>
                <Route 
                    path="/home"
                    element={<h1>Hola</h1>}
                />
            </Routes> */}

            {/*  <button
                className={style['btn-log-out']}
                onClick={() => logOutFirebase()}
            >
                Cerrar Sesion
            </button> */}
        </section>


    )
}



