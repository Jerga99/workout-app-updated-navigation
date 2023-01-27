import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form";
export type WorkoutFormData = {
    name: string
  }
  
  type WorkoutProps = {
    onSubmit: (form: WorkoutFormData) => void
  }
  
  export default function WorkoutForm({
    onSubmit
  }: WorkoutProps) {
    const { control, handleSubmit } = useForm();
  
    return (
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="name"
          render={({ field: {onChange, value}}) =>
            <TextInput
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholderTextColor={"rgba(0,0,0,0.4)"}
              placeholder="Workout Name"
            />
          }
        />
        <PressableText
          style={{marginTop: 10 , alignItems:"center"}}
          text="Confirm"
          onPress={handleSubmit((data) => {
            onSubmit(data as WorkoutFormData);
          })}
        />
      </View>
    )
  }

let styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,

    },
    input: {
        width:200,
        height: 40,
        margin: 8,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: "green",
        
    },

  })
