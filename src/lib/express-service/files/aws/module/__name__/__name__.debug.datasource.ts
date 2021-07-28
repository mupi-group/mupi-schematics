/* import types */
import {
    <%=  classify(name) %>,
    <%=  classify(name) %>Paginated,
    QuerySpecific<%=  classify(name) %>Params,
    Query<%=  classify(name) %>sParams,
    MutationCreate<%=  classify(name) %>,
    MutationUpdate<%=  classify(name) %>,
    MutationDelete<%=  classify(name) %>,
} from '../../type/module/<%=  name %>/<%=  name %>.resolver.type';

/**
 * @description <%=  classify(name) %> datasource for query modifying the <%=  name %>
 */
export class <%=  classify(name) %>DebugDatasource {
    /**
     * @description Query specific <%=  name %>
     * @param input
     */
    async querySpecific<%=  classify(name) %>(input: QuerySpecific<%=  classify(name) %>Params): Promise<<%=  classify(name) %>> {
        const { <%=  typescriptTypeIDPropertyKey %> } = input;
        return { <%=  typescriptTypeIDPropertyKey %> } as <%=  classify(name) %>;
    }

    /**
     * @description Query paginated <%=  name %>s
     * @param input
     */
    async queryPaginated<%=  classify(name) %>s(input: Query<%=  classify(name) %>sParams): Promise<<%=  classify(name) %>Paginated> {
        const { startKey, <%=  name %>Input, limit } = input;
        return { endKey: startKey, count: limit, items: [<%=  name %>Input] } as <%=  classify(name) %>Paginated;
    }

    /**
     * @description create <%=  name %>
     * @param input
     */
    async create<%=  classify(name) %>(input: MutationCreate<%=  classify(name) %>): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { <%=  name %>Input } = input;
        return true;
    }

    /**
     * @description update <%=  name %>
     * @param input
     */
    async update<%=  classify(name) %>(input: MutationUpdate<%=  classify(name) %>): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { <%=  name %>Input } = input;
        return true;
    }

    /**
     * @description delete <%=  name %>
     * @param input
     */
    async delete<%=  classify(name) %>(input: MutationDelete<%=  classify(name) %>): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { <%=  typescriptTypeIDPropertyKey %> } = input;
        return true;
    }
}
