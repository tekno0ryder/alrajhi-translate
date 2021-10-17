import React, { useEffect, useRef, useState } from "react";
import { mapping } from "../Util/mapping";
import { inputJsonType, ExcelType } from "../types/Input";
import JSON5 from "json5";

type PropType = {
  excel: ExcelType[];
  errorCodes: inputJsonType;
};

export const Step3 = ({ excel, errorCodes }: PropType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [output, setOutput] = useState<inputJsonType>();
  const [excelOnlyOutput, setExcelOnlyOutput] = useState<inputJsonType>();

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

      <h4>Final Output</h4>
      <p>
        <b>Note:</b> Translations not found in Excel are kept AS IS
      </p>
      <textarea
        style={{ width: "80%" }}
        rows={30}
        value={JSON5.stringify(output, { space: "\t" })}
      />
      <p>[If interested] Translations found in Excel but NOT in your JSON:</p>
      <textarea
        style={{ width: "80%" }}
        rows={10}
        value={JSON5.stringify(excelOnlyOutput, { space: "\t" })}
      />
    </div>
  );
};
