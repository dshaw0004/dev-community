import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {

  // const navigation = useNavigation()
  // return (
  //     <Stack 
  //     screenOptions={{
  //       title: 'Dev Community',
  //       headerRight: ()=> <TouchableOpacity onPress={()=>alert('not implemented')} hitSlop={46}><Icon source="tag" size={36} color={'black'}/></TouchableOpacity>
  //     }}>
  //       <Stack.Screen 
  //       name="[article]" 
  //       options={{
  //         title: 'Dev Community',
  //         headerLeft: () => (
  //           <TouchableOpacity hitSlop={25} onPress={()=> navigation.goBack()}><Icon source={'arrow-left'} size={25}/></TouchableOpacity>
  //         ),
  //         }}
  //        />
  //     </Stack>
  // );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer>
      <Drawer.Screen name='index'
        options={{
          title: 'Home'
        }}
      />
      <Drawer.Screen name='about'
        options={{
          title: 'About'
        }}
      />
    </Drawer>
    </GestureHandlerRootView>
  );
}