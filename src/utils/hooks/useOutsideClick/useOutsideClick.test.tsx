import { useRef } from "react";
import { vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import useOutsideClick from ".";

describe("useOutsideClick", () => {
  it("call callback when clicking outside the element", () => {
    const handleOutsideClick = vi.fn();

    const TestComponent = () => {
      const ref = useRef(null);
      useOutsideClick(ref, handleOutsideClick);

      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside element
          </div>
          <div data-testid="outside">Outside element</div>
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    fireEvent.mouseDown(getByTestId("inside"));
    expect(handleOutsideClick).not.toHaveBeenCalled();

    fireEvent.mouseDown(getByTestId("outside"));
    expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  });
});
