import { View, Text } from 'react-native';
import { useEffect } from 'react';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2500);
  }, []);

  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#003847'
    }}>
      <Text style={{ fontSize:32, color:'white', fontWeight:'bold' }}>
        MediSafe AI
      </Text>
      <Text style={{ color:'#cbd5e1', marginTop:10 }}>
        Smart Supplement Analyzer
      </Text>
    </View>
  );
}