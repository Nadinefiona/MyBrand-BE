export interface Message {
  id: number;
  name: string;
  email: string;
  text: string;
  createdAt: Date;
}

let messages: Message[] = [];
let nextId = 1;

export const getAllMessages = (): Message[] => {
  return messages;
};

export const getMessageById = (id: number): Message | undefined => {
  return messages.find((message) => message.id === id);
};

export const createMessage = (messageData: Omit<Message, 'id'>): Message => {
  const newMessage: Message = {
    id: nextId++,
    ...messageData,
    createdAt: new Date(),
  };
  messages.push(newMessage);
  return newMessage;
};

export const updateMessage = (id: number, newText: string): Message | undefined => {
  const messageIndex = messages.findIndex((message) => message.id === id);
  if (messageIndex !== -1) {
    messages[messageIndex].text = newText;
    return messages[messageIndex];
  }
  return undefined;
};

export const deleteMessage = (id: number): boolean => {
  const initialLength = messages.length;
  messages = messages.filter((message) => message.id !== id);
  return messages.length !== initialLength;
};
