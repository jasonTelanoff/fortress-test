import React, { useState } from 'react';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Patient from './patient';

function App() {
  const baseURL = 'http://hapi.fhir.org/baseR4/Patient';

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (eventKey) => {
    console.log(eventKey);
    setSelectedValue(eventKey);
  };

  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const [searchResult, setSearchResult] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  const search = async () => {
    console.log(input);
    const res = await fetch(`${baseURL}?${selectedValue}=${input}`);
    const data = await res.json();
    setHasSearched(true);
    console.log(data);
    setSearchResult(data);
  }

  const loadNextPage = async () => {
    const res = await fetch(searchResult['link'][searchResult['link'].length - 1]['url']);
    const data = await res.json();
    setSearchResult(data);
    console.log(data);
  }


  const patientSearchParams = [
    "address-city",
    "address-state",
    "address-country",
    "address-postalcode",
  ]

  const patientSearchParamsDisplay = {
    "address-city": "Patient's City",
    "address-state": "Patient's State",
    "address-country": "Patient's Country",
    "address-postalcode": "Patient's Postal Code",
  }

  return (
    <div className="App">
      <header className="App-header">
        <Dropdown onSelect={handleSelect} className="spacing">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {patientSearchParamsDisplay[selectedValue] || 'Select Resource Type'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {patientSearchParams.map((param) => (
              <Dropdown.Item eventKey={param} key={param}>
                {patientSearchParamsDisplay[param]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {selectedValue && (
          <input
            type="text"
            value={input || ''}
            onChange={(e) => handleChange(e)}
            placeholder={`Enter ${patientSearchParamsDisplay[selectedValue]}`}
            className="spacing input-field"
          />
        )}
        {selectedValue && (
          <Button onClick={search}>Search</Button>
        )}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center', // Centers items horizontally within the row
            alignItems: 'center',    // Centers items vertically within the row
            gap: '20px',             // Spacing between items
          }}
        >
          {hasSearched &&
            searchResult['entry'].map((e, index) => (
              <Patient key={index} data={e} />
            ))}
        </div>
        {hasSearched && searchResult['link'][searchResult['link'].length - 1]['relation'] === 'next' && <Button onClick={loadNextPage}>Next</Button>}
      </header>
    </div>

  );
}

export default App;
