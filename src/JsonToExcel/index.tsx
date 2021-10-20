import React, { useState } from "react";
import { NestedObject } from "../types/Input";
import Step1 from "./Step1";

const JSToExcel = () => {
  // Step1
  const [excel, setExcel] = useState<NestedObject>();

  return (
    <>
      <Step1 />
    </>
  );
};

export default JSToExcel;
