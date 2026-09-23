import { styles } from './index';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../styles/colors';



const dummyUser = {
  name: 'Rohit',
  avatarUrl: 'https://images.unsplash.com/photo-1695927621677-ec96e048dce2?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        end={{ x: 0.5, y: 0.5 }}
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
          
          <Text style={styles.taglineIcon}>{'\u{1F3B5}'}</Text>
        </View>
      </LinearGradient>


      <View style={styles.featuredBody}>
        <View style={styles.featuredTitleRow}>
          <Text style={styles.featuredTitle}>{competition.title || 'Tital '}</Text>
          {competition.isUserRegistered && (
            <View style={styles.registeredPill}>
              <Text style={styles.registeredPillText}>Registered</Text>
            </View>
          )}
        </View>
        
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceLabel}>Prize pool</Text>
            <Text style={styles.priceValue}>₹{competition.prizePool.toLocaleString('en-IN') || 0}</Text>
          </View>
          <View>
            <Text style={styles.priceLabel}>Entry fee</Text>
            <Text style={styles.priceValueDark}>₹{competition.entryFee || 0}</Text>
          </View>
        </View>

        <View style={styles.spotsRow}>
          <Text style={styles.spotsLeftText}>Only {spotsLeft} spots left</Text>
          <Text style={styles.bookedText}>{competition.spotsBooked || 0} / {competition.totalSpots || 0} booked</Text>
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
export default function HomeScreen({ navigation, competitionData }) {
  
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

        {competitionData ? (
          <FeaturedCompetitionCard
            competition={competitionData}
            onJoin={() => navigation && navigation.navigate('Details')}
          />
        ) : (
          <Text style={styles.sectionSubtitle}>Loading competition...</Text>
        )}

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

