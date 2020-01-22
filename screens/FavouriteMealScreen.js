import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const FavouriteMealScreen = props => {
  const favMeals = useSelector(state => state.meals.favouriteMeals);
  if (!favMeals || favMeals.length == 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No favourite meal yet, start adding some!</DefaultText>
      </View>
    );
  }
  return <MealList listData={favMeals} navigation={props.navigation} />;
};
FavouriteMealScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Your Favourites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default FavouriteMealScreen;
