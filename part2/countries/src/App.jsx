import { useState, useEffect } from "react";
import axios from "axios";

const Display = ({ query, matchingCountryNames, countryData }) => {
  if (query && matchingCountryNames.length > 10) {
    return <p>Too many matches. Specify search query</p>;
  } else if (
    matchingCountryNames.length > 1 &&
    matchingCountryNames.length <= 10
  ) {
    return (
      <ul>
        {matchingCountryNames.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
      </ul>
    );
  } else {
    return (
      <>
        {countryData && (
          <div>
            <h1>{countryData.name}</h1>
            <b>Capital: </b>
            {countryData.capital}
            <br />
            <b>Country Area: </b>
            {countryData.area}
            <p>
              <b>Languages:</b>
            </p>
            <ul>
              {countryData.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img
              src={countryData.flag}
              alt={`${countryData.name} flag`}
              width="200"
            />
          </div>
        )}
      </>
    );
  }
};

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchingCountryNames, setMatchingCountryNames] = useState([]);
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    const names = countries.map((country) => country.name.common);

    if (query) {
      const matchingNames = names.filter((name) =>
        name.toLowerCase().includes(query.toLowerCase())
      );
      setMatchingCountryNames(matchingNames);
    } else {
      setMatchingCountryNames(names);
    }
  }, [query, countries]);

  useEffect(() => {
    let matchingCountries =
      query !== ""
        ? countries.filter(
            (country) =>
              country.name.common.toLowerCase().indexOf(query.toLowerCase()) !==
              -1
          )
        : countries;
    setMatches(matchingCountries);
  }, [query]);

  useEffect(() => {
    if (matches.length === 1) {
      const country = matches[0];
      const countryInfo = {
        name: country.name.common,
        capital: country.capital[0],
        area: country.area,
        languages: Object.values(country.languages),
        flag: country.flags.png,
      };
      setCountryData(countryInfo);
    } else {
      setCountryData(null);
    }
  }, [matches]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      Find countries{" "}
      <input type="text" value={query} onChange={handleInputChange}></input>
      <Display
        matchingCountryNames={matchingCountryNames}
        countryData={countryData}
        query={query}
      />
    </div>
  );
};

export default App;
