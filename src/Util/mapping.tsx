// @ts-nocheck
import { NestedObject } from "../types/Input";
import _ from "lodash";
import { getArabic, assignParentKey } from "./util";

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

//TODO: Arabic
export const mapJSToExcel = (
  inputEnglishObject: NestedObject,
  inputArabicObject: NestedObject
) => {
  const final: [][] = [];
  let lastCategory;

  // Columns
  final.push([
    { value: "Service", fontWeight: "bold" },
    { value: "Key", fontWeight: "bold" },
    { value: "English", fontWeight: "bold", align: "left" },
    { value: "Arabic", fontWeight: "bold", align: "right" },
  ]);

  const add = (category, key, en, ar) => {
    const isNewCategory = category !== lastCategory;

    // Update last category if we got a new category
    if (isNewCategory) {
      lastCategory = category;
    }

    const obj = [
      // Category
      // Do not repeat category in every row
      isNewCategory
        ? { value: category, wrap: true, fontWeight: "bold" }
        : { value: "" },
      // key
      { value: key },
      // en
      { value: en },
      // ar
      { value: ar },
    ];

    final.push(obj);
  };

  let currentCategory;
  let arabic;
  // Top Level
  for (const [excelKey, excelVal] of Object.entries(inputEnglishObject)) {
    if (typeof excelVal === "string") {
      arabic = getArabic(inputArabicObject, excelKey);
      add("", excelKey, excelVal, arabic);
    } else {
      // 1st Level
      for (const [excelKey1, excelVal1] of Object.entries(excelVal)) {
        if (typeof excelVal1 === "string") {
          currentCategory = excelKey;

          arabic = getArabic(inputArabicObject, excelKey, excelKey1);
          add(currentCategory, excelKey1, excelVal1, arabic);
        } else {
          // 2st Level
          for (const [excelKey2, excelVal2] of Object.entries(
            excelVal1 as any
          )) {
            arabic = getArabic(
              inputArabicObject,
              excelKey,
              excelKey1,
              excelKey2
            );
            currentCategory = `${excelKey}.${excelKey1}`;
            add(currentCategory, excelKey2, excelVal2, arabic);
          }
        }
      }
    }
  }
  console.log(final);
  return final;
};
