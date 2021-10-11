import React, { useEffect, useState } from "react";
import { mapping } from "../Util/mapping";
import { ErrorCodesType, ExcelType } from "../types/Input";
import { StepWizardChildProps } from "react-step-wizard";
import { MappedValue, OutputType } from "../types/Output";
import JSON5 from "json5";

type PropType = {
  excel: ExcelType[];
  errorCodes: ErrorCodesType;
  setOutput: Function;
  setExcelOnlyOutput: Function;
} & StepWizardChildProps;

export const Step3 = ({ excel, errorCodes, currentStep }: PropType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [output, setOutput] = useState<OutputType>();
  const [excelOnlyOutput, setExcelOnlyOutput] = useState<OutputType>();

  useEffect(() => {
    if (currentStep === 3) {
      const { output, excelOnlyOutput } = mapping(excel, errorCodes);
      setOutput(output);
      setExcelOnlyOutput(output);
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
      <h4>
        However we left these for you since we found escape characters (\n):
      </h4>
      <div>
        {/*{output &&*/}
        {/*  Object.entries(output).map(([key, value]) => (*/}
        {/*    <div key={key}>*/}
        {/*      {value.isWaitingFix && (*/}
        {/*        <>*/}
        {/*          <textarea rows={2} defaultValue={value.ar} />*/}
        {/*          <button onClick={() => fix(key)}>Fix</button>*/}
        {/*        </>*/}
        {/*      )}*/}
        {/*      <span>{key}</span> <span>{JSON5.stringify(value.en)}</span>*/}
        {/*    </div>*/}
        {/*  ))}*/}
      </div>
      <h4>
        These translations are found in excel but not in your input, just saying
        if you're interested:
      </h4>
    </>
  );
};
