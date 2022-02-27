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
import TimeKeeper from '@/express-src/modules/write_logs/TimeKeeper';

export default abstract class CalculateProcessingTimeModel<
  TModelAttributes extends {} = any, 
  TCreationAttributes extends {} = TModelAttributes> extends Model {

  constructor(values?: TCreationAttributes, options?: BuildOptions) {
    super(values, options);
  }

  // TODO 各々のsuper実行後の戻り値anyなのどうにかしたい。
  public static async create<
    M extends Model,
    O extends CreateOptions<M['_attributes']> = CreateOptions<M['_attributes']>
  >(
    this: ModelStatic<M>,
    values?: M['_creationAttributes'],
    options?: O
  ): Promise<O extends { returning: false } | { ignoreDuplicates: true } ? void : M> {

    let time_keeper: TimeKeeper = new TimeKeeper();
    let value: any = await super.create.bind(this)(values, options);
    console.log(this);
    time_keeper.invokeWriter({state: "Success", name: "Create", target_table: this.name})

    return value;
  }

  public static async findAll<M extends Model>(
    this: ModelStatic<M>,
    options?: FindOptions<M['_attributes']>): Promise<M[]> {

    let time_keeper: TimeKeeper = new TimeKeeper();
    let value: any = await super.findAll.bind(this)(options);
    time_keeper.invokeWriter({state: "Success", name: "Read", target_table: this.name})

    return value;
  }

  public static async update<M extends Model>(
    this: ModelStatic<M>,
    values: {
        [key in keyof M['_attributes']]?: M['_attributes'][key] | Utils.Fn | Utils.Col | Utils.Literal;
    },
    options: UpdateOptions<M['_attributes']>
  ): Promise<[number, M[]]> {

    let time_keeper: TimeKeeper = new TimeKeeper();
    let value: any = super.update.bind(this)(values, options);
    time_keeper.invokeWriter({state: "Success", name: "Update", target_table: this.name})

    return value;
  }

  public static destroy<M extends Model>(
    this: ModelStatic<M>,
    options?: DestroyOptions<M['_attributes']>
  ): Promise<number> {

    let time_keeper: TimeKeeper = new TimeKeeper();
    let value: any = super.destroy.bind(this)(options);
    time_keeper.invokeWriter({state: "Success", name: "Delete", target_table: this.name})

    return value;
  }
}
