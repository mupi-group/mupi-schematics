export interface EnvironmentOptions {
  /**
   * Application Name
   */
  name: string;
  /**
   * The name of the env.
   */
  env: string;
  /**
   * The path to create the env.
   */
  path?: string;
  /**
   * Application basing cloud service.
   */
  service?: string;
}
