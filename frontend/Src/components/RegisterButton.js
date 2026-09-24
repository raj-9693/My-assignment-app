import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';


export default function RegisterButton({
  registerBefore,
  spotsBooked,
  totalSpots,
  entryFee,
  onPress,
}) {
  const isTimeExpired = new Date() > new Date(registerBefore);
  const isSpotsFull = spotsBooked >= totalSpots;

  if (isTimeExpired || isSpotsFull) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.label}>Register Now - ₹{entryFee}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  label: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
