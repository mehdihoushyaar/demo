import { render, fireEvent, screen } from "@testing-library/react";
import Dropdown from ".";

test("renders dropdown with options and placeholder", () => {
  const onChangeMock = vi.fn();

  const options = [
    {
      name: "option1",
      label: "Option 1",
      isActive: true,
      onChange: onChangeMock,
    },
    { name: "option2", label: "Option 2", isActive: false, onChange: vi.fn() },
  ];

  const placeholder = "Select an option";
  const badge = "Badge Text";

  render(
    <Dropdown options={options} placeholder={placeholder} badge={badge} />
  );

  expect(screen.getByText(placeholder)).toBeInTheDocument();

  expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
  expect(screen.getByLabelText("Option 2")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button"));

  expect(screen.getByText("Option 1")).toBeVisible();
  expect(screen.getByText("Option 2")).toBeVisible();

  fireEvent.click(screen.getByLabelText("Option 1"));
  expect(onChangeMock).toHaveBeenCalled();
});
