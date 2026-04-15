import { View, Text, TouchableOpacity } from 'react-native';

export default function Header({ title, navigation }) {
  return (
    <View style={{
      flexDirection:'row',
      alignItems:'center',
      paddingTop:50,
      paddingBottom:15,
      paddingHorizontal:15,
      backgroundColor:'#003847'
    }}>

      {/* BACK BUTTON */}
      {navigation && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color:'white', fontSize:18 }}>←</Text>
        </TouchableOpacity>
      )}

      {/* TITLE */}
      <Text style={{
        color:'white',
        fontSize:18,
        fontWeight:'bold',
        marginLeft:10
      }}>
        {title}
      </Text>

    </View>
  );
}