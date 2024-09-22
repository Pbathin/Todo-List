import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { nanoid } from 'nanoid'; // Correct import

export default function Registration({ navigation }) {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    otpPhone: '',
    otpEmail: '',
  });
  const [otpPhoneSent, setOtpPhoneSent] = useState(false);
  const [otpEmailSent, setOtpEmailSent] = useState(false);

  const handleChange = (value, key) => {
    setUser({ ...user, [key]: value });
  };

  const handleClear = () => {
    setUser({
      name: '',
      phone: '',
      email: '',
      password: '',
      otpPhone: '',
      otpEmail: '',
    });
    setOtpPhoneSent(false);
    setOtpEmailSent(false);
  };

  const validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateEmail = (email) => {
    return /^[A-Za-z0-9._%+-]+@(gmail|outlook)\.com$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/.test(password);
  };

  const sendOtp = async () => {
    const { phone, email } = user;
    const otpPhone = nanoid(6);
    const otpEmail = nanoid(6);

    try {
      // Send OTP to phone
      await axios.post(`https://api.twilio.com/2010-04-01/Accounts/${Constants.manifest.extra.TWILIO_ACCOUNT_SID}/Messages.json`, {
        Body: `Your OTP code is ${otpPhone}`,
        From: Constants.manifest.extra.TWILIO_PHONE_NUMBER,
        To: `+${phone}`,
      }, {
        auth: {
          username: Constants.manifest.extra.TWILIO_ACCOUNT_SID,
          password: Constants.manifest.extra.TWILIO_AUTH_TOKEN,
        },
      });

      // Send OTP to email
      await axios.post('https://api.sendgrid.com/v3/mail/send', {
        personalizations: [{
          to: [{ email }],
          subject: 'Your OTP Code',
        }],
        from: { email: Constants.manifest.extra.SENDGRID_SENDER_EMAIL },
        content: [{
          type: 'text/plain',
          value: `Your OTP code is ${otpEmail}`,
        }],
      }, {
        headers: {
          Authorization: `Bearer ${Constants.manifest.extra.SENDGRID_API_KEY}`,
        },
      });

      // Store OTPs in state
      setUser((prevUser) => ({
        ...prevUser,
        otpPhone,
        otpEmail,
      }));
      setOtpPhoneSent(true);
      setOtpEmailSent(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  const validateOtp = () => {
    if (user.otpPhone !== user.otpPhone) {
      Alert.alert('Error', 'Invalid OTP for phone.');
      return;
    }

    if (user.otpEmail !== user.otpEmail) {
      Alert.alert('Error', 'Invalid OTP for email.');
      return;
    }

    registerUser();
  };

  const registerUser = async () => {
    if (!user.name || !user.phone || !user.email || !user.password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!validateName(user.name)) {
      Alert.alert('Error', 'Name should only contain characters.');
      return;
    }

    if (!validatePhone(user.phone)) {
      Alert.alert('Error', 'Phone number should be exactly 10 digits.');
      return;
    }

    if (!validateEmail(user.email)) {
      Alert.alert('Error', 'Please enter a valid Gmail or Outlook email address.');
      return;
    }

    if (!validatePassword(user.password)) {
      Alert.alert('Error', 'Password must be 8-16 characters long, include at least one uppercase letter, one special character, and one number.');
      return;
    }

    let old_data = await AsyncStorage.getItem('register');
    old_data = JSON.parse(old_data) || [];
    let user_id = 1001;
    if (old_data.length > 0) {
      user_id = old_data[old_data.length - 1].user_id + 1;
    }
    let details = {
      user_id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      password: user.password,
    };

    let all_details = [...old_data, details];
    await AsyncStorage.setItem('register', JSON.stringify(all_details));
    Alert.alert('Success', 'User registered successfully.');
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Image
          style={styles.image}
          source={{ uri: 'https://img.freepik.com/free-vector/man-working-using-laptop-flat-design_1308-102458.jpg?t=st=1700856033~exp=1700856633~hmac=803c85042b924e6e53dacefdeec86a53cacc5c31e823f65efbcbb46adcf00ef1' }}
        />
        <Text style={styles.heading}>Register to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          onChangeText={(value) => handleChange(value, 'name')}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your Phone Number"
          onChangeText={(value) => handleChange(value, 'phone')}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          onChangeText={(value) => handleChange(value, 'email')}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          onChangeText={(value) => handleChange(value, 'password')}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
        {otpPhoneSent && otpEmailSent && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP from Phone"
              onChangeText={(value) => handleChange(value, 'otpPhone')}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter OTP from Email"
              onChangeText={(value) => handleChange(value, 'otpEmail')}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={validateOtp}>
              <Text style={styles.buttonText}>Validate OTP</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
