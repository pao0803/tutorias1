import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  id:'',
  nombre:'',
  act:'',
  fecha:'',
  participantes:'',
  lugar:'',
  obs:'',
  }
function AlumnoEliminar() {
	const [alumno, setAlumno] = useState(initialState);
  	const { id, nombre, act, fecha, participantes, lugar, obs } = alumno;
    const notify = () => toast("Se ha eliminado correctamente!");

	const { m } = useParams();

  useEffect(()=>{
    if(m) {
      getAlumno(m);
    }
  },[]);

  const getAlumno = async (m) =>{
    const response = await axios.get(`http://127.0.0.1:5000/alumno/${m}`);
    if(response.status===200){
      setAlumno(response.data.result[0]);
    }
  };
	

	const handleSubmit = (event) => {
	  event.preventDefault();
	  deleteAlumno(alumno);
	}
	const deleteAlumno = async (data) => {
	  const response = await axios.post("http://localhost:5000/alumno/eliminar", data);
	  if(response.status === 200) {
		console.log(response.data);
	  }
	}
	return ( 
		<>
		<Container>
        <Row>
          <Col>
            <h1>PTC Eliminar</h1>
          </Col>
        </Row>

        <Form onSubmit={ handleSubmit }>
          <Row>
            <Col>
              <p className="fs-3">Datos generales</p>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <FloatingLabel label="id">
                <Form.Control
                  name="id"
                  type="text"
                  value={ id }
                  disabled
                />
              </FloatingLabel>
            </Col>

            <Col>
              <Form.Control
                name="nombre"
                type="text"
                placeholder="Ingresa nombre"
                value = { nombre }
                required
              />
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <Form.Control
                name="act"
                type="text"
                placeholder="Ingresa la actividad"
                value={ act }
              />
            </Col>

            <Col>
              <Form.Control
                name="fecha"
                type="date"
                placeholder="Ingresa la fecha"
                value={ fecha }
              />
            </Col>
          </Row>
          <Row className="mt-3 mb-3">
            <Col>
              <Form.Control
                name="participantes"
                type="text"
                placeholder="Ingresa a los participantes"
                value={ participantes }
                required
              />
            </Col>

            <Col>
              <Form.Control
                name="lugar"
                type="text"
                placeholder="Ingresa el lugar"
                value={ lugar }
                required
              />
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <Form.Control
                name="obs"
                type="text"
                placeholder="Ingresa las observaciones"
                value={ obs }
                required
              />
            </Col>

            <Col></Col>
          </Row>

      

          <Row>
            <Col>
              <Button type="submit" onClick={notify} className="btn btn-danger">
                Eliminar
              </Button>
              <ToastContainer />
            </Col>

            <Col>
              <Button className="btn btn-info">Cancelar</Button>
            </Col>
          </Row>

          {/* <Row className='mt-3 mb-3'>

                                               <Col></Col>

                                               <Col></Col>

                               </Row> */}
        </Form>
      </Container>
		</>
	 );
}

export default AlumnoEliminar;