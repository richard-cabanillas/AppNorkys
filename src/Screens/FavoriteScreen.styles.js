import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6EA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2b2b2b',
  },
  desc: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2b2b2b',
  },
  price: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B3A',
  },
  addButton: {
    backgroundColor: '#FF6B3A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});