import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import TextInputField from '@/components/Shared/TextInputField'
import Button from '@/components/Shared/Button';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/configs/FirebaseConfig';
import { ToastAndroid } from 'react-native';
import axios from 'axios';
import { AuthContext } from '@/context/Authcontext';

export default function SignIn() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const {user, setUser} = useContext(AuthContext);
  const router = useRouter();

  const onBtnPress = () => {
    if (!email || !password) {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.BOTTOM);
      return;
    }
    setLoading(true);
    // Call the API to sign in the user
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;

        if (!user) {
          ToastAndroid.show('Something went wrong', ToastAndroid.BOTTOM);
          setLoading(false);
          return;
        } else {
          const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL + '/user?email=' + email);
          console.log(result);
          // setUser(result.data);
          setUser({
            name: user.displayName,
            email: user.email,
            image: user?.photoURL??''
          });
          setLoading(false);
          //console.log(user);
          // Route to the home screen
          router.push('/landing');
        }

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Something went wrong', ToastAndroid.BOTTOM);
        setLoading(false);
      });
  }

  return (
    <View
      style={{
        paddingTop: 60,
        padding: 20
      }}
    >
      <Image source={require('./../../assets/images/logo.png')} 
        style={{ 
          width: 250, 
          height: 250,
          alignSelf: 'center'
        }}
      />
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold'
        }}
      >
        Sign In To College Campus
      </Text>
      <TextInputField label='College Email' onChangeText={(v) => setEmail(v)} />
      <TextInputField label='Password' onChangeText={(v) => setPassword(v)} password={true} />
      <Button text='Sign In' onPress={() => onBtnPress()} loading={loading} />
      <Button text='Sign Up' onPress={() => router.push('/(auth)/SignUp')} loading={false} />
    </View>
  )
}