import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';


@Injectable()
export class ParseNonEmptyTrimmedStringPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      const trimmedValue = value.trim();

      if (trimmedValue) {
        return value;
      } else {
        throw new BadRequestException(`${metadata.data} must be a non-empty string`);
      }
    } else {
      throw new BadRequestException(`${metadata.data} must be a string`);
    }
  }
}