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
import {BackendOptions} from './backend.schema';
import {DEFAULT_BACKEND_PATH_NAME, DEFAULT_ENV_NAME, DEFAULT_ENV_PATH_NAME, DEFAULT_SERVICE} from "../defaults";

export function main(options: BackendOptions): Rule {
    options = transform(options);
    return (tree: Tree, context: SchematicContext) => {
        return branchAndMerge(
            chain([
                mergeSourceRoot(options),
                mergeWith(generate(options)),
                mergeWith(generateDatabaseInfrastructure(options)),
            ]),
        )(tree, context);
    };
}

function transform(source: BackendOptions): BackendOptions {
    const target: BackendOptions = Object.assign({}, source);

    const location: Location = new NameParser().parse(target);
    target.name = strings.dasherize(location.name);
    target.path = strings.dasherize(location.path);
    target.service = !!target.service ? target.service : DEFAULT_SERVICE;
    target.items = JSON.parse(source.items as unknown as string);
    target.typescriptTypeItems = target.items.map(_ => `  // ${_.description}\n  ${_.key}: ${_.typescriptType};`).join('\n')
    target.typescriptTypeInputItems = target.items
        .filter(_ => !_.id)
        .map(_ => `  // ${_.description}\n  ${_.key}?: ${_.typescriptType};`).join('\n')
    target.typescriptTypeIDPropertyKey = target.items.find(_ => _.id).key;
    target.databaseAttributes = target.items.map(_ => {
        if (_.id) return '';
        switch (_.typescriptType) {
            case "string":
            case "string[]":
            case "number[]":
                return '  attribute {\n' +
                    '    name = "'+ _.key +'"\n' +
                    '    type = "S"\n' +
                    '  }'
            case "number":
                return '  attribute {\n' +
                    '    name = "'+ _.key +'"\n' +
                    '    type = "N"\n' +
                    '  }'
        }
    }).join('\n')

    return target;
}

function generate(options: BackendOptions) {
    return (context: SchematicContext) => apply(url(join('./files' as Path, options.service)), [
        template({
            ...strings,
            ...options,
        }),
        move(strings.dasherize(join(options.path as Path, DEFAULT_BACKEND_PATH_NAME, options.name))),
    ])(context);
}

function generateDatabaseInfrastructure(options: BackendOptions) {
    return (context: SchematicContext) => apply(url(join('./files' as Path, 'database', options.service)), [
        template({
            ...strings,
            ...options,
        }),
        move(strings.dasherize(join(options.path as Path, DEFAULT_ENV_PATH_NAME, options.env || DEFAULT_ENV_NAME))),
    ])(context);
}