import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

// `status` will eventually be driven by real backend state:
// 'register' -> not registered yet, spots available
// 'registered' -> already registered, submission window hasn't opened
// 'upload' -> registered + submission window is open
// 'full' -> spots are full and user hasn't registered
// 'closed' -> registration window has passed
export default function RegisterButton({ status = 'register', entryFee, onPress }) {
  const CONFIG = {
    register: { label: `Register now · ₹${entryFee}`, disabled: false },
    registered: { label: 'Registered', disabled: false },
    upload: { label: 'Upload Submission', disabled: false },
    full: { label: 'Spots full', disabled: true },
    closed: { label: 'Registration closed', disabled: true },
  };

  const { label, disabled } = CONFIG[status] || CONFIG.register;

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
