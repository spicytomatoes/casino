import React from "react";
import { shallow } from "enzyme";
import HomePage from "../../components/HomePage";

test("should render home page", () => {
  const wrapper = shallow(<HomePage />);
  expect(wrapper).toMatchSnapshot();
});
