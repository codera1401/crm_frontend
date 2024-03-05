import {Button, Container, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useState} from "react";
import {loader, toaster, toasterContainer} from "../components/service";
import axios from "axios";
import {API, token} from "../components/API";

function SignUpEdu() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [logo, setLogo] = useState(null);
    const [adminUsername, setAdminUsername] = useState(null);
    const [adminPassword, setAdminPassword] = useState(null);

    function requestToJoin() {
        axios.post(API+"/edu/sign-up-edu",{
            name,
            logo,
            adminUsername,
            adminPassword
        },{
            headers:token
        }).then((response) => {
            toaster(200,response.data);
        }).catch((error) => {
            toaster(403,error.response.data);
        })
    }

    return (
        <Container>
            {toasterContainer()}
            <FormGroup>
                <FormLabel>O'quv markaz nomi</FormLabel>
                <FormControl
                    type={"text"}
                    placeholder={"name"}
                    onChange={event => setName(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>O'quv markazi telefon raqami</FormLabel>
                <FormControl
                    type={"text"}
                    placeholder={"phone"}
                    onChange={event => setPhone(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>Logo</FormLabel>
                <FormControl
                    type={"file"}
                    onChange={event => setLogo(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>Login</FormLabel>
                <FormControl
                    type={"text"}
                    placeholder={"username"}
                    onChange={event => setAdminUsername(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>Parol</FormLabel>
                <FormControl
                    type={"text"}
                    placeholder={"password"}
                    onChange={event => setAdminPassword(event.target.value)}
                />
            </FormGroup>
            <br></br>
            {
                loading ? loader() :
                    <Button onClick={requestToJoin}>So'ro'v yuborish</Button>
            }
        </Container>
    );
}

export default SignUpEdu;
