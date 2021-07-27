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
import {ExpressServiceOptions} from './express-service.schema.d.ts';
import {DEFAULT_BACKEND_PATH_NAME, DEFAULT_SERVICE} from "../defaults";

export function main(options: ExpressServiceOptions): Rule {
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

function transform(source: ExpressServiceOptions): ExpressServiceOptions {
    const target: ExpressServiceOptions = Object.assign({}, source);

    const location: Location = new NameParser().parse(target);
    target.name = strings.dasherize(location.name);
    target.path = strings.dasherize(location.path);
    target.service = !!target.service ? target.service : DEFAULT_SERVICE;
    target.items = JSON.parse(source.items as unknown as string);
    target.typescriptTypeItems = target.items.map(_ => `// ${_.description}\n${_.key}?: ${_.typescriptType};`).join('\n')
    target.typescriptTypeInputItems = target.items
        .filter(_ => !_.id)
        .map(_ => `// ${_.description}\n${_.key}?: ${_.typescriptType};`).join('\n')
    target.typescriptTypeIDPropertyKey = target.items.find(_ => _.id).key;

    return target;
}

function generate(options: GraphqlSchemaOptions) {
    return (context: SchematicContext) => apply(url(join('./files' as Path, options.service)), [
        template({
            ...strings,
            ...options,
        }),
        move(strings.dasherize(join(options.path as Path, DEFAULT_BACKEND_PATH_NAME, options.name))),
    ])(context);
}
