import axios from "axios"
import { useState } from "react"
const Delete = ({setWinnersList}) => {
    //el estado sera ""
    const [searchId, setSearchId] = useState("")
     const handleDelete = () => {
        axios.delete(`http://localhost:3306/api/winners/${searchId}`)
    .then((response) => setWinnersList(response.data))
    .catch((error) => console.error(error));
     }
 //aqui cambiare el valor del estado
    const hanleChange = (e) => {
        console.log(e.target.value)
        setSearchId(e.target.value)
    }
    return (
        <>
        <h1>Eliminar ganador</h1>
        <input type="text" placeholder="Ingresar id" value= {searchId} onChange={hanleChange}/>
        <button onClick={ handleDelete}>Eliminar </button>
        </> )
}
export default Delete;