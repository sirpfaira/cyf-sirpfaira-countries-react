import { useState } from 'react';
import './App.css';
import allCountries from './data/countriesAll.json';

function App() {
  const [searchWord, setSearchWord] = useState('');

  const changeSearchWord = (event) => {
    setSearchWord(event.target.value);
  };

  return (
    <div className='container'>
      <Header />
      <Search changeSearchWord={changeSearchWord} />
      <Countries countriesArray={allCountries} searchWord={searchWord} />
    </div>
  );
}

const Countries = ({ countriesArray, searchWord }) => {
  let list = [...countriesArray];

  if (searchWord) {
    const tempArr = [...countriesArray];
    list = tempArr.filter(
      (country) =>
        country.name.toUpperCase().includes(searchWord.toUpperCase()) ||
        country.capital.toUpperCase().includes(searchWord.toUpperCase())
    );
  }

  return (
    <div className='countries-div'>
      {list.map((country) => (
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
        <h4 className='country-name'>{country.name}</h4>
        <p className='country-stat'>
          <span className='attribute-title'>Population:</span>{' '}
          {country.population.toLocaleString()}
        </p>
        <p className='country-stat'>
          <span className='attribute-title'>Region:</span> {country.region}
        </p>
        <p className='country-stat'>
          <span className='attribute-title'>Capital:</span> {country.capital}
        </p>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className='header-div'>
      <div className='header-title-div'>
        <h3 className='header-title'>Where in the world?</h3>
      </div>
      <div className='header-theme-div'>
        <img src='#' alt='Theme icon' />
        <p className='theme-name'>Dark Mode</p>
      </div>
    </div>
  );
};

const Search = ({ changeSearchWord }) => {
  const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  return (
    <div className='search-div'>
      <input
        className='search-box'
        type='text'
        placeholder='Search for a country'
        onChange={changeSearchWord}
      />
      <select class='region-select'>
        {regions.map((region, index) => (
          <option value={index}>{region}</option>
        ))}
      </select>
    </div>
  );
};

export default App;
