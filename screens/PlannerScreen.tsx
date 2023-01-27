import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import { SequenceItem, SequenceType, Workout } from "../type/data";
import slugify from "slugify";
import { PressableThemeText } from '../components/styled/PressableThemeText';
import WorkoutForm, { WorkoutFormData } from '../components/WorkoutForm';
import { PressableText } from '../components/styled/PressableText';
import ExerciseItem from '../components/ExercciseItem';
import { Modal } from '../components/styled/Modal';
import { storeWorkout } from "../storage/wourkout";
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Planner'>;

export default function PlannerScreen({ navigation }: Props) {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);

  const handleExerciseSubmit = (form: ExerciseFormData) => {
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + " " + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration)
    };

    if (form.reps) {
      sequenceItem.reps = Number(form.reps)
    }
    setSeqItems([...seqItems, sequenceItem]);

  }
  const computeDiff = (exercisesCount: number, workoutDuration: number) => {
    const intensity = workoutDuration / exercisesCount;

    if (intensity <= 60) {
      return "hard";
    } else if (intensity <= 100) {
      return "normal";
    } else {
      return "easy";
    }

  }
  const handleWorkoutSubmit = async (form: WorkoutFormData) => {
    if (seqItems.length > 0) {

      const duration = seqItems.reduce((acc, item) => {
        return acc + item.duration;
      }, 0)

      const workout: Workout = {
        name: form.name,
        slug: slugify(form.name + " " + Date.now(), { lower: true }),
        difficulty: computeDiff(seqItems.length, duration),
        sequence: [...seqItems],
        duration,
      }


      await storeWorkout(workout);
    }

  }
  return (
    <View style={styles.container}>

      <ExerciseForm

        onSubmit={handleExerciseSubmit}
      />
      <FlatList
        data={seqItems}
        renderItem={({ item, index }) =>
          <ExerciseItem item={item}>
            <PressableText
              text="Remove"
              onPressIn={() => {
                const items = [...seqItems];
                items.splice(index, 1);
                setSeqItems(items);
              }}
            />
          </ExerciseItem>
        }
        keyExtractor={item => item.slug}
      />
      <View>
        <Modal
          activator={({ handleOpen }) =>
            <PressableThemeText
              style={{ marginTop: 15 }}
              text="Create Workout"
              onPress={handleOpen}
            />
          }
        >
          {({handleClose}) =>
            <View>
              <WorkoutForm
                onSubmit={async (data) => {
                  await handleWorkoutSubmit(data)
                  handleClose()
                  navigation.navigate("Home");
                }}
              />
            </View>
          }
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  }
})

