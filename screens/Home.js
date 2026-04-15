import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech'; 
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext'; 

const { width } = Dimensions.get('window');

const THEME = {
  header: '#003847',      
  primary: '#003847',     
  secondary: '#00897B',   
  background: '#F8FAFB',  
  textMain: '#003847',    
  textMuted: '#64748B',   
  cardWhite: '#FFFFFF',
  border: '#E2E8F0',
};

const INSIGHTS = [
  { 
    id: '1', 
    title: { en: 'Smart Synergy', ur: 'ذہین اشتراک' },
    subtitle: { en: 'Vitamin D3 + K2', ur: 'وٹامن ڈی 3 + کے 2' },
    desc: { en: 'Taking these together helps calcium reach your bones instead of arteries.', ur: 'ان دونوں کو اکٹھے لینے سے کیلشیم شریانوں کے بجائے ہڈیوں تک پہنچتا ہے۔' },
    icon: 'shield-checkmark', color: '#003847' 
  },
  { 
    id: '2', 
    title: { en: 'Iron Alert', ur: 'آئرن الرٹ' },
    subtitle: { en: 'Avoid Calcium', ur: 'کیلشیم سے پرہیز کریں' },
    desc: { en: 'Dairy can block iron absorption. Space them out by at least 2 hours.', ur: 'دودھ والی اشیاء آئرن کے جذب ہونے میں رکاوٹ بن سکتی ہیں۔' },
    icon: 'warning', color: '#005366' 
  },
];

