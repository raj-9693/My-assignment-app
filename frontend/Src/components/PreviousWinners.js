import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../styles/colors';



export default function PreviousWinners({ winners, onPlayVideo }) {
  if (!winners || winners.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Previous winners</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {winners.map((winner, index) => {
          const thumbnail = winner.photoUrl || winner.videoUrl

          return (
            <TouchableOpacity
              key={`${winner.name}-${index}`}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => onPlayVideo && onPlayVideo(winner)}
            >
              <View style={styles.thumbnail}>
                <Image
                  source={{ uri: thumbnail }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
                <View style={styles.playBadge}>
                  <Text style={styles.playIcon}>{'\u25B6'}</Text>
                </View>
              </View>
              <Text style={styles.name} numberOfLines={1}>{winner.name}</Text>
              <Text style={styles.position}>{winner.position}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 16 },
  heading: { fontSize: 16, fontWeight: '700', color: colors.text, marginHorizontal: 16, marginBottom: 12 },
  scrollContent: { paddingHorizontal: 16, gap: 12 },
  card: { width: 130, marginRight: 12 },
  thumbnail: {
    width: 130,
    height: 90,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  playBadge: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: { color: '#fff', fontSize: 14 },
  name: { fontSize: 13, fontWeight: '700', color: colors.text },
  position: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
