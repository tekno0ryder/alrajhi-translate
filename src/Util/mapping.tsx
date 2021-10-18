// @ts-nocheck
import { inputObjectType, ExcelType } from "../types/Input";
import _ from "lodash";

const assignpParentKey = (obj: any, key1: any, key2?: any, key3?: any) => {
  obj[key1] = obj[key1] ?? {};
  if (key2) {
    obj[key1][key2] = obj[key1][key2] ?? {};
  }
  if (key3) {
    obj[key1][key2][key3] = obj[key1][key2][key3] ?? {};
  }
};

export const mapping = (excel: ExcelType, inputObject: inputObjectType) => {
  console.log("Start Mapping inputObject", inputObject);
  const excelOnlyOutput: inputObjectType = {};

  // Take a copy of the inputObject to preserve existing values
  const inputObjectCopy = _.cloneDeep(inputObject);

  for (const [excelKey, excelVal] of Object.entries(excel)) {
    // Top Level
    if ("en" in excelVal) {
      const obj = inputObjectCopy[excelKey];
      if (obj) {
        inputObjectCopy[excelKey] = excelVal.ar ?? excelVal.en;
      } else {
        excelOnlyOutput[excelKey] = excelVal.ar ?? excelVal.en;
      }
    }
    // 1st Level
    else {
      for (const [excelKey1, excelVal1] of Object.entries(excelVal)) {
        if ("en" in excelVal1) {
          // Assign {} if undefined
          assignpParentKey(inputObjectCopy, excelKey);
          const obj = inputObjectCopy[excelKey][excelKey1];
          if (obj) {
            inputObjectCopy[excelKey][excelKey1] = excelVal1.ar ?? excelVal1.en;
          } else {
            assignpParentKey(excelOnlyOutput, excelKey);
            excelOnlyOutput[excelKey][excelKey1] = excelVal1.ar ?? excelVal1.en;
          }
        } else {
          // 2st Level
          for (const [excelKey2, excelVal2] of Object.entries(
            excelVal1 as any
          )) {
            // Assign {} if undefined
            assignpParentKey(inputObjectCopy, excelKey, excelKey1);
            const obj = inputObjectCopy[excelKey][excelKey1][excelKey2];
            if (obj) {
              inputObjectCopy[excelKey][excelKey1][excelKey2] =
                excelVal2.ar ?? excelVal2.ar;
            } else {
              assignpParentKey(excelOnlyOutput, excelKey, excelKey1);
              excelOnlyOutput[excelKey][excelKey1][excelKey2] =
                excelVal2.ar ?? excelVal1.en;
            }
          }
        }
      }
    }
  }

  console.log("result", inputObjectCopy);
  console.log("not found", excelOnlyOutput);

  return { errorCodesCopy: inputObjectCopy, excelOnlyOutput };
};
