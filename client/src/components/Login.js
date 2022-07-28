import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../config/User.service";
import { toast } from "react-toastify";
toast.configure();

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const success = (data) =>
        toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    const failure = (data) =>
        toast.error(data, { position: toast.POSITION.TOP_RIGHT });

    const handler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    useEffect(() => {
        let token = localStorage.getItem("_token");
        if (token) {
            navigate("/profile");
        }
    }, []);

    const loginUsers = (event) => {
        event.preventDefault();
        loginUser(data).then((res) => {
            if (res.data.flag === 1) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("_token", res.data.token);
                success(res.data.message);
                navigate("/profile");
                window.location.reload(true);
            } else if (res.data.flag === 0) {
                failure(res.data.message);
            } else if (res.data.err === 0) {
                failure(res.data.message);
            }
        });
    };

    return (
        <Container className="text-center mt-4" style={{ width: "50%" }}>
            <h1>LOGIN</h1>
            <Form onSubmit={(e) => loginUsers(e)} className="mt-4">
                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        style={{ border: "1px solid black" }}
                        onChange={handler}
                    />
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
                </Form.Group>
                <div className="text-center">
                    <Button variant="dark" type="submit">
                        Login
                    </Button>
                    <br />
                    <Button
                        variant="link"
                        onClick={() => navigate("/register")}
                    >
                        Not Registered? Click Here
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
