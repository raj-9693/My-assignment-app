import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function JudgeCard({ judge, onPlayIntro }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: judge.photoUrl }} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.label}>Judge</Text>
        <Text style={styles.name}>{judge.name}</Text>
        <Text style={styles.title}>{judge.title}</Text>
        <Text style={styles.experience}>{judge.experience}</Text>
      </View>

      <TouchableOpacity style={styles.playColumn} onPress={onPlayIntro} activeOpacity={0.7}>
        <View style={styles.playCircle}>
          <Text style={styles.playIcon}>{'\u25B6'}</Text>
        </View>
        <Text style={styles.playLabel}>Intro video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  info: { flex: 1 },
  label: { fontSize: 12, color: colors.textSecondary },
  name: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 2 },
  title: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  experience: { fontSize: 12, color: colors.primaryDark, fontWeight: '600', marginTop: 4 },
  playColumn: { alignItems: 'center', marginLeft: 8 },
  playCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: { color: colors.primary, fontSize: 14 },
  playLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 4 },
});
