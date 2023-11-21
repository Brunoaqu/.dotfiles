import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

interface DiameterFactorProps {
  value: number;
}

export class DiameterFactor extends ValueObject<DiameterFactorProps> {
  public get value(): number {
    return this.props.value;
  }

  private constructor(props: DiameterFactorProps) {
    super(props);
  }

  public static create(props: DiameterFactorProps): Result<DiameterFactor> {
    return Result.ok<DiameterFactor>(new DiameterFactor(props));
  }
}
