import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Nav, Navbar, NavLink} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const  logOut =() => {
        user.setUser({})
        user.setIsAuth(false)

    }

    return (
        <Navbar bg="dark" variant="dark">
            <NavLink style={{color: "white"}} onClick={()=>navigate(SHOP_ROUTE)}>Buy Device</NavLink>
            {user._isAuth ?
                <Nav className="" style={{justifyContent:"space-evenly",marginLeft:"auto",}} >
                    <Button
                        variant="outline-light" className="m-lg-1"
                        onClick={()=>navigate(ADMIN_ROUTE)}
                    >Admin Panel</Button>
                    <Button
                        variant="outline-light " className="m-lg-1"
                        onClick={logOut}
                    >LogOut</Button>
                </Nav>
                :
                <Nav className="" style={{justifyContent:"space-evenly",marginLeft:"auto",}}>
                    <Button className="m-lg-1" variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)} >Authorization</Button>

                </Nav>
            }
        </Navbar>
)
});

export default NavBar;