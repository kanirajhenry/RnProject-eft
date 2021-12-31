import React from 'react'
import { Text, View, Button } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import * as actionType from '../redux/actions/actionTypes'
import commonApiCall, { commonGetApiCall, commonQueryParam } from '../redux/actions/actions'
import { CommonDataModel, UserTokenDTO } from '../model'
import { useEffect } from 'react'

const Participant = ({ navigation }) => {

    const dispatch = useDispatch()
    const commonDataModel = useSelector(({ participantReducer }) => participantReducer.commonDataModel)

    useEffect(() => {
        fetchPlaceOfSupply()
    }, [])

    const fetchPlaceOfSupply = () => {
        tokenDTO = new UserTokenDTO()
        tokenDTO.cmpCode = "RGS"
        tokenDTO.orgCode = "dmse".toUpperCase()
        tokenDTO.userId = "admin".toUpperCase()
        tokenDTO.deviceId = "fsvLQ7YUt05PqkX9iOiRSD:APA91bH0Wi5RMMU63FOM8bdA_Kuyzszf8fz1Fp0GdFGBtraRYPqer6qvqW9QF_1SoOwzvT8bY5MhKVZu9QQk8MRvdq_BYc5DiFNB65JUFqSvT1fAhF3TviNn2adV-gF5z299TmrBfiNR"
        tokenDTO.tokenId = "1000:3efcdb5493cf44f50c473d5f6da81846374475e8435ab0bd:105d6dc43ec64f169e04d71248500abe6dafceb72ac2ba53"

        const obj = {
            "": commonQueryParam(tokenDTO, "B"),
            "gstin": "32HYZXI134764RF"
        }
        const query = commonQueryParam(obj, "C")

        dispatch(commonGetApiCall(query, null,
            actionType.controller.PARTICIPANT, actionType.participantScreen.ON_CREATE_PARTICIPANT)
        )
    }

    let common = new CommonDataModel()

    const handleGetPlaceOfSupply = () => {
        common = commonDataModel
        let response = common.response
        let parsedRes = JSON.parse(response)
        console.log("commonDataModel", parsedRes.stateMap)
        console.log("commonDataModel", parsedRes.sequenceGeneratorDTOs[0])
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Participant</Text>
            {/* <Button title="navigation.push => Profile1" onPress={() => navigation.push("Profile1")} /> */}
            {/* <Button title="navigation.navigate => Profile1" onPress={() => navigation.navigate("Profile1")} /> */}

            {/* <Button title="getPlaceOfSupply()" onPress={() => fetchPlaceOfSupply()} /> */}
            <Button title="getPlaceOfSupply()" onPress={() => handleGetPlaceOfSupply()} />
        </View>
    )
}

export default Participant