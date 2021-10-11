import React, { useState } from "react";
import StepWizard from "react-step-wizard";

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
      <StepWizard>
        {/*//@ts-ignore*/}
        <Step1 setExcel={setExcel} />
        {/*//@ts-ignore*/}
        <Step2 setErrorCodes={setErrorCodes} />
        {/*//@ts-ignore*/}
        <Step3 excel={excel!} errorCodes={errorCodes!} />
      </StepWizard>
    </div>
  );
}

export default App;
