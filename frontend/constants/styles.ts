import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      headerButtons: {
        flexDirection: 'row',
      },
      headerButton: {
        marginLeft: 16,
      },
      scrollView: {
        flex: 1,
      },
      scrollContent: {
        padding: 16,
        paddingBottom: 32,
      },
      section: {
        marginBottom: 24,
      },
      sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      emoji: {
        fontSize: 28,
      },
      cropGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      cropGridItem: {
        width: '48%',
      },
      viewAllButton: {
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 8,
      },
      viewAllText: {
        fontWeight: '600',
      },

      
    // Text
    h1: { fontSize: 28, lineHeight: 32, marginTop: -6 },
    h2: { fontSize: 24, lineHeight: 28, marginTop: -6 },
    h3: { fontSize: 20, lineHeight: 24, marginTop: -6 },
    h4: { fontSize: 16, lineHeight: 20, marginTop: -6 },
    small: { fontSize: 12, lineHeight: 16, marginTop: -6 },
    textCenter: { textAlign: 'center' },
    textBold: { fontWeight: 'bold' },
    error: {color: 'red'},

    // Spacing
    p1: { padding: 10 },
    p2: { padding: 20 },
    p3: { padding: 30 },
    pt1: { paddingTop: 10 },
    pt2: { paddingTop: 20 },
    pt3: { paddingTop: 30 },
    pb1: { paddingBottom: 10 },
    pb2: { paddingBottom: 20 },
    pb3: { paddingBottom: 30 },
    m0: { margin: 0 },
    m1: { margin: 10 },
    m2: { margin: 20 },
    m3: { margin: 30 },
    mb1: { marginBottom: 10 },
    mb2: { marginBottom: 20 },
    mb3: { marginBottom: 30 },
    mb4: { marginBottom: 40 },
    mb5: { marginBottom: 50 },
    mb6: { marginBottom: 60 },
    mt1: { marginTop: 10 },
    mt2: { marginTop: 20 },
    mt3: { marginTop: 30 },
    ml1: { marginLeft: 10 },
    ml2: { marginLeft: 20 },
    ml3: { marginLeft: 30 },
    mr1: { marginRight: 10 },
    mr2: { marginRight: 20 },
    mr3: { marginRight: 30 },

    // Flexbox
    flex1: { flex: 1 },
    flexRow: { flexDirection: 'row' },
    flexColumn: { flexDirection: 'column' },
    flexWrap: { flexWrap: 'wrap' },
    justifyCenter: { justifyContent: 'center' },
    alignCenter: { alignItems: 'center' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyEnd: { justifyContent: 'flex-end' },
});