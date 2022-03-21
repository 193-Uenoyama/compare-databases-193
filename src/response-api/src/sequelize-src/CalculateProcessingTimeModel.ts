import { 
  Model,
  ModelStatic,
  FindOptions,
  BuildOptions,
  CreateOptions,
  CreationAttributes,
  UpdateOptions,
  DestroyOptions,
  NonNullFindOptions,
  Attributes,
  Utils,
} from '@sequelize/core';
import TimeKeeper from '@/express-src/modules/processingLogStore/writeLogs/TimeKeeper';
import { ReqLogDetail } from '@/express-src/modules/processingLogStore/processingLogModules';

export default abstract class CalculateProcessingTimeModel<
  TModelAttributes extends {} = any, 
  TCreationAttributes extends {} = TModelAttributes> extends Model {

  constructor(values?: TCreationAttributes, options?: BuildOptions) {
    super(values, options);
  }

  public static async calculateTimeOfCreate<
    M extends Model,
    O extends CreateOptions<Attributes<M>> = CreateOptions<Attributes<M>>
  >(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    values?: CreationAttributes<M>,
    options?: O
  ): Promise<O extends { returning: false } | { ignoreDuplicates: true } ? void : M> {

    return await TimeKeeper.calculateProcessingTime
      <Promise< O extends { returning: false } | { ignoreDuplicates: true } ? void : M>>(
      () => { return super.create.bind(this)(values, options) },
      req_log_detail,
      {state: "Success", name: "Create", target_table: this.name}
    );
  }

  public static calculateTimeOfFindOne<M extends Model>(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    options: NonNullFindOptions<Attributes<M>>
  ): Promise<M>;
  public static calculateTimeOfFindOne<M extends Model>(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    options?: FindOptions<Attributes<M>>
  ): Promise<M | null>;

  public static async calculateTimeOfFindOne<M extends Model>(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    options?: NonNullFindOptions<Attributes<M>> | FindOptions<Attributes<M>>
  ): Promise<M | null> {

    return await TimeKeeper.calculateProcessingTime<Promise<M | null>>(
      () => { return super.findOne.bind(this)(options) },
      req_log_detail,
      {state: "Success", name: "Read", target_table: this.name}
    );
  }

  public static async calculateTimeOfFindAll<M extends Model>(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    options?: FindOptions<Attributes<M>>): Promise<M[]> {

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
        [key in keyof Attributes<M>]?: Attributes<M>[key] | Utils.Fn | Utils.Col | Utils.Literal;
    },
    options: UpdateOptions<Attributes<M>>
  ): Promise<[number, M[]]> {

    return await TimeKeeper.calculateProcessingTime<Promise<[number, M[]]>>(
      () => { return super.update.bind(this)(values, options) },
      req_log_detail,
      {state: "Success", name: "Update", target_table: this.name}
    );
  }

  public static async calculateTimeOfDestroy<M extends Model>(
    this: ModelStatic<M>,
    req_log_detail: ReqLogDetail,
    options?: DestroyOptions<Attributes<M>>
  ): Promise<number> {

    return await TimeKeeper.calculateProcessingTime<Promise<number>>(
      () => { return super.destroy.bind(this)(options) },
      req_log_detail,
      {state: "Success", name: "Delete", target_table: this.name}
    );
  }
}
