import React, { useEffect, useState } from 'react'

export const Agregartarea = ({guardar,tareaSeleccionada,actualizar}) => {
    //console.log(tareaSeleccionada)
    const [descripcion,setDescripcion]=useState('')

    const guardarDatos=()=>{
      if(tareaSeleccionada) actualizar({...tareaSeleccionada,descripcion:descripcion})
      else guardar(descripcion)
      setDescripcion(null)
    }
    useEffect(()=>{
      if(tareaSeleccionada){
        setDescripcion(tareaSeleccionada.descripcion)
      }
    },[tareaSeleccionada])
    
  return (
    <div className='col-7 ms-3 d-flex mb-2'>
        <div className="input-group input-group-lg">
            <label className='input-group-text'>Tarea</label>
            <input type="text" className='form-control' onChange={(e)=>{setDescripcion(e.target.value)}} value={descripcion}  />
            <button className='btn btn-outline-success fs-3' onClick={()=>{guardarDatos(descripcion)}}><i className='bi bi-plus-circle'></i></button>
        </div>
    </div>
  )
}
