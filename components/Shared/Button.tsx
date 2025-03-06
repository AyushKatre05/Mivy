import { View, Text, Touchable, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'
import { TouchableOpacity } from 'react-native'

type ButtonProps = {
    text: string,
    onPress: () => void,
    loading: boolean
}

export default function Buttontext({ text, onPress, loading = false }: ButtonProps) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                padding: 15,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 10,
                marginTop: 15
            }}
        >
            {loading ? 
                <ActivityIndicator
                    size='large'
                    color={Colors.WHITE}
                /> :
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: Colors.WHITE
                    }}
                >
                    {text}
                </Text>
            }
        </TouchableOpacity>
    )
}