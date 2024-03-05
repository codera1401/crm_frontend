import {toast, Toaster} from "react-hot-toast";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";
import {loader, toaster, toasterContainer} from "../../components/service";
import {Button, Container, Form} from "react-bootstrap";

const AddGroupStudent = () => {
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [id, setId] = useState(null);
    const [studentId, setStudentId] = useState(null);
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");


    useEffect(() => {
        axios.get(API + '/group/direction-all', {
            headers: token
        }).then(response => {
            let list = [];
            response.data.map(item => list.push({value: item.id, label: item.name}));
            setGroups(list);
            setLoading1(false)
        }).catch((err) => {
            // console.log(err);
            setLoading1(false)
        })
    }, []);

    function search() {
        setLoading2(true);
        axios.get(API + '/student/get-by-name?studentName=' + name, {
            headers: token
        }).then(response => {
            setStudents(response.data);
            if (students === null) {
                toaster(403, "O'quvchi topilmadi");
            }
            setLoading2(false);
        }).catch((err) => {
            console.log(err.data);
            toaster(403, "O'quvchi topilmadi")
            setLoading2(false);
        })
    }


    function handleGroup(event) {
        setId(event.value);
    }

    function handleStudent(event) {
        setStudentId(event.value);
    }

    function save() {
        axios.post(API + '/student/add-group?studentId=' + studentId + "&groupId=" + id, {}, {
            headers: token
        })
            .then((response) => {
                setStudents(response.data);
                toaster("Malumot saqlandi", 200)
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                toaster("Malumot saqlanmadi", 403)
            })

    }


    return (
        <>
            {toasterContainer()}
            {
                loading1 ? loader() :
                    <Container>
                        {
                            groups.length === 0 ? <></> :
                                <Form.Group>
                                    <Form.Label>Ustoz</Form.Label>
                                    <Select
                                        options={groups}
                                        onChange={handleGroup}
                                    />
                                </Form.Group>
                        }
                        <Form.Group>
                            <Form.Label>O'quvchilar</Form.Label>
                            <Form.Control
                                required
                                placeholder={"O'quvchi ismini kiriting"}
                                onChange={event => setName(event.target.value)}
                            />
                            {
                                loading2 ? loader() :
                                    <Button onClick={search}>Izlash</Button>
                            }
                        </Form.Group>
                        {
                            students.length === 0 ? <></> :
                                <Form.Group>
                                    <Form.Label>O'quvchilar</Form.Label>
                                    <Select
                                        options={students}
                                        onChange={handleStudent}
                                    />
                                </Form.Group>
                        }
                        <Button onClick={save}>Qo'shish</Button>
                    </Container>
            }
        </>
    )
}

export default AddGroupStudent;
