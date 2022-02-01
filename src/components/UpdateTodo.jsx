import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { deleteTodo, updateTodo } from '../services/indexdb';
import TodoForm from './todoForm';

export default function UpdateTodo({ todo, showModal, setShowModal }) {
    const [id] = useState(todo.id);

    const handleClose = () => setShowModal(false);
    const handleUpdate = (updatedTodo) => {
        updateTodo(id, updatedTodo).then(() => {
            Swal.fire({
                title: 'Success',
                text: 'Todo Updated successfully',
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
    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            // showDenyButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTodo(id).then(() => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Todo deleted successfully',
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
            }
        });
    };
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Todo</Modal.Title>
            </Modal.Header>
            {showModal && (
                <Modal.Body>
                    <TodoForm value={todo} onSubmit={handleUpdate} onCancel={handleClose} />
                </Modal.Body>
            )}
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}
