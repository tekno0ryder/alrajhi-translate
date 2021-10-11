import React from "react";
import { useForm } from "react-hook-form";
import readXlsxFile from "read-excel-file";
import { StepWizardChildProps } from "react-step-wizard";
import * as JSON5 from "json5";
type PropsType = {
  setErrorCodes: Function;
} & StepWizardChildProps;

export const Step2 = ({ setErrorCodes, nextStep }: PropsType) => {
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
      nextStep();
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        <textarea
          placeholder={"{}"}
          rows={30}
          style={{ width: "80%" }}
          {...register("errorCodes", { required: true })}
        />
        <p>
          <b>Note: </b> Feel free to add extra keys not in the excel file, i
          won't remove them!
        </p>
        {/* errors will return when field validation fails  */}
        {errors.errorCodes && <div>This field is required</div>}
        <input type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};
