// src/types.ts

export interface Project {
    id?: string; // UUID
    name: string;
    created_at?: string; // ISO Date string
  }
  
  export interface User {
    id?: string; // UUID
    name: string;
    created_at?: string; // ISO Date string
  }
  
  export interface Message {
    id?: number;
    project_id: string; // UUID
    user_id: string; // UUID
    message: string;
    created_at?: string; // ISO Date string
  }
  