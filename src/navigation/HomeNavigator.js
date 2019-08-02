import React from "react";
import { createStackNavigator } from "react-navigation";
import Home from "../screens/home";

const black = "#333";
const grey = "#aaa";

const HomeNavigator = createStackNavigator(
    {
        Home
    },
    {
        defaultNavigationOptions: {
            header: null
        },
        initialRouteName: "Home",
        navigationOptions: {
            tabBarAccessibilityLabel: "Inicio",
            tabBarOptions: {
                activeTintColor: black,
                inactiveTintColor: grey
            }
        }
    }
);

export default HomeNavigator;
