import AsyncStorage from "@react-native-community/async-storage"

// export const getData = async (key) => {
//     const result = await AsyncStorage.getItem(key)
//     return JSON.parse(result)
// }

// export const setData = async (key, value) => {
//     const item = JSON.stringify(value)
//     return await AsyncStorage.setItem(key, item)
// }

export const getData = async (key) => {
    try {
        const result = await AsyncStorage.getItem(key)
        return JSON.parse(result)
    } catch (e) {
        throw e
    }
}

export const setData = async (key, value) => {
    try {
        const item = JSON.stringify(value)
        const result = await AsyncStorage.setItem(key, item)
        return result
    } catch (e) {
        throw e
    }
}


