import axios from "axios";
import React from "react";

export default class PersonCreate extends React.Component
{
    state = {
        name: '',
        city: '',
        country: '',
        phoneNumber: '',
        cities: [],
        countrys:[],
        selectedOption: '',
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
        axios.post(`http://localhost:5274/api/ReactPerson`, this.state).then(()=>{
            this.props.navigate('/');
        });

    };

    countrychange = (event) =>
    {
        this.setState({country: event.target.value});
        axios.get(`http://localhost:5274/api/ReactCity/${event.target.value}`)
        .then(result =>{
            const cities = result.data;
            this.setState({cities: cities});
        });
    }

    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
            <label> Name: </label>
            <input type="text" required value={this.state.name} onChange={event => this.setState({name: event.target.value})} />
            <label> Countrys: </label> 
            <select onChange={this.countrychange} >
                <option>select</option>
                {
                    this.state.countrys.map(country =>
                        <option key={country.id} value={country.id}>{country.name}</option>)
                }
            </select>
            <label> Citys: </label> 
            <select onChange={event => this.setState({city: event.target.value})}>
                <option>select</option>
                {
                    this.state.cities.map(city =>
                        <option key={city.id} value={city.id}>{city.name}</option>)
                }
            </select>
            <label> PhoneNumber: </label>
            <input type="text" required value={this.state.phoneNumber} onChange={event => this.setState({phoneNumber: event.target.value})} />
            <button type="Submit" >Add Person</button>
        </form>
        );
    }
}