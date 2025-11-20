import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 8 
},
  list: { 
    padding: 10 
},
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff7e6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: { 
    width: 80, 
    height: 80, 
    borderRadius: 10, 
    marginRight: 10 
}, priceRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 },
  price: { 
    fontSize: 15, 
    color: '#ff6600', 
    fontWeight: 'bold' 
},



counterButton: {
  width: 28,
  height: 28,
  borderRadius: 6,
  backgroundColor: '#ff6600',
  justifyContent: 'center',
  alignItems: 'center',
},

counterText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
},

deleteButton: {
  backgroundColor: '#FF3B30', 
  width: 32,
  height: 32,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 5,
},





})