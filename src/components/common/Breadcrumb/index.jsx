import { Heading } from "..";
import React from "react";

export default function Breadcrumb({ ...props }) {
  return (
    <div
      {...props}
      className={`${props.className} container-xs flex items-center md:p-5`}
    >
      <Heading
        size="headingmd"
        as="p"
        className="!font-montserrat !font-semibold"
      >
        <span className="font-outfit font-light text-black-900">Home</span>
        <span className="font-outfit font-light text-black-900">&nbsp;/</span>
        <span className="font-outfit font-normal text-black-900">&nbsp;</span>
        <span className="font-outfit font-medium text-black-900">
          Hair Care
        </span>
      </Heading>
    </div>
  );
}
