import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InputForm, ButtonCustom } from '../components/index'
import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import Swal from 'sweetalert2'
import style from './Login.module.css'

export const Login = () => {

    useEffect(() => {
        document.title = "Iniciar Sesión"
    }, [])

    const navigation = useNavigate()

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
                showConfirmButton:false,
                showCloseButton: true
            })
            return
        }

        /* iniciar sesion */
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
            if(email === `lariosacostaa@gmail.com`) {
                navigation(`/addProduct`)
            }

        } catch (error) {
            const {message} = error

            console.log(message);
            if(message === `Firebase: Error (auth/user-not-found).`) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    html: `<span class="error">Email no registrado</span>`,
                    showConfirmButton:false,
                    showCloseButton: true
                })  
            }

            if(message === `Firebase: Error (auth/wrong-password).`) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    html: `<span class="error">Contraseña Incorrecta</span>`,
                    showConfirmButton:false,
                    showCloseButton: true
                })  
            }
            

        }



    }
    return (
        <section className={style[`login`]}>
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
                    icon={ <i className="fa-solid fa-envelope"></i> }
                />

                <InputForm
                    typeInput="password"
                    name="password"
                    content="Contraseña"
                    value={password}
                    onChange={onChangeInput}
                    icon={ <i className="fa-solid fa-unlock-keyhole"></i> }
                />

                <div className={style[`form__text`]}>
                    ¿No tienes una cuenta ? Crea una cuenta <Link to={`/register`} className={style[`form__link`]}> aqui</Link>
                </div>

                <ButtonCustom
                    content={`Iniciar Sesión`}
                    type={`submit`}
                    style=
                    {
                        { display: "block", width: "100%", fontSize: "1.4rem" }
                    }

                />

            </form>
        </section>
    )
}

