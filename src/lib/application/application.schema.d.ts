export interface ApplicationOptions {
  /**
   * Mupi application name.
   */
  name: string;
  /**
   * Mupi application author.
   */
  author?: string;
  /**
   * Mupi application description.
   */
  description?: string;
  /**
   * Mupi application destination directory
   */
  directory?: string;
  /**
   * Mupi application version.
   */
  version?: string;
  /**
   * Application basing cloud service.
   */
  service?: string;
  /**
   * The used package manager.
   */
  packageManager?: 'npm' | 'yarn' | 'undefined';
}
