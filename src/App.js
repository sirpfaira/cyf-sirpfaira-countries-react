import { useState } from 'react';
import './App.css';
import allCountries from './data/countriesAll.json';

function App() {
  const [countries, setCountries] = useState(allCountries);
  return (
    <div className='container'>
      <Countries countriesArray={countries} />
    </div>
  );
}

const Countries = ({ countriesArray }) => {
  return (
    <div className='countries-div'>
      {countriesArray.map((country) => (
        <Country country={country} />
      ))}
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div className='country-card'>
      <div className='image-div'>
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className='country-flag'
        />
      </div>
      <div className='content-div'>
        <h3 className='country-name'>{country.name}</h3>
        <p>
          <span className='attribute-title'>Population:</span>{' '}
          {country.population.toLocaleString()}
        </p>
        <p>
          <span className='attribute-title'>Region:</span> {country.region}
        </p>
        <p>
          <span className='attribute-title'>Capital:</span> {country.capital}
        </p>
      </div>
    </div>
  );
};

export default App;
