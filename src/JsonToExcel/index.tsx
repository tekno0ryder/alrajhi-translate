import React, { useState } from "react";
import Step1 from "./Step1";

const JSToExcel = () => {
  return (
    <>
      <p>
        The purpose of this script is to take JS Objects (en,ar) and it will
        generate new excel sheet.
      </p>
      <i>supports up to 2 levels of nesting</i>
      <Step1 />
    </>
  );
};

export default JSToExcel;
