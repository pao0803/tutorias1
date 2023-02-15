import { useNavigate } from "react-router-dom";
import { Grid, h } from 'gridjs';
import "gridjs/dist/theme/mermaid.css";
import { useEffect, useRef } from "react";



function Alumnos() {
	const wrapperRef = useRef(null);
	const navigate = useNavigate();
	const grid = new Grid({
		columns: ['id',
		'Nombre',
		'Actividades',
		'Fecha',
		'Participantes',
		'Lugar',
		'Observaciones',
	{
		name:'Modificar',
		formatter:(cell, row)=>{
			return h('button',{
				className:'btn btn-primary',
				onClick:()=> navigate(`/alumnos/modificar/${row.cells[0].data}`),
			}, 'Modificar');
		}
	},
	{
		name:'Eliminar',
		formatter:(cell, row)=>{
			return h('button',{
				className:'btn btn-danger',
				onClick:()=> navigate(`/alumnos/eliminar/${row.cells[0].data}`),
			}, 'Eliminar');
		}
	}
],
		width: 'auto',
		search: true,
		pagination: {
			enabled:true,
			limit: 5,
			summary: true,
		},
		sort: true,
		style:{
			th:{
				'background-color': '#3047BD',
				'color':'#fbf8f8',
				'border':'3px solid #ccc',
				'text-align':'center',
			}
		},
		autoWidth:true,
		language: {
			'search': {
			  'placeholder': '🔍 Buscar...'
			},
			'pagination': {
			  'previous': '⬅️',
			  'next': '➡️',
			  'showing': '😃 mostrando',
			  'results': () => 'Registros'
			},
		  },
		server: {
			url:'http://127.0.0.1:5000/alumnos',
			then:data=>data.result.map(
				alumno=>[alumno.id,
					alumno.nombre,
					alumno.act,
					alumno.fecha,
					alumno.participantes,
					alumno.lugar,
					alumno.obs]),
		},
	  });
	useEffect(() => {
		grid.render(wrapperRef.current);
	});
	return (
		<>
			<h1>Actividades del PTC</h1>
			<div ref={wrapperRef} />
		</>
		
	 );
}

export default Alumnos;