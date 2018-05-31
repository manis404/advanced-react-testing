import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import Root from "Root";
import App from "components/App";

beforeEach(() => {
  moxios.install();
  moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
    status: 200,
    response: [{ name: "fetched1" }, { name: "fetched2" }]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it("can getch a list of comments and display them", done => {
  //attempt to render the *entire* applyMiddleware

  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  // find the 'fetchComments' button and click it.

  wrapped.find(".fetch-comments").simulate("click");
  //introduce a tiny little pause

  //expect to find a list of comments!
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find("li").length).toEqual(2);
    done();
    wrapped.unmount();
  }, 100);
});
