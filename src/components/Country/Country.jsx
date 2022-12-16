import React from "react";
import { Link } from "react-router-dom";
import CountryList from "./List";



export default class Country extends React.Component
{
   
    render()
    {
        return (
            <div>
                <h1>Country</h1>
                <Link to="/Country/Create">Create Country</Link>
                <hr />
                <CountryList />
                
            </div>
        );
    }
}

