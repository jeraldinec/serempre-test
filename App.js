import React, { Fragment, PureComponent } from "react";
import AppNavigator from "./src/navigation";

export default class App extends PureComponent<Props> {
  render() {
    return (
        <Fragment>
          <AppNavigator />
        </Fragment>
    );
  }
}
