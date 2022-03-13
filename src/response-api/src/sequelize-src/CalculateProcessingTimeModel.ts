import { 
  Model,
  ModelStatic,
  FindOptions,
  BuildOptions,
  CreateOptions,
  Utils,
  UpdateOptions,
  DestroyOptions,
} from 'sequelize';
import TimeKeeper from '@/express-src/modules/writeLogs/TimeKeeper';
import { ReqLogDetail } from '@/express-src/modules/writeLogs/_modules';

export default abstract class CalculateProcessingTimeModel<
  TModelAttributes extends {} = any, 
  TCreationAttributes extends {} = TModelAttributes> extends Model {

  constructor(values?: TCreationAttributes, options?: BuildOptions) {
    super(values, options);
  }

  public static async calculateTimeOfCreate<
    M extends Model,
    O extends CreateOptions<M['_attributes']> = CreateOptions<M['_attributes']>
  >(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    values?: M['_creationAttributes'],
    options?: O,
  ): Promise<O extends { returning: false } | { ignoreDuplicates: true } ? void : M> {

    return await TimeKeeper.calculateProcessingTime<Promise<O extends { returning: false } | { ignoreDuplicates: true } ? void : M>>(
      () => { return super.create.bind(this)(values, options) },
      req_log_detail,
      {state: "Success", name: "Create", target_table: this.name}
    );
  }

  public static async calculateTimeOfFindAll<M extends Model>(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    options?: FindOptions<M['_attributes']>): Promise<M[]> {

    return await TimeKeeper.calculateProcessingTime<Promise<M[]>>(
      () => { return super.findAll.bind(this)(options) },
      req_log_detail,
      {state: "Success", name: "Read", target_table: this.name}
    );
  }

  public static async calculateTimeOfUpdate<M extends Model>(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    values: {
        [key in keyof M['_attributes']]?: M['_attributes'][key] | Utils.Fn | Utils.Col | Utils.Literal;
    },
    options: UpdateOptions<M['_attributes']>
  ): Promise<[number, M[]]> {

    return await TimeKeeper.calculateProcessingTime<Promise<[number, M[]]>>(
      () => { return super.update.bind(this)(values, options) },
      req_log_detail,
      {state: "Success", name: "Update", target_table: this.name}
    );
  }

  public static async calculateTimeOfDelete<M extends Model>(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    options?: DestroyOptions<M['_attributes']>
  ): Promise<number> {

    return await TimeKeeper.calculateProcessingTime<Promise<number>>(
      () => { return super.destroy.bind(this)(options) },
      req_log_detail,
      {state: "Success", name: "Delete", target_table: this.name}
    );
  }
}
