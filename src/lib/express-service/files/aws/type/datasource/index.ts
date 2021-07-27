import { <%= classify(name) %>Datasource } from '../../module/<%= name %>/<%= name %>.datasource';
import { <%= classify(name) %>DebugDatasource } from '../../module/<%= name %>/<%= name %>.debug.datasource';

/* business microservice types */
export type DatasourceCollection = {
    <%= name %>Datasource?: <%= classify(name) %>Datasource
    <%= name %>DebugDatasource?: <%= classify(name) %>DebugDatasource
};
