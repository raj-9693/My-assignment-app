
import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

 export const styles = StyleSheet.create({
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