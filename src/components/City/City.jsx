import React from "react";
import { Link } from "react-router-dom";
import CityList from "./ListCity";
/* import CreateCity from "./CreateCity"; */


export default class City extends React.Component
{
   
    render()
    {
        return (
            <div>
               <Link to="/City/Create">Create city</Link>
                <hr />
                <CityList />
                
            </div>
        );
    }
}

