import React, { useState } from "react";

import "./App.css";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { ErrorCodesType, ExcelType } from "./types/Input";

function App() {
  // Step1
  const [excel, setExcel] = useState<ExcelType[]>();
  // Step2
  const [errorCodes, setErrorCodes] = useState<ErrorCodesType>();

  return (
    <div>
      <h1>Translate Al-Rajhi Error Codes </h1>
      <p>
        The purpose of this script is to take two inputs (Excel file, JSON
        object) and it will map and replace your english translation with arabic
        ones
      </p>
      <Step1 setExcel={setExcel} />
      <Step2 setErrorCodes={setErrorCodes} />
      {excel && errorCodes && <Step3 excel={excel!} errorCodes={errorCodes!} />}
    </div>
  );
}

export default App;
