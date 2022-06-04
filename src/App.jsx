import { useState, useEffect } from 'react';
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const [pacientes, setpacientes] = useState([])
  const [paciente, setpaciente] = useState({})

  useEffect( () => {
     const ObtenerItem = () => {

        const pacientesStorage = JSON.parse(localStorage.getItem('pacientes')) ?? []

        setpacientes(pacientesStorage)
     }

     
     ObtenerItem()

  }, [])

  useEffect( () => {
      const GuardarItem = () => {
        localStorage.setItem('pacientes', JSON.stringify(pacientes))
      }
      
      GuardarItem()

  }, [pacientes])

  const eliminarPaciente = id => {

    const pacientesactualizados = pacientes.filter(paciente => paciente.id !== id)
    
    setpacientes(pacientesactualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      
      <div className="mt-12 md:flex">
        <Formulario 
            pacientes = { pacientes }
            setpacientes = { setpacientes }   
            paciente = { paciente }         
            setpaciente = {setpaciente}
        />
        <ListadoPacientes 
            pacientes = { pacientes }
            setpaciente = { setpaciente }
            eliminarPaciente = { eliminarPaciente }
        />
      </div>
      
    </div>
  )
}

export default App
