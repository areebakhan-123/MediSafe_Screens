import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
// 1. Context import kiya
import { useLanguage } from '../context/LanguageContext';

export default function PurposeScreen({ navigation, route }) {
  // 2. Language context se value li
  const { isUrdu } = useLanguage();
  const [purpose, setPurpose] = useState('');
  const { images } = route.params || {}; 

  // Multi-language labels
  const content = {
    title: isUrdu ? "اپنا مقصد بتائیں" : "Define Your Goal",
    subtitle: isUrdu ? "آپ یہ سپلیمنٹ کیوں لے رہے ہیں؟ اس سے ہماری AI کو آپ کے لیے بہتر تجزیہ کرنے میں مدد ملے گی۔" : "Why are you taking this supplement? This helps our AI tailor the safety analysis for you.",
    inputLabel: isUrdu ? "دیگر وجہ (اختیاری)" : "Custom Reason (Optional)",
    placeholder: isUrdu ? "مثلاً ڈاکٹر کے مشورے پر..." : "e.g. Recommended by my doctor...",
    btnAnalyze: isUrdu ? "تجزیہ شروع کریں" : "Analyze Supplement",
    btnCurious: isUrdu ? "میں صرف معلومات چاہتا ہوں" : "I'm just checking/curious",
    general: isUrdu ? "عمومی معلومات" : "General Information",
    wellness: isUrdu ? "صحت کا جائزہ" : "General Wellness Check"
  };

  const QUICK_REASONS = isUrdu ? [
    "قوت مدافعت", "بہتر نیند", "توانائی اور توجہ", 
    "ہڈیوں کی صحت", "پٹھوں کی بحالی", "روزمرہ تندرستی"
  ] : [
    "Immunity Boost", "Better Sleep", "Energy & Focus", 
    "Bone Health", "Muscle Recovery", "Daily Wellness"
  ];

  const handleAnalyze = (finalPurpose) => {
    navigation.navigate('Result', { 
      purpose: finalPurpose || content.wellness, 
      images 
    });
  };

  return (
    <View style={styles.container}>
      <Header title="MediSafe AI" backgroundColor="#003847" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.progressRow}>
            <View style={[styles.progressStep, styles.stepActive]} />
            <View style={[styles.progressStep, styles.stepActive]} />
            <View style={styles.progressStep} />
          </View>

          <Text style={[styles.title, isUrdu && { textAlign: 'right' }]}>{content.title}</Text>
          <Text style={[styles.subtitle, isUrdu && { textAlign: 'right' }]}>
            {content.subtitle}
          </Text>

          <View style={[styles.chipContainer, isUrdu && { flexDirection: 'row-reverse' }]}>
            {QUICK_REASONS.map((reason) => (
              <TouchableOpacity 
                key={reason} 
                style={[
                  styles.chip, 
                  purpose === reason && styles.chipSelected
                ]}
                onPress={() => setPurpose(reason)}
              >
                <Text style={[
                  styles.chipText, 
                  purpose === reason && styles.chipTextSelected
                ]}>{reason}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={[styles.inputLabel, isUrdu && { textAlign: 'right', marginRight: 5 }]}>{content.inputLabel}</Text>
            <TextInput
              placeholder={content.placeholder}
              placeholderTextColor="#94a3b8"
              value={purpose}
              onChangeText={setPurpose}
              multiline
              numberOfLines={3}
              style={[styles.textInput, isUrdu && { textAlign: 'right' }]}
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => handleAnalyze(purpose)}
            >
              <Text style={styles.primaryButtonText}>{content.btnAnalyze}</Text>
              <Ionicons name="analytics" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => handleAnalyze(content.general)}
            >
              <Text style={styles.secondaryButtonText}>{content.btnCurious}</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  content: { padding: 25 },
  progressRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
  progressStep: { width: 40, height: 6, borderRadius: 3, backgroundColor: '#e2e8f0', marginHorizontal: 4 },
  stepActive: { backgroundColor: '#0B3C5D' },
  title: { fontSize: 26, fontWeight: '800', color: '#1e293b', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#64748b', lineHeight: 22, marginBottom: 30 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  chip: { 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    marginRight: 10, 
    marginBottom: 10,
    backgroundColor: '#f8fafc'
  },
  chipSelected: { backgroundColor: '#0B3C5D', borderColor: '#0B3C5D' },
  chipText: { color: '#475569', fontSize: 14, fontWeight: '600' },
  chipTextSelected: { color: 'white' },
  inputWrapper: { marginBottom: 30 },
  inputLabel: { fontSize: 13, fontWeight: 'bold', color: '#94a3b8', marginBottom: 8, marginLeft: 5 },
  textInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#1e293b',
    textAlignVertical: 'top',
    height: 100,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  buttonGroup: { marginTop: 10 },
  primaryButton: { 
    backgroundColor: '#003847', 
    flexDirection: 'row',
    padding: 18, 
    borderRadius: 18, 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 3
  },
  primaryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 10 },
  secondaryButton: { 
    padding: 18, 
    marginTop: 10,
    alignItems: 'center' 
  },
  secondaryButtonText: { color: '#64748b', fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }
});