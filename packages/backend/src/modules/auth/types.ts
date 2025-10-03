import { Role, UUID } from '@guss/common';


export type JwtPayload = {
  userId: UUID;
  role: Role;
};