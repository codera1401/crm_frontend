import React, {useState} from "react";
import Select from "react-select";
import axios from "axios";
import {API, token} from "../../components/API";
import {Button, Form} from "react-bootstrap";
import {loader} from "../../components/service";

const PaymentForm = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [student, setStudent] = useState(null);
    const [group, setGroup] = useState(null);
    const [payment, setPayment] = useState(null);
    const [date, setDate] = useState(null);

    const handleChangeForStudent = (val) => {
        setStudent(val.value);
        getGroups(val.value);
    }

    const handleChangeForGroup = (val) => {
        setGroup(val.value);
    }

    function getStudents() {
        axios.get(API + "/student/get-by-name?studentName=" + studentName, {
            headers: token
        }).then((response) => {
            setStudents(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    function getGroups(id) {
        axios.get(API + "/group/student/" + id, {
            headers: token
        }).then((response) => {
            const list = [];
            response.data.map((it) => {
                list.push({value: it.id, label: it.name})
            })
            setGroups(list);
        }).catch((error) => {
            console.log(error);
        })
    }


    function savePayment() {

    }

    return (
        <>
            <div className={"container"}>
                <Form.Group>
                    <Form.Label>O'quvchi ismi</Form.Label>
                    <Form.Control
                        type={"text"}
                        required
                        placeholder={"O'quvchi ismini kiriting"}
                        onChange={event => setStudentName(event.target.value)}
                    />
                    <Button onClick={getStudents}>Izlash</Button>
                </Form.Group>
                <Form.Group>
                    <Form.Label>O'quvchi</Form.Label>
                    <Select
                        options={students}
                        onChange={handleChangeForStudent}
                        id={"student"}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Gurux</Form.Label>
                    <Select
                        options={groups}
                        onChange={handleChangeForGroup}
                        id={"group"}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>To'lov</Form.Label>
                    <Form.Control type={"number"}
                           required
                           onChange={event => setPayment(event.target.value)}
                           id={"payment"}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>To'lov sanasi</Form.Label>
                    <Form.Control type={"date"}
                           required
                           onChange={event => setDate(event.target.value)}
                           id={"date"}
                    />
                </Form.Group>
                <Form.Group>
                    {
                        loading ? loader() :
                            <Button onClick={savePayment}>Qo'shish</Button>
                    }
                </Form.Group>
            </div>
        </>
    );
}

export default PaymentForm;
