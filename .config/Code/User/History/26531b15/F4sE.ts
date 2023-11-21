import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

export interface IReportSettingsProps {
  volumeFactor: number;
}

export class ReportNumber extends ValueObject<IReportNumberProps> {
  private constructor(props: IReportNumberProps) {
    super(props);
  }

  public get value(): number {
    return this.props.value;
  }

  public static create(props: IReportNumberProps): Result<ReportNumber> {
    return Result.ok<ReportNumber>(new ReportNumber(props));
  }
}
