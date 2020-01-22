import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoryScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavouriteMealScreen from '../screens/FavouriteMealScreen';
import FiltersScreen from '../screens/FiltersScreen';
import colors from '../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? '' : colors.primaryColor
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'ios' ? colors.primaryColor : 'white'
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealScreen
    },
    MealDetails: MealDetailScreen
  },
  {
    // mode: 'modal',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavNavigator = createStackNavigator(
  {
    Favourites: FavouriteMealScreen,
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const tabConfig = {
  meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabarInfo => {
        return (
          <Ionicons
            name="ios-restaurant"
            size={25}
            color={tabarInfo.tintColor}
          />
        );
      },
      tabBarColor: colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        ) : (
          'Meals'
        )
    }
  },
  favouriteScreen: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabarInfo => {
        return (
          <Ionicons name="ios-star" size={25} color={tabarInfo.tintColor} />
        );
      },
      tabBarColor: colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Favourites</Text>
        ) : (
          'Favourites'
        )
    }
  }
};
const tabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabConfig, {
        activeColor: 'white',
        shifting: true
      })
    : createBottomTabNavigator(tabConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans-bold'
          },
          activeTintColor: colors.accentColor
        }
      });
const FilterNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: tabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals'
      }
    },
    Filters: FilterNavigator
  },
  {
    contentOptions: {
      activeTintColor: colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);
export default createAppContainer(MainNavigator);
