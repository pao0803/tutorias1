const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// WJaiPa5UyUvr)QI[
const db = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'tutorias1',
});

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res) =>{
	res.send('Hola mundo');
});
app.post('/alumno/agregar', (req, res)=>{
	const { id, nombre, act, fecha, participantes, lugar, obs } = req.body;
	const sql = "INSERT INTO alumnos VALUES(?,?,?,?,?,?,?)";
	db.query(sql, [id, nombre, act, fecha, participantes, lugar, obs], (err,result)=>{
		if(err) {
			res.send({
				status:100,
				errNo: err.errno,
				mensaje: err.sqlMessage,
				codigo: err.code,
			});
		}else {
			res.send({
				status:200,
			})
		}
	});
});
app.get('/alumnos', (req, res)=>{
	const sql = "SELECT * FROM alumnos";
	db.query(sql, (err,result)=>{
		if(err) {
			res.send({
				status:100,
				errNo: err,
			});
		}else {
			res.send({
				status:200,
				result,
			})
		}
	});
});

app.post('/alumno/modificar', (req, res)=>{
	
	const {nombre, act, fecha, participantes, lugar, obs, id} = req.body;

	const sql = "UPDATE alumnos SET nombre=?, act=?, fecha=?, participantes=?, lugar=?, obs=? WHERE id=?";
	db.query(sql, [nombre, act, fecha, participantes, lugar, obs, id], (err,result)=>{
		if(err) {
			res.send({
				status:100,
				errNo: err.errno,
				mensaje: err.sqlMessage,
				codigo: err.code,
			});
		}else {
			res.send({
				status:200,
				result,
			})
		}
	});

});

app.get('/alumno/:id',(req, res)=>{
	const id = req.params.id;

	const sqlGet = "SELECT * FROM alumnos WHERE id=?";
	db.query(sqlGet, [id], (err, result, fields)=>{
		if(err){
			res.send({
				status:100,
				errNo: err.errno,
				mensaje: err.sqlMessage,
				codigo: err.code,
			});
		}else{
			res.send({
				status: 200,
				result,
			});
		}
	});

});

app.post('/alumno/eliminar', (req, res)=>{
	
	const { id } = req.body;

	const sql = "DELETE FROM alumnos  WHERE id=?";
	db.query(sql, [id], (err,result)=>{
		if(err) {
			res.send({
				status:100,
				errNo: err.errno,
				mensaje: err.sqlMessage,
				codigo: err.code,
			});
		}else {
			res.send({
				status:200,
				result,
			})
		}
	});

});




app.listen(port, ()=>{
	console.log(`escuchando en el puerto ${port}`);
})
