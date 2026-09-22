import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

// Calculates the difference between now and a target date, in d/h/m.
// This is the "time-dependent" logic the assignment calls out — the
// countdown is always computed live, never hardcoded.
function getTimeRemaining(targetDateString) {
  const total = new Date(targetDateString).getTime() - new Date().getTime();

  if (total <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);

  return { expired: false, days, hours, minutes };
}

function pad(num) {
  return String(num).padStart(2, '0');
}

export default function CountdownBanner({ deadline }) {
  const [remaining, setRemaining] = useState(getTimeRemaining(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(deadline));
    }, 60000); // updates every minute — switch to 1000 for a per-second timer

    return () => clearInterval(interval);
  }, [deadline]);

  if (remaining.expired) {
    return (
      <View style={[styles.container, styles.expiredContainer]}>
        <Text style={styles.hourglass}>{'\u231B'}</Text>
        <Text style={styles.closedText}>Registration is closed</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hourglass}>{'\u231B'}</Text>
      <View style={styles.textColumn}>
        <Text style={styles.label}>Registration closes in</Text>
        <Text style={styles.timer}>
          {pad(remaining.days)}d : {pad(remaining.hours)}h : {pad(remaining.minutes)}m
        </Text>
      </View>
      <Text style={styles.hurryUp}>{'\u23F0'} Hurry up!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  expiredContainer: { backgroundColor: '#FDEDEE' },
  hourglass: { fontSize: 20, marginRight: 10 },
  textColumn: { flex: 1 },
  label: { fontSize: 12, color: colors.textSecondary },
  timer: { fontSize: 18, fontWeight: '700', color: colors.primaryDark, marginTop: 2 },
  hurryUp: { fontSize: 12, fontWeight: '600', color: colors.warning },
  closedText: { fontSize: 14, fontWeight: '600', color: colors.danger },
});
