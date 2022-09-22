import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlackJackScreen from './blackjackCompontens/blackJackScreen';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';


function HomeScreen() {
  const navigation = useNavigation()
  return (
    <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Play BlackJack</Text>
    <Button onPress={() => navigation.navigate('BlackJack')} > BlackJack </Button>
    <Text>Play war</Text>
    <Button onPress={() => navigation.navigate('War')} > War </Button>
  </Layout>
  )
}


function WarScreen() {
  return (
    <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>War game screen</Text>
    </Layout>
  );
}

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BlackJack" component={BlackJackScreen} />
          <Stack.Screen name="War" component={WarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}




/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
