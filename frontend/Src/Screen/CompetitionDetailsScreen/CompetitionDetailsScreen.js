import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, ActivityIndicator, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../components/Header';
import CompetitionInfoCard from '../../components/CompetitionInfoCard';
import JudgeCard from '../../components/JudgeCard';
import CountdownBanner from '../../components/CountdownBanner';
import ImportantDates from '../../components/ImportantDates';
import PreviousWinners from '../../components/PreviousWinners';
import TabsSection from '../../components/TabsSection';
import RewardsList from '../../components/RewardsList';
import { PaymentInfoBanner, ReferEarnCard } from '../../components/PaymentAndReferral';
import RegisterButton from '../../components/RegisterButton';


import colors from '../../styles/colors';
import { getActiveCompetition } from '../../Services/competitionApi';

export default function CompetitionDetailsScreen({ navigation, onCompetitionLoaded }) {
  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const loadCompetition = async () => {
        try {
          setLoading(true);
          const response = await getActiveCompetition();
          const result = response?.data?.data || response?.data;

          if (!result) {
            throw new Error('Competition data was not returned by the server');
          }
      
          if (isActive) {
            setCompetition(result);
            onCompetitionLoaded?.(result);
          }
        } catch (error) {
          console.log('Unable to load competition:', error?.message || error);

          if (isActive) {
            setCompetition(null);
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      loadCompetition();

      return () => {
        isActive = false;
      };
    }, [onCompetitionLoaded])
  );

  if (loading && !competition) {
    return (
      <View style={styles.centerLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading competition...</Text>
      </View>
    );
  }

  if (!competition) return null;

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

        <JudgeCard 
        name={competition.judge.name}
        title={competition.judge.title}
        experience={competition.judge.experience}
        photoUrl={competition.judge.photoUrl} />

       <CountdownBanner 
       deadline={competition.dates.registerBefore} 
       spotsBooked={competition.spotsBooked}
       totalSpots={competition.totalSpots}
/>

        <ImportantDates 
        registerBefore={competition.dates.registerBefore}
        submissionStarts={competition.dates.submissionStarts}
        submissionEnds={competition.dates.submissionEnds}
        resultDate={competition.dates.resultDate}

      />

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
        registerBefore={competition.dates.registerBefore}
        spotsBooked={competition.spotsBooked}
        totalSpots={competition.totalSpots}
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
