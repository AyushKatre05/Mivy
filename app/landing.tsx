import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'
import Button from '@/components/Shared/Button'
import { useRouter } from 'expo-router'

export default function LandingScreen() {
    const router = useRouter()

    return (
        <View>
            <Image source={require('./../assets/images/login.png')}
                style={{
                    width: "100%",
                    height: 380
                }}
            />
            <View style={{ padding: 20 }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 35,
                        fontWeight: 'bold'
                    }}
                >
                    Welcome to College Campus Guru
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 17,
                        marginTop: 10,
                        color: Colors.GRAY
                    }}
                >
                    Your college news, updated in your pocket, Join the club, register for new events and Many More
                </Text>
                <Button 
                    text='Get Started' 
                    onPress={() => router.push('/(auth)/SignUp')}
                    loading={false}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        color: Colors.GRAY,
                        marginTop: 10
                    }}
                >
                    Already have an account? {' '}
                    <Text style={{ color: Colors.PRIMARY }} onPress={() => router.push('/(auth)/SignIn')}>Sign In</Text>
                </Text>
            </View>
        </View>
    )
}