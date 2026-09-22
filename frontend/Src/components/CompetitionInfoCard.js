import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function CompetitionInfoCard({
  title,
  category,
  prizePool,
  entryFee,
  totalSpots,
  spotsBooked,
  isUserRegistered,
}) {
  const spotsLeft = totalSpots - spotsBooked;
  const progressPercent = Math.min((spotsBooked / totalSpots) * 100, 100);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>

        {isUserRegistered && (
          <View style={styles.registeredBadge}>
            <Text style={styles.registeredCheck}>{'\u2713'}</Text>
            <Text style={styles.registeredText}>Registered</Text>
          </View>
        )}
      </View>

      <View style={styles.tagsRow}>
        {category.map((tag) => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.priceRow}>
        <View>
          <Text style={styles.priceLabel}>Prize pool</Text>
          <Text style={styles.priceValue}>₹{prizePool.toLocaleString('en-IN')}</Text>
        </View>
        <View>
          <Text style={styles.priceLabel}>Entry fee</Text>
          <Text style={styles.priceValue}>₹{entryFee}</Text>
        </View>
      </View>

      <View style={styles.spotsRow}>
        <Text style={styles.spotsIcon}>{'\u{1F465}'}</Text>
        <Text style={styles.spotsText}>Only {spotsLeft} spots left</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>
      <Text style={styles.bookedText}>{spotsBooked} / {totalSpots} Booked</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 8,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, flex: 1, marginRight: 8 },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  registeredCheck: { color: colors.primary, fontWeight: '700', marginRight: 4 },
  registeredText: { color: colors.primary, fontWeight: '600', fontSize: 12 },

  tagsRow: { flexDirection: 'row', marginTop: 12, gap: 8 },
  tagChip: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  tagText: { fontSize: 12, color: colors.textSecondary, fontWeight: '500' },

  priceRow: { flexDirection: 'row', marginTop: 20, gap: 48 },
  priceLabel: { fontSize: 13, color: colors.textSecondary, marginBottom: 4 },
  priceValue: { fontSize: 22, fontWeight: '700', color: colors.text },

  spotsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  spotsIcon: { fontSize: 14, marginRight: 6 },
  spotsText: { fontSize: 14, fontWeight: '600', color: colors.primaryDark },

  progressTrack: {
    height: 6,
    backgroundColor: colors.primaryLight,
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  bookedText: { fontSize: 12, color: colors.textSecondary, marginTop: 6 },
});
