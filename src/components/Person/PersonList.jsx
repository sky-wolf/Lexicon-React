import React from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class PersonList extends React.Component{
    state = {
        people: [],
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
        axios.get(`http://localhost:5274/api/ReactPerson`)
        .then(result =>{
            const people = result.data;
            this.setState({people:people});
             
        })
    }

    handleSort = (event) => 
    {
        event.preventDefault();
        const currentState = this.state.toggle;
        if(currentState=== false)
        {
            this.state.people.sort((a, b) => (a.name < b.name ? -1 : 1));
            
        }else
          {
            this.state.people.sort((b, a) => (a.name < b.name ? -1 : 1));

          }
          this.setState({toggle: !currentState}); 
    };
            
    handleSubmit = (event) => 
    {
        event.preventDefault();
        console.log(this.state.searchString);
        axios.post(`http://localhost:5274/api/ReactPerson/Search?searchString=${this.state.searchString}`)
        .then(result =>{
            const peoples = result.data;
            this.setState({people: peoples});
        });
    };
/* console.log(people);this.state.people.map(person =>*/
    render(){
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:</label>
                    <input type="text" onChange={event => this.setState({searchString: event.target.value})}/>
                    <button type="submit">Search</button>
                </form>
                <button onClick={this.handleSort}>Sort</button>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.people.map(person =>
                            <tr key={person.id}>
                                
                                    <td><Link to={`/Person/Detail/${person.id}`}>{person.name}</Link></td>
                                    <td>{person.city}</td>
                                
                            </tr>
                        )
                    }
                   </tbody>
                </Table>
            </>
        )
    }
}