import React, { useCallback } from "react";
import { ErrorCodesType, ExcelType } from "../types/Input";
import { StepWizardChildProps } from "react-step-wizard";
import { OutputType } from "../types/Output";

type PropType = {
  output: OutputType;
  excelOnlyOutput: OutputType;
} & StepWizardChildProps;

export const Step4 = ({ output, excelOnlyOutput }: PropType) => {
  return (
    <>
      <h2>Output</h2>
      <code>
        {Object.entries(output).map(([key, value]) => (
          <div key={key}></div>
        ))}
      </code>
    </>
  );
};
