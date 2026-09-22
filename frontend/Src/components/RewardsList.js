import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const ICONS = {
  trophy: '\u{1F3C6}',
  'medal-silver': '\u{1F948}',
  'medal-bronze': '\u{1F949}',
  star: '\u2606',
};

export default function RewardsList({ rewards }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Rewards <Text style={styles.subheading}>(All positions)</Text>
      </Text>

      {rewards.map((reward, index) => (
        <View
          key={reward.position}
          style={[styles.row, index === rewards.length - 1 && styles.lastRow]}
        >
          <View style={styles.left}>
            <Text style={styles.icon}>{ICONS[reward.icon] || '\u2606'}</Text>
            <Text style={styles.position}>{reward.position}</Text>
          </View>
          <Text style={styles.amount}>₹{reward.amount}</Text>
        </View>
      ))}

      <Text style={styles.disclaimer}>
        {'\u24D8'} Only contributions from paid participants will be considered for judging.
      </Text>
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
    marginTop: 16,
  },
  heading: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 12 },
  subheading: { fontSize: 13, fontWeight: '400', color: colors.textSecondary },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastRow: { borderBottomWidth: 0 },
  left: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: 16, marginRight: 10, width: 22 },
  position: { fontSize: 14, color: colors.text, fontWeight: '500' },
  amount: { fontSize: 14, fontWeight: '700', color: colors.text },
  disclaimer: { fontSize: 12, color: colors.textSecondary, marginTop: 12, lineHeight: 18 },
});
