import {
  faCheckCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const SingleSettingComponent = ({
  className,
  icon,
  name,
  handleClick,
  input,
  defaultVal,
  Comp,
  onInputSave,
}) => {
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const [inputVal, setInputVal] = useState("");

  return (
    <div className={className} onClick={handleClick ? handleClick : () => {}}>
      <div className="name">
        <FontAwesomeIcon className="icon" icon={icon} />
        <h4>{name}</h4>
      </div>
      {input && (
        <div className="item-action">
          <input
            className="input"
            type={input}
            defaultValue={defaultVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setSaveBtnDisabled(false);
            }}
          />
          <FontAwesomeIcon
            className="save-icon"
            icon={faCheckCircle}
            curr={saveBtnDisabled.toString()}
            onClick={() => {
              setSaveBtnDisabled(true);
              onInputSave(inputVal);
            }}
            aria-disabled={saveBtnDisabled}
          />
        </div>
      )}
      {Comp && Comp}
      {!input && !Comp && <FontAwesomeIcon icon={faChevronRight} />}
    </div>
  );
};
