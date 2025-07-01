import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CityCard from "../components/card/CityCard";

describe("CityCard", () => {
  it("render the city name", () => {
    const { getByText } = render(
      <CityCard city="Rome" country="Italy" imageURL={""} />,
    );
    expect(getByText("Rome")).toBeTruthy();

    expect(getByText("Italy")).toBeTruthy();
  });

  it("calls onPress when tapped", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <CityCard
        city="Rome"
        country="Italy"
        imageURL={require("@/assets/images/cities/rome.jpg")}
        onPress={onPress}
      />,
    );
    fireEvent.press(getByTestId("city-card"));
    expect(onPress).toHaveBeenCalled();
  });

  it("show check icon only when selected is true", () => {
    const { queryByTestId, rerender } = render(
      <CityCard
        city="Rome"
        country="Italy"
        imageURL={require("@/assets/images/cities/rome.jpg")}
        selected={false}
      />,
    );
    expect(queryByTestId("check-icon")).toBeNull();

    rerender(
      <CityCard
        city="Rome"
        country="Italy"
        imageURL={require("@/assets/images/cities/rome.jpg")}
        selected={true}
      />,
    );
    expect(queryByTestId("check-icon")).toBeTruthy();
  });

  it("check Image source prop receives the correct value", () => {
    const imageURL = require("@/assets/images/cities/rome.jpg");
    const { getByTestId } = render(
      <CityCard
        city="Rome"
        country="Italy"
        imageURL={imageURL}
        selected={false}
      />,
    );
    const image = getByTestId("city-image");
    expect(image.props.source).toStrictEqual(imageURL);
  });
});
