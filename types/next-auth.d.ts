import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    backendToken: string;
    backendUser: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
    user: DefaultSession["user"];
  }

  interface User {
    backendToken?: string;
    backendUser?: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    backendUser?: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}
