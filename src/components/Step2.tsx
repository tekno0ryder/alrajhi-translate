import React from "react";
import { useForm } from "react-hook-form";
import readXlsxFile from "read-excel-file";
import * as JSON5 from "json5";

type PropsType = {
  setErrorCodes: Function;
};

export const Step2 = ({ setErrorCodes }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ errorCodes }: any) => {
    try {
      let errorCodesWithoutComma;
      if (errorCodes.endsWith(",")) {
        errorCodesWithoutComma = errorCodes.replace(/.$/, "");
      }
      const parsed = JSON5.parse(errorCodesWithoutComma ?? errorCodes);
      setErrorCodes(parsed);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  return (
    <div>
      <h2>Step 2: Error Codes JSON</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder={"{}"}
          rows={30}
          style={{ width: "80%" }}
          {...register("errorCodes", { required: true })}
        />

        {/* errors will return when field validation fails  */}
        {errors.errorCodes && <div>This field is required</div>}
        <br />
        <input type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};
