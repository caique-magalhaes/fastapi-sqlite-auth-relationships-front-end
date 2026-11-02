import { Link, useNavigate } from "react-router-dom";
import {useAuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Header.css'
import useApi from "../../hooks/useApi";


export default  function Header(){
    const {logout} = useApi()
    const {user} = useAuthContext()
    const isLoggedIn = user

   return(
                <div className="wrapper-header">
                    <header className="header-title"><Link to="/">Pode Falar</Link></header>
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
                                         <button className="btn-logout" onClick={logout}>LOGOUT</button>
                                    </div>
                                ):(
                                    <div className="header-group">
                                        <Link to="/register">Register</Link>
                                        <Link to="/login">LOGIN</Link>
                                    </div>
                                )
                            }
                    </nav>
                </div>
    )
}

