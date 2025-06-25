import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';


export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer>
      <Drawer.Screen name='home'
      
        options={{
          title: 'Dev Community'
        }}
      />
      <Drawer.Screen name='about'
        options={{
          title: 'About'
        }}
      />
      <Drawer.Screen
      name='index'
      options={{
        drawerItemStyle: {display: 'none'},
        title: 'Dev Community'
      }}
      />
      <Drawer.Screen
      name='+not-found'
      options={{
        drawerItemStyle: {display: 'none'}
      }}
      />

    </Drawer>
    </GestureHandlerRootView>
  );
}