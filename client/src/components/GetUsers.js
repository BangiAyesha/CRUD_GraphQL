import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { LOAD_USER, LOAD_USERS } from "../GraphQL/Queries";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import Validation from "../validation/user.validation";
import { useNavigate } from "react-router-dom";
import { DELETE_USER, UPDATE_USER } from "../GraphQL/Mutations";

export default function GetUsers() {
    const navigate = useNavigate();
    const details = JSON.parse(localStorage.getItem("user"));
    const userID = details?._id;
    const { data: dataa } = useQuery(LOAD_USERS);
    const { error, loading, data } = useQuery(LOAD_USER, {
        variables: { id: userID },
    });
    const [user, setUser] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [isRead, setIsRead] = useState(true);

    const [updateUser1, { error: error1 }] = useMutation(UPDATE_USER);

    const [deleteUser1, { error: error2 }] = useMutation(DELETE_USER);

    const isEdit = (event) => {
        event.preventDefault();
        setIsRead(false);
    };

    const updateUser = () => {
        if (!values.fname) {
            values.fname = user.firstName;
        }
        if (!values.lname) {
            values.lname = user.lastName;
        }
        updateUser1({
            variables: {
                firstName: values.fname,
                lastName: values.lname,
                id: userID,
            },
            onCompleted: ({}) => {
                alert("Details Updated");
            },
        });
        setIsRead(true);
    };
    const { handler, values, errors, handleSubmit } = Validation(updateUser);

    const deleteUser = (e) => {
        deleteUser1({
            variables: {
                id: userID,
            },
        });
        localStorage.clear();
        navigate("/");
    };

    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    };

    const allUsers = (e) => {
        e.preventDefault();
        setShow(true);
    };

    useEffect(() => {
        let token = localStorage.getItem("_token");
        if (token === null) {
            navigate("/");
        }
        if (data) {
            setUser(data.getUserByID[0]);
        }
        if (dataa) {
            setAllUser(dataa.getAllUsers);
        }
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>All Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser
                                ? allUser.map((val, index) => {
                                      return (
                                          <tr key={index}>
                                              <td>{index + 1}</td>
                                              <td>{val.firstName}</td>
                                              <td>{val.lastName}</td>
                                              <td>{val.email}</td>
                                          </tr>
                                      );
                                  })
                                : ""}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="mt-2">
                <div className="text-center">
                    <Button variant="dark" onClick={(e) => allUsers(e)}>
                        See All Users
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        variant="dark"
                        onClick={(e) => {
                            logout(e);
                        }}
                    >
                        Logout
                    </Button>
                </div>
                <hr />
                <Container className="text-center mt-2">
                    <h1>Profile</h1>
                    <Form className="mt-5 w-50 m-auto">
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                name="fname"
                                defaultValue={user.firstName}
                                readOnly={isRead}
                                onChange={handler}
                            />
                            <Form.Text>
                                {errors.fname && (
                                    <p
                                        style={{
                                            color: "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {errors.fname}
                                    </p>
                                )}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                name="lname"
                                defaultValue={user.lastName}
                                readOnly={isRead}
                                onChange={handler}
                            />
                            <Form.Text>
                                {errors.lname && (
                                    <p
                                        style={{
                                            color: "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {errors.lname}
                                    </p>
                                )}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                defaultValue={user.email}
                                disabled={true}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button
                                variant="dark"
                                type="submit"
                                onClick={(e) => isEdit(e)}
                            >
                                EDIT DETAILS
                            </Button>
                            <Button
                                variant="success"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                            >
                                SUBMIT
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                onClick={(e) => deleteUser(e)}
                            >
                                DELETE USER
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    );
}
