import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

interface VolumeFactorProps {
  value: number;
}

export class VolumeFactor extends ValueObject<VolumeFactorProps> {
  public get value(): number {
    return this.props.value;
  }

  private constructor(props: VolumeFactorProps) {
    super(props);
  }

  public static create(props: VolumeFactorProps): Result<VolumeFactor> {
    return Result.ok<VolumeFactor>(new VolumeFactor(props));
  }
}
