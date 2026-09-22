import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../styles/colors';


const dummyUser = {
  name: 'Rohit',
  avatarUrl: 'https://images.unsplash.com/photo-1695927621677-ec96e048dce2?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const featuredCompetition = {
  id: 'comp_001',
  title: 'Feedants Classical Dance',
  tagline: 'Classical talent awaits',
  category: ['Dance', 'Multi-Win'],
  subtitle: 'Solo & group entries · Online',
  timeLeftLabel: '01d : 06h left',
  prizePool: 1500,
  entryFee: 99,
  totalSpots: 20,
  spotsBooked: 1,
  isUserRegistered: true,
};

const moreCompetitions = [
  {
    id: 'comp_002',
    title: 'Indie Voice Spotlight',
    icon: '\u{1F3A4}',
    prizePool: 2000,
    entryFee: 79,
    timeLeftLabel: '8h left',
    urgent: true,
    progressPercent: 70,
  },
  {
    id: 'comp_003',
    title: 'Monsoon Art Challenge',
    icon: '\u{1F3A8}',
    prizePool: 1200,
    entryFee: 49,
    timeLeftLabel: '2d left',
    urgent: false,
    progressPercent: 35,
  },
];


// FeaturedCompetitionCard

function FeaturedCompetitionCard({ competition, onJoin }) {
  const spotsLeft = competition.totalSpots - competition.spotsBooked;
  const progressPercent = Math.min((competition.spotsBooked / competition.totalSpots) * 100, 100);

  return (
    <View style={styles.featuredCard}>
      <LinearGradient
        colors={[colors.primary, '#2FB39F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.featuredBanner}
      >
        <View style={styles.featuredTopRow}>
          <View style={styles.tagsRow}>
            {competition.category.map((tag) => (
              <View key={tag} style={styles.bannerTagChip}>
                <Text style={styles.bannerTagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.timeLeftPill}>
            <Text style={styles.timeLeftText}>{competition.timeLeftLabel}</Text>
          </View>
        </View>

        <View style={styles.taglineRow}>
          <Text style={styles.taglineIcon}>{'\u{1F3B5}'}</Text>
          <Text style={styles.taglineText}>{competition.tagline}</Text>
        </View>
      </LinearGradient>

      <View style={styles.featuredBody}>
        <View style={styles.featuredTitleRow}>
          <Text style={styles.featuredTitle}>{competition.title}</Text>
          {competition.isUserRegistered && (
            <View style={styles.registeredPill}>
              <Text style={styles.registeredPillText}>Registered</Text>
            </View>
          )}
        </View>
        <Text style={styles.featuredSubtitle}>{competition.subtitle}</Text>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceLabel}>Prize pool</Text>
            <Text style={styles.priceValue}>₹{competition.prizePool.toLocaleString('en-IN')}</Text>
          </View>
          <View>
            <Text style={styles.priceLabel}>Entry fee</Text>
            <Text style={styles.priceValueDark}>₹{competition.entryFee}</Text>
          </View>
        </View>

        <View style={styles.spotsRow}>
          <Text style={styles.spotsLeftText}>Only {spotsLeft} spots left</Text>
          <Text style={styles.bookedText}>{competition.spotsBooked} / {competition.totalSpots} booked</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>

        <TouchableOpacity style={styles.joinButton} onPress={onJoin} activeOpacity={0.85}>
          <Text style={styles.joinButtonText}>Join now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//CompetitionListItem

function CompetitionListItem({ competition, onPress }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.listItemIconBox}>
        <Text style={styles.listItemIcon}>{competition.icon}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.listItemTopRow}>
          <Text style={styles.listItemTitle}>{competition.title}</Text>
          <Text style={[styles.listItemTime, competition.urgent && styles.listItemTimeUrgent]}>
            {competition.timeLeftLabel}
          </Text>
        </View>
        <Text style={styles.listItemMeta}>
          Prize ₹{competition.prizePool.toLocaleString('en-IN')} · Entry ₹{competition.entryFee}
        </Text>

        <View style={styles.listProgressTrack}>
          <View style={[styles.listProgressFill, { width: `${competition.progressPercent}%` }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

//start Activity Code 
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      
        {/* Greeting */}
        <View style={styles.greetingRow}>
          <View>
            <Text style={styles.greetingText}>Good morning, {dummyUser.name}</Text>
            <Text style={styles.greetingTitle}>Find your next stage</Text>
          </View>
          <Image source={{ uri: dummyUser.avatarUrl }} style={styles.avatar} />
        </View>

       <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search bar */}
        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>{'\u{1F50D}'}</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search dance, music, art..."
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Live competitions */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Live competitions</Text>
            <Text style={styles.sectionSubtitle}>Handpicked for your talent</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <FeaturedCompetitionCard
          competition={featuredCompetition}
          onJoin={() => navigation && navigation.navigate('Details', { id: featuredCompetition.id })}
        />

        {/* More to explore */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>More to explore</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Filters</Text>
          </TouchableOpacity>
        </View>

        {moreCompetitions.map((competition) => (
          <CompetitionListItem
            key={competition.id}
            competition={competition}
            onPress={() => navigation && navigation.navigate('Details', { id: competition.id })}
          />
        ))}
      </ScrollView>

     
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  greetingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',paddingHorizontal:18,paddingVertical:12 },
  greetingText: { fontSize: 14, color: colors.textSecondary },
  greetingTitle: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 4 },
  avatar: { width: 48, height: 48, borderRadius: 24 },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    marginTop: 20,
  },
  searchIcon: { fontSize: 15, marginRight: 10, color: colors.textMuted },
  searchInput: { flex: 1, fontSize: 14, color: colors.text },
  filterIcon: { fontSize: 16 },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: colors.text },
  sectionSubtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  viewAll: { fontSize: 14, fontWeight: '700', color: colors.primary },

  // Featured card
  featuredCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  featuredBanner: { padding: 18, minHeight: 150, justifyContent: 'space-between' },
  featuredTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  tagsRow: { flexDirection: 'row', gap: 8 },
  bannerTagChip: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  bannerTagText: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
  timeLeftPill: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  timeLeftText: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
  taglineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  taglineIcon: { fontSize: 18, marginRight: 10, color: colors.white },
  taglineText: { fontSize: 19, fontWeight: '800', color: colors.white },

  featuredBody: { padding: 18 },
  featuredTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  featuredTitle: { fontSize: 20, fontWeight: '800', color: colors.text, flex: 1, marginRight: 8 },
  registeredPill: { backgroundColor: colors.primaryLight, borderRadius: 14, paddingVertical: 6, paddingHorizontal: 12 },
  registeredPillText: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
  featuredSubtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },

  priceRow: { flexDirection: 'row', gap: 48, marginTop: 20 },
  priceLabel: { fontSize: 13, color: colors.textSecondary, marginBottom: 4 },
  priceValue: { fontSize: 22, fontWeight: '800', color: colors.primaryDark },
  priceValueDark: { fontSize: 22, fontWeight: '800', color: colors.text },

  spotsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  spotsLeftText: { fontSize: 14, fontWeight: '700', color: colors.primaryDark },
  bookedText: { fontSize: 13, color: colors.textSecondary },
  progressTrack: {
    height: 6,
    backgroundColor: colors.primaryLight,
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },

  joinButton: {
    backgroundColor: colors.primaryDark,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,
  },
  joinButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },

  // List items
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    backgroundColor: colors.white,
  },
  listItemIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  listItemIcon: { fontSize: 20, color: colors.primaryDark },
  listItemTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  listItemTitle: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1, marginRight: 8 },
  listItemTime: { fontSize: 13, fontWeight: '700', color: colors.primaryDark },
  listItemTimeUrgent: { color: colors.danger },
  listItemMeta: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  listProgressTrack: {
    height: 5,
    backgroundColor: colors.primaryLight,
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  listProgressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },

  // Bottom tab bar
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingBottom: 18,
  },
  tabItem: { flex: 1, alignItems: 'center' },
  tabIcon: { fontSize: 18, color: colors.textMuted },
  tabIconActive: { color: colors.primary },
  tabLabel: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
  tabLabelActive: { color: colors.primary, fontWeight: '700' },
});