import React, { useContext, useState } from 'react'
import NavbarC from '../Navbar/NavbarC'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"
import { ApiContext, CurrentUserContext } from '../../App'
import { login } from '../../Helpers';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    const { setCurrentUser } = useContext(CurrentUserContext);
    const { api } = useContext(ApiContext)

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(`${api}/login`, { email, password }).then(response => {
            console.log(response.data)
            let user = response.data.user; // Get user
            user.token = response.data.token; // Get token and set it to user
            login(user); // Add User to Local Storage
            setCurrentUser(response.data.user); // Set Global State
            navigate('/'); // Redirect
        }).catch((error) => {
            let errorsG = [];
            console.log(error);
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorsG = error.response.data.errors
                        console.log(errorsG)
                        setErrors(errorsG);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    return (
        <>
            <NavbarC active='login' />

            <Container className='mt-5'>
                <Row>
                    <Col className='border p-4 shadow-sm' xs={{ span: 8, offset: 2 }}>
                        <h1 className='mb-4'>Login <hr /></h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 text-danger">
                                {errors && Object.keys(errors).map((key, index) => (
                                    <p key={index} className="m-0">&bull; {errors[key]}</p>
                                ))}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button className='w-100 mt-3' variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login