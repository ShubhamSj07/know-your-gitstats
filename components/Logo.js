import React from "react";
import Image from "next/image";
import logo from "../public/images/logo.svg";

const Logo = props => {
  return (
    <Image src={logo} alt="logo" height={props.height} width={props.width} />
  );
};

export default Logo;
