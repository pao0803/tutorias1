import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';

function Cartas() {

	const botonModificar = useRef(null);
	const botonGuardar = useRef(null);
	const textoNombre = useRef(null);
	const textoDireccion = useRef(null);
	const textoTelefono = useRef(null);

	useEffect(() => {
		botonModificar.current.disabled = true;
	  });

	  var i = null;

	const initialState = {
		'id': 0,
		'nombre':'Raúl Herrera González',
		'direccion': '5 de febrero 100 pte col centro',
		'telefono': '6181232323',
	};
	const [datos, useDatos] = useState([initialState]);
	const HandleSubmit = (e) => {
		//console.log(e.target.nombre.value);
		e.preventDefault();
		const initialState2 = {
			'id': uuid(),
			'nombre':e.target.nombre.value,
			'direccion': e.target.direccion.value,
			'telefono': e.target.telefono.value,
		};

		useDatos(()=>{
			let datos1 = [...datos, initialState2];
			return (datos1);
		});
		
	}
	function HandleDelete(event) {

		let arr = [...datos];
		const identificador = event.target.id;
		for(var i=0; i<arr.length;i++) {
			if(identificador == arr[i].id) {
				arr.splice(i,1);
			}
		}
		useDatos(arr);
	}
	function HandleEditar(e) {

		var i1 = e.target.id.substring(1);

		for(var j=0;j<datos.length;j++) {
			if(datos[j].id == i1) {
				i = datos[j].id;
				textoNombre.current.value = datos[j].nombre;
				textoDireccion.current.value = datos[j].direccion;
				textoTelefono.current.value = datos[j].telefono;
				botonGuardar.current.disabled = true;
				botonModificar.current.disabled = false;
			}
		}
	}
	const HandleModificar = (e) => {
		let arr = [...datos];

		for(var j=0;j<datos.length;j++) {
			if(arr[j].id == i) {
				arr[j].nombre = textoNombre.current.value;
				arr[j].direccion = textoDireccion.current.value; 
				arr[j].telefono = textoTelefono.current.value;
				botonGuardar.current.disabled = false;
				botonModificar.current.disabled = true;
				i=null;
			}
		}
		useDatos(arr);
	}
	return ( 
		<>
			<div className="container text-center mt-3">
			<div className="row row-cols-3">
				{
					datos.map(dato=>(
						<div className="col mt-3" key={ dato.id }>
							<div className="card" style={{
								"width": "18rem",
							}}>
								<div className="card-body">
									<h5 className="card-title">{ dato.nombre }</h5>
									<p className="card-text">Id: { dato.id }</p>
									<p className="card-text">Dirección: { dato.direccion }</p>
									<p className="card-text">Telefono: { dato.telefono }</p>
									<button id={ dato.id } onClick= { HandleDelete } className="btn btn-danger me-3">Eliminar</button>
									<button id={ 'e'+ dato.id } className="btn btn-info" onClick={ HandleEditar }>Editar</button>
								</div>
							</div>
						</div>
					))
				}
			</div>
			</div>

			<div className="container mt-3">
				<form onSubmit={ HandleSubmit }>
				<div className="mb-3">
					<label htmlFor="nombre" className="form-label">Nombre</label>
					<input type="text" className="form-control" id="nombre" aria-describedby="nombreHelp" ref={ textoNombre } />
					<div id="nombreHelp" className="form-text">We'll never share your name with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="direccion" className="form-label">Dirección</label>
					<input type="text" className="form-control" id="direccion" aria-describedby="direccionHelp" ref={ textoDireccion } />
					<div id="direccionHelp" className="form-text">We'll never share your direccion with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="telefono" className="form-label">Telefono</label>
					<input type="text" className="form-control" id="telefono" aria-describedby="telefonoHelp" ref={ textoTelefono } />
					<div id="telefonoHelp" className="form-text">We'll never share your telefono with anyone else.</div>
				</div>
				<button type="submit" className="btn btn-primary me-3" ref={ botonGuardar }>Guardar</button>
				
			</form>
			<button className="btn btn-success" ref={ botonModificar } onClick={ HandleModificar }>Modificar</button>
			</div>

			




		
		</>
	 );
}

export default Cartas;