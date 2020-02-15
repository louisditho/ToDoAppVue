<template>
  <div>
    <h2>To Do List Apps</h2>
    <h5>by: Louis Ditho</h5>
    <hr />
    <div class="todo-apps">
      <div class="todo-apps-input">
        <input
          type="text"
          class="todo-apps-input-input"
          palceholder="write your task here"
          v-model="newToDo"
          required
        />
        <textarea
          row="5"
          placeholder="write description here"
          v-model="newToDoDescription"
          required
        ></textarea>
        <input
          type="date"
          class="todo-apps-input-date"
          palceholder="date"
          v-model="newToDoDate"
          required
        />
        <button type="submit" @click="addToDo">Add To Do List</button>
        <div v-for="(todo,index) in todos" :key="todo.id ">
          <div class="main-point" v-if="!todo.edit">
            {{ todo.title }} - {{ todo.description }} - {{ todo.dueDate }} -
            <span>
              <button type="button" @click="editToDo(todo)">Edit</button>
            </span>
            <span>
              <button type="button" @click="removeToDo(index)">remove</button>
            </span>
          </div>
          <div v-if="todo.edit" class="edit-point">
            <input type="text" v-model="todo.title" />
            <textarea row="5" v-model="todo.description"></textarea>
            <input type="date " v-model="todo.dueDate" />
            <buttton type="button" @click="saveEditToDo(todo)">save</buttton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "todo-list",
  data() {
    return {
      newToDo: "",
      newToDoDate: "",
      newToDoDescription: "",
      idForToDo: "3",
      todos: [
        {
          id: "1",
          title: "testing for",
          dueDate: "",
          description: "",
          completed: false,
          edit: false
        },
        {
          id: "2",
          title: "testing for 2",
          duedate: "",
          description: "",
          completed: false,
          edit: false
        }
      ]
    };
  },
  methods: {
    addToDo() {
      if (this.newToDo.trim().length == 0) {
        return;
      }
      if (this.newToDoDate.trim().length == 0) {
        return;
      }
      if (this.newToDoDescription.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForToDo,
        title: this.newToDo,
        dueDate: this.newToDoDate,
        description: this.newToDoDescription,
        completed: false,
        edit: false
      });
      this.newToDo = "";
      this.newToDoDate = "";
      this.newToDoDescription = "";

      this.idForToDo++;
    },
    removeToDo(index) {
      this.todos.splice(index, 1);
    },
    editToDo(todo) {
      todo.edit = true;
    },
    saveEditToDo(todo) {
      todo.edit = false;
    }
  }
};
</script>

<style scoped>
</style>