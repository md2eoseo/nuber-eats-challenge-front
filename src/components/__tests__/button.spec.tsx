import { render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

describe("<Button />", () => {
  it("should render OK with props", () => {
    const { getByText, rerender, container } = render(
      <Button canClick={true} loading={false} actionText={"test"} />
    );
    getByText("test");
    rerender(<Button canClick={true} loading={true} actionText={"test"} />);
    getByText("test...");
    rerender(<Button canClick={false} loading={true} actionText={"test"} />);
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
