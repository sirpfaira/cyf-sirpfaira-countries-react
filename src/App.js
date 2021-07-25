import { useState } from 'react';
import './App.css';
//import allCountries from './data/countriesFew.json';
import allCountries from './data/countriesAll.json';
import CountryDetails from './CountryDetails';
import darkIcon from './data/dark.png';
//import lightIcon from './data/light.png';

function App() {
  //const [mainView, setMainView] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  const [region, setRegion] = useState('All Regions');
  //const [index, setIndex] = useState(0);
  const [view, setView] = useState({ main: true, countryCode: null });
  const [lightTheme, setLightTheme] = useState(false);

  const changeSearchWord = (event) => {
    setSearchWord(event.target.value);
  };

  const changeRegion = (event) => {
    setRegion(event.target.value);
  };

  const handleCountryClick = (event) => {
    //console.log(`id: ${event.target.attributes.getNamedItem('data-id').value}`);
    //setMainView(!mainView);
    setView({
      main: !view.main,
      countryCode: event.currentTarget.getAttribute('data-id'),
    });
  };

  if (!view.main) {
    return (
      <div
        className={
          lightTheme
            ? 'container light-text light-bg'
            : 'container dark-text dark-accent-bg'
        }
      >
        <Header />
        <CountryDetails
          allCountries={allCountries}
          countryCode={view.countryCode}
          handleCountryClick={handleCountryClick}
        />
      </div>
    );
  } else {
    return (
      <div
        className={
          lightTheme
            ? 'container light-text light-bg'
            : 'container dark-text dark-accent-bg'
        }
      >
        <Header lightTheme={lightTheme} />
        <Search
          changeSearchWord={changeSearchWord}
          changeRegion={changeRegion}
          lightTheme={lightTheme}
        />
        <Countries
          countriesArray={allCountries}
          searchWord={searchWord}
          region={region}
          handleCountryClick={handleCountryClick}
        />
      </div>
    );
  }
}

const Countries = ({
  countriesArray,
  searchWord,
  region,
  handleCountryClick,
}) => {
  let list = [];

  if (region === 'All Regions') {
    list = [...countriesArray];
  } else if (region === 'Africa') {
    list = countriesArray.filter((country) => country.region === 'Africa');
  } else if (region === 'America') {
    list = countriesArray.filter((country) => country.region === 'Americas');
  } else if (region === 'Asia') {
    list = countriesArray.filter((country) => country.region === 'Asia');
  } else if (region === 'Europe') {
    list = countriesArray.filter((country) => country.region === 'Europe');
  } else if (region === 'Oceania') {
    list = countriesArray.filter((country) => country.region === 'Oceania');
  }

  if (searchWord) {
    const tempArr = [...list];
    list = tempArr.filter(
      (country) =>
        country.name.toUpperCase().includes(searchWord.toUpperCase()) ||
        country.capital.toUpperCase().includes(searchWord.toUpperCase())
    );
  }

  return (
    <div className='countries-div'>
      {list.map((country, index) => (
        <Country
          country={country}
          handleCountryClick={handleCountryClick}
          key={index.toString()}
        />
      ))}
    </div>
  );
};

const Country = ({ country, handleCountryClick }) => {
  return (
    <div
      className='country-card light-bg light-shadow'
      onClick={handleCountryClick}
      data-id={country.alpha3Code}
    >
      <div className='image-div'>
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className='country-flag'
        />
      </div>
      <div className='content-div'>
        <div className='name-div'>
          <h4 className='country-name'>{country.name}</h4>
        </div>
        <div className='stat-div'>
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
    </div>
  );
};

const Header = ({ lightTheme }) => {
  return (
    <div
      className={
        lightTheme
          ? 'header-div light-shadow light-bg'
          : 'header-div dark-shadow dark-bg'
      }
    >
      <div className='header-title-div'>
        <h3 className='header-title'>Where in the world?</h3>
      </div>
      <div className='header-theme-div'>
        <img src={darkIcon} alt='Theme icon' className='theme-icon' />
        <p className='theme-name'>{lightTheme ? 'Dark Mode' : 'Light Mode'}</p>
      </div>
    </div>
  );
};

const Search = ({ changeSearchWord, changeRegion, lightTheme }) => {
  const regions = [
    'All Regions',
    'Africa',
    'America',
    'Asia',
    'Europe',
    'Oceania',
  ];
  return (
    <div className='search-div'>
      <input
        className={
          lightTheme
            ? 'search-box light-shadow'
            : 'search-box dark-shadow dark-bg'
        }
        type='text'
        placeholder='Search for a country'
        onChange={changeSearchWord}
      />
      <select
        className={
          lightTheme
            ? 'region-select light-shadow light-bg'
            : 'region-select dark-shadow dark-bg'
        }
        onChange={changeRegion}
      >
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;
