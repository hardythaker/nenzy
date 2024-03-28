import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IsDate, IsDateString } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsAfterNowConstraint implements ValidatorConstraintInterface {
  validate(dateString: string, args: ValidationArguments) {
    const date = new Date(dateString);
    return date.getTime() > Date.now();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a date after the current date`;
  }
}

export function IsAfterNow(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsAfterNowConstraint,
    });
  };
}
