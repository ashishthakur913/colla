import {AsyncStorage} from "react-native";

export const _storeData = async (token: string) => {
    try {
        await AsyncStorage.setItem('login_v1:token', token);
    } catch (error) {
        // Error saving data
    }
}

export const _retrieveAndVerifyUserToken = async (successCallback: Function, failureCallback: Function) => {
    try {
        const value = await AsyncStorage.getItem('login_v1:token');
        if (value !== null) {
            successCallback(value);
        } else {
            failureCallback()
        }
    } catch (error) {
        failureCallback()
    }
}

export const  _retrieveUserToken = async () => {
    try {
        const value = await AsyncStorage.getItem('login_v1:token');
        return value;
    } catch (error) {
        return null;
    }
}