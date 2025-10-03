import { SetMetadata } from '@nestjs/common';


export const PUBLIC_METADATA_FIELD = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_METADATA_FIELD, true);