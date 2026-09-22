import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return {
    date: `${day} ${month} ${year}`,
    time: `${hours}:${minutes} ${ampm}`,
  };
}

function DateBlock({ icon, label, dateString }) {
  const { date, time } = formatDate(dateString);
  return (
    <View style={styles.block}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

export default function ImportantDates({ dates }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Important dates</Text>

      <View style={styles.grid}>
        <View style={styles.row}>
          <DateBlock icon={'\u{1F4C5}'} label="Register before" dateString={dates.registerBefore} />
          <View style={styles.divider} />
          <DateBlock icon={'\u{1F4E4}'} label="Submission starts" dateString={dates.submissionStarts} />
        </View>
        <View style={styles.hDivider} />
        <View style={styles.row}>
          <DateBlock icon={'\u{1F4E4}'} label="Submission ends" dateString={dates.submissionEnds} />
          <View style={styles.divider} />
          <DateBlock icon={'\u{1F3C6}'} label="Result date" dateString={dates.resultDate} />
        </View>
      </View>
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
  grid: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, overflow: 'hidden' },
  row: { flexDirection: 'row' },
  block: { flex: 1, padding: 14 },
  divider: { width: 1, backgroundColor: colors.border },
  hDivider: { height: 1, backgroundColor: colors.border },
  icon: { fontSize: 16, marginBottom: 8 },
  label: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
  date: { fontSize: 14, fontWeight: '700', color: colors.text },
  time: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
