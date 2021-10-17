import readXlsxFile from "read-excel-file";
import { useForm } from "react-hook-form";
import React from "react";
import { isNaN } from "lodash";
import _ from "lodash";

type PropsType = {
  setExcel: Function;
};

export const Step1 = ({ setExcel }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const schema = {
        [data.key]: {
          prop: "key",
        },
        [data.en]: {
          prop: "en",
        },
        [data.ar]: {
          prop: "ar",
        },
      };
      const sheetParsed = parseInt(data.sheet);
      const parsed = await readXlsxFile(data.file[0], {
        schema: schema,
        sheet: isNaN(sheetParsed) ? data.sheet : sheetParsed,
      });
      if (parsed.errors.length) {
        throw parsed.errors;
      }
      setExcel(parsed.rows);
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
          <label htmlFor={"Key: "}>Key: </label>
          <input
            type="text"
            placeholder="Cell Name"
            {...register("key", { required: true })}
          />
          <br /> <br />
          <label htmlFor={"en"}>EN: </label>
          <input
            type="text"
            placeholder="Cell Name"
            {...register("en", { required: true })}
          />
          <label htmlFor={"ar"}> AR: </label>
          <input
            type="text"
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
