import { useState, useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    Pressable,
    Text,
    TouchableWithoutFeedback,
    FlatList,
} from "react-native";
import {
    ScrollView,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Station, SelectInputProps } from "@/types";
import {useStationStore, useStationStoreState} from '@/stores/stationStore'


export const SelectInput = ({
    data,
    placeholder,
    label,
    style,
    onSelect,
    value
}: SelectInputProps) => {
    const [selectedItem, setSelectedItem] = useState<Station | null>(null);
    const [isListVisible, setIsListVisible] = useState(false);

    // Scroll to selected item
    const scrollViewRef = useRef<ScrollView | null>(null);

    const scrollToSelectedItem = () => {
        if (!scrollViewRef || !scrollViewRef.current) return;
    
        const selectedItemIndex = data.findIndex(
          (data) => data.name === selectedItem?.name
        );
    
        if (selectedItemIndex !== -1) {
            const offset = selectedItemIndex * 30; 
            scrollViewRef.current.scrollTo({ y: offset, animated: false });  
        }
    };

    useEffect(() => {
        if(selectedItem){
            scrollToSelectedItem();
            onSelect(selectedItem)
        }
    }, [selectedItem])

    useEffect(() => {
        if(value && !selectedItem) {
            setSelectedItem(data.filter(station => station.id === value.id)[0]);
        }
    }, [])

    const closeDropdown = () => {
        setIsListVisible(false);
    };

    const handlePress = () => {
        setIsListVisible(!isListVisible);
        setTimeout(() => {
            scrollToSelectedItem();
        }, 0);
    };
    
    const handleSelectItem = (name: any) => {
        const selected = data.find((item) => item.name == name);
        if (selected) setSelectedItem(selected);
        setIsListVisible(false);
        onSelect(selected)
    };

    const handleClickOutside = () => {
        console.log("clicked outside")
    }

    return (
        <TouchableWithoutFeedback onPress={handleClickOutside} style={{  position: 'absolute', backgroundColor: 'red', flex: 1, width: '100%', height: '100%'}}>
            <View
                style={{
                    ...style,
                    position: "relative",
                    width: "100%",
                    elevation: 0,
                }}
            >
                <Pressable
                    onPress={handlePress}
                    style={{
                        backgroundColor: "#e9e9e9",
                        height: 40,
                        borderRadius: 8,
                        alignItems: "center",
                        paddingLeft: 10,
                        flexDirection: "row",
                        elevation: 0,
                        zIndex: 0,
                    }}
                >
                    {selectedItem ? (
                        <View style={styles.textContainer}>
                            <Text style={styles.labelText}>{label}: </Text>
                            <Text style={styles.spanText}>{selectedItem.name}</Text>
                        </View>
                    ) : (
                        <View style={styles.textContainer}>
                            <Text style={styles.placeholderText}>
                                {placeholder}
                            </Text>
                        </View>
                    )}
                    <MaterialCommunityIcons name="pencil" size={20} color="#999" />
                </Pressable>
                {isListVisible && (
                    <GestureHandlerRootView
                        style={{
                            position: "absolute",
                            top: 50,
                            left: 0,
                            backgroundColor: "#fff",
                            width: "100%",
                            height: 500,
                            padding: 10,
                            borderRadius: 10,
                        }}
                    >
                    <ScrollView ref={scrollViewRef} >
                            {
                                data.map((item, index) => {
                                    return (
                                        <View key={item.id}>
                                            <Pressable style={{paddingVertical: 10}} key={item.name} onPress={() => handleSelectItem(item.name)}>
                                                {item.name == selectedItem?.name ? 
                                                <Text style={{color: "#00A0D3"}}>{item.name}</Text>
                                                : 
                                                <Text>{item.name}</Text>
                                                }
                                            </Pressable>
                                            {index < data.length - 1 && <View style={{width: '100%', height: 1, backgroundColor: '#e9e9e9'}} />}
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </GestureHandlerRootView>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        width: "90%",
        backgroundColor: "#e9e9e9",
        height: 40,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    placeholderText: {
        color: "#999",
        fontSize: 14,
        lineHeight: 20,
    },
    labelText: {
        fontSize: 14,
        lineHeight: 20,
    },
    spanText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "bold",
    },
});