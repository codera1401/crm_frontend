import Select from "react-select";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {loader, toaster, toasterContainer} from "../../components/service";

const GroupForm = () => {
    const [loading, setLoading] = useState(false);
    const [direction, setDirection] = useState(null);
    const [payment, setPayment] = useState(null);
    const [degree, setDegree] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [days, setDays] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get(API + '/teacher/all', {
            headers: token
        }).then(response => {
            const teachers = [];
            response.data.map((item) => {
                teachers.push({value: item.id, label: item.fullName})
            })
            setTeachers(teachers);
        }).catch((err) => {
            console.log(err.data);
        })
    }, []);

    function saveGroup() {
        setLoading(true);
        axios.post(API + "/group", {
            direction,
            payment,
            degree,
            teacherId: teacher,
            startTime,
            days,
            endTime
        }, {
            headers: token
        }).then((response) => {
            setLoading(false);
            toaster(200, response.data.message)
            window.location.reload();
        }).catch((error) => {
            console.log(error.response)
            toaster(403, JSON.stringify(error))
            setLoading(false);
        })
    }

    const handleDays = (val) => {
        const newVal = [];
        for (let i = 0; i < val.length; i++) {
            newVal.push(val[i].value);
        }
        setDays(newVal.join("/"));
    }

    const weekDays = [
        {value: "du", label: "Dushanba"},
        {value: "se", label: "Seshanba"},
        {value: "chor", label: "Chorshanba"},
        {value: "pay", label: "Payshanba"},
        {value: "juma", label: "Juma"},
        {value: "sha", label: "Shanba"},
        {value: "yak", label: "Yakshanba"}
    ];

    const handleTeacher = (val) => {
        setTeacher(val.value);
    }

    return (
        <>
            {toasterContainer()}
            <Container>
                <Form.Group className="mb-3" controlId="direction">
                    <Form.Label>Gurux nomi</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Group name"
                                  onChange={event => setDirection(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="payment">
                    <Form.Label>To'lov</Form.Label>
                    <Form.Control type="number"
                                  placeholder="Payment"
                                  onChange={event => setPayment(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="time">
                    <Form.Label>Boshlanish - Tugash vaqti</Form.Label>
                    <InputGroup>
                        <Form.Control type="time"
                                      placeholder="start time"
                                      onChange={event => setStartTime(event.target.value)}
                        />
                        <Form.Control type="time"
                                      placeholder="end time"
                                      onChange={event => setEndTime(event.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="weekdays">
                    <Form.Label>Dars kunlari</Form.Label>
                    <Select
                        isMulti
                        options={weekDays}
                        onChange={event => handleDays(event)}
                    />
                </Form.Group>
                {
                    teachers.length === 0 ? loader() :
                        <Form.Group className="mb-3" controlId="teacher">
                            <Form.Label>Ustoz</Form.Label>
                            <Select
                                options={teachers}
                                onChange={event => handleTeacher(event)}
                            />
                        </Form.Group>
                }
                {
                    loading ? loader() :
                        <Button variant="primary"
                                onClick={saveGroup}>
                            Qo'shish
                        </Button>
                }
            </Container>
        </>
    )
}

export default GroupForm;
