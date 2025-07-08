import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      full_name: string;
      email: string;
    };
  }
}
