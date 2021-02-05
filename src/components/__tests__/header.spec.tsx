import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import React from "react";
import { Header } from "../header";

describe("<Header />", () => {
  it("should render OK", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
  });
});
