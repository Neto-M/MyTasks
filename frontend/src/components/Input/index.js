export function Input({type, text, name, placeholder, handleOnChange, value, multiple}) {
    return(
        <div>
            <label htmlFor={name}>{text}</label>
            <input
                type= {type}
                name= {name}
                id= {name}
                placeholder= {placeholder}
                onChange= {handleOnChange}
                value= {value}
                {... (multiple ? {multiple} : '')}
                className="border m-1 p-1.5 bg-gray-100 hover:bg-gray-400"
            />
        </div>
    )
}