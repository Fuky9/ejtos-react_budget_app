import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { remaining, currency } = useContext(AppContext);

  return (
    <div className={"alert alert-primary"}>
      <span>
        Remaining: {currency}
        {remaining}
      </span>
    </div>
  );
};

export default Remaining;
