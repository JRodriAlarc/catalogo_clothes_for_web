import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InputForm, ButtonCustom, AwaitLoading } from '../components/index'
import { auth, db } from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'
import style from './Login.module.css'

export const Login = () => {
    const { user, setUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigate()
    const getUserByEmail = async email => {
        const userRef = doc(db, `users/${email}`)

        try {
            const userDoc = await getDoc(userRef)
            if (userDoc.exists()) {

                return userDoc.data()
            }
        } catch (error) {
            alert(error)
        }

    }


    useEffect(() => {
        document.title = "Iniciar Sesión"

    }, [])

    useEffect(() => {

        onAuthStateChanged(auth, (userLogged) => {
            setUser(userLogged)
        })

        const redirectPageByRol = async () => {
            try {
                const currentUser = await getUserByEmail(user.email)
                if (currentUser.rol === "administrador") {
                    navigation('/addProduct')
                }

                else if (currentUser.rol === 'user') {
                    navigation('/homeUser')
                }
            } catch (error) {

            }
        }

        redirectPageByRol()


    }, [user])



    const [data, setData] = useState({
        email: "",
        password: ""

    })

    const { email, password } = data

    const onChangeInput = ({ target: { value, name } }) => {
        setData(
            {
                ...data,
                [name]: value.trim()
            }
        )
    }



    const onSubmitForm = async (event) => {
        event.preventDefault()
        const estaVacio = Object.values(data).includes(``)
        if (estaVacio) {
            console.log(estaVacio)
            console.log(data)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                html: `<span class="error">Todos los campos debe ser completados</span>`,
                showConfirmButton: false,
                showCloseButton: true
            })
            return
        }

        /* iniciar sesion */
        try {
            setIsLoading(true)
            const newUser = await signInWithEmailAndPassword(auth, email, password)
            setUser(newUser)

        } catch (error) {
            const { message } = error
            if (message === `Firebase: Error (auth/user-not-found).`) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    html: `<span class="error">Email no registrado</span>`,
                    showConfirmButton: false,
                    showCloseButton: true
                })
            }
            if (message === `Firebase: Error (auth/wrong-password).`) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    html: `<span class="error">Contraseña Incorrecta</span>`,
                    showConfirmButton: false,
                    showCloseButton: true
                })
            }
        }

        finally {
            setIsLoading(false)
        }
    }
    return (

        <section className={style[`login`]}>
            {
                isLoading ? <AwaitLoading /> : null
            }
            <div className={style[`titles`]}>
                <h2 className={style[`titles__subtitle`]}>
                    Bienvenido,
                </h2>
                <h1 className={style[`titles__title`]}>
                    Inicia Sesión
                </h1>
            </div>

            <form
                className={style[`form`]}
                onSubmit={onSubmitForm}
            >
                <InputForm
                    typeInput="text"
                    name="email"
                    content="Email"
                    value={email}
                    onChange={onChangeInput}
                    icon={<i className="fa-solid fa-envelope"></i>}
                />

                <InputForm
                    typeInput="password"
                    name="password"
                    content="Contraseña"
                    value={password}
                    onChange={onChangeInput}
                    icon={<i className="fa-solid fa-unlock-keyhole"></i>}
                />

                <ButtonCustom
                    content={`Iniciar Sesión`}
                    type={`submit`}
                    icon={<i className="fa-solid fa-right-to-bracket"></i>}
                    style=
                    {
                        { width: "100%", fontSize: "1.4rem" }
                    }
                />

                <div className={style[`form__text`]}>
                    ¿No tienes una cuenta ? Crea una cuenta <Link to={`/register`} className={style[`form__link`]}> aqui</Link>
                </div>

            </form>

        </section>
    )
}

