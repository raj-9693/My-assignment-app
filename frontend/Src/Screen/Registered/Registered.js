import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import colors from '../../styles/colors';
import {registerForCompetition} from '../../Services/competitionApi'
import { styles } from './index';

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

    const Mydeta={
      name:name,
      email:email,
      phone:phone,
    }

    try {
  // 1. Dono parameters pass karein: competitionId aur Mydeta
  const response = await registerForCompetition( Mydeta);

  // 2. Axios response check karein
  if (response?.data?.success || response?.status === 200) {
    navigation.navigate('paymentsSuccessful');
  }

  
} catch (err) {
  const message= err.response?.data?.message || 'you are registered olready'
  Alert.alert(message)
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

