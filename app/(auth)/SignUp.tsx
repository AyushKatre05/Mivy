import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/data/Colors';
import TextInputField from '@/components/Shared/TextInputField';
import Button from '@/components/Shared/Button';
import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/configs/FirebaseConfig';
import { upload } from 'cloudinary-react-native';
import { cld, options } from '@/configs/CloudinaryConfig';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/context/Authcontext';

export default function SignUp() {
    const [profileImg, setProfileImg] = useState<string | undefined>();
    const [fullName, setFullName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const { user, setUser } = useContext(AuthContext);
    const router = useRouter();

    const onBtnPress = () => {
        if (!fullName || !email || !password) {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.BOTTOM);
            return;
        }

        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                await upload(cld, {
                    file: profileImg,
                    options: options,
                    callback: async (error: any, response: any) => {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        if (response) {
                            console.log(response?.url);
                            // Call the API to save the user data
                            const result = await axios.post(process.env.EXPO_PUBLIC_HOST_URL + '/user', {
                                name: fullName,
                                email: email,
                                image: response?.url
                            });
                            console.log(result);
                            setUser({
                                name: fullName,
                                email: email,
                                image: response?.url
                            });
                            // Route to the home screen
                            router.push('/');
                        } else {
                            ToastAndroid.show('Something went wrong', ToastAndroid.BOTTOM);
                        }
                    }
                })
                // ...
            })
            .catch((error) => {
                const errorCode = error?.code;
                const errorMessage = error?.message;
                ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
                console.log(errorCode, errorMessage);
                setLoading(false);
                // ..
            });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.5,
        });

        console.log(result);

        if (!result.canceled) {
            setProfileImg(result.assets[0].uri);
        }
    };

    return (
        <View
            style={{
                paddingTop: 60,
                padding: 20
            }}
        >
            <Text
                style={{
                    fontSize: 25,
                    fontWeight: 'bold'
                }}
            >
                Create New Account
            </Text>
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <View>
                    <TouchableOpacity onPress={() => pickImage()}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 99,
                                marginTop: 20
                            }}
                            source={
                                profileImg ? { uri: profileImg } : require('./../../assets/images/profile.png')
                            }
                        />
                        <Ionicons name="camera" size={24} color={Colors.PRIMARY}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0
                            }}
                            onPress={() => pickImage()}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TextInputField label='Full Name' onChangeText={(v) => setFullName(v)} />
            <TextInputField label='College Email' onChangeText={(v) => setEmail(v)} />
            <TextInputField label='Password' onChangeText={(v) => setPassword(v)} password={true} />

            <Button text='Sign Up' onPress={() => onBtnPress()} loading={loading} />
        </View>
    )
}