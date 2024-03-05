import React, {useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";
import {loader, toaster, toasterContainer} from "../../components/service";
import {Button, Container, Form} from "react-bootstrap";

const TeacherForm = () => {
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState("");

    function saveTeacher() {
        setLoading(true);
        axios.post(API + "/teacher", {
                fullName,
                phone,
                username,
                password
            }, {
                headers: token
            }
        ).then((response) => {
            toaster(200, response.data.message)
            setFullName(null);
            setPhone(null);
            setUsername(null);
            setPassword("");
            setLoading(false)
            document.getElementById("fullname").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }).catch((error) => {
            toaster(0, JSON.stringify(error.response.data))
            setLoading(false)
        })
    }

    return (
        <>
            {toasterContainer()}
            <Container>
                <Form.Group className="mb-3" controlId="fullname">
                    <Form.Label>Ism familiya</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Full name"
                                  onChange={event => setFullName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control type="number"
                                  placeholder="phone"
                                  onChange={event => setPhone(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text"
                                  placeholder="login"
                                  onChange={event => setUsername(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Parol</Form.Label>
                    <Form.Control type="text"
                                  placeholder="parol"
                                  onChange={event => setPassword(event.target.value)}
                    />
                </Form.Group>
                {
                    loading ? loader() :
                        <Button
                            variant="primary"
                            onClick={saveTeacher}>
                            Saqlash
                        </Button>
                }
            </Container>
        </>
    );
}

export default TeacherForm;
