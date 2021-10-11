import readXlsxFile from "read-excel-file";
import { useForm } from "react-hook-form";
import { StepWizardChildProps } from "react-step-wizard";

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
} & StepWizardChildProps;

export const Step1 = ({ nextStep, setExcel }: PropsType) => {
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
      nextStep();
      console.log(parsed);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
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
