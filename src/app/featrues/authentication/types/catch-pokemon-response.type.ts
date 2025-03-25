import {User} from './user.type';
import {ApiResponse} from '../../../core/types/api-response.type';

export type CatchPokemonResponseData = {
  user: User;
};

export type CatchPokemonResponse = ApiResponse<CatchPokemonResponseData>;
