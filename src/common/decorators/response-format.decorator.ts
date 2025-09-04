import { SetMetadata } from '@nestjs/common';

export const ResponseFormat = (format: 'list' | 'detail' | 'default') =>
  SetMetadata('responseFormat', format);
