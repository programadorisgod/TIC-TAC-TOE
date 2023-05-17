 import axios from "axios";
 import { useState } from "react";
 const Buscar = ({ setWinnersList}) => {
    const [searchId, setSearchId] = useState("")

    const handleSearch = () => {
        axios.get(`http://localhost:3306/api/winners/${searchId}`)
        .then((response) =>setWinnersList(response.data))
        .catch((error) => console.error(error));
    }

    const hanleChange = (e) => {
        console.log(e.target.value)
        setSearchId(e.target.value)
    }
  return (
    <>
    <h1>Buscar ganador</h1>
    <input type="text" placeholder="Buscar ganador por id" value= {searchId} onChange={hanleChange}/>
    <button onClick={ handleSearch}>Buscar</button>
    </>
  )
 }
 export default Buscar;