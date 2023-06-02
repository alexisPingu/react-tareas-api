import React, { useState } from 'react'
import { API_URL } from '../assets/constants'
import Swal from 'sweetalert2'

const Login = () => {
    const [usuario,setUsuario]=useState('')
    const [contraseña,setContraseña]=useState('')
    const [estado,setEstado]=useState(true)
    const ingresar = async(e)=>{
        e.preventDefault()
        const body={
            usuario:usuario,
            contraseña:contraseña
        }
        if(estado){
            //es para iniciar sesion
            
            
            try {
                const datosRaw=await fetch(`${API_URL}/usuario/login`,{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json',
                        //'Authorization':'token'
                    },
                    body:JSON.stringify(body)
                })
                const token=await datosRaw.json()
                if(token.message){

                    Swal.fire('Error',token.message,'error')
                }else{
                    Swal.fire('Exito',token.token,'success')
                    //Guardar el token en cache
                    //Redirigir a la ruta de tareas 
                    //tomar las cookies
                    document.cookie =`token=${token.token};path=/;somesite=strict;`
                    window.location = '/#/tareas'
                }
            } catch (error) {
                Swal.fire('Error',error.message,'error')
            }
            
        }else{
            //para registrar usuario
            setEstado(true)
            try {
                const datosRaw=await fetch(`${API_URL}/usuario/`,{
                    method:'POST',
                    headers:{
                        //AVISARLE QUE ESTAMOS PASANDO UN JSON
                        'Content-type':'application/json',
                        //'Authorization':'token'
                    },
                    body:JSON.stringify(body)
                })
                const datos=await datosRaw.json()
                if(datos.message){
                    Swal.fire('Error',datos.message,'error')
                }else{
                    Swal.fire('Exito usuario agregado',datos.token,'success')
                    
                }
            } catch (error) {
                Swal.fire('Error',error.message,'error')
            }
        }
    }

  return (
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-dark bg-gradient' style={{ "min-height": "100vh" }}>

    <form onSubmit={ingresar} className=' col-6 d-flex flex-column justify-content-center align-items-center text-center shadow p-5 bg-light rounded '>
        <h1>Iniciar sesion</h1>
        <input type='text' className="form-control mt-2" placeholder='Usuario'required onChange={(e)=>setUsuario(e.target.value)}/>
        <input type='text' className="form-control mt-2" placeholder='Contraseña' required onChange={(e)=>setContraseña(e.target.value)}/>
        <hr />
        <button type='submit' className='btn btn-primary col-12'>Iniciar sesion</button>
        <small>o</small>
        <button onClick={()=>setEstado(false)} type='submit' className='btn btn-secondary col-12'>Crear cuenta</button>
    </form>
    </div>
  )
}

export default Login