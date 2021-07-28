export type <%= classify(name) %> = {
<%= typescriptTypeItems %>
};

export type <%= classify(name) %>Paginated = {
  items: <%= classify(name) %>[];
  cursor: number;
  pointer: number;
  ended: boolean;
};

export type <%= classify(name) %>Input = {
<%= typescriptTypeInputItems %>
};

export type QuerySpecific<%= classify(name) %>Params = {<%= typescriptTypeIDPropertyKey %>: string};
export type Query<%= classify(name) %>sParams = {<%= name %>Input: <%= classify(name) %>Input, cursor?: number, pointer?: number};
export type MutationCreate<%= classify(name) %> = {<%= name %>Input: <%= classify(name) %>Input};
export type MutationUpdate<%= classify(name) %> = {<%= typescriptTypeIDPropertyKey %>: string, <%= name %>Input: <%= classify(name) %>Input};
export type MutationDelete<%= classify(name) %> = {<%= typescriptTypeIDPropertyKey %>: string};