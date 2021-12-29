
export class UserDTO {
    email = ""
    mobile = 0
    userId = 0
    id = 0
    title = 'WWF Wrestling Champ'
    completed = false
    friends = [Friends]
    age = 12

    getTitle() { return this.title }
} 

export class Friends {
    name = "Charan"
    place = "Tirupur"

    constructor (name, place) {
        this.name = name
        this.place = place
    }
}
