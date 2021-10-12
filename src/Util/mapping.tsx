import { ErrorCodesType, ExcelType } from "../types/Input";
import _ from "lodash";

export const mapping = (excel: ExcelType[], errorCodes: ErrorCodesType) => {
  console.log("Start Mapping with error codes", errorCodes);
  const excelOnlyOutput: ErrorCodesType = {};

  // Take a copy of the errorCodes to preserve existing values
  const errorCodesCopy = _.cloneDeep(errorCodes);

  for (const excelObject of excel) {
    const key = excelObject.errorCode;

    const obj = errorCodesCopy[key];

    if (obj) {
      errorCodesCopy[key] = excelObject.ar;
    } else {
      excelOnlyOutput[key] = excelObject.ar;
    }
  }

  console.log("result", errorCodesCopy);
  console.log("not found", excelOnlyOutput);

  return { errorCodesCopy, excelOnlyOutput };
};
