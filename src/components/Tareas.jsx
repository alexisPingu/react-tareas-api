import React, { useEffect, useState } from 'react'
import { API_URL } from '../assets/constants'
import { Task } from './Task';
import { Agregartarea } from './Agregartarea';
import Swal from 'sweetalert2';

export const Tareas = () => {
    const [tareas, setTareas] = useState([])
    const token = document.cookie.split('token=')[1];
    //console.log(token)
    //render cada vez que ay un cambio 
    const actualizar=async () => {
        const tareasRow = await fetch(`${API_URL}/tareas/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        })
        const datosLeidos = await tareasRow.json();
        setTareas(datosLeidos)
    }
    useEffect(() => {
        //funcion lambad o anonima
        actualizar()
    }, [])
     const guardar=(descripcion)=>{
        const body={
            tarea:descripcion.toUpperCase()
        }
        fetch(`${API_URL}/tareas`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Authorization':token
            },
            //Hashmap-json ///convertirlos
            body:JSON.stringify(body)
        }).then(res=>res.json).then(res=>{
            Swal.fire('Agregado','Se agrego correctamnete la tarea','success')
            actualizar()
        })
     }
     const [tareaSeleccioanda,setTareaSeleccionada]=useState()

    const actualizarTarea= async (body)=>{
        const tareaNueva={
            descripcion:body.descripcion,
            status:body.status
        }
        try {
            console.log(`${API_URL}/tareas/${body.id_tarea}`)
            const respuestaRow = await fetch(`${API_URL}/tareas/${body.id_tarea}`,{
                method:'PUT',
                headers: {
                    "Content-type":"application/json",
                    "Authorization":token
                },
                //convierte a json
                body:JSON.stringify(tareaNueva)
            })
            actualizar()
            setTareaSeleccionada(null)
        } catch (error) {
            Swal.fire('Error',error.message,'error')
        }
    }
    const eliminar=async (idTarea)=>{
        console.log(`${API_URL}/tareas/${idTarea}`)
        try{
            const respuestaRow = await fetch(`${API_URL}/tareas/${idTarea}`,{
                method:'DELETE',
                headers: {
                    "Content-type":"application/json",
                    "Authorization":token
                },
                //convierte a json
                //body:JSON.stringify(tareaNueva)
            })
            actualizar()
        }catch(error){
            Swal.fire('Error',error.message,'error')

        }
    }
    return (
        <div className="container-fluid bg-dark  d-flex justify-content-center align-items-center flex-column" style={{ "min-height": "100vh" }}>
                <h1 className='col-12 text-center text-light '>Tareas</h1>
                <Agregartarea guardar={guardar} tareaSeleccionada={tareaSeleccioanda} actualizar={actualizarTarea}/>
                <Task tareas={tareas} tareaSeleccionada={setTareaSeleccionada} actualizarTarea={actualizarTarea} eliminar={eliminar}/>

        </div>
    )
}
