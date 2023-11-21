import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';
import { DiameterFactor } from '../../usersSettings/domain/DiameterFactor';
import { VolumeFactor } from '../../usersSettings/domain/VolumeFactor';

export interface IReportSettingsProps {
  volumeFactor: VolumeFactor;
  diameterFactor: DiameterFactor;
}

export class ReportSettings extends ValueObject<IReportSettingsProps> {
  private constructor(props: IReportSettingsProps) {
    super(props);
  }

  public get volumeFactor(): VolumeFactor {
    return this.props.volumeFactor;
  }

  public get diameterFactor(): DiameterFactor {
    return this.props.diameterFactor;
  }

  public getBuffer(): Buffer {
    return Buffer.from(
      JSON.stringify({
        diameterFactor: this.diameterFactor.value,
        volumeFactor: this.volumeFactor.value,
      })
    );
  }

  public static create(props: IReportSettingsProps): Result<ReportSettings> {
    return Result.ok<ReportSettings>(new ReportSettings(props));
  }
}
