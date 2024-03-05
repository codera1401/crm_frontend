import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";
import {Button, Card, Container, FormLabel, InputGroup, ListGroup} from "react-bootstrap";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Select from "react-select";
import {loader} from "../../components/service";

const Voices = () => {
    const [speakings, setSpeakings] = useState([]);
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState(null);
    const [_like,setLike] = useState(false);

    useEffect(() => {
        axios.get(API + "/topic/get-all", {
            headers: token
        }).then((response) => {
            const list = [];
            response.data.map((item) => {
                list.push({value:item.id,label:item.topic})
            })
            setTopics(list);
        }).catch((error) => {
            console.log(error.response.data);
        })

        axios.get(API + "/speaking/get-popular", {
            headers: token
        }).then((response) => {
            setSpeakings(response.data);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }, [_like]);
    
    function like(speakingId) {
        setLike(!_like);
        axios.get(API + "/speaking/like/" + speakingId, {
            headers: token
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    return (
        <div>
            <Container>
                <Select
                    options={topics}
                    onChange={event => setTopic(event.label)}
                />
                {
                    speakings.length === 0 ? loader() :
                        speakings
                            .filter((speaking) => topic !== null ? speaking.topic === topic : true)
                        .map((speaking) => {
                        return (
                            <>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{speaking.speaker.fullName}</Card.Title>
                                        <Card.Text>
                                            <ListGroup>
                                                <ListGroup.Item>
                                                    {speaking.topic}
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    likes : {(speaking.likes)}
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <InputGroup>
                                                        <AudioPlayer
                                                            src={"data:audio/mpeg;base64," + speaking.base64}
                                                            onPlay={e => console.log("onPlay")}
                                                        />
                                                        <Button
                                                            variant={speaking.isLiked ? "danger" : "outline-danger"}
                                                            onClick={event => like(speaking.id)}
                                                        >{speaking.isLiked ? "Liked 🥳" : "Like 😉"}</Button>
                                                    </InputGroup>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })
                }
            </Container>
        </div>
    );
}

export default Voices;
