import { ILogin, IUser } from "../../Interfaces/Users/IUser"

export const user: IUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

export const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2ODk2MzM2NzEsImV4cCI6MTY5MDIzODQ3MX0.m2HYLa3UuYvbODyNTrLGeanPITINAOTcJFQVYyT41XA'

export const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2ODk2MzM2NzEsImV4cCI6MTY5MDIzODQ3MX0.m2HYLa3UuYvbODyNTrLGeanPITINAOTcJFQVYyT41XA'

export const loginValid: ILogin = {
  email: "user@user.com",
  password: "secret_user"
}

export const loginWithoutEmail: ILogin = {
  email: "",
  password: "1234567"
}


export const loginWithoutPassword: ILogin = {
  email: "teste@teste.com",
  password: ""
}
