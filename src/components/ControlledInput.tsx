import { Control, Controller } from "react-hook-form";
import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

type ControlledInputProps = {
    control: Control 
    name: string
} & React.ComponentProps<typeof TextInput>

export default function ControlledInput({control, name, ...textInputProps}: ControlledInputProps){
    return (
        <Controller 
            control={control}
            name={name}
            render={({
            field: { value, onChange, onBlur },
            fieldState: { error, invalid },
            })=>(
            <View>
                <TextInput 
                {...textInputProps}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                mode='outlined'
                // error={invalid}
                />
                <HelperText type="error" visible={invalid}>
                    {error?.message}
                </HelperText>
            </View>
            )}
        />
    )
}