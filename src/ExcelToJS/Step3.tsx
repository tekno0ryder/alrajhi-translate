import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { mapExcelToJS } from "../Util/mapping";
import { NestedObject } from "../types/Input";
import JSON5 from "json5";

type PropType = {
  excel: NestedObject;
  errorCodes: NestedObject;
};

export const Step3 = ({ excel, errorCodes }: PropType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [output, setOutput] = useState<NestedObject>();
  const [excelOnlyOutput, setExcelOnlyOutput] = useState<NestedObject>();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const output = mapExcelToJS(excel, errorCodes);
    setOutput(output.inputObjectCopy);
    setExcelOnlyOutput(output.excelOnlyOutput);
    setIsLoading(false);
  }, [excel, errorCodes]);

  useLayoutEffect(() => {
    // When processing done
    if (!isLoading) {
      ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading]);

  if (isLoading) return <h3>We're cooking your translation!</h3>;

  return (
    <div ref={ref}>
      <h2>Step 3: Output</h2>

      <h4>Final Output</h4>
      <p>
        <b>Note:</b> Translations not found in Excel are kept AS IS
      </p>
      <textarea
        readOnly
        rows={30}
        value={JSON5.stringify(output, { space: "\t" })}
      />
      <p>[If interested] Translations found in Excel but NOT in your JSON:</p>
      <textarea
        readOnly
        rows={30}
        value={JSON5.stringify(excelOnlyOutput, { space: "\t" })}
      />
    </div>
  );
};

export default Step3;
