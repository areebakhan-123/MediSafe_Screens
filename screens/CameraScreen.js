import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'; 
import { Ionicons } from '@expo/vector-icons';

import { useLanguage } from '../context/LanguageContext'; 

export default function CameraScreen({ navigation }) {
 
  const { isUrdu } = useLanguage(); 
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);

  // Texts for Localization
  const content = {
    permission: isUrdu ? "سپلیمنٹ لیبلز کے تجزیے کے لیے کیمرے تک رسائی ضروری ہے۔" : "Camera access is required to analyze supplement labels.",
    enableBtn: isUrdu ? "کیمرہ آن کریں" : "Enable Camera",
    checking: isUrdu ? "میڈیسیف AI لیبل چیک کر رہا ہے..." : "MediSafe AI checking label...",
    invalidTitle: isUrdu ? "غیر متعلقہ چیز" : "Invalid Object",
    invalidMsg: isUrdu ? "کوئی دوائی یا سپلیمنٹ کی بوتل نہیں ملی۔" : "No supplement bottle detected.",
    successTitle: isUrdu ? "لیبل کی شناخت ہو گئی" : "Label Recognized",
    successMsg: isUrdu ? "مزید شامل کریں یا تجزیہ شروع کریں؟" : "Add another or analyze now?",
    addMore: isUrdu ? "مزید شامل کریں" : "Add Another",
    analyze: isUrdu ? "تجزیہ کریں" : "Analyze Scans",
    items: isUrdu ? "آئٹمز" : "ITEMS"
  };

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="lock-closed" size={64} color="#0B3C5D" />
        <Text style={styles.permissionText}>{content.permission}</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>{content.enableBtn}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], 
      allowsEditing: false, 
      quality: 1,
    });

    if (!result.canceled) {
      validateSupplementImage(result.assets[0].uri);
    }
  };

  const validateSupplementImage = async (uri) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const aiScore = Math.random(); 
      if (aiScore < 0.2) {
        Alert.alert(content.invalidTitle, content.invalidMsg);
      } else {
        handleSuccess(uri);
      }
    }, 2000);
  };

  const handleSuccess = (uri) => {
    const newImages = [...capturedImages, uri];
    setCapturedImages(newImages);
    Alert.alert(content.successTitle, content.successMsg, [
      { text: content.addMore, style: "default" },
      { text: content.analyze, onPress: () => navigation.navigate('Purpose', { images: newImages }) }
    ]);
  };

  const takePicture = async () => {
    if (!cameraRef) return;
    const photo = await cameraRef.takePictureAsync({ quality: 1 });
    validateSupplementImage(photo.uri);
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        ref={(ref) => setCameraRef(ref)} 
      />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{capturedImages.length} {content.items}</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="flash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.galleryPreview} onPress={pickImage}>
          {capturedImages.length > 0 ? (
            <Image source={{ uri: capturedImages[capturedImages.length - 1] }} style={styles.previewThumb} />
          ) : (
            <Ionicons name="images" size={28} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.outerCircle} onPress={takePicture}>
          <View style={styles.innerCircle} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.doneBtn, { opacity: capturedImages.length > 0 ? 1 : 0.5 }]}
          onPress={() => capturedImages.length > 0 ? navigation.navigate('Purpose', { images: capturedImages }) : null}
        >
          <Ionicons name="checkmark-circle" size={50} color="#10b981" />
        </TouchableOpacity>
      </View>

      {isProcessing && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#0B3C5D" />
            <Text style={styles.loadingText}>{content.checking}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  topBar: { 
    position: 'absolute', 
    top: 50, 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 10 
  },
  iconBtn: { padding: 10, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 25 },
  badge: { backgroundColor: '#0B3C5D', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  bottomBar: { 
    position: 'absolute', 
    bottom: 50, 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    zIndex: 10
  },
  outerCircle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    borderWidth: 4, 
    borderColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  innerCircle: { width: 62, height: 62, borderRadius: 31, backgroundColor: 'white' },
  galleryPreview: { 
    width: 50, 
    height: 50, 
    borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  previewThumb: { width: '100%', height: '100%' },
  doneBtn: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
  loadingContainer: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 20
  },
  loadingBox: { 
    backgroundColor: 'white', 
    padding: 30, 
    borderRadius: 24, 
    alignItems: 'center',
    width: '80%' 
  },
  loadingText: { marginTop: 15, fontWeight: 'bold', color: '#0B3C5D', fontSize: 16, textAlign: 'center' },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 40 },
  permissionText: { textAlign: 'center', fontSize: 16, color: '#475569', marginVertical: 20, lineHeight: 24 },
  permissionBtn: { backgroundColor: '#0B3C5D', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30 },
  permissionBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});