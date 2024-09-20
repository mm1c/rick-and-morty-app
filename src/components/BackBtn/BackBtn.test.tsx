import { render, screen } from "@testing-library/react";
import BackBtn from "./BackBtn";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const renderBtn = () => {
  render(
    <BrowserRouter>
      <BackBtn />
    </BrowserRouter>
  );
};

describe("BackBtn", () => {
  // it("should be present in the DOM", () => {
  //   renderBtn();
  //   const button = screen.getByTestId("back_btn");
  //   expect(button).toBeInTheDocument();
  // });

  // it('should have a label "back"', () => {
  //   renderBtn();
  //   const button = screen.getByRole("button", { name: /back/i });
  //   expect(button).toBeInTheDocument();
  // });
});
