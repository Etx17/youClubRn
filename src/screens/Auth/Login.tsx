import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../../../FirebaseConfig'
import { TextInput } from 'react-native-paper'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const auth = FIREBASE_AUTH

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        autoCapitalize='none'
        placeholder='Email'
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        placeholder='Password'
      />

    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Login