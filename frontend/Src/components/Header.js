import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function Header({ onGoBack }) {
  const [language, setLanguage] = useState('ENG'); // UI-only toggle for now

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backRow} onPress={onGoBack} activeOpacity={0.7}>
        <Text style={styles.backArrow}>{'\u2190'}</Text>
        <Text style={styles.backText}>Go back</Text>
      </TouchableOpacity>

      <View style={styles.langToggle}>
        <TouchableOpacity
          style={[styles.langButton, language === 'ENG' && styles.langButtonActive]}
          onPress={() => setLanguage('ENG')}
        >
          <Text style={[styles.langText, language === 'ENG' && styles.langTextActive]}>ENG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langButton, language === 'HIN' && styles.langButtonActive]}
          onPress={() => setLanguage('HIN')}
        >
          <Text style={[styles.langText, language === 'HIN' && styles.langTextActive]}>हिंदी</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backRow: { flexDirection: 'row', alignItems: 'center' },
  backArrow: { fontSize: 18, color: colors.text, marginRight: 6 },
  backText: { fontSize: 16, fontWeight: '600', color: colors.text },
  langToggle: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    padding: 3,
  },
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  langButtonActive: {
    backgroundColor: colors.primary,
  },
  langText: { fontSize: 13, fontWeight: '600', color: colors.primary },
  langTextActive: { color: colors.white },
});
