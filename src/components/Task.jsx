import React from 'react'

export const Task = ({tareas,tareaSeleccionada,actualizarTarea,eliminar}) => {
    
  return (
    <div className='row col-7'>
                {tareas.map((task) => {
                    if (task.status == 0) {
                        return (
                            <div className='col-12 rounded shadow d-flex justify-content-between align-items-center p-3 bg-primary  text-light fs-3 m-2'>
                                <p className='d-flex justify-content-center align-items-center'>{task.descripcion}</p>
                                <div>
                                    <button className='btn btn-warning bt-sm me-2' onClick={()=>{tareaSeleccionada(task)}}><i class="bi bi-pencil-square"></i></button>
                                    <button className='btn btn-success bt-sm' onClick={()=>{actualizarTarea({...task,status:1})}}><i className='bi bi-shield-check'></i></button>
                                </div>
                                
                            </div>
                        )
                    } else {
                        return (
                            <div className='col-12 rounded shadow d-flex justify-content-between align-items-center p-3 bg-warning  text-light fs-3 m-2'>
                                <p className='d-flex justify-content-center align-items-center text-decoration-line-through'>{task.descripcion}</p>
                                <button className='btn btn-danger bt-sm' onClick={()=>{eliminar(task.id_tarea)}}><i className='bi bi-trash2'></i></button>
                            </div>
                        )
                    }
                })}
            </div>
  )
}
