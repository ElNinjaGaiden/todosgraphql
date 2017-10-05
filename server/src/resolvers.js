const todos = [
    {
        id: 1,
        title: 'Todo 1',
    },
    {
        id: 2,
        title: 'Todo 2',
    }
];

export const resolvers = {
    Query: {
        todos: () => {
            return todos;
        },
    },
};