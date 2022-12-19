import React from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class CityList extends React.Component{
    state = {
        city: [],
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
        axios.get(`http://localhost:5274/api/ReactCity`)
        .then(result =>{
            const city = result.data;
            this.setState({city:city});
             
        })
    }

    handleSort = (event) => 
    {
        event.preventDefault();
        const currentState = this.state.toggle;
        if(currentState=== false)
        {
            this.state.city.sort((a, b) => (a.name < b.name ? -1 : 1));
            
        }else
          {
            this.state.city.sort((b, a) => (a.name < b.name ? -1 : 1));

          }
          this.setState({toggle: !currentState}); 
    };
    
    handleSubmit = (event) => 
    {
        event.preventDefault();
        axios.post(`http://localhost:5274/api/ReactCity/Search?searchString=${this.state.searchString}`)
        .then(result =>{
            const city = result.data;
            this.setState({city: city});
        });
    };
/* console.log(people);this.state.people.map(person =>*/
    render(){
        return(
            <>
            <div>
                <h1>City</h1>
                <hr/>
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
                        this.state.city.map(city =>
                            <tr key={city.id}>
                                <td><Link to={`/City/Detail/${city.id}`} >{city.name}</Link></td>
                            </tr>
                            )
                    }
                   </tbody>
                </Table>
            </div>
            </>
        )
    }
}