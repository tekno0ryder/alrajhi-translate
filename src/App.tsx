import React, { useState } from "react";

import "./App.css";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { inputObjectType, ExcelType } from "./types/Input";

function App() {
  // Step1
  const [excel, setExcel] = useState<ExcelType>();
  // Step2
  const [inputObject, setInputObject] = useState<inputObjectType>();

  return (
    <div>
      <h1>Translate Al-Rajhi Error Codes </h1>
      <p>
        The purpose of this script is to take two inputs (Excel file, JS object)
        and it will map and replace your english translation with arabic ones
      </p>
      <p>
        <ul>
          <li>
            Supports Up to 2 levels of nesting
            <ul>
              <li>1 level of nesting e.g (category: general)</li>
              <li>2 levels of nesting e.g (category: general.yes)</li>
            </ul>
          </li>
          <li>Columns should be in row 0 in your excel sheet</li>
          <li>
            Key names should be exact, a mistake found like (E80:) while the
            truth is (E80)
          </li>
          <li>
            Category key should have correct order, within same row of first key
            relating to it or before it.
          </li>
          <li>
            Mapping is done within same level, This won't work:{" "}
            {"{E10:error} with { errorCodes: {E10:error} }"}
            {""}
          </li>
        </ul>
      </p>
      <Step1 setExcel={setExcel} />
      <Step2 setInputObject={setInputObject} />
      {excel && inputObject && (
        <Step3 excel={excel!} errorCodes={inputObject!} />
      )}
    </div>
  );
}

export default App;
