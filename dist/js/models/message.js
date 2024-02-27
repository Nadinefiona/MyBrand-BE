"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.createMessage = exports.getMessageById = exports.getAllMessages = void 0;
let messages = [];
let nextId = 1;
const getAllMessages = () => {
    return messages;
};
exports.getAllMessages = getAllMessages;
const getMessageById = (id) => {
    return messages.find((message) => message.id === id);
};
exports.getMessageById = getMessageById;
const createMessage = (messageData) => {
    const newMessage = Object.assign(Object.assign({ id: nextId++ }, messageData), { createdAt: new Date() });
    messages.push(newMessage);
    return newMessage;
};
exports.createMessage = createMessage;
const updateMessage = (id, newText) => {
    const messageIndex = messages.findIndex((message) => message.id === id);
    if (messageIndex !== -1) {
        messages[messageIndex].text = newText;
        return messages[messageIndex];
    }
    return undefined;
};
exports.updateMessage = updateMessage;
const deleteMessage = (id) => {
    const initialLength = messages.length;
    messages = messages.filter((message) => message.id !== id);
    return messages.length !== initialLength;
};
exports.deleteMessage = deleteMessage;
