export interface GraphqlSchemaOptions {
  /**
   * Application Name
   */
  name: string;
  /**
   * The path to create the env.
   */
  path?: string;
  items: {
  key: string;
  description: string;
  type: string;
  graphqlType?: string;
  upload?: boolean;
  id?: boolean;
  listed?: boolean;
}[];
}
