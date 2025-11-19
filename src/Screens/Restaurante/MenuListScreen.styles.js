import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
      container: { 
        flex: 1, 
        backgroundColor: '#fff' 
    },
  header: { 
    backgroundColor: '#ff6600', 
    padding: 15 
},
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 8 
},
  search: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff7e6',
    paddingVertical: 10,
  },
  tab: { 
    paddingVertical: 6, 
    paddingHorizontal: 15, 
    borderRadius: 20 
},
  activeTab: { 
    backgroundColor: '#ff6600' 
},
  tabText: { 
    color: '#333', 
    fontWeight: '500' 
},
  activeTabText: { 
    color: '#fff' 
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
},
  name: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
},
  desc: { 
    fontSize: 13, 
    color: '#666', 
    marginVertical: 2 
},
  priceRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 },
  price: { 
    fontSize: 15, 
    color: '#ff6600', 
    fontWeight: 'bold' 
},
  oldPrice: { 
    fontSize: 13, 
    color: '#999', 
    textDecorationLine: 'line-through' 
},
  tag: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#ff6600',
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#ff6600',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },






categoriesBar: {
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0',
  maxHeight: 60,  // 👈 AGREGA esta línea
},
categoriesContent: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  gap: 8,
  alignItems: 'center',  // 👈 AGREGA esta línea
},
categoryButton: {
  paddingHorizontal: 20,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: '#f0f0f0',
  marginRight: 8,
  height: 36,  // 👈 Asegúrate que esté esto
  justifyContent: 'center',
  alignItems: 'center',
},



// En tu MenuListScreen.styles.js
floatingCartButton: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  backgroundColor: '#FF6347', // color del círculo grande del carrito
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 5,
},

cartIconContainer: {
  position: 'relative',
},

cartBadge: {
  position: 'absolute',
  top: -6,   // sube un poco encima del icono
  right: -6, // alinea a la derecha del icono
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: '#FFD700', // color del círculo pequeño
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#fff', // borde blanco para resaltar
},

cartBadgeText: {
  color: '#000',
  fontSize: 12,
  fontWeight: 'bold',
},




})