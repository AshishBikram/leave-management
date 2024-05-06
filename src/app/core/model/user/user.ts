export enum UserType  {
  HR="HR",
  Manager="Manager",
  Employee="Employee",
}

export enum DepartmentType  {
  HR="HR", IT="IT", Finance="Finance", Sales="Sales"
}

export interface UserLoginRequest {
  email: string,
  password: string,
}

export interface UserSignUpRequest extends UserLoginRequest{
  name: string,
  role: UserType
  phoneNumber: string,
  department: DepartmentType
}
export interface UserSignUpResponse extends Omit<UserSignUpRequest, 'password'> {
  id: number;
}

export interface UserLoginTokenResponse  {
  token: string,
  user: UserSignUpResponse
}
