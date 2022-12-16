import React from "react";
import { Link } from "react-router-dom";

import PersonList from "./PersonList";

class Person extends React.Component
{
   
    render()
    {
        return (
            <div>
                <h1>Person</h1>
                <Link to="/Person/Create">Create person</Link>
                <hr />
                {<PersonList />}
            </div>
        );
    }
}

export default Person;