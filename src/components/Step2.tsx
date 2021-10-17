import React from "react";
import { useForm } from "react-hook-form";
import readXlsxFile from "read-excel-file";
import * as JSON5 from "json5";

type PropsType = {
  setInputJson: Function;
};

export const Step2 = ({ setInputJson }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ inputJson }: any) => {
    try {
      let inputJsonWithoutComma;
      if (inputJson.endsWith(",")) {
        inputJsonWithoutComma = inputJson.replace(/.$/, "");
      }
      const parsed = JSON5.parse(inputJsonWithoutComma ?? inputJson);
      setInputJson(parsed);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  return (
    <div>
      <h2>Step 2: Input JSON</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder={"{}"}
          rows={30}
          style={{ width: "80%" }}
          {...register("inputJson", { required: true })}
        />

        {/* errors will return when field validation fails  */}
        {errors.inputJson && <div>This field is required</div>}
        <br />
        <input type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};
