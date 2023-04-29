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
import { validateColorsCloth, validateSizesCloth } from "../helpers";

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
        priceCloth: "",
        category: "",
        imgCloth: "",
        sizesCloth: "",
        colorsCloth: ""


    })

    const { nameCloth, priceCloth, category, imgCloth, sizesCloth, colorsCloth} = data

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
        else if(!validateColorsCloth(colorsCloth.toLowerCase())) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                html: `<span class="error">Formato no válido para los colores de la prenda</span>`,
                showConfirmButton: false,
                showCloseButton: true
            })
            return
        }

        else if(!validateSizesCloth(sizesCloth)) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                html: `<span class="error">Formato no válido para las tallas de la prenda</span>`,
                showConfirmButton: false,
                showCloseButton: true
            })
            return
        }

        else {
            try {
                setIsLoading(true)
                const clothesCollection = collection(db, 'clothes')
                await addDoc(clothesCollection, {
                    nameCloth,
                    priceCloth: parseFloat(priceCloth),
                    category,
                    imgCloth,
                    sizesCloth: sizesCloth.split(','),
                    colorsCloth: colorsCloth.split(',')
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Se agrego la nueva prenda',
                    showConfirmButton: false,
                    showCloseButton: true
                })
    
                setData({
                    nameCloth: "",
                    priceCloth: "",
                    category: "",
                    imgCloth: "",
                    sizesCloth: "",
                    colorsCloth: ""
                })
    
    
            } catch (error) {
                console.log(error);
            }
    
            finally {
                setIsLoading(false)
            }
    
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

                    <ButtonCustom 
                        content={"Cerrar Sesión"}
                        onClick={logOutFirebase}
                        icon={<i class="fa-solid fa-angles-right"></i>}
                        style={
                            {
                                width: "180px",
                                marginLeft: "auto",
                                marginRight: "auto" 
                            }
                        }
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

                    <InputForm
                        
                        content="Precio de prenda"
                        value={priceCloth}
                        onChange={onChangeInput}
                        typeInput="number"
                        name="priceCloth"

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
                        name="sizesCloth"
                        id="sizesCloth"
                        className={style[`textarea`]}
                        placeholder="Escribe las tallas asi 12,14,16..."
                        onChange={onChangeInput}
                        value={sizesCloth}
                    ></textarea>

                    <textarea
                        name="colorsCloth"
                        id="colorsCloth"
                        className={style[`textarea`]}
                        placeholder="Escribir los colores asi azul,negro,cafe"
                        onChange={onChangeInput}
                        value={colorsCloth}
                    ></textarea>

                    <ButtonCustom
                        content="Agregar Nueva Prenda"
                        icon={<i class="fa-regular fa-paper-plane"></i>}
                        style={{ width: "100%", marginLeft: "auto",
                        marginRight: "auto" }}
                    />
                </form>
            </div>

        </section>
    )
}
