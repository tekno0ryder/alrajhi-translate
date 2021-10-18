import React from "react";
import { useForm } from "react-hook-form";

type PropsType = {
  setInputObject: Function;
};

export const Step2 = ({ setInputObject }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ inputObject }: any) => {
    try {
      let en;
      eval("en =" + inputObject);
      setInputObject(en);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  return (
    <div>
      <h2>Step 2: Input JS Object</h2>
      <p>We're going to eval() your object to our variable (let en)</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          defaultValue={"{}"}
          rows={30}
          style={{ fontSize: "1rem", width: "80%" }}
          {...register("inputObject", { required: true })}
        />

        {/* errors will return when field validation fails  */}
        {errors.inputObject && <div>This field is required</div>}
        <br />
        <input type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};
