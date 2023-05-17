import axios from "axios";
import { useState } from "react";
const Update = ({setWinnersList}) => {
   const [searchId, setSearchId] = useState("")
   const [searchName, setSearchName] = useState("")

   const handleUpdate = () => {
       axios.patch(`http://localhost:3306/api/winners/${searchId}`,{name: searchName })
       .then((response) => setWinnersList(response.data))
       .catch((error) => console.error(error));
   }
   const hanleChangee = (e) => {
 setSearchName(e.target.value)
    }

   const hanleChange = (e) => {
       console.log(e.target.value)
       setSearchId(e.target.value)
   }
 return (
   <>
   <h1>Actualizar ganador</h1>  
   <input type="text" placeholder="Ingresar id" value= {searchId} onChange={hanleChange}/>
    <input type="text" placeholder="Ingresar nombre" value= {searchName} onChange={hanleChangee}/>
   <button onClick={ handleUpdate}>Actualizar</button>
   </>
 )
}
export default Update;