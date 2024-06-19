import { useState, useEffect } from "react";
import axios from "axios";

const DisplayCountryData = ({
  query,
  matchingCountryNames,
  countryData,
  setQuery,
}) => {
  const handleButton = (name) => {
    setQuery(name);
  };

  if (query && matchingCountryNames.length > 10) {
    return <p>Too many matches. Specify search query</p>;
  } else if (
    matchingCountryNames.length > 1 &&
    matchingCountryNames.length <= 10
  ) {
    return (
      <ul>
        {matchingCountryNames.map((name, index) => (
          <p key={index}>
            {name} <button onClick={() => handleButton(name)}>show</button>
          </p>
        ))}
      </ul>
    );
  }
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
            width="150"
          />
        </div>
      )}
    </>
  );
};

const AllMatchingCountryDetails = ({ countries, query, setQuery }) => {
  const [matches, setMatches] = useState([]);
  const [matchingCountryNames, setMatchingCountryNames] = useState([]);
  const [countryData, setCountryData] = useState(null);

  // This collates all details of matching countries
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

  // This collates only the names of matching countries
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
    let country;
    if (matches.length === 1) {
      country = matches[0];
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

  return (
    <DisplayCountryData
      query={query}
      matchingCountryNames={matchingCountryNames}
      countryData={countryData}
      setQuery={setQuery}
    />
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => {
        console.log("Error fetching country data: ", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      Find countries{" "}
      <input type="text" value={query} onChange={handleInputChange}></input>
      <AllMatchingCountryDetails
        countries={countries}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
};

export default App;
