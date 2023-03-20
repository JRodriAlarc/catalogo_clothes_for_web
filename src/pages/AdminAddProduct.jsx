import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { UploadFile, InputForm, SelectForm, ButtonCustom, AwaitLoading } from "../components/index"
import { db, storage, auth } from "../firebase/firebase"
import { doc, setDoc, collection, addDoc } from "firebase/firestore";



import { signOut } from "firebase/auth"
/* import { uploadBytes, ref, getDownloadURL } from "firebase/storage" */
import style from "./AdminAddProduct.module.css"
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const AdminAddProduct = () => {

    const { setUser } = useContext(UserContext)
    const inputFileRef = useRef()
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const logOutFirebase = async () => {
        try {
            await signOut(auth)
            setUser(null)
            navigation(`/login`)


        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        document.title = "Agregar Nuevo Producto"
    }, [])

    const [data, setData] = useState({
        nameCloth: "",
        description: "",
        category: "",
        imgCloth: ""

    })

    const { nameCloth, description, category, imgCloth, } = data

    const onChangeInput = ({ target: { value, name } }) => {
        setData(
            {
                ...data,
                [name]: value
            }
        )
    }

    const onChangeInputFile = async (e) => {
        const newImgCloth = e.target.files[0]

        const extensionsImgs = ['image/jpeg', 'image/png']

        if (!extensionsImgs.includes(newImgCloth.type)) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                html: `<span class="error">El archivo debe ser una imagen</span>`,
                showConfirmButton: false,
                showCloseButton: true
            })
            setData(
                {
                    ...data,
                    ['imgCloth']: ""
                }
            )

            return
        }
        const fileReader = new FileReader()
        fileReader.readAsDataURL(newImgCloth)

        fileReader.onload = function (e) {
            setData(
                {
                    ...data,
                    ['imgCloth']: e.target.result
                }
            )
        }
    }

    const onSubmitFormAddCloth = async event => {
        event.preventDefault()
        const estaVacio = Object.values(data).includes('')
        if (estaVacio) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                html: `<span class="error">Todos los campos debe ser completados</span>`,
                showConfirmButton: false,
                showCloseButton: true
            })
            return
        }
        try {
            setIsLoading(true)
            const clothesCollection = collection(db, 'clothes')
            await addDoc(clothesCollection, {
                nameCloth,
                description,
                category,
                imgCloth,
            })
            Swal.fire({
                icon: 'success',
                title: 'Se agrego la nueva prenda',
                showConfirmButton: false,
                showCloseButton: true
            })

            setData({
                nameCloth: "",
                description: "",
                category: "pantalones",
                imgCloth: ""
            })


        } catch (error) {
            console.log(error);
        }

        finally {
            setIsLoading(false)
        }

    }

    const onClickButtonFile = (e) => {
        const { current } = inputFileRef
        current.click()
    }

    const onDropUploadContainer = e => {
        e.preventDefault()
        const { current } = inputFileRef
        current.files = e.dataTransfer.files
    }


    return (
        <section className={style[`page`]}>
            {
                isLoading ? <AwaitLoading /> : null
            }
            <div className={style[`page__row`]}>

                <div className={style[`page__column1`]}>
                    <h1 className={style[`page__title`]}>
                        Registrar Nueva Prenda
                    </h1>

                    <div className="" style={{ display: "flex", justifyContent: "center" }}>
                        {
                            imgCloth ?
                                <ButtonCustom
                                    style={{ width: "200px" }}
                                    content="Ver foto"
                                    icon={<i className="fa-solid fa-camera"></i>}
                                    onClick={() => {
                                        Swal.fire({
                                            imageUrl: imgCloth,
                                            showConfirmButton: false,
                                            showCloseButton: true
                                        })
                                    }}
                                />
                                :
                                null
                        }
                    </div>
                    <UploadFile
                        name={`imgCloth`}
                        inputFileRef={inputFileRef}
                        onChangeInputFile={onChangeInputFile}
                        onClickButtonFile={onClickButtonFile}
                        onDropUploadContainer={onDropUploadContainer}

                    />

                    <button onClick={() => logOutFirebase()}>
                        Cerrar sesion
                    </button>
                </div>

                <form
                    className={style[`form`]}
                    onSubmit={onSubmitFormAddCloth}
                >

                    <InputForm
                        content="Nombre de prenda"
                        value={nameCloth}
                        onChange={onChangeInput}
                        typeInput="text"
                        name="nameCloth"

                    />

                    <SelectForm
                        arrOptions={
                            [
                                'pantalones',
                                'camisas',
                                'playeras',
                                'sudaderas',
                                'chamarras',
                                'vestidos',


                            ]
                        }
                        onChange={onChangeInput}
                        value={category}
                        name={`category`}
                    />

                    <textarea
                        name="description"
                        id="description"
                        className={style[`textarea-description`]}
                        placeholder="Descripcion de la prenda"
                        onChange={onChangeInput}
                        value={description}
                    ></textarea>



                    <ButtonCustom
                        content="Agregar Nueva Prenda"
                        style={{ display: "block", width: "100%" }}
                    />
                </form>
            </div>

        </section>
    )
}
