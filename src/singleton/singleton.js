
import { tokenId } from "../asset/utils/asyncStore"
import { UserTokenDTO } from "../model"
import * as storage from "../asset/utils/asyncStore"
import { commonGetApiCall, commonQueryParam } from "../redux/actions/actions"
import { Item } from "react-native-paper/lib/typescript/components/List/List"


export default class Singleton {

    static sharedInstance = Singleton.sharedInstance || new Singleton()

    registerTokenDTO() {

        tokenDTO = new UserTokenDTO()
        tokenDTO.cmpCode = storage.cmpCode
        tokenDTO.orgCode = storage.orgCode
        tokenDTO.userId = storage.userId
        tokenDTO.tokenId = storage.tokenId
        tokenDTO.isSendNotification = false
        tokenDTO.deviceId = "fsvLQ7YUt05PqkX9iOiRSD:APA91bH0Wi5RMMU63FOM8bdA_Kuyzszf8fz1Fp0GdFGBtraRYPqer6qvqW9QF_1SoOwzvT8bY5MhKVZu9QQk8MRvdq_BYc5DiFNB65JUFqSvT1fAhF3TviNn2adV-gF5z299TmrBfiNR"
        return tokenDTO

        // tokenDTO = new UserTokenDTO()
        // tokenDTO.cmpCode = "RGS"
        // tokenDTO.orgCode = "dmse".toUpperCase()
        // tokenDTO.userId = "admin".toUpperCase()
        // tokenDTO.deviceId = "fsvLQ7YUt05PqkX9iOiRSD:APA91bH0Wi5RMMU63FOM8bdA_Kuyzszf8fz1Fp0GdFGBtraRYPqer6qvqW9QF_1SoOwzvT8bY5MhKVZu9QQk8MRvdq_BYc5DiFNB65JUFqSvT1fAhF3TviNn2adV-gF5z299TmrBfiNR"
        // tokenDTO.tokenId = "1000:3efcdb5493cf44f50c473d5f6da81846374475e8435ab0bd:105d6dc43ec64f169e04d71248500abe6dafceb72ac2ba53"
        // return tokenDTO
    }

    getDisplayAddress() {
        return item = { queryItem: commonQueryParam(this.registerTokenDTO(), "B"), data: null }
    }


    getOneTimeConstants() {

        var statusList = [
            "LEAD_STATUS", "TASK_STATUS", "EVENT_STATUS", "CALLS_STATUS", "CONTACTS_STATUS", "PRIORITY",
            "CRM_PRIORITY", "CRM_SEVERITY", "SEVERITY", "VERSION", "STATUS", "COMPONENT", "PRODUCT",
            "SPRINT_ID", "LEAD_ATTACHMENT_TAG", "REPORT_CATEGORY"
        ]

        // TODO: RND
        // let obj = {
        //     "": commonQueryParam(this.registerTokenDTO(), "B"),
        //     "gstin": "32HYZXI134764RF",
        //     "age": 27,
        //     name: []
        // }

        // for (element of statusList) {
        //     // obj.name.push({ name: element })
        //     let data = [obj].push({
        //         name: element
        //     })

        //     console.log(data)

        //     // Object.assign(obj, { name: "value3" });
        // }

        let obj = {
            1: 1,
            2: 2,
            name: ""
        }
        // Object.entries(obj).forEach(([key, value]) => {
        //     // console.log(key, value);
        //     obj[key] = "===="
        //     obj[value] = "+++++"
        // });

        // Object.entries(statusList).forEach(([key, value]) => {
        //     obj.name = value
        // })


        // var query = [{ token: ""}, name: ""]

        // query.push({})

        // var objects = new Array();
        // var howmany = 10;

        // for (var i = 0; i < howmany; i++) {
        //     objects[i] = new Object();
        // }

        // var names = [{ name: "kani" }]
        // var ages = [{ age: 13 }, { age: 27 }, { age: 17 }]

        friends = ["kani", "mani", "arjun", "kamal"]

        const some = friends.map(name => ({ name }))

        //  console.log(some)

        let obj13 = { "": commonQueryParam(this.registerTokenDTO(), "B") }
        let obj14 = { "": commonQueryParam(some, "C") }

        let token1 = commonQueryParam(obj13, "C")
        let token2 = commonQueryParam(obj14, "C")
        let token3 = commonQueryParam(some, "D")

        // console.log(token3)

        console.log("=-=-=-=-=-==-=-=-> ", token1 + "&" + token3)


        // for (element of some) {
        //     // console.log("::::", element)
        //     console.log(commonQueryParam(element, "A"))
        // }

        // console.log(some)

        // let obj14 = {
        //     "": some
        // }

        // let object123 = {
        //     "": obj13,
        //     name: obj14
        // }


        // // let joinedData = [...names, ages]
        // console.log("objects:::>>>", commonQueryParam(some, "C"))
        // console.log(commonQueryParam(obj13, "C"))

        // var names = [
        //     "Bob",
        //     "Michael",
        //     "Lanny"
        // ];

        // console.info(names.map(name => ({ name })))


        return ""

        // var obj = { key1: "value1", key2: "value2" };
        // Object.assign(obj, { key3: "value3" });


        // return commonQueryParam(obj, "C")



        // TODO: WORKING FINE BELOW CODE 

        // let array = []
        // array.push({ "tokenDTO": this.registerTokenDTO() })

        // for (element of statusList) {
        //     array.push({ "name": element })
        // }
        // console.log("array909090909090909---", array)


    }

}
