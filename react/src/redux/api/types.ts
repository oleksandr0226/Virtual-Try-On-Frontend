export interface IGenericResponse {
  status: string;
  message: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  role: string;
  center_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetmeResponse {
  status: string;
  user: IUser;
}