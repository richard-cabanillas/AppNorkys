import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF6347',
    marginBottom: 8,
  },
  weight: {
    fontSize: 16,
    color: '#777',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6347',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  counterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  counterButtonText: {
    fontSize: 20,
    color: '#FF6347',
    fontWeight: '600',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111',
    marginHorizontal: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#28a745', // verde llamativo
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  payButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
})