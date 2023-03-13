import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/firebase"
import { doc, setDoc } from "firebase/firestore"
import { Link } from "react-router-dom"
import { InputForm, ButtonCustom } from "../components/index"
import Swal from "sweetalert2"
import { validateNumberPhone, validateEmail } from "../helpers/index";
import style from "./Register.module.css"


export const Register = () => {
    useEffect(() => {
        document.title = "Registrar Cuenta"
    }, [])
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        numberPhone: "",
        email: "",
        password: ""

    })

    const { firstName, lastName, numberPhone, email, password } = data

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
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                html:`<span class="error">Todos los campos debe ser completados</span>`,
                showConfirmButton:false,
                showCloseButton: true
            })
            return
        }
        else if(!validateNumberPhone(numberPhone)) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                html:`<span class="error">Número teléfonico no válido</span>`,
                showConfirmButton:false,
                showCloseButton: true,
            })
            return
        }
        else if(!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                html:`<span class="error">Email no válido</span>`,
                showConfirmButton:false,
                showCloseButton: true,
            })
            return
        }
        
        const user = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user)

        /* obtener referencia del documento */
        const docRef = doc(db, `users/${email}`)

         await setDoc(docRef, {
            firstName,
            lastName,
            numberPhone,
            email,
            password,
            rol: `user`
        })
            
    }

    return (
        <section className={style[`register`]}>
            <div className={style[`titles`]}>
                <h2 className={style[`titles__subtitle`]}>
                    Bienvenido,
                </h2>
                <h1 className={style[`titles__title`]}>
                    Registrar Cuenta
                </h1>
            </div>
            <form
                method='post'
                className={style[`form`]}
                onSubmit={onSubmitForm}
            >
                <div className={style[`form__group-input-par`]}>
                    <InputForm
                        typeInput="text"
                        name="firstName"
                        content="Nombre"
                        value={firstName}
                        onChange={onChangeInput}
                        icon={<i className="fa-solid fa-user"></i>}
                    />

                    <InputForm
                        typeInput="text"
                        name="lastName"
                        content="Apellido"
                        value={lastName}
                        onChange={onChangeInput}
                        icon={<i className="fa-regular fa-user"></i>}
                    />
                </div>

                <InputForm
                    typeInput="text"
                    name="numberPhone"
                    content="Teléfono"
                    value={numberPhone}
                    onChange={onChangeInput}
                    icon={<i className="fa-solid fa-phone"></i>}
                />

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

                <div className={style[`form__text`]}>
                    ¿Ya tienes una cuenta ? Inicia Sesión <Link to={`/`} className={style[`form__link`]}> aqui</Link>
                </div>

                <ButtonCustom
                    content={`Registrar Cuenta`}
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
