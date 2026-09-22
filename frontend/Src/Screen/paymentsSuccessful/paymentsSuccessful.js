import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import colors from '../../styles/colors';

// ─────────────────────────────────────────────────────────────
// Full screen — navigate to it after a successful payment:
//   navigation.navigate('PaymentSuccessScreen', { receipt })
//
// TODO (when backend is ready): replace dummyReceipt with the
// real response from POST /payments/verify (or wherever the
// backend confirms the registration + returns a registration ID).
// ─────────────────────────────────────────────────────────────

const dummyReceipt = {
  competitionTitle: 'Feedants Classical Dance',
  registrationId: 'FCD-2025-019',
  paymentMethod: 'UPI',
  amountPaid: 99,
  submissionOpensOn: '15 July 2025',
};

export default function PaymentSuccessScreen({ navigation, route }) {
  const receipt = (route && route.params && route.params.receipt) || dummyReceipt;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation && navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>{'\u2190'}</Text>
        </TouchableOpacity>

        <View style={styles.headerTextColumn}>
          <Text style={styles.eyebrow}>REGISTRATION COMPLETE</Text>
          <Text style={styles.headerTitle}>Payment successful</Text>
        </View>

        <View style={styles.shieldBadge}>
          <Text style={styles.shieldIcon}>{'\u{1F6E1}\uFE0F'}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Success checkmark */}
        <View style={styles.checkOuter}>
          <View style={styles.checkInner}>
            <Text style={styles.checkIcon}>{'\u2713'}</Text>
          </View>
        </View>

        <Text style={styles.successTitle}>You're registered!</Text>
        <Text style={styles.successSubtitle}>
          Your entry for {receipt.competitionTitle} has been confirmed.
        </Text>

        {/* Payment receipt */}
        <View style={styles.receiptCard}>
          <View style={styles.receiptHeaderRow}>
            <View>
              <Text style={styles.receiptEyebrow}>PAYMENT RECEIPT</Text>
              <Text style={styles.receiptTitle}>₹{receipt.amountPaid} paid successfully</Text>
            </View>
            <View style={styles.paidPill}>
              <Text style={styles.paidPillText}>PAID</Text>
            </View>
          </View>

          <View style={styles.receiptDivider} />

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Competition</Text>
            <Text style={styles.receiptValue}>{receipt.competitionTitle}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Registration ID</Text>
            <Text style={styles.receiptValueMono}>{receipt.registrationId}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Payment method</Text>
            <Text style={styles.receiptValue}>{receipt.paymentMethod}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Amount paid</Text>
            <Text style={styles.receiptAmount}>₹{receipt.amountPaid}</Text>
          </View>
        </View>

        {/* What happens next */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconBox}>
            <Text style={styles.infoIcon}>{'\u{1F4C5}'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>What happens next?</Text>
            <Text style={styles.infoText}>
              Save your confirmation. You can submit your performance once submissions open on{' '}
              {receipt.submissionOpensOn}.
            </Text>
          </View>
        </View>

        {/* Confirmation sent */}
        <View style={styles.outlineCard}>
          <View style={styles.outlineIconBox}>
            <Text style={styles.outlineIcon}>{'\u2709'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Confirmation sent</Text>
            <Text style={styles.infoText}>
              Your payment receipt and competition updates will be sent to your registered email
              address.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => 
            navigation.navigate('MainTabs', {
             screen: 'Home',
  })
}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Explore more competitions</Text>
          <Text style={styles.arrowIcon}>{'\u2192'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => 
          navigation.navigate('MainTabs', {
          screen: 'Home',
          })
}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>View competition details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { fontSize: 16, color: colors.text },
  headerTextColumn: { alignItems: 'center' },
  eyebrow: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginTop: 2 },
  shieldBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldIcon: { fontSize: 16 },

  scrollContent: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 20, alignItems: 'center' },

  checkOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: { color: colors.white, fontSize: 32, fontWeight: '800' },

  successTitle: { fontSize: 26, fontWeight: '800', color: colors.text, textAlign: 'center' },
  successSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  receiptCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 18,
    marginTop: 28,
  },
  receiptHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  receiptEyebrow: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 0.5 },
  receiptTitle: { fontSize: 17, fontWeight: '800', color: colors.text, marginTop: 6 },
  paidPill: { backgroundColor: colors.primaryLight, borderRadius: 14, paddingVertical: 6, paddingHorizontal: 12 },
  paidPillText: { fontSize: 12, fontWeight: '800', color: colors.primaryDark },

  receiptDivider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  receiptLabel: { fontSize: 14, color: colors.textSecondary },
  receiptValue: { fontSize: 14, fontWeight: '700', color: colors.text },
  receiptValueMono: { fontSize: 14, fontWeight: '700', color: colors.text, letterSpacing: 0.5 },
  receiptAmount: { fontSize: 16, fontWeight: '800', color: colors.primaryDark },

  infoCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLighter,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  infoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIcon: { fontSize: 16 },
  infoTitle: { fontSize: 15, fontWeight: '800', color: colors.text },
  infoText: { fontSize: 13, color: colors.textSecondary, marginTop: 6, lineHeight: 19 },

  outlineCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  outlineIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  outlineIcon: { fontSize: 16, color: colors.primaryDark },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: 14,
    paddingVertical: 16,
  },
  primaryButtonText: { color: colors.white, fontSize: 15, fontWeight: '700', marginRight: 8 },
  arrowIcon: { color: colors.white, fontSize: 16 },

  secondaryButton: {
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: { color: colors.text, fontSize: 15, fontWeight: '700' },
});