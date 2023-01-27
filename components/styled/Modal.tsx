import { View, StyleSheet, Modal as DefaultModal } from "react-native";
import { FunctionComponent, ReactNode, useState } from "react";
import { PressableText } from "./PressableText";
type ModalProps = {
    activator?: FunctionComponent<
        {
            handleOpen: () => void
        }
    >,
    children: FunctionComponent<
    {
        handleOpen: () => void,
        handleClose: () => void
    }
>

}

export function Modal({
    activator: Activator,
    children
}: ModalProps) {

    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpen =() => setModalVisible(true);
    const handleClose =() => setModalVisible(false)
    return (
        <>

            <DefaultModal
                visible={isModalVisible}
                transparent={false}
                animationType="fade"
            >
                <View style={styles.centerView}>
                    <View style={styles.contentView}>
                        {children({handleOpen,handleClose})}
                    </View>

                    <PressableText
                        onPress={handleClose}
                        text="Close"
                    />
                </View>
            </DefaultModal>
            {Activator ?
                <Activator
                    handleOpen={handleOpen}
                /> :
                <PressableText
                    onPress={() => handleOpen()}
                    text="Open"
                />
            }
        </>
    )
}

const styles = StyleSheet.create({

    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentView: {
        marginBottom: 20
    }

})