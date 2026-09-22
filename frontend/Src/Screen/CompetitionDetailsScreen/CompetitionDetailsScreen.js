import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, ActivityIndicator, Text } from 'react-native';

import Header from '../../components/Header'
// import Header from '../components/Header';
import CompetitionInfoCard from '../../components/CompetitionInfoCard';
import JudgeCard from '../../components/JudgeCard';
import CountdownBanner from '../../components/CountdownBanner';
import ImportantDates from '../../components/ImportantDates';
import PreviousWinners from '../../components/PreviousWinners';
import TabsSection from '../../components/TabsSection';
import RewardsList from '../../components/RewardsList';
import { PaymentInfoBanner, ReferEarnCard } from '../../components/PaymentAndReferral';
import RegisterButton from '../../components/RegisterButton';

import dummyCompetition from '../../data/dummyCompetition';
import colors from '../../styles/colors';
import {getActiveCompetition} from '../../Services/competitionApi'



export default function CompetitionDetailsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchCompetition = async () => {
      try {
        const response = await getActiveCompetition({ signal: controller.signal });
        const result = response?.data?.data || response?.data || dummyCompetition;
        if (isMounted) setCompetition(result || dummyCompetition);
      } catch (error) {
        if (error?.code !== 'ERR_CANCELED' && isMounted) {
          console.log('message', error);
          setCompetition(dummyCompetition);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCompetition();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (loading && !competition) {
    return (
      <View style={styles.centerLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading competition...</Text>
      </View>
    );
  }

  if (!competition) return null;

  const spotsLeft = competition.totalSpots - competition.spotsBooked;
  const buttonStatus = competition.isUserRegistered
    ? 'registered'
    : spotsLeft <= 0
    ? 'full'
    : 'register';

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

     
        <Header onGoBack={() => navigation && navigation.goBack()} />
       <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CompetitionInfoCard
          title={competition.title}
          category={competition.category}
          prizePool={competition.prizePool}
          entryFee={competition.entryFee}
          totalSpots={competition.totalSpots}
          spotsBooked={competition.spotsBooked}
          isUserRegistered={competition.isUserRegistered}
        />

        <JudgeCard judge={competition.judge} onPlayIntro={() => {}} />

        <CountdownBanner deadline={competition.dates.registerBefore} />

        <ImportantDates dates={competition.dates} />

        <PreviousWinners winners={competition.previousWinners} onPlayVideo={() => {}} />

        <TabsSection
          aboutCompetition={competition.aboutCompetition}
          judgingParameters={competition.judgingParameters}
          rulesAndEligibility={competition.rulesAndEligibility}
        />

        <RewardsList rewards={competition.rewards} />

        <PaymentInfoBanner
          poweredBy={competition.paymentInfo.poweredBy}
          refundPolicyText={competition.paymentInfo.refundPolicyText}
        />

        <ReferEarnCard referral={competition.referral} onCopy={() => {}} />
      </ScrollView>

      <RegisterButton
        status={buttonStatus}
        entryFee={competition.entryFee}
        onPress={() => navigation.navigate('Registered')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  centerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
