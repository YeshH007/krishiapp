import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// --- Assumed Component Import ---
// This component is not defined here, but your project structure requires it.
// Make sure you have a ChatMessage.js file in your Components folder.
// Example content for ChatMessage.js is provided after this code block.
import ChatMessage from '../Components/ChatMessage';

// --- IMPORTANT ---
// Replace this with your actual Gemini API Key from Google AI Studio or Google Cloud.
// This single key will work for both text and vision models.
const GEMINI_API_KEY = 'AIzaSyAwZMbHzjdqLSiW6nSSaBN-XNqyRY5uksk';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: Date.now(), text: '👋 Hi! How can I help you with your farming questions today?', isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollViewRef = useRef();

  // -------------------- Pick Image from Device --------------------
  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You've refused to allow this app to access your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7, // Lower quality slightly for faster upload
      base64: true,
    });

    if (!result.canceled) {
      // Use the first asset from the assets array
      const imageAsset = result.assets[0];
      setSelectedImage(imageAsset);
      analyzeImage(imageAsset.base64);
    }
  };

  // -------------------- Analyze Image with Gemini Vision --------------------
  const analyzeImage = async (base64Image) => {
    setLoading(true);
    setSelectedImage(null); // Clear preview after sending

    const userMessage = {
      id: Date.now(),
      text: '📷 Image sent for analysis.',
      isBot: false,
      image: `data:image/jpeg;base64,${base64Image}`
    };
    setMessages(prev => [...prev, userMessage]);

   try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: "Analyze this agricultural image. Identify any visible plant diseases, pests, or nutrient deficiencies. Provide practical farming advice in simple Malayalam." },
                { inline_data: { mime_type: "image/jpeg", data: base64Image } }
              ]
            }]
          })
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error.message || `API error: ${response.status}`);
      }
      
      const data = await response.json();
      const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Sorry, I couldn’t analyze the image. Please try again.";
      const botMessage = { id: Date.now() + 1, text: botResponse, isBot: true };
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error("Image analysis error:", err);
      setError('Failed to analyze the image. Please check your API key and network connection.');
    } finally {
      setLoading(false);
    }
  };
  // -------------------- Send Text Message with Gemini --------------------
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
        const malayalamPrompt = `Please answer the following question in Malayalam: ${inputText}`;
      const response = await fetch(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: malayalamPrompt}] }]
          }),
        }
      );

      if (!response.ok) {
         const errorBody = await response.json();
         console.error("Gemini API error details:", errorBody);
         throw new Error(`Gemini API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Sorry, I couldn't get a reply.";

      const botMessage = { id: Date.now() + 1, text: botResponse, isBot: true };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Text chat error:", error);
      Alert.alert("Error", "Failed to get a reply. Please check your API key and ensure the Generative Language API is enabled in your Google Cloud project.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- UI Rendering --------------------
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={{ paddingBottom: 10 }}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2E7D32" />
            <Text style={styles.loadingText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your question..."
          multiline
        />
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <Text style={styles.iconButtonText}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5DC' },
  messagesContainer: { flex: 1, paddingHorizontal: 10, paddingTop: 10 },
  loadingContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
    marginLeft: 10,
  },
  loadingText: { marginLeft: 10, color: '#666', fontStyle: 'italic' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 120,
  },
  iconButton: { 
    width: 44, 
    height: 44, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10 
  },
  iconButtonText: { fontSize: 24, color: '#4CAF50' },
  sendButton: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#2E7D32', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  sendButtonText: { color: '#FFFFFF', fontSize: 20, transform: [{translateX: -1}] },
});

export default ChatScreen;