import { useEffect, useState } from "react";
import { getWorkouts } from "../storage/wourkout";
import { Workout } from "../type/data";
import { useIsFocused } from "@react-navigation/native";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getData() {
      const _workouts = await getWorkouts();
      setWorkouts(_workouts);
    }

    if (isFocused) {
      getData();
    }
  }, [isFocused])

  return workouts;
}