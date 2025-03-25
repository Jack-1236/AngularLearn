import {User} from './user.type';
import {ApiResponse} from '../../../core/types/api-response.type';


export type RegisterResponseData = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type RegisterResponse = ApiResponse<RegisterResponseData>;
