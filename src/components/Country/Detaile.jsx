import axios from "axios"
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {useParams, useNavigate} from "react-router-dom"
export const CountryDetaile = ()=>{

    const navigate = useNavigate();
    const effectRan = useRef(false);
    const { id } = useParams();
    const [country, setCountry] = useState([]);
    const [city, setCity] = useState([]);
    
    function deleteCity()
    {

        axios
        .delete(`http://localhost:5274/api/ReactCountry/?id=${id}`)
        .then(()=>{
            navigate('/Country');
        });

    }

    function clickBack()
    {
        navigate('/Country')
    }

    useEffect(() => {
        if(effectRan.current === false)
        {
            axios.get(`http://localhost:5274/api/ReactCountry/Detaile?id=${id}`)
            .then(result =>{
                setCountry(result.data);
            }).catch((err)=>console.log(err));
            axios.get(`http://localhost:5274/api/ReactCity/${id}`)
        .then(result =>{
            setCity(result.data);
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
                    <Card.Title>{country.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"> Id: {country.id}</Card.Subtitle>
                    <Card.Text>
                        <ul>
                            {city.map(city =>
                                <li key={city.id} >{city.name}</li>)}
                        </ul>
                    </Card.Text>
                    <Button variant="info" onClick={clickBack}>Back</Button>
                    <Button variant="danger" onClick={deleteCity}>Delete</Button>
                </Card.Body>
                }
            </Card>
        </>
    )
}