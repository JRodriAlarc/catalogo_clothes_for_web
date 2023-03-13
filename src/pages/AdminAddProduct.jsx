import { useEffect, useRef, useState } from "react"
import { UploadFile, InputForm, SelectForm, ButtonCustom } from "../components/index"
import { db, storage } from "../firebase/firebase"
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import style from "./AdminAddProduct.module.css"
import logoApp from "../images/logo_aplicacion_catalogo_ropa.png"
import Swal from "sweetalert2";

export const AdminAddProduct = () => {

    const inputFileRef = useRef()
    const inputNameClohtRef = useRef()


    useEffect(() => {
        document.title = "Agregar Nuevo Producto"
    }, [])

    const [data, setData] = useState({
        nameCloth: "",
        description: "",
        category: "pantalones",
        imgCloth: ""

    })

    /* const [srcImageShow, setSrcImageShow] = useState("") */
    /* const [fileImgCloth, setFileImgCloth] = useState() */

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
            setFileImgCloth(null)
            setSrcImageShow(null)

            return
        }

        /* modificar el estado */
        /* setFileImgCloth(newImgCloth) */

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

        /* const fileRef = ref(storage, `documentos/${newImgCloth.name}`);

        await uploadBytes(fileRef, newImgCloth)

        const newImgCloth = await getDownloadURL(fileRef)
        setData(
            {
                ...data,
                ['imgCloth']: newImgCloth
            }
        ) */
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
            /* const clothesCollection = collection(db, 'clothes')
            const fileRef = ref(storage, `documentos/${fileImgCloth.name}`);
            await uploadBytes(fileRef, fileImgCloth)
            const newImgCloth = await getDownloadURL(fileRef)

            setData(
                {
                    ...data,
                    ['imgCloth']: newImgCloth
                }
            ) */

            /* setData(
                {
                    ...data,
                    ['imgCloth']: newImgCloth
                }
            ) */

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

            inputFileRef.current.focus()

        } catch (error) {
            console.log(error);
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
            <div className={style[`page__row`]}>

                <div className={style[`page__column1`]}>
                    <h1 className={style[`page__title`]}>
                        Registrar Nueva Prenda
                    </h1>

                    <div className="" style={{ display: "flex", justifyContent: "center" }}>
                        {
                            imgCloth ?
                                <ButtonCustom
                                    content="Ver foto"
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
                    {/*  <img
                        src={logoApp}
                        alt="logo del catalogo"
                        className={style[`logo-img`]}
                    /> */}
                    <UploadFile
                        name={`imgCloth`}
                        inputFileRef={inputFileRef}
                        onChangeInputFile={onChangeInputFile}
                        onClickButtonFile={onClickButtonFile}
                        onDropUploadContainer={onDropUploadContainer}

                    />
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
                        arrOptions={['pantalones', 'camisas', 'zapatos']}
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
