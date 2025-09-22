import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ChatMessage = ({ message }) => {
  return (
    <View style={[
      styles.messageContainer,
      message.isBot ? styles.botMessage : styles.userMessage
    ]}>
      {message.image && (
        <Image source={{ uri: message.image }} style={styles.messageImage} />
      )}
      <Text style={[
        styles.messageText,
        message.isBot ? styles.botText : styles.userText
      ]}>
        {message.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderBottomLeftRadius: 0,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2E7D32',
    borderBottomRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: '#1B5E20',
  },
  userText: {
    color: '#FFFFFF',
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ChatMessage;