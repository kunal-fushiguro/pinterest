export interface User {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
}

export interface ApiGetUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserPageType;
}

export interface UserPageType {
  _id: string;
  userId: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  uploads: [];
  collections: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
