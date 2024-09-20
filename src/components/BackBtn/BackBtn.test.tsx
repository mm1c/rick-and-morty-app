
import { render, screen } from "@testing-library/react";
import BackBtn from "./BackBtn";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("BackBtn", () => {
  it('should be present in the DOM', () => {
    render(
      <BrowserRouter>
        <BackBtn />
      </BrowserRouter>
    );

    const button = screen.getByTestId("back_btn");
    expect(button).toBeInTheDocument();
  });
});
