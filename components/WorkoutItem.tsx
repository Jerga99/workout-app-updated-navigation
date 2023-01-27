import { View, Text, Button, StyleSheet, FlatList, StyleProp, ViewStyle } from "react-native";
import { Workout } from "../type/data";
import { formatSec, secToMin } from "../utils/time";



export default function WorkoutItem({ item, children, childStyles = {} }: {
    item: Workout,
    children?: React.ReactNode
    childStyles?: StyleProp<ViewStyle>
}) {

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.duration}> Duration:{formatSec(item.duration)} </Text>
            <Text style={styles.difficulty}>Difficulty:{item.difficulty}</Text>
            {
                children &&
                <View style={childStyles}>
                    {children}
                </View>
            }
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderColor: "rgba(0,0,0, 0.1)",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff"

    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
    duration: {
        fontSize: 15,
    },
    difficulty: {
        fontSize: 15
    },

})