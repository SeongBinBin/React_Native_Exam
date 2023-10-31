import React, {useState} from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, Modal, View, Button, TextInput } from "react-native";
import { addData, getCurrentTime } from "../apis/firebase";

function AddList(){
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [home, setHome] = useState('')
    const [like, setLike] = useState('')


    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setName('')
        setEmail('')
        setHome('')
        setLike('')

        setShowModal(false)
    }

    const handleAddData = () => {
        const data = {
            name, email, home, like,
            createdAt: getCurrentTime(),
        }
        addData('React-Native-Exam', data)

        closeModal()
    }

    return(
        <SafeAreaView style={styles.block}>
            <TouchableOpacity style={styles.addBtn} onPress={openModal}>
                <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>

            <Modal
                visible={showModal}
            >
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalInputSection}>
                            <Text style={styles.modalText}>이름</Text>
                            <TextInput
                                value={name}
                                onChangeText={text => setName(text)}
                                style={styles.input} placeholder="이름을 입력해주세요"
                            />
                        </View>
                        <View style={styles.modalInputSection}>
                            <Text style={styles.modalText}>이메일</Text>
                            <TextInput
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={styles.input} placeholder="이메일을 입력해주세요"
                            />
                        </View>
                        <View style={styles.modalInputSection}>
                            <Text style={styles.modalText}>거주지</Text>
                            <TextInput
                                value={home}
                                onChangeText={text => setHome(text)}
                                style={styles.input} placeholder="거주지를 입력해주세요"
                            />
                        </View>
                        <View style={[styles.modalInputSection, {marginBottom: 50}]}>
                            <Text style={styles.modalText}>관심사</Text>
                            <TextInput
                                value={like}
                                onChangeText={text => setLike(text)}
                                style={styles.input} placeholder="관심사를 입력해주세요"
                            />
                        </View>
                        <View style={styles.btnSection}>
                            <TouchableOpacity style={[styles.modalBtn, {backgroundColor: 'gray'}]} onPress={closeModal}>
                                <Text style={{color: 'white'}}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalBtn, {backgroundColor: 'skyblue'}]} onPress={handleAddData}>
                                <Text style={{color: 'white'}}>등록</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
export default AddList

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    addBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 100,
        backgroundColor: '#000',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtnText: {
        fontSize: 20,
        color: '#fff',
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#efefef",
        width: 350,
        height: 400,
        padding: 20,
        borderRadius: 10,
    },
    modalInputSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    modalText:{
      width: 50,
      color: '#000',
    },
    input: {
        borderWidth: 1,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 10,
        width: 200,
    },
    btnSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
        // width: 200,
    },
    modalBtn: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
})