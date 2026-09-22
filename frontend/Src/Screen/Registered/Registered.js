import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../../styles/colors';

// ─────────────────────────────────────────────────────────────
// This is a FULL SCREEN (not a modal/bottom-sheet). Navigate to it
// the same way as any other screen, e.g.:
//   navigation.navigate('RegisterScreen', { competition })
//
// Currently uses local form state + dummy submit handler.
// TODO (when backend is ready): replace handleSubmit's console.log
// with a real POST /competitions/:id/register call, e.g.:
//
//   const res = await fetch(`${API_BASE_URL}/competitions/${competitionId}/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name, email, phone }),
//   });
// ─────────────────────────────────────────────────────────────

// Dummy competition summary — replace with real data passed via navigation params.
const dummyEntry = {
  title: 'Feedants Classical Dance',
  subtitle: 'Solo entry · Online',
  entryFee: 99,
  taxes: 0,
};

export default function Registered({ navigation, route }) {
  const entry = (route && route.params && route.params.entry) || dummyEntry;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const totalPayable = entry.entryFee + entry.taxes;

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter your full name';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Please enter a valid email';
    if (!phone.trim() || phone.trim().length < 10) newErrors.phone = 'Please enter a valid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      // TODO: replace with real API call — see note above
      console.log('Registering with:', { name, email, phone });
      await new Promise((resolve) => setTimeout(resolve, 800)); // fake network delay
      navigation.navigate('payments')
      // TODO: on success, navigate to payment/confirmation screen
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Complete registration</Text>
          <Text style={styles.headerSubtitle}>One step away from the stage</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation && navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.closeIcon}>{'\u2715'}</Text>
        </TouchableOpacity>
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
          <Text style={styles.entryFee}>₹{entry.entryFee}</Text>
        </View>

        {/* Full name */}
        <Text style={styles.label}>FULL NAME</Text>
        <View style={[styles.inputRow, errors.name && styles.inputRowError]}>
          <Text style={styles.inputIcon}>{'\u{1F464}'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        {/* Email */}
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <View style={[styles.inputRow, errors.email && styles.inputRowError]}>
          <Text style={styles.inputIcon}>{'\u2709'}</Text>
          <TextInput
            style={styles.input}
            placeholder="name@example.com"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Phone */}
        <Text style={styles.label}>PHONE NUMBER</Text>
        <View style={[styles.inputRow, errors.phone && styles.inputRowError]}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor={colors.textMuted}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        {/* Payment summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeading}>Payment summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Entry fee</Text>
            <Text style={styles.summaryValue}>₹{entry.entryFee}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes / platform fee</Text>
            <Text style={styles.summaryValue}>₹{entry.taxes}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total payable</Text>
            <Text style={styles.totalValue}>₹{totalPayable}</Text>
          </View>
        </View>

        <View style={styles.secureRow}>
          <Text style={styles.shieldIcon}>{'\u{1F6E1}\uFE0F'}</Text>
          <Text style={styles.secureText}>Secured by Razorpay · UPI · Cards</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, submitting && styles.payButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
          activeOpacity={0.85}
        >
          <Text style={styles.lockIcon}>{'\u{1F512}'}</Text>
          <Text style={styles.payButtonText}>
            {submitting ? 'Processing…' : `Pay ₹${totalPayable} & Register now`}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to the competition rules and refund policy.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: colors.text },
  headerSubtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: { fontSize: 16, color: colors.text },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  entryIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  entryIcon: { fontSize: 18 },
  entryTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  entrySubtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  entryFee: { fontSize: 18, fontWeight: '800', color: colors.primaryDark },

  label: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: 8, letterSpacing: 0.5 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 4,
  },
  inputRowError: { borderColor: colors.danger },
  inputIcon: { fontSize: 16, marginRight: 10, color: colors.textMuted },
  countryCode: { fontSize: 15, fontWeight: '700', color: colors.text, marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: colors.text },
  errorText: { fontSize: 12, color: colors.danger, marginBottom: 12, marginTop: 2 },

  summaryCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 18,
    marginTop: 20,
  },
  summaryHeading: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: colors.textSecondary },
  summaryValue: { fontSize: 14, color: colors.text },
  summaryDivider: { height: 1, backgroundColor: colors.border, marginVertical: 6 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: colors.text },
  totalValue: { fontSize: 16, fontWeight: '800', color: colors.primaryDark },

  secureRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  shieldIcon: { fontSize: 14, marginRight: 6 },
  secureText: { fontSize: 13, color: colors.textSecondary },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
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