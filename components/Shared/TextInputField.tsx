import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors';

type TextInputFieldProps = {
    label: string;
    onChangeText: (text: string) => void;
    password?: boolean;
}

export default function TextInputField({ label, onChangeText, password = false }: TextInputFieldProps) {
    return (
        <View
            style={{
                marginBottom: 15
            }}
        >
            <Text
                style={{
                    color: Colors.GRAY
                }}
            >{label}</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                placeholder={label}
                secureTextEntry={password}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderWidth: 0.3,
        borderRadius: 5,
        marginTop: 5,
        fontSize: 17
    }
})