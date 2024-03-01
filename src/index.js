import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App_v1";
import StarRating from "./StarRating";
// import TextExpander from "./textExpander";
const root = ReactDOM.createRoot(document.getElementById("root"));
function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating
        maxRating={5}
        size={50}
        messages={["Terriable", "bad", "okay", "Good", "Amazing"]}
        defaultRating={3}
        onSet={setMovieRating}
      />
      <p>This Movie was rated {movieRating} stars</p>
    </div>
  );
}
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      size={30}
      messages={["Terriable", "bad", "okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <Test /> */}
    {/* <TextExpander
      expanded={true}
      collapsedNumberWOrd={2}
      buttonText={["Show Text", "Collapse"]}
      padding={10}
      color="red"
    >
      Instead, it will copy all the configuration files and the transitive
      dependencies (webpack, Babel, ESLint, etc) right into your project so you
      have full control over them. All of the commands except `eject` will still
      work, but they will point to the copied scripts so you can tweak them. At
      this point you're on your own.
    </TextExpander> */}
  </React.StrictMode>
);
