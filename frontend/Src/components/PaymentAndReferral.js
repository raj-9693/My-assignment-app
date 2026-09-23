import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';
 
export function PaymentInfoBanner({ poweredBy, refundPolicyText }) {
  return (
    <View style={styles.paymentBanner}>
      <Text style={styles.shieldIcon}>{'\u{1F6E1}\uFE0F'}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.paymentTitle}>Secure payments powered by {poweredBy}</Text>
        <Text style={styles.paymentSub}>{refundPolicyText}</Text>
      </View>
    </View>
  );
}
 
export function ReferEarnCard({ referral, onCopy }) {
  return (
    <View style={styles.referCard}>
      <View style={styles.referHeaderRow}>
        <Text style={styles.megaphone}>{'\u{1F4E3}'}</Text>
        <View>
          <Text style={styles.referTitle}>Refer & earn more discount</Text>
          <Text style={styles.referSub}>Earn ₹{referral?.earnPerSignup } for every signup</Text>
        </View>
      </View>
 
      <View style={styles.linkRow}>
        <Text style={styles.linkText} numberOfLines={1}>{referral?.link}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={() => onCopy && onCopy(referral.link)}>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 16,
  },
  shieldIcon: { fontSize: 16, marginRight: 10 },
  paymentTitle: { fontSize: 13, fontWeight: '600', color: colors.text },
  paymentSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },

  referCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  referHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  megaphone: { fontSize: 18, marginRight: 10 },
  referTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  referSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 4,
  },
  linkText: { flex: 1, fontSize: 13, color: colors.textSecondary },
  copyButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  copyText: { fontSize: 13, fontWeight: '700', color: colors.primary },
});
