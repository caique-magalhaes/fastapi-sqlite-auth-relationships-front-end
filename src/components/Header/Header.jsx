import { Link, useNavigate } from "react-router-dom";
import {useAuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Header.css'


export default  function Header(){
    const navigate = useNavigate()
    const {user,setUser} = useAuthContext()

    const logout = async () =>{

    try {
        const response = await  fetch("http://localhost:8000/user/logout",{
                method:"POST",
                credentials:'include'
            })
            if(response.ok){
                const data = response.json()
                console.log(data)
                setUser(null)
                navigate('/login')
            }
    } catch (error) {
        console.error(`error: ${error}`)
    }
    }
    const isLoggedIn = user

   return(
                <div className="wrapper-header">
                    <header><Link to="/">Social Advice</Link></header>
                    <nav className="header-nav">
                            <Link to="/">Home</Link>
                            {
                                isLoggedIn ?
                                (
                                    <div className="header-group">
                                        <Link to="/profile">Profile</Link>
                                        <p> Hello, {user.name}</p>

                                        <Link to="#">
                                            <FontAwesomeIcon icon={faUser} size="75px" />
                                        </Link>
                                         <button onClick={logout}>logout</button>
                                    </div>
                                ):(
                                    <div className="header-group">
                                        <Link to="/register">Register</Link>
                                        <Link to="/login">login</Link>
                                    </div>
                                )
                            }
                    </nav>
                </div>
    )
}

