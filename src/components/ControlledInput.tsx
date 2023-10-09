import { Control, Controller } from "react-hook-form";
import React, { useState } from "react";
import { View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";

type ControlledInputProps = {
    control: Control 
    name: string
    maxLength?: number
} & React.ComponentProps<typeof TextInput>

export default function ControlledInput({control, name, maxLength, ...textInputProps}: ControlledInputProps){

    return (
        <Controller 
            control={control}
            name={name}
            render={({
            field: { value, onChange, onBlur },
            fieldState: { error, invalid },
            })=> {
                const handleChangeText = (text: string) => {
                    onChange(text);
                };
                return (
                <View>
                    <TextInput 
                    {...textInputProps}
                    value={value}
                    onChangeText={handleChangeText}  // use the new handleChangeText function
                    onBlur={onBlur}
                    mode='outlined'
                    />
                    {maxLength && <Text>{`${value?.length ? value.length : '0' }/${maxLength}`}</Text>} 
                    <HelperText type="error" visible={invalid}>
                        {error?.message}
                    </HelperText>
                </View>
                )}
            }
        />
    )
}