import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import colors from '../../styles/colors';

// ─────────────────────────────────────────────────────────────
// Full screen — navigate to it like any other screen:
//   navigation.navigate('PaymentCheckoutScreen', { entry })
//
// TODO (when backend/Razorpay is ready): replace handlePay's
// console.log with the real Razorpay checkout flow, e.g. creating
// an order via POST /payments/create-order, opening the Razorpay
// SDK, then confirming via POST /payments/verify.
// ─────────────────────────────────────────────────────────────

const dummyEntry = {
  title: 'Feedants Classical Dance',
  subtitle: 'Solo entry · Online competition',
  entryFee: 99,
  taxes: 0,
};

const PAYMENT_METHODS = [
  { key: 'upi', icon: '\u{1F4F1}', title: 'UPI', subtitle: 'Pay with any UPI app' },
  { key: 'card', icon: '\u{1F4B3}', title: 'Credit or debit card', subtitle: 'Visa, Mastercard, RuPay' },
  { key: 'netbanking', icon: '\u{1F3E6}', title: 'Netbanking', subtitle: 'Choose your preferred bank' },
];

export default function PaymentCheckoutScreen({ navigation, route }) {
  const entry = (route && route.params && route.params.entry) || dummyEntry;
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  const totalToPay = entry.entryFee + entry.taxes;

  const handlePay = async () => {
    setProcessing(true);
    try {
      // TODO: replace with real Razorpay order creation + checkout — see note above
      console.log('Paying via:', selectedMethod, '| amount:', totalToPay);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake network delay
      navigation.navigate('paymentsSuccessful');
    } catch (err) {
      console.log(err);
    } finally {
      setProcessing(false);
    }
  };

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
          <Text style={styles.eyebrow}>SECURE PAYMENT</Text>
          <Text style={styles.headerTitle}>Payment checkout</Text>
        </View>

        <View style={styles.shieldBadge}>
          <Text style={styles.shieldIcon}>{'\u{1F6E1}\uFE0F'}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Competition summary chip */}
        <View style={styles.entryCard}>
          <View style={styles.entryIconBox}>
            <Text style={styles.entryIcon}>{'\u{1F3B5}'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.entryTitle}>{entry.title}</Text>
            <Text style={styles.entrySubtitle}>{entry.subtitle}</Text>
          </View>
          <View style={styles.entryFeePill}>
            <Text style={styles.entryFeeText}>₹{entry.entryFee}</Text>
          </View>
        </View>

        {/* Payment method selection */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Choose payment method</Text>
          <Text style={styles.safeText}>Safe & encrypted</Text>
        </View>

        {PAYMENT_METHODS.map((method) => {
          const selected = selectedMethod === method.key;
          return (
            <TouchableOpacity
              key={method.key}
              style={[styles.methodCard, selected && styles.methodCardSelected]}
              onPress={() => setSelectedMethod(method.key)}
              activeOpacity={0.8}
            >
              <View style={[styles.methodIconBox, selected && styles.methodIconBoxSelected]}>
                <Text style={styles.methodIcon}>{method.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
              </View>
              <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                {selected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Order summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeaderRow}>
            <Text style={styles.summaryHeading}>Order summary</Text>
            <TouchableOpacity>
              <Text style={styles.viewDetails}>View details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Competition entry</Text>
            <Text style={styles.summaryValue}>₹{entry.entryFee}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes & platform fee</Text>
            <Text style={styles.summaryValue}>₹{entry.taxes}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total to pay</Text>
            <Text style={styles.totalValue}>₹{totalToPay}</Text>
          </View>
        </View>

        {/* Protected payment note */}
        <View style={styles.protectedCard}>
          <View style={styles.protectedIconBox}>
            <Text style={styles.protectedIcon}>{'\u{1F6E1}\uFE0F'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.protectedTitle}>Your payment is protected</Text>
            <Text style={styles.protectedSubtitle}>
              Powered by Razorpay. We never store your card or UPI credentials.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, processing && styles.payButtonDisabled]}
          onPress={handlePay}
          disabled={processing}
          activeOpacity={0.85}
        >
          <Text style={styles.lockIcon}>{'\u{1F512}'}</Text>
          <Text style={styles.payButtonText}>
            {processing ? 'Processing…' : `Pay ₹${totalToPay} securely`}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By paying, you accept the refund policy and competition rules.
        </Text>
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

  scrollContent: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 20 },

  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 26,
  },
  entryIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  entryIcon: { fontSize: 18 },
  entryTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  entrySubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  entryFeePill: { backgroundColor: colors.primaryLight, borderRadius: 14, paddingVertical: 6, paddingHorizontal: 12 },
  entryFeeText: { fontSize: 15, fontWeight: '800', color: colors.primaryDark },

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text },
  safeText: { fontSize: 13, fontWeight: '600', color: colors.primary },

  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  methodCardSelected: { borderColor: colors.primary, borderWidth: 2 },
  methodIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodIconBoxSelected: { backgroundColor: colors.primary },
  methodIcon: { fontSize: 18 },
  methodTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  methodSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: { borderColor: colors.primary },
  radioInner: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.primary },

  summaryCard: {
    backgroundColor: colors.primaryLighter,
    borderRadius: 14,
    padding: 18,
    marginTop: 12,
  },
  summaryHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  summaryHeading: { fontSize: 16, fontWeight: '800', color: colors.text },
  viewDetails: { fontSize: 13, fontWeight: '700', color: colors.primaryDark },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: colors.textSecondary },
  summaryValue: { fontSize: 14, color: colors.text },
  summaryDivider: { height: 1, backgroundColor: colors.border, marginVertical: 6 },
  totalLabel: { fontSize: 15, fontWeight: '800', color: colors.text },
  totalValue: { fontSize: 17, fontWeight: '800', color: colors.primaryDark },

  protectedCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginTop: 18,
  },
  protectedIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  protectedIcon: { fontSize: 14 },
  protectedTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  protectedSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  payButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: 14,
    paddingVertical: 16,
  },
  payButtonDisabled: { opacity: 0.6 },
  lockIcon: { fontSize: 14, marginRight: 8, color: colors.white },
  payButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  termsText: { fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: 12, lineHeight: 18 },
});