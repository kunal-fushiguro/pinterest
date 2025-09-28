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
  uploads: SinglePhotoType[];
  collections: SinglePhotoType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SinglePhotoType {
  _id: string;
  user: string | UserPageType;
  url: string;
  title: string;
  description: string;
  comments: SingleCommentType[] | [];
  tags: string[] | [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiGetPhotoResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SinglePhotoType;
}

export interface ApiResponseHomePage {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    photos: SinglePhotoType[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SingleCommentType {
  _id: string;
  photoId: SinglePhotoType | string;
  user: UserPageType | string;
  text: string;
}
