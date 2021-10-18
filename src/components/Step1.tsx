import readXlsxFile from "read-excel-file";
import { useForm } from "react-hook-form";
import React from "react";
import { isNaN } from "lodash";
import _ from "lodash";

type PropsType = {
  setExcel: Function;
};

const defaultSheetNumber = 1;
const defaultCategoryCell = "Service";
const defaultKeyCell = "Key";
const defaultEnglishCell = "English";
const defaultArabicCell = "Arabic";

export const Step1 = ({ setExcel }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const makeFinalObject = (rows: any[]) => {
    const final: any = {};
    let lastCategory;
    let lastNestedCategory;
    for (const row of rows) {
      const category = row.category;
      // Assign new category if we find one
      if (category) {
        const splitted = category.split(".");
        // Check if nested or not
        if (splitted.length === 2) {
          lastCategory = splitted[0];
          lastNestedCategory = splitted[1];
        } else {
          lastCategory = category;
          lastNestedCategory = null;
        }
      }

      if (!row.key) {
        // Either this row has category key only or completely empty
        continue;
      }

      // Exist 2nd level
      if (lastCategory && lastNestedCategory) {
        final[lastCategory][lastNestedCategory] = {
          ...final[lastCategory][lastNestedCategory],
          [row.key]: { en: row.en, ar: row.ar },
        };
        // Exist 1st level only
      } else if (lastCategory) {
        final[lastCategory] = {
          ...final[lastCategory],
          [row.key]: { en: row.en, ar: row.ar },
        };
      }
      // Top Level
      else {
        final[row.key] = { ...final[row.key], en: row.en, ar: row.ar };
      }
    }
    return final;
  };

  const onSubmit = async (data: any) => {
    try {
      const map = {
        [data.key]: "key",
        [data.en]: "en",
        [data.ar]: "ar",
        ...(data.category && { [data.category]: "category" }),
      };

      const sheetParsed = parseInt(data.sheet);
      const parsed = await readXlsxFile(data.file[0], {
        map,
        sheet: isNaN(sheetParsed) ? data.sheet : sheetParsed,
      });
      if (parsed.errors.length) {
        throw parsed.errors;
      }
      console.log("parsed", parsed);
      const postProcessed = makeFinalObject(parsed.rows);
      console.log("postProcessed", postProcessed);
      setExcel(postProcessed);
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Step 1: Excel File</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Data</legend>
          <label htmlFor={"sheet"}>Sheet: </label>
          <input
            type="text"
            defaultValue={defaultSheetNumber}
            placeholder="Number 1,2,3"
            {...register("sheet", { required: true })}
          />
          <br /> <br />
          <label htmlFor={"category"}>Category Cell (optional): </label>
          <input
            type="text"
            defaultValue={defaultCategoryCell}
            placeholder="Cell Name"
            {...register("category")}
          />
          <br /> <br />
          <label htmlFor={"key"}>Key Cell: </label>
          <input
            type="text"
            defaultValue={defaultKeyCell}
            placeholder="Cell Name"
            {...register("key", { required: true })}
          />
          <br /> <br />
          <label htmlFor={"en"}>EN Cell: </label>
          <input
            type="text"
            defaultValue={defaultEnglishCell}
            placeholder="Cell Name"
            {...register("en", { required: true })}
          />
          <label htmlFor={"ar"}> AR Cell: </label>
          <input
            type="text"
            defaultValue={defaultArabicCell}
            placeholder="Cell Name"
            {...register("ar", { required: true })}
          />
          <br />
          <br />
          <input
            type="file"
            accept=".xlsx"
            {...register("file", { required: true })}
          />
          <br /> <br />
          {!_.isEmpty(errors) && <div>Required Fields</div>}
          <input type="submit" disabled={isSubmitting} />
        </fieldset>
      </form>
    </div>
  );
};
