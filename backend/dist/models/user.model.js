"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class userModel {
    constructor() {
        this.users = [];
    }
    //find all 
    findAll() {
        return this.users;
    }
    //findById(id)
    findById(id) {
        const user = this.users.find(user => user.id === id);
        return user;
    }
    //findByUsername(username)
    findByUsername(username) {
        const user = this.users.find(user => user.username === username);
        if (user) {
            return user;
        }
        return user;
    }
    //create()
    create(newUser) {
        const user = Object.assign({ id: (0, uuid_1.v4)() }, newUser);
        this.users.push(user);
        return user;
    }
    //update(id)
    editUser(id, newData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return undefined;
        const updatedUser = Object.assign(Object.assign({}, this.users[index]), newData);
        this.users[index] = updatedUser;
        return updatedUser;
    }
    //delete(id)
    delete(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }
}
exports.default = new userModel;
