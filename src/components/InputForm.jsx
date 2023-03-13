import "./InputForm.css"



export const InputForm = ({ typeInput = "text", name = "", content = "", value = "", onChange, icon }) => {
    return (
        <div className="form__group field">

            <div className="" style={{display:"flex", alignItems: "center", gap: "1rem"}}>
                <div className="" style={{flexGrow: "1"}}>
                    <input
                        placeholder={content}
                        className="form__field"
                        type={typeInput}
                        name={name}
                        id={name}
                        value={value}
                        onChange={onChange}
                        
                    />
                    <label className="form__label" htmlFor={name}>{content}</label>
                </div>
                { icon }
            </div>

        </div>

    )
}


/* 
color: #3437d8
*/