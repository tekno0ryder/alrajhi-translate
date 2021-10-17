import { inputJsonType, ExcelType } from "../types/Input";
import _ from "lodash";

export const mapping = (excel: ExcelType[], inputJson: inputJsonType) => {
  console.log("Start Mapping inputJson", inputJson);
  const excelOnlyOutput: inputJsonType = {};

  // Take a copy of the inputJson to preserve existing values
  const inputJsonCopy = _.cloneDeep(inputJson);

  for (const excelObject of excel) {
    const key = excelObject.key;

    const obj = inputJsonCopy[key];

    if (obj) {
      inputJsonCopy[key] = excelObject.ar;
    } else {
      excelOnlyOutput[key] = excelObject.ar;
    }
  }

  console.log("result", inputJsonCopy);
  console.log("not found", excelOnlyOutput);

  return { errorCodesCopy: inputJsonCopy, excelOnlyOutput };
};
