import React from "react";
import Step1 from "./Step1";

const JSToExcel = () => {
  return (
    <>
      <p>
        The purpose of this script is to take JS Objects (en,ar) and it will
        generate new excel sheet.
      </p>
      <ul>
        <li>Supports Up to 2 levels of nesting</li>
        <li>
          The reference is EN keys, i.e we will not add keys exist in Arabic but
          not in English in English
        </li>
      </ul>
      <Step1 />
    </>
  );
};

export default JSToExcel;
