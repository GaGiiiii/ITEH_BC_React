import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import NavbarC from '../Navbar/NavbarC'
import { ApiContext, CurrentUserContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const AddRide = () => {
    let navigate = useNavigate();

    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");
    const [date, setDate] = useState("");
    const [space, setSpace] = useState("");
    const [errors, setErrors] = useState([]);

    const { currentUser } = useContext(CurrentUserContext);
    const { api } = useContext(ApiContext);

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(`${api}/rides`, {
            start_location: startLocation,
            end_location: endLocation,
            date,
            space,
        }, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        }).then(response => {
            console.log(response.data)
            navigate('/profile'); // Redirect
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
            <NavbarC active='add-ride' />

            <Container className='mt-5'>
                <Row>
                    <Col className='border p-4 shadow-sm' xs={{ span: 8, offset: 2 }}>
                        <h1 className='mb-4'>Add Ride <hr /></h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 text-danger">
                                {errors && Object.keys(errors).map((key, index) => (
                                    <p key={index} className="m-0">&bull; {errors[key]}</p>
                                ))}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Start location</Form.Label>
                                <Form.Control value={startLocation} onChange={(event) => setStartLocation(event.target.value)} type="text" placeholder="Enter start location" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>End location</Form.Label>
                                <Form.Control value={endLocation} onChange={(event) => setEndLocation(event.target.value)} type="text" placeholder="Enter end location" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control value={date} onChange={(event) => setDate(event.target.value)} type="datetime-local" placeholder="Enter date" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Space available</Form.Label>
                                <Form.Control value={space} onChange={(event) => setSpace(event.target.value)} type="number" min="1" max="10" placeholder="Enter available space" />
                            </Form.Group>
                            <Button className='w-100 mt-3' variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>)
}

export default AddRide