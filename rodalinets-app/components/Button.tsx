import {Pressable, StyleSheet, Text, View } from 'react-native'

type ButtonProps = {
    text: String;
    action: () => void;
} 

const Button = ({text, action} : ButtonProps) => {
  return (
    <Pressable onPress={action}>
      <Text>{text}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({})