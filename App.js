import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './context/LanguageContext';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import CameraScreen from './screens/CameraScreen';
import TextInputScreen from './screens/TextInputScreen';
import PurposeScreen from './screens/PurposeScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown:false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="TextInput" component={TextInputScreen} />
          <Stack.Screen name="Purpose" component={PurposeScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}