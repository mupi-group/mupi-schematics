import {Title, Description, ID} from "@mupi/core";

@Title({
    title: '<%= name %> management',
    subtitle: 'config your <%= name %> info here'
})
export default class <%= classify(name) %>Model {
    @ID()
    @Description('ID')
    id: string;

    @Description('<%= name %> name')
    name: string;
}