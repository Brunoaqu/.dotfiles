import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

interface UpdatedAtMsProps {
  value: number;
}

export class UpdatedAtMs extends ValueObject<UpdatedAtMsProps> {
  private constructor(props: UpdatedAtMsProps) {
    super(props);
  }

  public get value(): number {
    return this.props.value;
  }

  public static create(props: UpdatedAtMsProps): Result<UpdatedAtMs> {
    const againstNull = Guard.againstNullOrUndefined(props.value, 'updatedAtMs');

    if (againstNull.isFailure) {
      return Result.fail<UpdatedAtMs>(againstNull.getErrorValue());
    }

    const isPositive = Guard.greaterThan(0, props.value);

    if (isPositive.isFailure) {
      return Result.fail<UpdatedAtMs>(isPositive.getErrorValue());
    }

    return Result.ok<UpdatedAtMs>(new UpdatedAtMs(props));
  }
}
