import React, { useEffect, useRef, useState } from "react";
import { mapping } from "../Util/mapping";
import { ErrorCodesType, ExcelType } from "../types/Input";
import JSON5 from "json5";

type PropType = {
  excel: ExcelType[];
  errorCodes: ErrorCodesType;
};

export const Step3 = ({ excel, errorCodes }: PropType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [output, setOutput] = useState<ErrorCodesType>();
  const [excelOnlyOutput, setExcelOnlyOutput] = useState<ErrorCodesType>();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const output = mapping(excel, errorCodes);
    setOutput(output.errorCodesCopy);
    setExcelOnlyOutput(output.excelOnlyOutput);
    setIsLoading(false);
    ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
  }, [excel, errorCodes]);

  if (isLoading) return <h3>We're cooking your translation!</h3>;

  return (
    <div ref={ref}>
      <h2>Step 3: Output</h2>
      <p> Successfuly translated {Object.keys(output!).length} strings</p>
      <p>
        These translations are found in excel but not in your input, just saying
        if you're interested:
      </p>
      <textarea
        style={{ width: "80%" }}
        rows={10}
        value={JSON5.stringify(excelOnlyOutput, { space: "\t" })}
      />
      <h4>Final Output</h4>
      <textarea
        style={{ width: "80%" }}
        rows={30}
        value={JSON5.stringify(output, { space: "\t" })}
      />
    </div>
  );
};
