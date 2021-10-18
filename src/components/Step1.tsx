import readXlsxFile from "read-excel-file";
import { useForm } from "react-hook-form";
import React from "react";
import { isNaN } from "lodash";
import _ from "lodash";
import { ExcelType } from "../types/Input";

type PropsType = {
  setExcel: Function;
};

export const Step1 = ({ setExcel }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const postProcess = (rows: ExcelType[]) => {
    const final: any = {};
    let lastService;
    for (const row of rows) {
      const service = row.service?.trim();

      // Assign new serive if we find one
      if (service) {
        lastService = service;
      }

      if (lastService) {
        final[lastService] = {
          ...final[lastService],
          [row.key]: { en: row.en, ar: row.ar },
        };
      } else {
        final[row.key] = { ...final[row.key], en: row.en, ar: row.ar };
      }
    }
    console.log("final", final);
  };

  const onSubmit = async (data: any) => {
    try {
      const map = {
        Service: "service",
        Key: "key",
        English: "en",
        Arabic: "ar",
      };
      const sheetParsed = parseInt(data.sheet);
      const parsed = await readXlsxFile(data.file[0], {
        map,
        sheet: isNaN(sheetParsed) ? data.sheet : sheetParsed,
      });
      if (parsed.errors.length) {
        throw parsed.errors;
      }
      const postProcessed = postProcess(parsed.rows as ExcelType[]);
      setExcel(postProcessed);
      console.log(parsed);
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
            placeholder="Name or Number 1,2,3"
            {...register("sheet", { required: true })}
          />
          <br /> <br />
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
