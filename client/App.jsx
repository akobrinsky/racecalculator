import React, { Component } from "react";
import UserRaces from "./Components/UserRaces";

export default class App extends React.Component {
  render() {
    const testID = "VXNlcjoz";
    return (
      <div>
        <UserRaces userID={testID} />
      </div>
    );
  }
}
