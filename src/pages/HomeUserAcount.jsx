
import { auth } from '../firebase/firebase'
import { signOut } from "firebase/auth"
import { useNavigate, NavLink, } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import style from './HomeUser.module.css'
import { getUserByEmail } from "../helpers"
import { ButtonCustom, LoadingSpinner } from '../components'



export const HomeUserAcount = () => {
    const { user, setUser } = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState({})

    const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {

        const getData = async () => {
            try {
                setIsLoading(true)
                const newCurrentUser = await getUserByEmail(user.email)
                setIsLoading(false)
                setCurrentUser(newCurrentUser)

            } catch (error) {

            }
        }

        getData()

    }, [])

    const navigation = useNavigate()


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


                    <NavLink
                        to={`/homeCloths`}
                        className={style['menu-lateral__link']}
                    >
                        <i className="fa-solid fa-list"></i>
                        Clothes
                    </NavLink>


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
                    {/*  <form
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
                    </form> */}

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
                        <section
                            className={style['info']}
                        >
                            <div>
                                <b>Nombre de usuario: </b> {`${currentUser.firstName} ${currentUser.lastName}`}
                            </div>
                            <div>
                                <b>Email</b> {`${currentUser.email}`}
                            </div>
                            <div>

                                <ButtonCustom
                                    style={{
                                        width: '200px'
                                    }}
                                    content={`Cerrar sesión`}
                                    onClick={logOutFirebase}
                                />
                            </div>
                        </section>
                }


            </div>



            {/* <Routes>
                <Route 
                    path="/home"
                    element={<h1>Hola</h1>}
                />
            </Routes> */}


        </section>


    )
}



