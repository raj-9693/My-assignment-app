import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar,BackHandler } from 'react-native';

import { styles } from './index';

const dummyReceipt = {
  competitionTitle: 'Feedants Classical Dance',
  registrationId: 'FCD-2025-019',
  paymentMethod: 'UPI',
  amountPaid: 99,
  submissionOpensOn: '15 July 2025',
};

export default function PaymentSuccessScreen({ navigation, route }) {
  const receipt = (route && route.params && route.params.receipt) || dummyReceipt;

const gotoHomeScreen=()=>{
  navigation.reset({
    index:0,
    routes: [{ name: 'MainTabs' }]
  })
}

useEffect(() => {
    
    const backAction = () => {
      gotoHomeScreen(); 
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
       
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

