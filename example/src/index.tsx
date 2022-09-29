import { formatDate } from '@react-navigation/core';
import {
  createDrawerNavigator,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createURL } from 'expo-linking';
import * as React from 'react';
import { useEffect } from 'react';
import { InteractionManager, Text, View } from 'react-native';

const linking = {
  prefixes: [createURL('/')],
  config: {
    screens: {
      Feed: '/',
    },
  },
};

function Feed() {
  const status = useDrawerStatus();
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      // TODO:del
      console.log('deferred task', formatDate());
    });
  }, [status]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const legacy = true;
  return (
    <Drawer.Navigator
      defaultStatus="open"
      useLegacyImplementation={legacy}
      screenOptions={{
        headerShown: true,
        swipeEdgeWidth: 400,
        drawerStyle: {
          width: '100%',
        },
      }}
    >
      <Drawer.Screen name="Feed" component={Feed} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <MyDrawer />
    </NavigationContainer>
  );
}
