

interface InputProps {
    label: string
    placeholder : string
    name : string
    value: string
    type?: string
    disabled?: boolean
    required?: boolean
    error? : string
    handleChange : (e:React.ChangeEvent<HTMLInputElement>) => void
}


const Input: React.FC<InputProps> = ({name,value,placeholder,handleChange,error,type="text"}) => {
    return (
        <div className="flex flex-col">
            <input type={type} name={name} onChange={handleChange} className="input" placeholder={placeholder} value={value} /> 
            {error && error.length > 0 && <small className="text-xs text-rose-500 ">{error}</small>}
            </div>
    )
}
export default Input