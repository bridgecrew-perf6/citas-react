import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setpacientes, paciente, setpaciente }) => {
    const [nombre, setnombre] = useState('')
    const [prop, setpropietario] = useState('')
    const [email, setemail] = useState('')
    const [fecha, setfecha] = useState('')
    const [sintomas, setsintomas] = useState('')

    /// Error
    const [error, seterror] = useState(false)

    useEffect( () => {

        if (Object.keys(paciente).length >0){
            console.log(paciente)
            setnombre(paciente.nombre)
            setpropietario(paciente.prop)
            setemail(paciente.email)
            setfecha(paciente.fecha)
            setsintomas(paciente.sintomas)
        }

    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)

        return fecha + random
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        /// Validación del Formulario
        if ([nombre, prop, email, fecha, sintomas].includes('')) {

            console.log('Hay al menos un campo vacio')
            seterror(true)
            return
        }
        
        seterror(false)

        // Objeto Paciente
        const objetopaciente = {
            nombre,
            prop,
            email,
            fecha,
            sintomas            
        }

        if (paciente.id) {
            // Editando Paciente
            objetopaciente.id = paciente.id
            const pacientesactualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetopaciente : pacienteState)
            setpacientes(pacientesactualizados)
            setpaciente({})
        }
        else {
            // Nuevo Paciente
            objetopaciente.id = generarId()
            setpacientes([...pacientes, objetopaciente])    
        }
        

        // Reiniciar Formulario
        setnombre('')
        setpropietario('')
        setemail('')
        setfecha('')
        setsintomas('')
    }
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10"> 
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg px-10 py-5 mb-10">
                {error && <Error mensaje = 'Todos los campos son obligatorios'/>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input id= "mascota" type="text"
                    placeholder="Nombre de la Mascota"
                    className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={(e) => setnombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input id= "propietario" type="text"
                    placeholder="Nombre del Propietario"
                    className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
                    value={prop}
                    onChange={(e) => setpropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input id= "email" type="email"
                    placeholder="Email Contacto Propietario"
                    className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
                    <input id= "alta" type="date"                    
                    className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={(e) => setfecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea
                        id="sintomas" 
                        className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los Síntomas"
                        value={sintomas}
                        onChange={(e) => setsintomas(e.target.value)}
                    />
                </div>
                <input 
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={ paciente.id ? "Editar Paciente" : "Agregar Paciente"}
                />
            </form>
        </div>
    )
}

export default Formulario