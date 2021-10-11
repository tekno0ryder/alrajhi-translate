import { ErrorCodesType, ExcelType } from "../types/Input";

export const mapping = (excel: ExcelType[], errorCodes: ErrorCodesType) => {
  console.log("Start Mapping with error codes", errorCodes);
  const excelOnlyOutput: ErrorCodesType = {};

  for (const excelObject of excel) {
    const key = excelObject.errorCode;

    const obj = errorCodes[key];

    if (obj) {
      errorCodes[key] = excelObject.ar;
    } else {
      excelOnlyOutput[key] = excelObject.en;
    }
  }

  console.log("result", errorCodes);
  console.log("not found", excelOnlyOutput);

  return { errorCodes, excelOnlyOutput };
};
