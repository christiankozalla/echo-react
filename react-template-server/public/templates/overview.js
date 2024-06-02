import React, { useState } from "react";
export default function Overview(props) {
  const [count, setCount] = useState(0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "Here are the props ", JSON.stringify(props)), /*#__PURE__*/React.createElement("div", null, "Count: ", count), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCount(count + 1)
  }, "+1"));
}