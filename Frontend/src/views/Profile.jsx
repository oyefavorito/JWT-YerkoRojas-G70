import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        // Ahora data es un objeto, no un arreglo, así que lo manejamos directamente
        if (data) {
          setDeveloper({ ...data })
        } else {
          console.error('No se encontraron datos de usuario:', data)
          window.sessionStorage.removeItem('token')
          setDeveloper(null)
          navigate('/')
        }
      })
      .catch(({ response }) => {
        console.error(response?.data || 'Error desconocido')
        window.sessionStorage.removeItem('token')
        setDeveloper(null)
        navigate('/')
      })
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  )
}

export default Profile
