import React, { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { CREATE_USER } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import Validation from "../validation/user.validation";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [createUser, { error }] = useMutation(CREATE_USER);

    const addUser = () => {
        createUser({
            variables: {
                firstName: values.fname,
                lastName: values.lname,
                email: values.email,
                password: values.password,
            },
            onCompleted: ({}) => {
                alert("User Registered!");
                navigate("/");
            },
        });
    };

    useEffect(() => {
        let token = localStorage.getItem("_token");
        if (token) {
            navigate("/profile");
        }
    }, []);

    const { handler, values, errors, handleSubmit } = Validation(addUser);

    return (
        <Container className="text-center mt-4" style={{ width: "50%" }}>
            <h1>REGISTER</h1>
            <Form onSubmit={(e) => handleSubmit(e)} className="mt-4">
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        name="fname"
                        style={{ border: "1px solid black" }}
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
                        style={{ border: "1px solid black" }}
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
                        style={{ border: "1px solid black" }}
                        onChange={handler}
                    />
                    <Form.Text>
                        {errors.email && (
                            <p
                                style={{
                                    color: "red",
                                    fontWeight: "bold",
                                }}
                            >
                                {errors.email}
                            </p>
                        )}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        style={{ border: "1px solid black" }}
                        onChange={handler}
                    />
                    <Form.Text>
                        {errors.password && (
                            <p
                                style={{
                                    color: "red",
                                    fontWeight: "bold",
                                }}
                            >
                                {errors.password}
                            </p>
                        )}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Re-enter Password"
                        name="cpassword"
                        style={{ border: "1px solid black" }}
                        onChange={handler}
                    />
                    <Form.Text>
                        {errors.cpassword && (
                            <p
                                style={{
                                    color: "red",
                                    fontWeight: "bold",
                                }}
                            >
                                {errors.cpassword}
                            </p>
                        )}
                    </Form.Text>
                </Form.Group>
                <div className="text-center">
                    <Button variant="dark" type="submit">
                        Register
                    </Button>
                    <br />
                    <Button variant="link" onClick={() => navigate("/")}>
                        Already have an account? Click Here
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
