import React, { useState, useEffect } from "react";
import { Dropdown, FormControl, InputGroup, Button } from "react-bootstrap";
import Papa from "papaparse";

const SettingBar = ({
  country,
  onSetCountry,
  fakerUsers,
  seed,
  onSetSeed,
  sliderValue,
  onSetSliderValue,
  onSetSeedWithPages,
}) => {
  const [decimalInput, setDecimalInput] = useState(sliderValue.toString());

  useEffect(() => {
    setDecimalInput(sliderValue.toString());
  }, [sliderValue]);

  const generateRandomSeed = () => {
    onSetSeed(Math.floor(Math.random() * 1000000));
    onSetSeedWithPages((prevSeed) => prevSeed + 20);
  };

  const handleInputChange = (e) => {
    const inputVal = e.target.value;

    const floatValue = parseFloat(inputVal);
    if (floatValue > 1000) {
      onSetSliderValue(1000);
      return;
    }
    const pattern = /^\d{0,4}(\.\d{0,2})?$/;
    if (!pattern.test(inputVal)) return;

    setDecimalInput(inputVal);

    if (inputVal === "" || inputVal === ".") {
      onSetSliderValue(0);
      return;
    }

    if (!isNaN(floatValue) && floatValue >= 0) {
      onSetSliderValue(floatValue);
    }
  };

  const handleSeedChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      onSetSeed(0);
      onSetSeedWithPages(0);
    } else {
      const parsedValue = parseInt(value, 10);
      onSetSeed(isNaN(parsedValue) ? 0 : parsedValue);
      onSetSeedWithPages(isNaN(parsedValue) ? 0 : parsedValue);
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(fakerUsers);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "export.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="m-5 d-flex align-items-end row justify-content-between ">
      <Dropdown className="col-12 col-lg-1 mb-2" onSelect={(e) => onSetCountry(e)}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {country}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="USA">USA</Dropdown.Item>
          <Dropdown.Item eventKey="Croatia">Croatia</Dropdown.Item>
          <Dropdown.Item eventKey="France">France</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="col-12 col-xl-6 d-flex justify-content-evenly mb-2">
        <div className="d-flex flex-column align-items-center justify-content-end w-50 me-3">
          <label className="form-label text-center" htmlFor="slider">
            Error probability: {sliderValue}
          </label>
          <input
            className="form-range"
            id="slider"
            type="range"
            min="0"
            max="10"
            step="0.25"
            value={sliderValue}
            onChange={(e) => onSetSliderValue(parseFloat(e.target.value))}
          />
        </div>
        <div className="d-flex flex-column align-items-center justify-content-end w-25">
          <InputGroup>
            <InputGroup.Text>Value</InputGroup.Text>
            <FormControl
              type="text"
              min="0"
              max="1000"
              value={decimalInput}
              onChange={handleInputChange}
            />
          </InputGroup>
        </div>
      </div>

      <div className="col-12 col-xl-3 mb-2">
        <InputGroup>
          <InputGroup.Text>Seed</InputGroup.Text>
          <FormControl value={seed} onChange={(e) => handleSeedChange(e)} />
          <Button variant="outline-secondary" onClick={generateRandomSeed}>
            Random
          </Button>
        </InputGroup>
      </div>

      <Button
        className="col-6 col-sm-4 col-md-2 col-xl-2 col-xxl-1 mb-2"
        variant="primary"
        onClick={exportToCSV}
      >
        Export to CSV
      </Button>
    </div>
  );
};

export default SettingBar;
