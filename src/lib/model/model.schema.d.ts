export interface ModelOptions {
  /**
   * The name of the model.
   */
  name: string;
  /**
   * The env to create the model.
   */
  env?: string;
  /**
   * The path to create the model.
   */
  path?: string;
  /**
   * Application basing cloud service.
   */
  service?: string;
}
