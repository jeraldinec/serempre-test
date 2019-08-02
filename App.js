import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./src/screens/home"

const AppNavigator = createStackNavigator(
    {
        Home
    },
    {
        defaultNavigationOptions: {
            header: null
        },
        initialRouteName: "Home",
    }
);

export default createAppContainer(AppNavigator);
