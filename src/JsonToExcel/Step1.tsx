import React from "react";
import { useForm } from "react-hook-form";
import { mapJSToExcel } from "../Util/mapping";
import { NestedObject } from "../types/Input";
import writeXlsxFile from "write-excel-file";

type propTypes = {};

const Step1 = ({}: propTypes) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ enInput, arInput }: any) => {
    try {
      let en: NestedObject = {};
      let ar: NestedObject = {};

      eval(`en = ${enInput}; ar = ${arInput}`);
      const mapped = mapJSToExcel(en!, ar!);

      await writeXlsxFile(mapped, {
        fileName: "JSToExcel.xlsx",
      });
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <>
      <h2>Step 1: Input JS Objects</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <code>let en = </code>
        <br />
        <textarea
          defaultValue={"{}"}
          rows={30}
          {...register("enInput", { required: true })}
        />
        {errors.en && <div>This field is required</div>}
        <br />
        <code>let ar = </code>
        <br />
        <textarea defaultValue={"{}"} rows={30} {...register("arInput")} />
        {/* errors will return when field validation fails  */}
        <br />
        <input type="submit" disabled={isSubmitting} />
      </form>
    </>
  );
};

export default Step1;
