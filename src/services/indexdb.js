import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

export const db = new Dexie('todos');
db.version(2).stores({
    todos: '++id, title, deadline', // Primary key and indexed props
});

export const getTodos = () => db.todos.orderBy('deadline').toArray();
export const useGetTodo = () => {
    const todos = useLiveQuery(
        () => getTodos(),
    );
    return todos || [];
};
export const addTodo = ({ title, deadline }) => db.todos.add({
    title, deadline: deadline.getTime(),
});
export const deleteTodo = (id) => db.todos.delete(id);
export const updateTodo = (id, { title, deadline }) => db.todos.update(id, {
    title, deadline: deadline.getTime(),
});

export default db;
