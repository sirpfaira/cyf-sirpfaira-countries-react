import React, { useState } from 'react';
import './App.css';

const CountryDetails = ({
  allCountries,
  countryCode,
  handleCountryClick,
  lightTheme,
}) => {
  const [country, setCountry] = useState(
    allCountries.find((el) => el.alpha3Code === countryCode)
  );

  if (!country) {
    handleCountryClick();
  }

  const onNeighbourClick = (e) => {
    const alphaCode = e.currentTarget.getAttribute('data-id');
    console.log(alphaCode);
    setCountry(allCountries.find((el) => el.alpha3Code === alphaCode));
  };

  return (
    <div
      className={
        lightTheme ? 'details-container light-shadow' : 'detail-container'
      }
    >
      <BackButton
        handleCountryClick={handleCountryClick}
        lightTheme={lightTheme}
      />
      <div className='country-container'>
        <Flag country={country} />
        <div className='info-container'>
          <div className='stats-container'>
            <CountryName country={country} />
            <div className='info-div'>
              <PrimaryInfo country={country} />
              <SecondaryInfo country={country} />
            </div>
            <BorderCountries
              allCountries={allCountries}
              country={country}
              onNeighbourClick={onNeighbourClick}
              lightTheme={lightTheme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BorderCountries = ({
  allCountries,
  country,
  onNeighbourClick,
  lightTheme,
}) => {
  //let borderNations = ['Brazil', 'Netherlands', 'Gokwe'];
  const neighbourCodes = country.borders;

  let borderNations = [];
  neighbourCodes.forEach((el) => {
    allCountries.forEach((obj) => {
      //console.log(`${el}||${obj.alpha3Code}`);
      if (el === obj.alpha3Code) {
        borderNations.push(obj);
      }
    });
  });

  return (
    <div className='borders-div'>
      <p className='borders-text'>Border Countries:</p>
      {borderNations.map((nation, i) => (
        <button
          key={i}
          className={
            lightTheme
              ? 'border-button light-shadow light-text light-bg'
              : 'border-button dark-shadow dark-text dark-bg'
          }
          onClick={onNeighbourClick}
          data-id={nation.alpha3Code}
        >
          {nation.name}
        </button>
      ))}
    </div>
  );
};
const SecondaryInfo = ({ country }) => {
  return (
    <div className='secondary-div'>
      <p className='country-stat'>
        <span className='attribute-title'>Top Level Domain:</span>
        {country.topLevelDomain}
      </p>
      <p className='country-stat'>
        <span className='attribute-title'>Currencies:</span>
        {country.currencies[0].name}
      </p>
      <p className='country-stat'>
        <span className='attribute-title'>Languages:</span>
        {country.languages.map((language) => language.name).join(',')}
      </p>
    </div>
  );
};

const PrimaryInfo = ({ country }) => {
  return (
    <div className='primary-div'>
      <p className='country-stat'>
        <span className='attribute-title'>Population:</span>
        {country.population.toLocaleString()}
      </p>
      <p className='country-stat'>
        <span className='attribute-title'>Region:</span> {country.region}
      </p>
      <p className='country-stat'>
        <span className='attribute-title'>Sub Region:</span> {country.subregion}
      </p>
      <p className='country-stat'>
        <span className='attribute-title'>Capital:</span> {country.capital}
      </p>
    </div>
  );
};

const CountryName = ({ country }) => {
  return <h3 className='country-name'>{country.name}</h3>;
};

const Flag = ({ country }) => {
  return (
    <div className='flag-div'>
      <img src={country.flag} alt='Country Flag' className='details-flag' />
    </div>
  );
};

const BackButton = ({ handleCountryClick, lightTheme }) => {
  return (
    <div
      className={
        lightTheme
          ? 'back-button-div light-bg light-shadow'
          : 'back-button-div dark-bg dark-shadow dark-margins'
      }
      onClick={handleCountryClick}
    >
      <button
        type='button'
        className={
          lightTheme
            ? 'back-button light-bg light-text'
            : 'back-button dark-text dark-bg'
        }
      >
        <span
          className={
            lightTheme
              ? 'fa fa-arrow-left light-text'
              : 'fa fa-arrow-left dark-text'
          }
        ></span>{' '}
        Back
      </button>
    </div>
  );
};

export default CountryDetails;
