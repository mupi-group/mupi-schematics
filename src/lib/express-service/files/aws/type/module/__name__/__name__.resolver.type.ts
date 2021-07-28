export type <%= classify(name) %> = {
<%= typescriptTypeItems %>
};

export type <%= classify(name) %>Paginated = {
  items: <%= classify(name) %>[];
  count: number;
  endKey: string;
};

export type <%= classify(name) %>Input = {
<%= typescriptTypeInputItems %>
};

export type QuerySpecific<%= classify(name) %>Params = {<%= typescriptTypeIDPropertyKey %>: string};
export type Query<%= classify(name) %>sParams = {<%= name %>Input: <%= classify(name) %>Input, limit?: number, startKey?: string};
export type MutationCreate<%= classify(name) %> = {<%= name %>Input: <%= classify(name) %>Input};
export type MutationUpdate<%= classify(name) %> = {<%= typescriptTypeIDPropertyKey %>: string, <%= name %>Input: <%= classify(name) %>Input};
export type MutationDelete<%= classify(name) %> = {<%= typescriptTypeIDPropertyKey %>: string};