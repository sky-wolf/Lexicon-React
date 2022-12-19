import React from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class CountryList extends React.Component{
    state = {
        country: [],
        searchString: '',
        selectedOption: '',
        toggle: false,
    }

    
    handleChange(selectedOption) 
    {
        this.setState({selectedOption});
    }

    componentDidMount()
    {
        axios.get(`http://localhost:5274/api/ReactCountry`)
        .then(result =>{
            const country = result.data;
            this.setState({country:country});
             
        })
    }
    
    handleSort = (event) => 
    {
        event.preventDefault();
        const currentState = this.state.toggle;
        if(currentState=== false)
        {
            this.state.country.sort((a, b) => (a.name < b.name ? -1 : 1));
            
        }else
          {
            this.state.country.sort((b, a) => (a.name < b.name ? -1 : 1));

          }
          this.setState({toggle: !currentState}); 
    };

    handleSubmit = (event) => 
    {
        event.preventDefault();
        axios.post(`http://localhost:5274/api/ReactCountry/Search?searchString=${this.state.searchString}`)
        .then(result =>{
            const country = result.data;
            this.setState({country: country});
        });
    };

    render(){
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:</label>
                    <input type="text" onChange={event => this.setState({searchString: event.target.value})}/>
                    <button type="submit">Sort</button>
                </form>
                <hr/>
                <button onClick={this.handleSort}>Sort</button>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.country.map(country =>
                            <tr key={country.id}>
                               <td> <Link to={`/Country/Detail/${country.id}`} >{country.name}</Link></td>
                            </tr>
                            )
                    }
                   </tbody>
                </Table>
            </>
        )
    }
}