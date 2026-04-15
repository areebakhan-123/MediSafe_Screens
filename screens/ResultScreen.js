import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions, LayoutAnimation, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
// 1. Context import kiya
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

export default function ResultScreen({ route, navigation }) {
  // 2. Language context se value li
  const { isUrdu } = useLanguage();
  const { purpose = "General Health" } = route.params || {};
  const [habitIndex, setHabitIndex] = useState(0);

  // Multi-language Rotating Suggestions
  const ROTATING_SUGGESTIONS = isUrdu ? [
    { task: "تازہ پانی کے ساتھ لیں", benefit: "معدے کو زنک تیزی سے جذب کرنے میں مدد دیتا ہے۔", icon: "water" },
    { task: "5 منٹ ہلکی ورزش کریں", icon: "body", benefit: "خون کے بہاؤ کو بڑھاتا ہے تاکہ غذائی اجزاء پٹھوں تک پہنچیں۔" },
    { task: "1 گھنٹے تک کیفین سے پرہیز", icon: "cafe", benefit: "کافی کو وٹامن جذب کرنے میں رکاوٹ ڈالنے سے روکتا ہے۔" },
    { task: "صحت بخش چکنائی کے ساتھ لیں", icon: "leaf", benefit: "سارا دن توانائی کی سطح کو مستحکم رکھنے میں مدد دیتا ہے۔" }
  ] : [
    { task: "Take with room-temp water", benefit: "Helps your stomach absorb Zinc faster.", icon: "water" },
    { task: "Go for a 5-min light stretch", icon: "body", benefit: "Boosts blood flow to carry nutrients to muscles." },
    { task: "Avoid caffeine for 1 hour", icon: "cafe", benefit: "Prevents coffee from blocking Vitamin absorption." },
    { task: "Pair with a healthy fat", icon: "leaf", benefit: "Helps stabilize energy levels throughout the day." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setHabitIndex((prev) => (prev + 1) % ROTATING_SUGGESTIONS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [ROTATING_SUGGESTIONS.length]);

  // Content Strings
  const content = {
    headerTitle: isUrdu ? "تجزیہ کا نتیجہ" : "Analysis Result",
    safetyTitle: isUrdu ? "حفاظتی درجہ" : "SAFETY",
    howToTake: isUrdu ? "لینے کا طریقہ" : "How to Take This",
    interactions: isUrdu ? "کھانے کے ساتھ اثرات" : "Food Interactions",
    goodWith: isUrdu ? "بہتر ہے" : "GOOD WITH",
    avoidWith: isUrdu ? "پرہیز کریں" : "AVOID WITH",
    docSug: isUrdu ? "ڈاکٹر کا مشورہ" : "Doctor's Suggestion",
    disclaimer: isUrdu ? "براہ کرم نوٹ کریں: یہ کوئی نسخہ نہیں ہے۔ کوئی بھی دوا شروع کرنے سے پہلے ہمیشہ اپنے ڈاکٹر سے بات کریں۔" : "PLEASE NOTE: This is not a prescription. Always talk to your doctor before starting any medicine.",
    goHome: isUrdu ? "ہوم اسکرین پر واپس جائیں" : "Go Back to Home",
    tipHeader: isUrdu ? "روزانہ صحت کا مشورہ" : "DAILY HEALTH TIP"
  };

  const analysis = {
    name: "Vitamin C + Zinc",
    safety: isUrdu ? 'محفوظ' : 'High',
    description: isUrdu 
      ? "ایک قدرتی ڈھال جو آپ کے مدافعتی نظام کو مضبوط کرتی ہے اور جسم کی مرمت میں مدد دیتی ہے۔"
      : "A natural shield that reinforces your immune system and helps your body repair itself effectively.",
    guide: [
      { label: isUrdu ? "کب لیں" : "When to take", value: isUrdu ? "ناشتے کے بعد" : "Post-Breakfast", icon: "time", color: "#0B3C5D" },
      { label: isUrdu ? "ساتھ پئیں" : "Drink with", value: isUrdu ? "وافر پانی" : "Plenty of Water", icon: "water", color: "#0B3C5D" },
      { label: isUrdu ? "روزانہ حد" : "Daily Limit", value: isUrdu ? "صرف 1 گولی" : "1 Tablet Only", icon: "alert-circle", color: "#0B3C5D" },
      { label: isUrdu ? "اسٹوریج" : "Storage", value: isUrdu ? "ٹھنڈی اور خشک جگہ" : "Cool & Dry", icon: "thermometer", color: "#0B3C5D" }
    ],
    nutrition: {
      boosters: [
        { name: isUrdu ? "ترش پھل" : "Citrus Fruits", reason: isUrdu ? "بایوفلاوونائڈز فراہم کرتے ہیں" : "Adds bioflavonoids" },
        { name: isUrdu ? "سبز پتے والی سبزیاں" : "Leafy Greens", reason: isUrdu ? "منرلز فراہم کرتی ہیں" : "Supports minerals" }
      ],
      inhibitors: [
        { name: isUrdu ? "سفید چینی" : "White Sugar", reason: isUrdu ? "بحالی کو سست کرتی ہے" : "Slows recovery" },
        { name: isUrdu ? "کافی یا چائے" : "Coffee/Tea", reason: isUrdu ? "غذائی اجزاء روکتی ہے" : "Blocks nutrients" }
      ]
    },
    proTip: isUrdu 
      ? "مستقل مزاجی کے لیے اس دوا کو روزانہ ایک ہی وقت پر لینے کی کوشش کریں۔"
      : "Try to take this at the same time every day to build a consistent biological rhythm."
  };

  const getSafetyColor = () => {
    return '#059669'; 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title={content.headerTitle} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={[styles.heroCard, { borderTopColor: getSafetyColor() }]}>
          <View style={[styles.heroRow, isUrdu && { flexDirection: 'row-reverse' }]}>
            <View style={{flex: 1, alignItems: isUrdu ? 'flex-end' : 'flex-start'}}>
              <Text style={styles.supplementName}>{analysis.name}</Text>
              <View style={[styles.safetyBadge, { backgroundColor: getSafetyColor() }]}>
                <Ionicons name="shield-checkmark" size={14} color="white" />
                <Text style={styles.safetyBadgeText}>{analysis.safety.toUpperCase()} {content.safetyTitle}</Text>
              </View>
            </View>
            <View style={[styles.iconCircle, { backgroundColor: getSafetyColor() + '15' }]}>
                <Ionicons name="checkmark-circle" size={45} color={getSafetyColor()} />
            </View>
          </View>
          <Text style={[styles.easyIntro, isUrdu && { textAlign: 'right' }]}>{analysis.description}</Text>
        </View>

        <View style={styles.rotatingCard}>
          <View style={[styles.rotatingHeader, isUrdu && { flexDirection: 'row-reverse' }]}>
            <View style={styles.rotatingIconWrap}>
                <Ionicons name={ROTATING_SUGGESTIONS[habitIndex].icon} size={22} color="#0B3C5D" />
            </View>
            <Text style={[styles.rotatingTitle, isUrdu && { marginRight: 10, marginLeft: 0 }]}>{content.tipHeader}</Text>
          </View>
          <Text style={[styles.rotatingTask, isUrdu && { textAlign: 'right' }]}>{ROTATING_SUGGESTIONS[habitIndex].task}</Text>
          <Text style={[styles.rotatingBenefit, isUrdu && { textAlign: 'right' }]}>{ROTATING_SUGGESTIONS[habitIndex].benefit}</Text>
        </View>

        <Text style={[styles.sectionHeader, isUrdu && { textAlign: 'right' }]}>{content.howToTake}</Text>
        <View style={[styles.guideGrid, isUrdu && { flexDirection: 'row-reverse' }]}>
          {analysis.guide.map((item, index) => (
            <View key={index} style={styles.guideItem}>
              <View style={styles.guideIconCircle}>
                 <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={styles.guideLabel}>{item.label.toUpperCase()}</Text>
              <Text style={styles.guideValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionHeader, isUrdu && { textAlign: 'right' }]}>{content.interactions}</Text>
        <View style={[styles.nutritionBox, isUrdu && { flexDirection: 'row-reverse' }]}>
          <View style={styles.nutritionColumn}>
            <Text style={[styles.columnHeaderText, { color: '#059669' }]}>{content.goodWith}</Text>
            {analysis.nutrition.boosters.map((item, i) => (
              <View key={i} style={styles.foodTile}>
                <Text style={[styles.foodName, isUrdu && { textAlign: 'right' }]}>{item.name}</Text>
                <Text style={[styles.foodReason, isUrdu && { textAlign: 'right' }]}>{item.reason}</Text>
              </View>
            ))}
          </View>

          <View style={styles.nutritionColumn}>
            <Text style={[styles.columnHeaderText, { color: '#DC2626' }]}>{content.avoidWith}</Text>
            {analysis.nutrition.inhibitors.map((item, i) => (
              <View key={i} style={styles.foodTile}>
                <Text style={[styles.foodName, isUrdu && { textAlign: 'right' }]}>{item.name}</Text>
                <Text style={[styles.foodReason, isUrdu && { textAlign: 'right' }]}>{item.reason}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.proTipCard, isUrdu && { flexDirection: 'row-reverse' }]}>
          <Ionicons name="bulb" size={30} color="#0B3C5D" />
          <View style={[styles.proTipContent, isUrdu && { marginRight: 15, marginLeft: 0 }]}>
            <Text style={[styles.proTipTitle, isUrdu && { textAlign: 'right' }]}>{content.docSug}</Text>
            <Text style={[styles.proTipText, isUrdu && { textAlign: 'right' }]}>{analysis.proTip}</Text>
          </View>
        </View>

        <View style={styles.disclaimerCard}>
          <Text style={[styles.disclaimerText, isUrdu && { textAlign: 'right' }]}>
            <Ionicons name="alert-circle" size={14} color="#64748b" /> 
            {content.disclaimer}
          </Text>
        </View>

        <TouchableOpacity style={[styles.finishBtn, isUrdu && { flexDirection: 'row-reverse' }]} onPress={() => navigation.popToTop()}>
          <Text style={[styles.finishBtnText, isUrdu && { marginLeft: 15, marginRight: 0 }]}>{content.goHome}</Text>
          <Ionicons name="home" size={22} color="white" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  scrollContent: { padding: 20 },
  heroCard: { backgroundColor: 'white', borderRadius: 24, padding: 24, borderTopWidth: 10, marginBottom: 20, elevation: 4 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  supplementName: { fontSize: 26, fontWeight: '900', color: '#0F172A' },
  safetyBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 8 },
  safetyBadgeText: { fontSize: 10, fontWeight: '900', color: 'white', marginLeft: 5 },
  iconCircle: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center' },
  easyIntro: { fontSize: 17, color: '#334155', lineHeight: 24, fontWeight: '500' },
  rotatingCard: { backgroundColor: '#0B3C5D', borderRadius: 24, padding: 24, marginBottom: 30 },
  rotatingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  rotatingIconWrap: { backgroundColor: 'white', padding: 8, borderRadius: 10 },
  rotatingTitle: { color: 'white', fontSize: 12, fontWeight: '900', marginLeft: 10, letterSpacing: 1 },
  rotatingTask: { color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  rotatingBenefit: { color: '#E2E8F0', fontSize: 15, fontWeight: '500' },
  sectionHeader: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginBottom: 15 },
  guideGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  guideItem: { backgroundColor: 'white', width: '48%', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 15, elevation: 2, borderWidth: 1, borderColor: '#E2E8F0' },
  guideIconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  guideLabel: { fontSize: 10, color: '#64748B', fontWeight: '900', letterSpacing: 0.5 },
  guideValue: { fontSize: 15, color: '#0B3C5D', fontWeight: '800', textAlign: 'center' },
  nutritionBox: { backgroundColor: 'white', borderRadius: 24, flexDirection: 'row', paddingVertical: 25, marginBottom: 30, elevation: 2, borderWidth: 1, borderColor: '#E2E8F0' },
  nutritionColumn: { flex: 1, paddingHorizontal: 15 },
  columnHeaderText: { fontSize: 13, fontWeight: '900', marginBottom: 20, textAlign: 'center' },
  foodTile: { marginBottom: 15, backgroundColor: '#F8FAFC', padding: 10, borderRadius: 12 },
  foodName: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  foodReason: { fontSize: 13, color: '#64748B' },
  proTipCard: { flexDirection: 'row', backgroundColor: '#E0F2FE', padding: 25, borderRadius: 24, alignItems: 'center', marginBottom: 25, borderStyle: 'dashed', borderWidth: 1.5, borderColor: '#0B3C5D' },
  proTipContent: { marginLeft: 15, flex: 1 },
  proTipTitle: { fontSize: 16, fontWeight: '900', color: '#0369A1' },
  proTipText: { fontSize: 16, color: '#075985', lineHeight: 22, fontWeight: '500' },
  disclaimerCard: { backgroundColor: '#FDEEED', padding: 20, borderRadius: 15, marginBottom: 30, borderWidth: 1, borderColor: '#FCA5A5' },
  disclaimerText: { fontSize: 14, color: '#7F1D1D', lineHeight: 20, textAlign: 'center' },
  finishBtn: { backgroundColor: '#0B3C5D', padding: 22, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  finishBtnText: { color: 'white', fontWeight: '900', fontSize: 20, marginRight: 15 }
});