import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { useLanguage } from '../context/LanguageContext';

export default function TextInputScreen({ navigation }) {

  const { isUrdu } = useLanguage();
  const [text, setText] = useState('');

  // Labels for localization
  const content = {
    title: isUrdu ? "سپلیمنٹ تلاش کریں" : "Search Supplement",
    placeholder: isUrdu ? "سپلیمنٹ کا نام لکھیں..." : "Enter supplement name...",
    button: isUrdu ? "آگے بڑھیں" : "Continue"
  };

  return (
    <View style={{ flex:1, padding:20, marginTop:60 }}>

      {/* HEADER */}
      <Text style={{ 
        fontSize:24, 
        fontWeight:'bold', 
        marginBottom:20, 
        textAlign: isUrdu ? 'right' : 'left' 
      }}>
        {content.title}
      </Text>

      <TextInput
        placeholder={content.placeholder}
        value={text}
        onChangeText={setText}
        style={{
          borderWidth:1,
          padding:15,
          borderRadius:15,
          textAlign: isUrdu ? 'right' : 'left',
          borderColor: '#e2e8f0'
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor:'#2563EB',
          padding:15,
          marginTop:20,
          borderRadius:15
        }}
        onPress={() => navigation.navigate('Purpose', { input:text })}
      >
        <Text style={{ color:'white', textAlign:'center', fontWeight: 'bold' }}>
          {content.button}
        </Text>
      </TouchableOpacity>

    </View>
  );
}