import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AppContext } from "../context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Currency.css";

const Currency = () => {
  const { dispatch, currency } = useContext(AppContext);

  const handleSelect = (eventKey) => {
    dispatch({
      type: "CHG_CURRENCY",
      payload: eventKey,
    });
  };

  return (
    <div className="alert alert-link d-flex justify-content-start w-100 wrapper">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle
          size="lg"
          className="custom-dropdown-toggle"
          variant="success"
          id="dropdown-basic"
        >
          Select Currency: {currency}
        </Dropdown.Toggle>

        <Dropdown.Menu className="custom-dropdown-menu">
          <Dropdown.Item className="custom-dropdown-item" eventKey="£">
            £ Pound
          </Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item" eventKey="$">
            $ Dollar
          </Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item" eventKey="€">
            € Euro
          </Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item" eventKey="₹">
            ₹ Rupee
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Currency;
