import axios from "axios";
import React from "react";


export default class CreateCountry extends React.Component
{
    state = {
        name: '',
        selectedOption: ''
    }

    handleChange(selectedOption) {
        this.setState({selectedOption});
       }

    handleSubmit = (event) => 
    {
        event.preventDefault();
        axios.post(`http://localhost:5274/api/ReactCountry`, this.state).then(()=>{
            this.props.navigate('/Country');
        }); 
    };
    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <label> Name: </label>
                <input type="text" required value={this.state.name} onChange={event => this.setState({name: event.target.value})} />
                <button type="Submit" >Add Country</button>
            </form>
        );
    }

}