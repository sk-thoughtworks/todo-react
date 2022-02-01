import React from 'react';
import {
    Container, Nav, Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddTodo from './AddTodo';

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">TODO App</Navbar.Brand>
                <Nav className="me-auto" />
                <Nav>
                    <AddTodo />
                </Nav>
            </Container>
        </Navbar>
    );
}
// https://dexie.org/docs/Tutorial/React
