import{StyleSheet} from "react-native";

export const styles = StyleSheet.create({
      label: { fontSize: 16, fontWeight: '500', marginBottom: 5, marginTop: 15 },
  input: { backgroundColor: '#f3f3f3', padding: 15, borderRadius: 10, fontSize: 16 },
  inputIconContainer: {
    backgroundColor: '#f3f3f3',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputIconText: { fontSize: 16, flex: 1 },
  payButton: { 
    backgroundColor: '#0a84ff', 
    padding: 18, 
    borderRadius: 12, 
    marginTop: 40, 
    alignItems: 'center' 
  },
})