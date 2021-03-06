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
import {GraphqlSchemaOptions} from './graphql-schema.schema';
import {DEFAULT_BACKEND_PATH_NAME, DEFAULT_ENV_PATH_NAME} from "../defaults";

export function main(options: GraphqlSchemaOptions): Rule {
    options = transform(options);
    return (tree: Tree, context: SchematicContext) => {
        return branchAndMerge(
            chain([
                mergeSourceRoot(options),
                mergeWith(generate(options)),
            ]),
        )(tree, context);
    };
}

function transform(source: GraphqlSchemaOptions): GraphqlSchemaOptions {
    const target: GraphqlSchemaOptions = Object.assign({}, source);

    const location: Location = new NameParser().parse(target);
    target.name = strings.dasherize(location.name);
    target.path = strings.dasherize(location.path);
    target.items = JSON.parse(source.items as unknown as string);
    target.graphqlSchemaItems = target.items.map(_ => `  """${_.description}"""\n  ${_.key}: ${_.graphqlType}`).join('\n')
    target.graphqlSchemaInputItems = target.items
        .filter(_ => !_.id)
        .map(_ => `  """${_.description}"""\n  ${_.key}: ${_.graphqlType}`).join('\n')
    target.graphqlSchemaIDPropertyKey = target.items.find(_ => _.id).key;

    return target;
}

function generate(options: GraphqlSchemaOptions) {
    return (context: SchematicContext) => apply(url(join('./files' as Path)), [
        template({
            ...strings,
            ...options,
        }),
        move(strings.dasherize(join(options.path as Path, DEFAULT_BACKEND_PATH_NAME, options.name, 'src'))),
    ])(context);
}
