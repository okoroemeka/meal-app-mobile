import React, { useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  Image
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import { MEALS } from '../data/dummy-data';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavourite } from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};
const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const isVafouriteCurrentMeal = useSelector(state =>
    state.meals.favouriteMeals.some(meal => meal.id === mealId)
  );
  const mealItem = availableMeals.find(meal => meal.id === mealId);
  const dispatch = useDispatch();
  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);
  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
  }, [toggleFavouriteHandler]);
  useEffect(() => {
    props.navigation.setParams({ isFav: isVafouriteCurrentMeal });
  }, [isVafouriteCurrentMeal]);
  return (
    <ScrollView>
      <Image source={{ uri: mealItem.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{mealItem.duration}m</DefaultText>
        <DefaultText>{mealItem.affordability.toUpperCase()}</DefaultText>
        <DefaultText>{mealItem.complexity.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients </Text>
      {mealItem.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {mealItem.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFav = navigationData.navigation.getParam('toggleFav');
  const isFavMeal = navigationData.navigation.getParam('isFav');
  // const mealItem = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="favorite"
          iconName={isFavMeal ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFav}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10
  }
});

export default MealDetailScreen;
