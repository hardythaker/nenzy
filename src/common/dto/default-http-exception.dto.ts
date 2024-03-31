import { ApiProperty } from '@nestjs/swagger';

export class DefaultHttpExceptionSchema {
  //swagger property can accept both string or string[]
  @ApiProperty({
    description: 'The error message or messages.',
    type: 'union',
    oneOf: [
      {
        type: 'string',
      },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  })
  message!: string | string[];

  @ApiProperty({
    description: 'An optional, more specific error message.',
    type: 'string',
  })
  error?: string;

  @ApiProperty({
    description: 'The HTTP status code of the error.',
    type: 'integer',
  })
  statusCode!: number;
}
