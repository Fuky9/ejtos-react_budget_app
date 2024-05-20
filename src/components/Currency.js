import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Currency = () => {
  const { dispatch } = useContext(AppContext);

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch({
      type: "CHG_CURRENCY",
      payload: value,
    });
  };
  return (
    <select id="currency-choice" onChange={handleChange}>
      <option defaultValue value="£" name="£">
        £ Pound
      </option>
      <option value="$" name="$">
        $ Dollar
      </option>
      <option value="€" name="€">
        € Euro
      </option>
      <option value="₹" name="₹">
        ₹ Ruppee
      </option>
    </select>
  );
};

export default Currency;
