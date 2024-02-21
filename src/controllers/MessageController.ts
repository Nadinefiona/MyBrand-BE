import { Request, Response } from 'express';
import CustomResponse from '../utils/response';
import * as MessageModel from '../models/message';
import { validateMessage } from '../utils/messageValidation';

interface IRequestMessage extends Request {
  body: {
    name: string;
    email: string;
    text: string;
  };
}

class MessageController {
  public async getAllMessages(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const messages = MessageModel.getAllMessages();
      response.send<typeof messages>(messages, 'Messages Fetched Successfully', 200);
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }

  public async getMessageById(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const id = parseInt(req.params.id);
      const message = MessageModel.getMessageById(id);
      if (message) {
        response.send<typeof message>(message, 'Message Fetched Successfully', 200);
      } else {
        response.send(null, 'Message not found', 404);
      }
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }

  public async createMessage(req: IRequestMessage, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const { name, email ,text } = req.body;
      const validationResult = validateMessage({ name, email, text });
      if (!validationResult.error) {
        const newMessage = MessageModel.createMessage({ name, email,text, createdAt: new Date() });
        response.send<typeof newMessage>(newMessage, 'Message Created Successfully', 201);
      } else {
        response.send(null, validationResult.error.message, 400);
      }
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }

  public async updateMessage(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const id = parseInt(req.params.id);
      const newText = req.body.text;
      if (newText) {
        const updatedMessage = MessageModel.updateMessage(id, newText);
        if (updatedMessage) {
          response.send<typeof updatedMessage>(updatedMessage, 'Message Updated Successfully', 200);
        } else {
          response.send(null, 'Message not found', 404);
        }
      } else {
        response.send(null, 'Text is required', 400);
      }
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }

  public async deleteMessage(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const id = parseInt(req.params.id);
      const deleted = MessageModel.deleteMessage(id);
      if (deleted) {
        response.send(null, 'Message Deleted Successfully', 204);
      } else {
        response.send(null, 'Message not found', 404);
      }
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }
}

export { MessageController };
