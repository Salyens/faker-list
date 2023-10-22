import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingBar from "./components/SettingBar";
import TableFaker from "./components/TableFaker";

function App() {
  const [fakerUsers, setFakerUsers] = useState([]);
  const [country, setCountry] = useState("USA");
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));
  const [seedWithPages, setSeedWithPages] = useState(seed);
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <>
      <SettingBar
        country={country}
        onSetCountry={setCountry}
        fakerUsers={fakerUsers}
        seed={seed}
        onSetSeed={setSeed}
        sliderValue={sliderValue}
        onSetSliderValue={setSliderValue}
        onSetSeedWithPages={setSeedWithPages}
      />
      <TableFaker
        fakerUsers={fakerUsers}
        country={country}
        onSetFakerUsers={setFakerUsers}
        seed={seed}
        sliderValue={sliderValue}
        seedWithPages={seedWithPages}
        onSetSeedWithPages={setSeedWithPages}
      />
    </>
  );
}

export default App;
