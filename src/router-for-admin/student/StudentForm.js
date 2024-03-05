import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";
import Select from 'react-select'
import {API, token} from "../../components/API";
import {Button, Container, Form} from "react-bootstrap";
import {loader, toaster, toasterContainer} from "../../components/service";

const StudentCreate = () => {
    const [loading, setLoading] = useState(false);

    const [fullName, setFullName] = useState(null);
    // const [phone, setPhone] = useState(null);
    // const [username, setUsername] = useState(null);
    // const [password, setPassword] = useState("");
    const [groups, setGroups] = useState([]);
    const [studentGroups, setStudentGroup] = useState();

    useEffect(() => {
        axios.get(API + '/group/direction-all', {
            headers: token
        }).then(response => {
            const inf = [];
            response.data.map((item) => {
                inf.push({value: item.id, label: item.name})
            })
            setGroups(inf);
        }).catch((err) => {
            console.log(err.data);
        })
    }, []);

    function saveStudent() {
        setLoading(true);
        axios.post(API + "/student", {
            fullName,
            groups: studentGroups,
        }, {
            headers: token
        }).then((response) => {
            setFullName(null);
            setLoading(false);
            toaster(200, response.data.message)
        }).catch((error) => {
            console.log(error.data);
            setLoading(false);
            toaster(0, JSON.stringify(error.response.data))
        })

    }

    const handleChange = (val) => {
        const newVal = [];
        for (let i = 0; i < val.length; i++) {
            newVal.push(val[i].value);
        }
        setStudentGroup(newVal);
    }

    return (
        <>
            {toasterContainer()}
            <Container>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ism familiya</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Full name"
                                      onChange={event => setFullName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Text>Login
                            : {fullName ? fullName.replaceAll("'", "").replace(" ", "").toLowerCase() : ""}</Form.Text>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Text>Parol
                            : {fullName ? fullName.replaceAll("'", "").replace(" ", "").toLowerCase() : ""}</Form.Text>
                    </Form.Group>
                    {
                        groups.length === 0 ? loader() :
                            <Form.Group className="mb-3">
                                <Form.Label>Guruxlar</Form.Label>
                                <Select
                                    isMulti
                                    options={groups}
                                    onChange={event => handleChange(event)}
                                />
                            </Form.Group>
                    }
                    {
                        loading ? loader() :
                        <Button
                            variant="primary"
                            onClick={saveStudent}>
                            Saqlash
                        </Button>
                    }
                </div>
            </Container>
        </>
    );
}

export default StudentCreate;
