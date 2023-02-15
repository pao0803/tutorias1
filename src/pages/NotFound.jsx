import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();
	useEffect(()=>{
		setTimeout(()=>{
			navigate('/'); // página anterior -1
		}, 1000);
	},[]);
	return ( 
		<>
			<h1>Pagina no existe</h1>
		</>
	 );
}

export default NotFound;