import type{ UUID } from '../../types';
import { Role }     from '../../enums';


export type UserProfileResponse = {
  id: UUID;
  name: string;
  role: Role;
};