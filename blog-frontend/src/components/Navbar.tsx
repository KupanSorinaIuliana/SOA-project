
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
//import { useAuth0 } from '../contexts/auth0-context';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../contexts/logout";
import LoginButton from "../contexts/login";

function Navbar() {
    const { user, isLoading, isAuthenticated } = useAuth0();
    return(
    <header>
        <div className="container-fluid position-relative no-side-padding">
                    <span className="logo">
                    {user && user.picture && <img src={user.picture} alt="My Avatar" />}
                    {!user && <img src={'https://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1513770253/WEB_FREAK_50PX-01_yaqxg7.png'} alt="My Avatar" />}
                    </span>
        </div>
        <div className="menu-nav-icon" data-nav-menu="#main-menu">
                         <i className="ion-navicon" />
        </div>

        <ul className="main-menu visible-on-click" id="main-menu">
            <li><Link className={"nav-link"} to={"/"}> Idea tracker </Link></li>
            {isAuthenticated && (
                 <li><Link className={"nav-link"} to={"/profile"}> Profile </Link></li>
                                        )}
            <li><Link className={"nav-link"} to={"/"}>
                    {!isLoading && !user && (
                                    <LoginButton/>
                     )}

                     {!isLoading && user && (
                                    <>
                                        <div>
                                            <label className="mr-2">{user.name}</label>
                                            <LogoutButton/>
                                        </div>
                                    </>
                                )}
                            </Link>
                            </li>
                            <li><Link className={"nav-link"} to={"/ideas"}> Home </Link></li>
                            {isAuthenticated && (
                            <li><Link className={"nav-link"} to={"/create"}> Create </Link></li>
                            )}
                            {isAuthenticated && (
                                  <li><Link className={"nav-link"} to={"/weather"}> Weather </Link></li>
                                                        )}
                        </ul>
    </header>
    );
}
export default withRouter(Navbar);