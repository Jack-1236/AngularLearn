import {ApiResponse} from '../../../core/types/api-response.type';
import {User} from './user.type';


export type GetMeResponseData = {
  user: User;
};

export type GetMeResponse = ApiResponse<GetMeResponseData>;
