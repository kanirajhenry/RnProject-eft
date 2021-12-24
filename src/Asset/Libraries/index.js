export * from './ResponsiveScreen';
export * from './Spinner'
export * from './MystatusBar_Tran'
export * from './NpmList'


import {
    Platform
} from 'react-native';
import { from } from 'rxjs';
export const isIOS = (Platform.OS == 'ios') ? true : false