import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

// Helper function to calculate time remaining
function getTimeRemaining(targetDateString) {
  if (!targetDateString) return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const total = new Date(targetDateString).getTime() - new Date().getTime();

  if (total <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { expired: false, days, hours, minutes, seconds };
}

function pad(num) {
  return String(num).padStart(2, '0');
}

export default function CountdownBanner({ deadline, spotsBooked, totalSpots }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(deadline));

  useEffect(() => {
    // Deadline prop update hote hi timer refresh karein
    setRemaining(getTimeRemaining(deadline));

    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  // Check 1: Agar Spots Full ho gaye hain (jaise 10/10)
  const isFull = totalSpots && spotsBooked >= totalSpots;

  if (isFull) {
    return (
      <View style={[styles.container, styles.expiredContainer]}>
        <Text style={styles.hourglass}>🚫</Text>
        <Text style={styles.closedText}>Registration Full (Housefull)</Text>
      </View>
    );
  }

  // Check 2: Agar Time Expire ho gaya hai
  if (remaining.expired) {
    return (
      <View style={[styles.container, styles.expiredContainer]}>
        <Text style={styles.hourglass}>{'\u231B'}</Text>
        <Text style={styles.closedText}>Registration is closed</Text>
      </View>
    );
  }

  // Active Countdown Timer Screen
  return (
    <View style={styles.container}>
      <Text style={styles.hourglass}>{'\u231B'}</Text>
      <View style={styles.textColumn}>
        <Text style={styles.label}>Registration closes in</Text>
        <Text style={styles.timer}>
          {pad(remaining.days)}d : {pad(remaining.hours)}h : {pad(remaining.minutes)}m : {pad(remaining.seconds)}s
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