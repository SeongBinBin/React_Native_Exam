import React, {useState, useEffect, useRef} from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput, FlatList, Image, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { getCollection } from "../apis/firebase";

import AddList from "../components/AddList";

function HomeScreen({navigation}){
    const [users, setUsers] = useState([])
    const [searchUser, setSearchUser] = useState('')
    const [inputFocus, setInputFocus] = useState(false)

    const textInputRef = useRef(null)

    const clearInput = () => {
        setSearchUser('')
    }

    const handleFocus = () => {
        setInputFocus(true)
    }
    const handleBlur = () => {
        setInputFocus(false)
    }

    useEffect(() => {
        const onResult = (querySnapshot) => {
            const userData = []
            querySnapshot.forEach((doc) => {
                userData.push({id: doc.id, ...doc.data()})
            })

            userData.sort((a,b) => a.createdAt - b.createdAt)
            setUsers(userData)
        }

        const onError = (error) => {
            console.log('Error getting data : ', error)
        }

        getCollection('React-Native-Exam', onResult, onError)
    }, [])

    return(
        <SafeAreaView style={styles.block}>
            <View style={styles.searchSection}>
                <View style={styles.searchBtn}>
                    <Icon name="search-outline" size={40}/>
                </View>
                <TextInput
                    placeholder="검색할 이름을 입력해주세요."
                    style={styles.searchInput}
                    onChangeText={(text) => setSearchUser(text)}
                    value={searchUser}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={textInputRef}
                />
                {inputFocus && (
                    <Pressable onPress={clearInput} style={({pressed}) => [styles.clear, pressed && {opacity: 0.5}]}>
                        <Icon name="close-circle-outline" size={20}/>
                    </Pressable>
                )}
            </View>

            <FlatList
                style={styles.itemList}
                data={users.filter((item) => item.name.includes(searchUser))}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10,}}>
                            <View style={styles.imgBox}>
                                <Image style={styles.img} source={require('../assets/imgs/userImg.jpg')}/>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.itemText}>{item.name}</Text>
                                <Text style={styles.itemText}>{item.email}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('User',
                            {
                                name: item.name,
                                email: item.email,
                                home: item.home,
                                like: item.like,
                            })}
                            style={styles.navigateIcon}
                        >
                            <Icon name="chevron-forward-outline" size={25}/>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <AddList />
        </SafeAreaView>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    searchSection: {
        margin: 20,
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    searchBtn: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: 70,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        flex: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        paddingLeft: 10,
    },
    clear: {
        justifyContent: 'center',
        right: 10,
        marginLeft: 10,
    },
    itemList: {
        padding: 10,
        height: 500,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingTop: 10, paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#989898'
    },
    imgBox: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
    },
    img: {
        width: 40,
        height: 40,
    },
    itemText: {
        color: '#000',
    },
    navigateIcon: {
        position: 'absolute',
        right: 10,
    },
})