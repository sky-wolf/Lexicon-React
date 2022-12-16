import axios from "axios";
import React from "react";


export default class CreateCity extends React.Component
{
    state = {
        name: '',
        country: '',
        countrys:[],
        selectedOption: ''
    }

    componentDidMount(){
        axios.get(`http://localhost:5274/api/ReactCountry`)
        .then(result =>{
            const countrys = result.data;
            this.setState({countrys: countrys});
        })
    }

    handleChange(selectedOption) {
        this.setState({selectedOption});
       }

    handleSubmit = (event) => 
    {
        event.preventDefault();
        axios.post(`http://localhost:5274/api/ReactCity`, this.state).then(()=>{
            this.props.navigate('/City');
        }); 
    };
    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <label> Countrys: </label> 
                <select onChange={event => this.setState({country: event.target.value})} >
                    <option>select</option>
                    {
                        this.state.countrys.map(country =>
                        <option key={country.id} value={country.id}>{country.name}</option>)
                    }
                </select>
                <label> Name: </label>
                <input type="text" required value={this.state.name} onChange={event => this.setState({name: event.target.value})} />
                <button type="Submit" >Add City</button>
            </form>
        );
    }

}