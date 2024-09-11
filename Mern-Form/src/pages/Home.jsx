import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState("")
    const [item, setItem] = useState([]);
    const navigate = useNavigate()

   

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products"
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers)
            const res = await response.json()
            setItem(res)
        }
        catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchProducts()
    },[])


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess("User Logout")
        setTimeout(() => {
            navigate('/login')
        }, 1500)
    }

    return (
        <div>
            <h1>
            Welcome    {loggedInUser}
            </h1>

            <button onClick={handleLogout}>Logout</button>
            {
                item && item.map((ele) => {
                    return (
                        <div  >
                            <h1>{ele.name}</h1>
                            <p>{ele.price}</p>
                        </div>
                    )
                })
            }
            <ToastContainer />
        </div>
    )
}

export default Home