export default function Home({ navigation }) {
  // 2. Local useState ko hata kar Global Context use kiya
  const { isUrdu, toggleLanguage } = useLanguage(); 
  const [activeInsight, setActiveInsight] = useState(0);
  const [isHighContrast, setIsHighContrast] = useState(false); 

  const today = new Date();
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = today.toLocaleDateString(undefined, dateOptions);

  const handleVoiceGuidance = async () => {
    const isSpeaking = await Speech.isSpeakingAsync();
    
    if (isSpeaking) {
      Speech.stop(); 
    } else {
      const textToSpeak = isUrdu 
        ? `${content.welcome}. ${content.summary}. آج کی معلومات: ${INSIGHTS[activeInsight].desc.ur}`
        : `${content.welcome}. ${content.summary}. Today's insight: ${INSIGHTS[activeInsight].desc.en}`;
      
      Speech.speak(textToSpeak, {
        language: isUrdu ? 'ur-PK' : 'en-US',
        pitch: 1.0,
        rate: 0.8, 
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveInsight((prev) => (prev === INSIGHTS.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const content = {
    welcome: isUrdu ? "میڈیسیف ڈیش بورڈ" : "MEDISAFE AI DASHBOARD",
    summary: isUrdu ? " صحت کا جائزہ" : "Health Overview",
    search: isUrdu ? "دوا یا سپلیمنٹ تلاش کریں..." : "Search medications or supplements...",
    scan: isUrdu ? "لیبل اسکین کریں" : "Scan Label",
    scanSub: isUrdu ? "مصنوعی ذہانت کا تجزیہ" : "AI Analysis",
    history: isUrdu ? "ریکارڈ دیکھیں" : "My History",
    historySub: isUrdu ? "پرانی رپورٹس" : "View Logs",
    insightHeader: isUrdu ? "طبی معلومات" : "CLINICAL INSIGHT",
    disclaimer: isUrdu ? "طبی دستبرداری: یہ معلومات تعلیمی مقصد کے لیے ہیں۔ ڈاکٹر سے مشورہ ضرور کریں۔" : "Medical Disclaimer: Data is for educational use. Consult a doctor for clinical advice."
  };

  return (
    <View style={{ flex: 1, backgroundColor: isHighContrast ? '#FFFFFF' : THEME.background }}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.header} />
      
      {/* Navbar ka background color yahan se control ho raha hai */}
      <Header title="MediSafe AI" backgroundColor={THEME.header} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          <View style={[styles.topAccessBar, isUrdu && { flexDirection: 'row-reverse' }]}>
            {/* 3. Button par toggleLanguage call kiya */}
            <TouchableOpacity style={styles.langToggle} onPress={toggleLanguage}>
              <Text style={styles.langText}>{isUrdu ? "English" : "اردو"}</Text>
            </TouchableOpacity>
            
            <View style={styles.accessIcons}>
              <TouchableOpacity style={styles.iconCircleSmall} onPress={handleVoiceGuidance}>
                <Ionicons name="volume-high" size={20} color={THEME.header} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.iconCircleSmall, isHighContrast && {backgroundColor: THEME.header}]} 
                onPress={() => setIsHighContrast(!isHighContrast)}
              >
                <Ionicons name="eye" size={20} color={isHighContrast ? 'white' : THEME.header} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerTitleRow}>
            <View style={{ alignItems: isUrdu ? 'flex-end' : 'flex-start', width: '100%' }}>
              <Text style={styles.dateLabel}>{formattedDate.toUpperCase()}</Text>
              <Text style={styles.welcomeLabel}>{content.welcome}</Text>
              <Text style={[styles.mainTitle, isHighContrast && {color: '#000'}]}>{content.summary}</Text>
            </View>
          </View>

          <View style={[styles.searchContainer, isUrdu && { flexDirection: 'row-reverse' }]}>
            <Ionicons name="search-outline" size={22} color={THEME.textMuted} />
            <TextInput
              style={[styles.searchInput, { textAlign: isUrdu ? 'right' : 'left' }]}
              placeholder={content.search}
              placeholderTextColor="#94A3B8"
            />
            <Ionicons name="mic" size={22} color={THEME.secondary} />
          </View>

          <View style={styles.carouselContainer}>
            <View style={[styles.premiumCard, { backgroundColor: INSIGHTS[activeInsight].color }]}>
              <View style={[styles.cardHeader, isUrdu && { flexDirection: 'row-reverse' }]}>
                <Ionicons name={INSIGHTS[activeInsight].icon} size={20} color="white" />
                <Text style={[styles.cardLabel, { [isUrdu ? 'marginRight' : 'marginLeft']: 10 }]}>{content.insightHeader}</Text>
              </View>
              <Text style={[styles.cardTitle, { textAlign: isUrdu ? 'right' : 'left' }]}>{isUrdu ? INSIGHTS[activeInsight].title.ur : INSIGHTS[activeInsight].title.en}</Text>
              <Text style={[styles.cardSubtitle, { textAlign: isUrdu ? 'right' : 'left' }]}>{isUrdu ? INSIGHTS[activeInsight].subtitle.ur : INSIGHTS[activeInsight].subtitle.en}</Text>
              <Text style={[styles.cardDesc, { textAlign: isUrdu ? 'right' : 'left' }]}>{isUrdu ? INSIGHTS[activeInsight].desc.ur : INSIGHTS[activeInsight].desc.en}</Text>
              
              <View style={[styles.dotRow, isUrdu && { alignSelf: 'flex-end' }]}>
                {INSIGHTS.map((_, i) => (
                  <View key={i} style={[styles.dot, { width: i === activeInsight ? 12 : 6, opacity: i === activeInsight ? 1 : 0.4 }]} />
                ))}
              </View>
            </View>
          </View>

          <View style={[styles.actionRow, isUrdu && { flexDirection: 'row-reverse' }]}>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: THEME.header }]} onPress={() => navigation.navigate('Camera')}>
              <View style={styles.iconCircleLarge}>
                <MaterialCommunityIcons name="camera-plus" size={32} color={THEME.header} />
              </View>
              <Text style={styles.actionTitle}>{content.scan}</Text>
              <Text style={styles.actionSub}>{content.scanSub}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCardWhite} onPress={() => navigation.navigate('History')}>
              <View style={[styles.iconCircleLarge, { backgroundColor: '#F1F5F9' }]}>
                <MaterialCommunityIcons name="clipboard-list" size={32} color={THEME.header} />
              </View>
              <View style={{ alignItems: isUrdu ? 'flex-end' : 'center', width: '100%' }}>
                <Text style={[styles.actionTitle, { color: isHighContrast ? '#000' : THEME.textMain }]}>{content.history}</Text>
                <Text style={[styles.actionSub, { color: THEME.textMuted }]}>{content.historySub}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.disclaimerBox, isUrdu && { flexDirection: 'row-reverse' }]}>
            <Ionicons name="information-circle" size={18} color={THEME.secondary} />
            <Text style={[styles.disclaimerText, { textAlign: isUrdu ? 'right' : 'left', [isUrdu ? 'marginRight' : 'marginLeft']: 10 }]}>
              {content.disclaimer}
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  topAccessBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  langToggle: { backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: THEME.border },
  langText: { fontWeight: 'bold', color: THEME.header, fontSize: 13 },
  accessIcons: { flexDirection: 'row' },
  iconCircleSmall: { backgroundColor: 'white', width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 10, borderWidth: 1, borderColor: THEME.border },
  headerTitleRow: { marginBottom: 20 },
  dateLabel: { fontSize: 10, fontWeight: '700', color: THEME.textMuted, marginBottom: 2 },
  welcomeLabel: { fontSize: 13, fontWeight: '900', color: THEME.secondary, letterSpacing: 1 },
  mainTitle: { fontSize: 26, fontWeight: '800', color: THEME.textMain },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 15, borderRadius: 15, height: 58, borderWidth: 1, borderColor: THEME.border, marginBottom: 25 },
  searchInput: { flex: 1, marginHorizontal: 10, fontSize: 15, color: THEME.textMain },
  carouselContainer: { marginBottom: 30 },
  premiumCard: { padding: 22, borderRadius: 24, minHeight: 180, elevation: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardLabel: { color: 'white', fontSize: 11, fontWeight: '900' },
  cardTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  cardSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 8, fontWeight: '600' },
  cardDesc: { color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 18 },
  dotRow: { flexDirection: 'row', marginTop: 15, alignItems: 'center' },
  dot: { height: 4, borderRadius: 2, backgroundColor: 'white', marginRight: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  actionCard: { width: '48%', paddingVertical: 22, borderRadius: 24, alignItems: 'center', elevation: 3 },
  actionCardWhite: { width: '48%', paddingVertical: 22, borderRadius: 24, backgroundColor: 'white', borderWidth: 1, borderColor: THEME.border, alignItems: 'center' },
  iconCircleLarge: { width: 60, height: 60, borderRadius: 18, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  actionTitle: { color: 'white', fontWeight: '800', fontSize: 16 },
  actionSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
  disclaimerBox: { padding: 18, backgroundColor: '#E0F2F1', borderRadius: 15, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: THEME.secondary },
  disclaimerText: { flex: 1, fontSize: 11, color: THEME.textMain, lineHeight: 16, fontWeight: '600' },
});