import React from "react";
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native";

function DetailView({route}){
    const {name, email, home, like, imageSource} = route.params

    return(
        <SafeAreaView style={styles.block}>
            <View style={styles.container}>
                <View style={styles.imgBox}>
                    <Image source={imageSource}/>
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.textBox}>
                        <Text style={styles.textTitle}>이름</Text>
                        <Text style={styles.textContent}>{name}</Text>
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.textTitle}>이메일</Text>
                        <Text style={styles.textContent}>{email}</Text>
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.textTitle}>거주지</Text>
                        <Text style={styles.textContent}>{home}</Text>
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.textTitle}>관심사</Text>
                        <Text style={styles.textContent}>{like}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default DetailView

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
    },
    container: {
        top: 50,
        flexDirection: 'column',
    },
    imgBox: {
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        marginBottom: 20,
    },
    textContainer: {
        flexDirection: 'column',
        gap: 10,
    },
    textBox: {
        flexDirection: 'row',
    },
    textTitle: {
        color: '#000',
        fontSize: 17,
        width: 100,
    },
    textContent: {
        color: '#000',
        fontSize: 17,
        textAlign: 'left',
    },
})