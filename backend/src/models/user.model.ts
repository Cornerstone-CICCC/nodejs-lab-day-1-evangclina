import { User } from "../types/user";
import { v4 as uuidv4 } from "uuid"



class userModel{
    private users: User[] = []

    //find all 
    findAll(): User[]{
        return this.users
    }

    //findById(id)
    findById(id: string): User | undefined{
        const user = this.users.find(user => user.id === id)
        return user 
    }

    //findByUsername(username)
    findByUsername(username: string): User | undefined {
        const user = this.users.find(user => user.username === username)
        if(user){
            return user 
        } 
        return user
    }

    //create()
    create(newUser: Omit<User, "id">): User {
        const user = {
            id: uuidv4(),
            ...newUser
        }
        this.users.push(user)
        return user
    }

    //update(id)
    editUser(id: string, newData: Partial<User>): User | undefined{
        const index = this.users.findIndex(user => user.id === id)
        if (index === -1 ) return undefined
        const updatedUser = {
            ...this.users[index], 
            ...newData
        }
        this.users[index] = updatedUser
        return updatedUser
    }

    //delete(id)
    delete(id: string): boolean{
        const index = this.users.findIndex(user => user.id === id)
        if(index === -1){
            return false
        }
        this.users.splice(index, 1)
        return true
    }
    
}

export default new userModel