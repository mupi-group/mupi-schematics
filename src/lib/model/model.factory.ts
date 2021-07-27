import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { Location, NameParser } from '../../utils';
import { mergeSourceRoot } from '../../utils';
import { ModelOptions } from './model.schema';
import {DEFAULT_BACKEND_PATH_NAME, DEFAULT_ENV_NAME, DEFAULT_ENV_PATH_NAME, DEFAULT_MODEL_PATH_NAME} from "../defaults";

export function main(options: ModelOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        mergeWith(generateModel(options)),
        mergeWith(generateInfrastructure(options)),
      ]),
    )(tree, context);
  };
}

function transform(source: ModelOptions): ModelOptions {
  const target: ModelOptions = Object.assign({}, source);

  const location: Location = new NameParser().parse(target);
  target.name = strings.dasherize(location.name);
  target.service = target.service !== undefined ? target.service : 'aws';
  target.path = strings.dasherize(location.path);

  return target;
}

function generateModel(options: ModelOptions) {
  return (context: SchematicContext) => apply(url(join('./files' as Path, 'model')), [
    template({
      ...strings,
      ...options,
    }),
    move(strings.dasherize(join(options.path as Path, DEFAULT_MODEL_PATH_NAME))),
  ])(context);
}

function generateInfrastructure(options: ModelOptions) {
  return (context: SchematicContext) => apply(url(join('./files' as Path, options.service)), [
    template({
      ...strings,
      ...options,
    }),
    move(strings.dasherize(join(options.path as Path, DEFAULT_ENV_PATH_NAME, options.env || DEFAULT_ENV_NAME))),
  ])(context);
}
