import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BottomSheet } from 'react-native-sheet';
import { MaterialIcons } from '@expo/vector-icons';
const Open_bottom_sheet = () => {
    const bottomSheet = useRef(null);
    const bottomSheet2 = useRef(null);

    const [ReportMessage, setReportMessage] = useState("")


    const ReportBtn = () => {
        console.log(ReportMessage)
        setReportMessage("")
    }
const openner= bottomSheet.current.show()
    return (
        <View>
            <BottomSheet height={130} ref={bottomSheet}>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => { bottomSheet2.current.show(), bottomSheet.current.show() }} style={{ backgroundColor: "pink", padding: 15, marginTop: 10 ,borderRadius:10,}}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 20 }}>
                            <MaterialIcons name="report" size={24} color="black" />
                            <Text style={{ paddingTop: 2, paddingLeft: 10, fontFamily: 'open-sans' }}>Report</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { bottomSheet2.current.show(), bottomSheet.current.show() }} style={{ backgroundColor: "pink", padding: 15, marginTop: 10 ,borderRadius:10}}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 25 }}>
                            <MaterialIcons name="save" size={24} color="black" />
                            <Text style={{ paddingTop: 2, paddingLeft: 10, fontFamily: 'open-sans' }}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </BottomSheet>

            <BottomSheet height={250} ref={bottomSheet2}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginVertical: 20,fontWeight:700,fontSize:20 }}>Help us understand the problem</Text>

                    <View style={styles.inputContainer}>
                        <View
                            style={[
                                styles.input,
                                { borderColor: "#ccc",height:100 },
                            ]}
                        >
                            <TextInput
                                placeholderTextColor={"#444"}
                                placeholder="Report Message"
                                onChangeText={(e) => { setReportMessage(e) }}
                                value={ReportMessage}
                                multiline={true}
                                numberOfLines={4}
                                keyboardType="default"
                                autoCapitalize="none"

                                style={{ color: "black" }}
                            />
                        </View></View>


                </View>
                <Button title='Send Report' onPress={ReportBtn}></Button>
            </BottomSheet>

            <Text>Rohith</Text>
            <Text>Rohith</Text>
            <Text>Rohith</Text>
            <Text>Rohith</Text>
            <Text>Rohith</Text>
            <Text>Rohith</Text>


            <TouchableOpacity onPress={() => bottomSheet.current.show()}>
                <Text>Open bottom sheet</Text>
            </TouchableOpacity>
        </View>
    );
}



export default Open_bottom_sheet

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 12,

    },

    input: {
        width: 300,
        // backgroundColor: "#121212",
        borderWidth: 1,
        borderStyle: "solid",
        padding: 12,

        borderRadius: 6,
        marginBottom: 6,
        color: "white",
        height: 45,


    },
})