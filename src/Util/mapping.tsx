import { ErrorCodesType, ExcelType } from "../types/Input";
import { OutputType } from "../types/Output";

export const mapping = (excel: ExcelType[], errorCodes: ErrorCodesType) => {
  console.log("Start Mapping with error codes", errorCodes);
  const output: OutputType = {};
  const inExcelOnly: OutputType = {};

  for (const excelObject of excel) {
    const key = excelObject.errorCode;

    const obj = errorCodes[key];

    if (obj) {
      output[key] = {
        en: excelObject.en,
        ar: excelObject.ar,
      };
    } else {
      inExcelOnly[key] = excelObject;
    }
  }

  console.log("result", output);
  console.log("not found", inExcelOnly);

  return { output, excelOnlyOutput: inExcelOnly };
};
