import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const TABS = [
  { key: 'about', label: 'About Competition' },
  { key: 'judging', label: 'Judging Parameters' },
  { key: 'rules', label: 'Rules & Eligibility' },
];

export default function TabsSection({ aboutCompetition, judgingParameters, rulesAndEligibility }) {
  const [activeTab, setActiveTab] = useState('about');
  const [expanded, setExpanded] = useState(false);

  const contentByTab = {
    about: aboutCompetition,
    judging: judgingParameters,
    rules: rulesAndEligibility,
  };

  const content = contentByTab[activeTab] || '';
  const isLong = content.length > 140;
  const displayText = !expanded && isLong ? content.slice(0, 140).trim() + '…' : content;

  const handleTabChange = (key) => {
    setActiveTab(key);
    setExpanded(false); // collapse again when switching tabs
  };

  return (
    <View style={styles.card}>
      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => handleTabChange(tab.key)}
            style={styles.tabButton}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
            {activeTab === tab.key && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.content}>{displayText}</Text>

      {isLong && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.viewMore}>
            {expanded ? 'View less' : 'View more'} {expanded ? '\u2303' : '\u2304'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  tabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 14,
  },
  tabButton: { marginRight: 16, marginBottom: 6, paddingBottom: 10, flexShrink: 1 },
  tabLabel: { fontSize: 13, color: colors.textSecondary, fontWeight: '600' },
  tabLabelActive: { color: colors.primary },
  tabUnderline: { height: 2, backgroundColor: colors.primary, marginTop: 8, borderRadius: 1 },
  content: { fontSize: 14, color: colors.textSecondary, lineHeight: 21, flexShrink: 1 },
  viewMore: { fontSize: 13, fontWeight: '600', color: colors.primary, marginTop: 10 },
});
