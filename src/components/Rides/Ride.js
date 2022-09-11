import React, { useContext, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import axios from "axios"
import { ApiContext, CurrentUserContext } from '../../App'
import { Link } from 'react-router-dom'

const Ride = ({ ride, rides, setRides }) => {
    // Modal
    const [show, setShow] = useState(false);
    const [space, setSpace] = useState(1);
    const [errors, setErrors] = useState([])

    const { api } = useContext(ApiContext)
    const { currentUser } = useContext(CurrentUserContext)

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setErrors([]);
        setShow(true);
    }

    function makeReservation() {
        axios.post(`${api}/reservations`, { ride_id: ride.id, space }, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        }).then(response => {
            let ridesG = [...rides];
            let rideToEdit = ridesG.find((r => r.id === ride.id));
            rideToEdit.space -= space;
            setRides(ridesG);
            setShow(false);
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
            <Col className='mb-4' lg="4">
                <Card>
                    <Card.Body>
                        <Card.Title>{ride.user.first_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{ride.user.last_name}</Card.Subtitle>
                        <Card.Text as='div'>
                            <p className='m-0'><span className='fw-bold'>Start location:</span> {ride.start_location}</p>
                            <p className='m-0'><span className='fw-bold'>End location:</span> {ride.end_location}</p>
                            <p className='m-0'><span className='fw-bold'>Date: </span> {ride.date}</p>
                            <p className='m-0'><span className='fw-bold'>Space available:</span> {ride.space}</p>
                        </Card.Text>
                        {currentUser ?
                            ride.user_id === currentUser.id ?
                                <Card.Link className='reservation-link text-decoration-none text-warning fw-bold'>Can't reserve own ride</Card.Link>
                                : ride.space > 0 ?
                                    <Card.Link onClick={handleShow} className='reservation-link text-decoration-none'>Make a reservation</Card.Link>
                                    :
                                    <Card.Link className='text-danger reservation-link text-decoration-none'>No more space available.</Card.Link>
                            :
                            <Card.Link as={Link} to='/login' className='reservation-link text-decoration-none text-warning fw-bold'>Please login to make a reservation</Card.Link>
                        }
                    </Card.Body>
                </Card>
            </Col>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reservation for {ride.user.first_name}'s ride</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3 text-danger">
                        {errors && Object.keys(errors).map((key, index) => (
                            <p key={index} className="m-0">&bull; {errors[key]}</p>
                        ))}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Spaces</Form.Label>
                        <Form.Control value={space} onChange={(event) => setSpace(event.target.value)} min="1" max={ride.space} type="number" placeholder="Enter spaces" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={makeReservation}>
                        Make a reservation
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Ride