import './App.css';
import React from 'react';
import Person from './components/Person/Person';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import City from './components/City/City';
import CreateCity from './components/City/CreateCity';
import { CityDetaile } from './components/City/CityDetaile';
import Country from './components/Country/Country';
import CreateCountry from './components/Country/Create';
import { CountryDetaile } from './components/Country/Detaile';
import PersonCreate from './components/Person/PersonCreate';
import { DetailePerson } from './components/Person/PersonDetaile';




function App() {

  const navigate = useNavigate();

  return (
    <Container>
    <nav>
      <ul>
        <li><Link to="/">Person</Link></li>
        <li><Link to="/City">City</Link></li>
        <li><Link to="/Country">Country</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path='/' element={<Person />} />
      <Route path='/Person/Create' element={<PersonCreate navigate={navigate} />} />
      <Route path='/Person/Detail/:id' element={<DetailePerson />} />
      <Route path='/Person/Detail/:id' />
      <Route path='/City' element={<City />}/>
      <Route path='/City/Create' element={<CreateCity navigate={navigate} />}/>
      <Route path='/City/Detail/:id' element={<CityDetaile />}/>
      <Route path='/Country' element={<Country />}/>
      <Route path='/Country/Create' element={<CreateCountry navigate={navigate} />}/>
      <Route path='/Country/Detail/:id' element={<CountryDetaile />}/>
      <Route />

    </Routes>
    </Container>

  );
}

export default App;
