import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsNotAfterNowConstraint implements ValidatorConstraintInterface {
  validate(dateString: string, args: ValidationArguments) {
    const date = new Date(dateString);
    return date.getTime() < Date.now();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a date after the current date`;
  }
}

export function IsNotAfterNow(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNotAfterNowConstraint,
    });
  };
}
