import axios from "axios"
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {useParams,  useNavigate} from "react-router-dom"

export const DetailePerson = ()=>{
    
    const effectRan = useRef(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [person, setPerson] = useState([]);

    
    function deletePerson()
    {

        axios
        .delete(`http://localhost:5274/api/ReactPerson?id=${id}`)
        .then(()=>{
            navigate('/');
        });

    }

    function clickBack()
    {
        navigate('/')
    }
    

    useEffect(() => {
        if(effectRan.current === false)
        {
            axios.get(`http://localhost:5274/api/ReactPerson/Detaile?id=${id}`)
            .then(result =>{
                setPerson(result.data);

            }).catch((err)=>console.log(err));
            return()=>{
                effectRan.current = true;
            }
            
        }
        
      });


    return (
        <>
        
        <Card>
            <Card.Body>
                <Card.Title>{person.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> Id: {person.id}</Card.Subtitle>
                <Card.Text>
                    City: {person.city}
                </Card.Text>
                <Button variant="info" onClick={clickBack}>Back</Button>
                <Button variant="danger" onClick={deletePerson}>Delete</Button>
            </Card.Body>
            
        </Card>
    </>
    )
}