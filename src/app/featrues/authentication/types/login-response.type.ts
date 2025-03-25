import {User} from './user.type';
import {ApiResponse} from '../../../core/types/api-response.type';


export type LoginResponseData = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type LoginResponse = ApiResponse<LoginResponseData>;
