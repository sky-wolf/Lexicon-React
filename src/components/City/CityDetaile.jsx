import axios from "axios"
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {useParams, useNavigate} from "react-router-dom"
export const CityDetaile = ()=>{

    const navigate = useNavigate();
    const effectRan = useRef(false);
    const { id } = useParams();
    const [city, setCity] = useState([]);
    
    function deleteCity()
    {
        axios
        .delete(`http://localhost:5274/api/ReactCity/?id=${id}`)
        .then(()=>{
            navigate('/City');
        });
    }

    function clickBack()
    {
        navigate('/City')
    }

    useEffect(() => {
        if(effectRan.current === false)
        {
            axios.get(`http://localhost:5274/api/ReactCity/Detaile?id=${id}`)
            .then(result =>{
                setCity(result.data);
                console.log(result.data);
            }).catch((err)=>console.log(err));
            return()=>{
                effectRan.current = true;
            }
            
        }
        
      });
    
    return (
        <>
        
            <Card>
                {
                <Card.Body>
                    <Card.Title>{city.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"> Id: {city.id}</Card.Subtitle>
                    <Card.Text>
                        <p>Country: {city.country}</p>
                    </Card.Text>
                    <Button variant="info" onClick={clickBack}>Back</Button>
                    <Button variant="danger" onClick={deleteCity}>Delete</Button>
                </Card.Body>
                }
            </Card>
        </>
    )
}