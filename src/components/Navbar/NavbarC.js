import React, { useContext } from 'react'
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Navbar from "react-bootstrap/Navbar"
import { Link } from 'react-router-dom'
import "./navbar.css"
import { ApiContext, CurrentUserContext } from '../../App'
import { logout } from '../../Helpers'
import { useNavigate } from 'react-router-dom'

const NavbarC = ({ active }) => {
    let navigate = useNavigate();

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const { api } = useContext(ApiContext);

    function handleLogout() {
        logout(currentUser, api); // Delete Tokens And Remove From Storage
        setCurrentUser(null); // Remove From Global State
        navigate('/'); // Redirect
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to='/'>Transfy</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/' className={active === 'home' ? 'active' : ''}>Home</Nav.Link>
                        {currentUser && <Nav.Link as={Link} to='/add-ride' className={active === 'add-ride' ? 'active' : ''}>Add Ride</Nav.Link>}
                    </Nav>
                    <Nav>
                        {currentUser === null ? <><Nav.Link as={Link} className={active === 'register' ? 'active' : ''} to='/register'>Register</Nav.Link>
                            <Nav.Link as={Link} className={active === 'login' ? 'active' : ''} to='/login'>Login</Nav.Link></>
                            : <NavDropdown className={active === 'profile' ? 'active' : ''} title={currentUser.first_name} id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleLogout()}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarC