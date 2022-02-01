import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { addTodo } from '../services/indexdb';
import TodoForm from './todoForm';

export default function AddTodo() {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleSave = (todo) => {
        addTodo(todo).then(() => {
            Swal.fire({
                title: 'Success',
                text: 'Todo added successfully',
                icon: 'success',
            });
            handleClose();
        }).catch((err) => {
            Swal.fire({
                title: 'Error',
                text: String(err),
                icon: 'error',
            });
        });
    };
    return (
        <>
            <Button variant="dark" onClick={handleShow}>Add Item</Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Todo</Modal.Title>
                </Modal.Header>
                {showModal && (
                    <Modal.Body>
                        <TodoForm onSubmit={handleSave} onCancel={handleClose} />
                    </Modal.Body>
                )}
            </Modal>

        </>
    );
}
