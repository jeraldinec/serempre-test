import {
    createBottomTabNavigator,
    createSwitchNavigator
} from "react-navigation";
import HomeNavigator from "./HomeNavigator";

const Tabs = createBottomTabNavigator(
    {
        Home: HomeNavigator
    }
);

export default createSwitchNavigator(
    { Tabs }
);
