import { 
  Model,
  FindOptions,
  BuildOptions,
  CreateOptions,
  UpdateOptions,
  InstanceDestroyOptions,
} from 'sequelize';
import TimeKeeper from '@/express-src/modules/processingLogStore/writeLogs/TimeKeeper';
import { ReqLogDetail } from '@/express-src/modules/processingLogStore/processingLogModules';

export default abstract class CalculateProcessingTimeModel<
  TModelAttributes extends {} = any, 
  TCreationAttributes extends {} = TModelAttributes> extends Model {

  constructor(values?: TCreationAttributes, options?: BuildOptions) {
    super(values, options);
  }

  // public static async calculateTimeOfCreate<M extends Model>(
  //   this: { new (): M } & typeof Model,
  //   req_log_detail: ReqLogDetail,
  //   values?: object,
  //   options?: CreateOptions
  // ): Promise<M> {

  //   return await TimeKeeper.calculateProcessingTime<Promise<M>>(
  //     () => { return super.create.bind(this)(values, options) },
  //     req_log_detail,
  //     {state: "Success", name: "Create", target_table: this.name}
  //   );
  // }
  public static async calculateTimeOfCreate(
    req_log_detail: ReqLogDetail,
    values: object, 
    options: CreateOptions & { returning: false }
  ): Promise<void> {

    return await TimeKeeper.calculateProcessingTime<Promise<void>>(
      () => { return super.create.bind(this)(values, options) },
      req_log_detail,
      {state: "Success", name: "Create", target_table: this.name}
    );
  }

  public static async calculateTimeOfFindAll<M extends Model>(
    this: { new (): M } & typeof Model, 
    req_log_detail: ReqLogDetail,
    options?: FindOptions
  ): Promise<M[]> {

    return await TimeKeeper.calculateProcessingTime<Promise<M[]>>(
      () => { return super.findAll.bind(this)(options) },
      req_log_detail,
      {state: "Success", name: "Read", target_table: this.name}
    );
  }

  public static async calculateTimeOfUpdate<M extends Model>(
    this: { new (): M } & typeof Model,
    req_log_detail: ReqLogDetail,
    values: object,
    options: UpdateOptions
  ): Promise<[number, M[]]> {

    return await TimeKeeper.calculateProcessingTime<Promise<[number, M[]]>>(
      () => { return super.update.bind(this)(values, options) },
      req_log_detail,
      {state: "Success", name: "Update", target_table: this.name}
    );
  }

  public static async calculateTimeOfDelete<M extends Model>(
    req_log_detail: ReqLogDetail,
    options?: InstanceDestroyOptions,
  ): Promise<void> {

    return await TimeKeeper.calculateProcessingTime<Promise<void>>(
      () => { return super.destroy.bind(this)(options) },
      req_log_detail,
      {state: "Success", name: "Delete", target_table: this.name}
    );
  }
}
