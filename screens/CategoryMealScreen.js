import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = props => {
  const catId = props.navigation.getParam('categoryItemId');
  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(meal =>
    meal.catogoryId.includes(catId)
  );
  if (displayedMeals.length == 0) {
    return (
      <View style={styles.content}>
        <DefaultText>
          there are no meals to display, please check your filters.
        </DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData => {
  const item = CATEGORIES.find(
    item => item.id === navigationData.navigation.getParam('categoryItemId')
  );
  return {
    headerTitle: item.title
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default CategoryMealScreen;
