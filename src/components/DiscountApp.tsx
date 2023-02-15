import NavBarComponent from "./siteBase/NavBarComponent";
import ControlDiscountAppComponent from "./ControlDiscountAppComponent";
import React from "react";

type Props = {};

const DiscountApp: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <NavBarComponent />
      <ControlDiscountAppComponent />
    </React.Fragment>
  );
};

export default DiscountApp;
