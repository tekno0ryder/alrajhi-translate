import React, { useEffect, useState } from "react";
import { mapping } from "../Util/mapping";
import { ErrorCodesType, ExcelType } from "../types/Input";
import { StepWizardChildProps } from "react-step-wizard";
import JSON5 from "json5";

type PropType = {
  excel: ExcelType[];
  errorCodes: ErrorCodesType;
  setOutput: Function;
  setExcelOnlyOutput: Function;
} & StepWizardChildProps;

export const Step3 = ({ excel, errorCodes, currentStep }: PropType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [output, setOutput] = useState<ErrorCodesType>();
  const [excelOnlyOutput, setExcelOnlyOutput] = useState<ErrorCodesType>();

  useEffect(() => {
    if (currentStep === 3) {
      const output = mapping(excel, errorCodes);
      setOutput(output.errorCodes);
      setExcelOnlyOutput(output.excelOnlyOutput);
      setIsLoading(false);
    }
  }, [currentStep]);

  const fix = (input: string) => {
    // const obj = output![key];
    // input && (output![key].ar = input);
  };

  if (isLoading) return <h3>We're cooking your translation!</h3>;

  return (
    <>
      <h3> Successfuly translated {Object.keys(output!).length} strings</h3>
      <h5>
        These translations are found in excel but not in your input, just saying
        if you're interested:
      </h5>
      <textarea
        style={{ width: "80%" }}
        rows={10}
        defaultValue={JSON5.stringify(excelOnlyOutput, { space: "\t" })}
      />
      <h4>Final Output</h4>
      <textarea
        style={{ width: "80%" }}
        rows={30}
        defaultValue={JSON5.stringify(output, { space: "\t" })}
      />
    </>
  );
};
