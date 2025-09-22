import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>🌾 Krish.ai</Text>
        <Text style={styles.subtitle}>Kerala Farmers' Digital Companion</Text>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌱 About Kerala Farming</Text>
        <Text style={styles.content}>
          Kerala's agriculture is unique with its focus on cash crops like coconut, rubber, coffee, tea, and spices. 
          The state's diverse topography from coastal plains to Western Ghats creates varied agro-climatic zones perfect 
          for different crops. Small-scale farming dominates with average land holdings of 0.18 hectares.
        </Text>
      </View>

      {/* AI Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🤖 AI-Powered Support</Text>
        
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>📝 Text Support</Text>
          <Text style={styles.featureText}>
            Get instant answers in Malayalam about crop diseases, pest control, weather patterns, 
            and best farming practices tailored for Kerala's climate.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>📷 Image Analysis</Text>
          <Text style={styles.featureText}>
            Upload photos of your crops to identify diseases, nutrient deficiencies, and pest infestations. 
            Our AI provides instant diagnosis and treatment recommendations.
          </Text>
        </View>
      </View>

      {/* Chat Button */}
      <TouchableOpacity 
        style={styles.chatButton}
        onPress={() => navigation.navigate('Chat')}
        activeOpacity={0.8}
      >
        <Text style={styles.chatButtonText}>💬 Start AI Chat Assistant</Text>
      </TouchableOpacity>

      {/* Helpline Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📞 Farmer Helplines</Text>
        <View style={styles.helplineCard}>
          <Text style={styles.helplineText}>• Kisan Call Center: 1551 / 1800-180-1551</Text>
          <Text style={styles.helplineText}>• Kerala Agriculture Helpline: 1800-425-1661</Text>
          <Text style={styles.helplineText}>• Krishi Bhavan Support: Contact local office</Text>
        </View>
      </View>

      {/* Government Schemes */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Government Schemes for Farmers</Text>
        <View style={styles.schemeCard}>
          <Text style={styles.schemeText}>📌 PM-KISAN: ₹6000 annual income support</Text>
          <Text style={styles.schemeText}>📌 Krishnasree: Support for vegetable cultivation</Text>
          <Text style={styles.schemeText}>📌 Kerala State Crop Insurance Scheme</Text>
          <Text style={styles.schemeText}>📌 Subsidy for organic farming inputs</Text>
          <Text style={styles.schemeText}>📌 Karshaka Pension: ₹1600/month for farmers above 60</Text>
          <Text style={styles.schemeText}>📌 Zero interest loans up to ₹3 lakhs</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F3', // Softer background
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#C8E6C9',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginVertical: 10,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#66BB6A',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  chatButton: {
    backgroundColor: '#FF6F00',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helplineCard: {
    backgroundColor: '#E8F5E9',
    padding: 18,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  helplineText: {
    fontSize: 14,
    color: '#1B5E20',
    marginVertical: 5,
  },
  footer: {
    backgroundColor: '#1B5E20',
    padding: 20,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  schemeCard: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 12,
  },
  schemeText: {
    fontSize: 14,
    color: '#E8F5E9',
    marginVertical: 3,
    paddingLeft: 8,
  },
});

export default HomeScreen;
