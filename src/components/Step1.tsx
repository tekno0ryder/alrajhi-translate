import readXlsxFile from "read-excel-file";
import { useForm } from "react-hook-form";
import React from "react";

const schema = {
  "Error Code": {
    prop: "errorCode",
  },
  "Error Description": {
    prop: "en",
  },
  Arabic: {
    prop: "ar",
  },
};

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
      const parsed = await readXlsxFile(data.file[0], { schema: schema });
      if (parsed.errors.length) {
        throw parsed.errors;
      }
      setExcel(parsed.rows);
      console.log(parsed);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Step 1: Excel File</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          accept=".xlsx"
          {...register("file", { required: true })}
        />

        <br />
        <br />
        {/* errors will return when field validation fails  */}
        {errors.file && <div>This field is required</div>}
        <input type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};
