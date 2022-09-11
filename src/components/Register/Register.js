import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ApiContext, CurrentUserContext } from '../../App';
import NavbarC from '../Navbar/NavbarC'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { login } from '../../Helpers';

const Register = () => {
    let navigate = useNavigate();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])

    const { setCurrentUser } = useContext(CurrentUserContext);
    const { api } = useContext(ApiContext)

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(`${api}/register`, {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirmation: passwordConfirmation
        }).then(response => {
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
            <NavbarC active='register' />

            <Container className='mt-5'>
                <Row>
                    <Col className='border p-4 shadow-sm' xs={{ span: 8, offset: 2 }}>
                        <h1 className='mb-4'>Register <hr /></h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 text-danger">
                                {errors && Object.keys(errors).map((key, index) => (
                                    <p key={index} className="m-0">&bull; {errors[key]}</p>
                                ))}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>First name</Form.Label>
                                <Form.Control value={firstName} onChange={(event) => setFirstName(event.target.value)} type="text" placeholder="Enter first name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control value={lastName} onChange={(event) => setLastName(event.target.value)} type="text" placeholder="Enter last name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password confirmation</Form.Label>
                                <Form.Control value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} type="password" placeholder="Password confirmation" />
                            </Form.Group>
                            <Button className='w-100 mt-3' variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register