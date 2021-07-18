import {join, Path, strings} from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import {Location, mergeSourceRoot, NameParser} from '../../utils';
import {EnvironmentOptions} from './environment.schema';
import {DEFAULT_ENV_PATH_NAME} from "../defaults";

export function main(options: EnvironmentOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        mergeWith(generate(options)),
        mergeWith(overwriteMupiConfig(options), MergeStrategy.Overwrite),
      ]),
    )(tree, context);
  };
}

function transform(source: EnvironmentOptions): EnvironmentOptions {
  const target: EnvironmentOptions = Object.assign({}, source);

  const location: Location = new NameParser().parse(target);
  target.name = strings.dasherize(location.name);
  target.service = target.service !== undefined ? target.service : 'aws';
  target.path = strings.dasherize(location.path);

  return target;
}

function generate(options: EnvironmentOptions) {
  return (context: SchematicContext) => apply(url(join('./files' as Path, options.service)), [
    template({
      ...strings,
      ...options,
    }),
    move(strings.dasherize(join(options.path as Path, DEFAULT_ENV_PATH_NAME, options.env))),
  ])(context);
}

function overwriteMupiConfig(options: EnvironmentOptions) {
  return (context: SchematicContext) => apply(url(join('./files' as Path, 'overwrite')), [
    template({
      ...strings,
      ...options,
    }),
    move(strings.dasherize(join(options.path as Path))),
  ])(context);
}
