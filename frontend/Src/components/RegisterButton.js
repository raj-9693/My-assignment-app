import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';


export default function RegisterButton({
  registerBefore,
  spotsBooked,
  totalSpots,
  isUserRegistered,
  entryFee,
  onPress,
}) {
  const isTimeExpired = new Date() > new Date(registerBefore);
  const status = isUserRegistered
    ? 'registered'
    : isTimeExpired
    ? 'closed'
    : spotsBooked >= totalSpots
    ? 'full'
    : 'register';

  const CONFIG = {
    register: { label: `Register Now - ₹${entryFee}`, disabled: false },
    registered: { label: 'Already Registered', disabled: true },
    full: { label: 'Housefull', disabled: true },
    closed: { label: 'Registration Deadline Expired', disabled: true },
  };

  const { label, disabled } = CONFIG[status];

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={styles.label}>{label}</Text>
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
  buttonDisabled: { backgroundColor: colors.textMuted },
  label: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
