import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CastingScreen from '../screens/CastingScreen';
import SceneCreatorScreen from '../screens/SceneCreatorScreen';
import PosterCreatorScreen from '../screens/PosterCreatorScreen';

export type RootStackParamList = {
  Home: undefined;
  Casting: undefined;
  SceneCreator: { selectedActors: string[] };
  PosterCreator: { selectedActors: string[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2c3e50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'AI Movie Cast' }}
        />
        <Stack.Screen 
          name="Casting" 
          component={CastingScreen} 
          options={{ title: 'Select Cast' }}
        />
        <Stack.Screen 
          name="SceneCreator" 
          component={SceneCreatorScreen} 
          options={{ title: 'Create Scene' }}
        />
        <Stack.Screen 
          name="PosterCreator" 
          component={PosterCreatorScreen} 
          options={{ title: 'Create Poster' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
