import { useState } from "react";
import PropTypes from "prop-types";
// import PropTypes from "prop-types";

TextExpander.prototype = {
  collapsedNumberWOrd: PropTypes.number,
};

export default function TextExpander({
  collapsedNumberWOrd = 10,
  expanded = false,
  color = "green",
  padding = 0,
  buttonText = ["Show More", "Show Less"],
  children,
}) {
  const [isExpanded, setHide] = useState(expanded);

  const container = {
    padding: `${padding}px`,
    border: "1px solid",
  };
  const ShowButton = {
    color,
    cursor: "pointer",
  };

  const displayText = isExpanded
    ? children
    : children.split(" ").splice(0, collapsedNumberWOrd).join(" ") + "...";
  return (
    <div style={container}>
      <span>{displayText}</span>
      <button style={ShowButton} onClick={() => setHide(!isExpanded)}>
        {isExpanded ? buttonText[1] : buttonText[0]}
      </button>
    </div>
  );
}
