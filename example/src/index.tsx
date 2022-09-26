import { useFocusEffect } from '@react-navigation/core';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createURL } from 'expo-linking';
import * as React from 'react';
import { useEffect } from 'react';
import { InteractionManager, Pressable, Text, View } from 'react-native';

const linking = {
  prefixes: [createURL('/')],
  config: {
    screens: {
      Home: '/',
      Feed: '/feed',
    },
  },
};

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function formatDate(date: Date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  const misc = date.getMilliseconds();
  return `${hour < 10 ? '0' + hour : hour}:${
    minute < 10 ? '0' + minute : minute
  }:${second < 10 ? '0' + second : second}.${misc}`;
}

type FeedProps = {
  navigation: DrawerNavigationProp<ParamListBase, string>;
};

function Feed(props: FeedProps) {
  useFocusEffect(() => {
    // TODO:del
    console.log('useFocusEffect', formatDate(new Date()));
  });
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      // TODO:del
      console.log('InteractionManager', formatDate(new Date()));
    });

    function handleEnd(e: { data: { closing: boolean } }) {
      // TODO:del
      console.log('transitionEnd', e.data.closing, formatDate(new Date()));
    }
    props.navigation.addListener('transitionEnd', handleEnd);
    return function cleanup() {
      props.navigation.removeListener('transitionEnd', handleEnd);
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

type HeaderProps = {
  title: string;
  navigation: DrawerNavigationProp<ParamListBase, string>;
};

function MyHeader(props: HeaderProps) {
  const back = () => {
    if (!props.navigation.canGoBack()) {
      return;
    }
    props.navigation.goBack();
  };

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        top: 40,
        height: 40,
        backgroundColor: 'white',
      }}
    >
      <Pressable
        onPress={back}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: 40,
        }}
      >
        <Text>&lt;</Text>
      </Pressable>
      <Text>{props.title}</Text>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      defaultStatus="open"
      initialRouteName="Home"
      useLegacyImplementation
      screenOptions={{
        headerShown: true,
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return <MyHeader navigation={navigation} title={title} />;
        },
        drawerStyle: {
          width: '100%',
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
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
