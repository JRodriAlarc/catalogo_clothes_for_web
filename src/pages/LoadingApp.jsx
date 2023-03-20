
import { LoadingSpinner } from "../components/index"
import { useNavigate } from "react-router-dom";
import style from "./LoadingApp.module.css"
import logoApp from "../images/logo_aplicacion_catalogo_ropa.png"

export const LoadingApp = () => {

    const navigate = useNavigate()

    setTimeout(() => {
        navigate('/login')
    }, 3000);

    return (
        <div className={style["loading-app"]}>
            <img
                src={logoApp}
                alt=""
            />

            <LoadingSpinner />

        </div>
    )
}
