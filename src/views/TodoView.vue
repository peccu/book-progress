<script setup lang="ts">
import { useTodosState } from "@/stores/todo";
import { storeToRefs } from "pinia";
const todostore = useTodosState();
const { todos } = storeToRefs(todostore);

const inittodos = () => {
  todostore.addTodo("todo 1");
  todostore.addTodo("todo 2");
  todostore.addTodo("todo 3");
  todostore.updateTodo({ text: "todo 2 to done", id: 1, isFinished: true });
};
</script>

<template>
  <main>
    <button @click="inittodos()">init todo</button>
    <div>
      <div v-for="todo in todos" :key="todo.id">
        {{ todo.id }}: {{ todo.text }} / {{ todo.isFinished }}
        <span :class="{ completed: todo.isFinished }">{{ todo.text }}</span>
        <span @click.stop="todostore.toggleCompleted(todo.id)">&#10004;</span>
        <span @click="todostore.deleteTodo(todo.id)">&#10060;</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
