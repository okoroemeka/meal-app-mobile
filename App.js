import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import * as Fonts from 'expo-font';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import MealNavigator from './navigation/MealNavigator';
import mealReducer from './store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealReducer
});
const store = createStore(rootReducer);
const fetchFonts = () =>
  Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

export default function App() {
  const [fontLoading, setFontLoading] = useState(false);
  if (!fontLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoading(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MealNavigator />
    </Provider>
  );
}
