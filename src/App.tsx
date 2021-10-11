import React, { useState } from "react";
import StepWizard from "react-step-wizard";

import "./App.css";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { ErrorCodesType, ExcelType } from "./types/Input";
import { OutputType } from "./types/Output";

function App() {
  // Step1
  const [excel, setExcel] = useState<ExcelType[]>();
  // Step2
  const [errorCodes, setErrorCodes] = useState<ErrorCodesType>();
  // Step3
  // const [output, setOutput] = useState<OutputType>();
  // const [excelOnlyOutput, setExcelOnlyOutput] = useState<OutputType>();

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div>
      <h1>[Ejada] Translate Al-Rajhi Error Codes </h1>
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
