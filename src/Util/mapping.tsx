// @ts-nocheck
import { NestedObject } from "../types/Input";
import _ from "lodash";

const assignParentKey = (obj: any, key1: any, key2?: any, key3?: any) => {
  obj[key1] = obj[key1] ?? {};
  if (key2) {
    obj[key1][key2] = obj[key1][key2] ?? {};
  }
  if (key3) {
    obj[key1][key2][key3] = obj[key1][key2][key3] ?? {};
  }
};

export const mapExcelToJS = (
  excel: NestedObject,
  inputObject: NestedObject
) => {
  console.log("Start Mapping inputObject", inputObject);
  const excelOnlyOutput: NestedObject = {};

  // Take a copy of the inputObject to preserve existing values
  const inputObjectCopy = _.cloneDeep(inputObject);

  // Top Level
  for (const [excelKey, excelVal] of Object.entries(excel)) {
    if ("en" in excelVal) {
      const obj = inputObjectCopy[excelKey];
      if (obj) {
        inputObjectCopy[excelKey] = excelVal.ar ?? excelVal.en;
      } else {
        excelOnlyOutput[excelKey] = excelVal.ar ?? excelVal.en;
      }
    } else {
      // 1st Level
      for (const [excelKey1, excelVal1] of Object.entries(excelVal)) {
        if ("en" in excelVal1) {
          // Assign {} if undefined
          assignParentKey(inputObjectCopy, excelKey);
          const obj = inputObjectCopy[excelKey][excelKey1];
          if (obj) {
            inputObjectCopy[excelKey][excelKey1] = excelVal1.ar ?? excelVal1.en;
          } else {
            assignParentKey(excelOnlyOutput, excelKey);
            excelOnlyOutput[excelKey][excelKey1] = excelVal1.ar ?? excelVal1.en;
          }
        } else {
          // 2st Level
          for (const [excelKey2, excelVal2] of Object.entries(
            excelVal1 as any
          )) {
            // Assign {} if undefined
            assignParentKey(inputObjectCopy, excelKey, excelKey1);
            const obj = inputObjectCopy[excelKey][excelKey1][excelKey2];
            if (obj) {
              inputObjectCopy[excelKey][excelKey1][excelKey2] =
                excelVal2.ar ?? excelVal2.ar;
            } else {
              assignParentKey(excelOnlyOutput, excelKey, excelKey1);
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

  return { inputObjectCopy, excelOnlyOutput };
};

export const mapJSToExcel = (inputEnglishObject: NestedObject) => {
  const final: [][] = [];
  final.push([]);

  const add = (category, key, en) => {
    const obj = [
      // category
      { value: category },
      // key
      { value: key },
      // en
      { value: en },
    ];
    final.push(obj);
  };

  // Top Level
  for (const [excelKey, excelVal] of Object.entries(inputEnglishObject)) {
    if (typeof excelVal === "string") {
      add("", excelKey, excelVal);
    } else {
      // 1st Level
      for (const [excelKey1, excelVal1] of Object.entries(excelVal)) {
        if (typeof excelVal1 === "string") {
          add(excelKey, excelKey1, excelVal1);
        } else {
          // 2st Level
          for (const [excelKey2, excelVal2] of Object.entries(
            excelVal1 as any
          )) {
            add(`${excelKey}.${excelKey1}`, excelKey2, excelVal2);
          }
        }
      }
    }
  }
  console.log(final);
  return final;
};
