

import { auth } from '../firebase/firebase'
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { ClothCard } from './ClothCard'
import style from './HomeUser.module.css'

export const HomeUser = () => {

    const navigation = useNavigate()
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        document.title = "Home "
    })

    const logOutFirebase = async () => {
        try {
            await signOut(auth)
            setUser(null)
            navigation(`/login`)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className={style[`home-user`]}>

            <aside className={style['aside']}>
                <nav className='menu-lateral'>

                    <a
                        href=""
                        className={style['menu-lateral__link']}
                    >
                        <i className="fa-solid fa-house"></i>
                        Home
                    </a>

                    <a
                        href=""
                        className={style['menu-lateral__link']}
                    >
                        <i className="fa-solid fa-list"></i>
                        Products
                    </a>

                    <a
                        href=""
                        className={style['menu-lateral__link']}
                    >
                        <i className="fa-solid fa-heart"></i>
                        Favorites
                    </a>

                    <a
                        href=""
                        className={style['menu-lateral__link']}
                    >
                        <i className="fa-solid fa-circle-user"></i>
                        Home
                    </a>


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

                <div className={style['cards-clothes']}>
                    <ClothCard />
                    <ClothCard />
                    <ClothCard />
                    {/* <ClothCard />
                    <ClothCard />
                    <ClothCard />
                    <ClothCard />
                    <ClothCard />

                    <ClothCard />
                    <ClothCard />
                    <ClothCard />
                    <ClothCard />
                    <ClothCard />
                    <ClothCard />
                    <ClothCard />
                    <ClothCard /> */}
                </div>
            </div>

            <button
                className={style['btn-log-out']}
                onClick={() => logOutFirebase()}
            >
                Cerrar Sesion
            </button>
        </section>

    )
}



