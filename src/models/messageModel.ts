// src/models/messageModel.ts
export interface Message {
    id?: number;
    project_id: string;
    user_id: string;
    message: string;
    created_at?: Date;
  }
  