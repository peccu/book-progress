import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTodosState = defineStore({
  id: "todos",
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: useStorage("todos", []),
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: "all",
    // type will be automatically inferred to number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // autocompletion! ✨
      return state.todos.filter((todo) => todo.isFinished);
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished);
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos() {
      if (this.filter === "finished") {
        // call other getters with autocompletion ✨
        return this.finishedTodos;
      } else if (this.filter === "unfinished") {
        return this.unfinishedTodos;
      }
      return this.todos;
    },
  },
  actions: {
    // any amount of arguments, return a promise or not
    addTodo(text) {
      // you can directly mutate the state
      this.todos.push({ text, id: this.nextId, isFinished: false });
      this.nextId++;
    },
    updateTodo(newtodo) {
      this.todos.splice(newtodo.id, 1, newtodo);
    },
    deleteTodo(itemID) {
      this.todos = this.todos.filter((object) => {
        return object.id !== itemID;
      });
    },
    toggleCompleted(idToFind: number) {
      const todo = this.todos.find((obj) => obj.id === idToFind);
      if (todo) {
        todo.isFinished = !todo.isFinished;
      }
    },
  },
});
