export interface ExpressServiceOptions {
  /**
   * Application Name
   */
  name: string;
  /**
   * The path to create the env.
   */
  path?: string;
  /**
   * Application basing cloud service.
   */
  service: string;
  items: {
  key: string;
  description: string;
  type: string;
  typescriptType?: string;
  upload?: boolean;
  id?: boolean;
  listed?: boolean;
}[];
  typescriptTypeItems?: string;
  typescriptTypeInputItems?: string;
  typescriptTypeIDPropertyKey?: string;
}
