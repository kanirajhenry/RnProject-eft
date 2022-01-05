export * from './responsiveScreen';
export * from './spinner'
export * from './mystatusBar_Tran'
export * from './npmList'


import {
    Platform
} from 'react-native';
import { from } from 'rxjs';
export const isIOS = (Platform.OS == 'ios') ? true : false