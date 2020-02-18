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
        <div id="sortable">
          <div v-for="(todo,index) in todosFilter" :key="todo.id ">
            <div class="main-point" v-if="!todo.edit" :class="{checked : todo.completed === true}">
              <input type="checkbox" v-model="todo.completed" />
              - {{ todo.title }} - {{ todo.description }} - {{ todo.dueDate }} -
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
              <input type="date" v-model="todo.dueDate" />
              <button type="button" @click="cancelEditToDo(todo)">cancel</button>
              <button type="button" @click="saveEditToDo(todo)">save</button>
            </div>
          </div>
        </div>
        <div class="total-todo">
          <span>{{ remaining }} To Do List</span>
          <span>
            <input type="checkbox" :checked="!notAnyRemaining" @change="changeAllTodos" /> Check All
          </span>
        </div>
        <div class="filter">
          <button :class="{activated : filter == 'all'}" @click="filter = 'all'">Show All</button>
          <button :class="{activated : filter == 'active'}" @click="filter = 'active'">Active</button>
          <button
            :class="{activated : filter == 'completed'}"
            @click="filter = 'completed'"
          >Completed</button>
          <transition name="fade">
            <button v-if="showClearCompleted" @click="clearCompleted">clear Completed</button>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/todo.css";

export default {
  name: "todo-list",
  data() {
    return {
      newToDo: "",
      newToDoDate: "",
      newToDoDescription: "",
      idForToDo: "3",
      order: null,
      beforeEdit: "",
      beforeEditDueDate: "",
      beforeEditDescription: "",
      filter: "all",
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
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    notAnyRemaining() {
      return this.remaining != 0;
    },
    todosFilter() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    showClearCompleted() {
      return this.todos.filter(todo => todo.completed).length;
    }
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
      if (todo.title == 0) {
        todo.title = this.beforeEdit;
      }
      if (todo.dueDate == 0) {
        todo.dueDate = this.beforeEditDueDate;
      }
      if (todo.descriptions == 0) {
        todo.description = this.beforeEditDescription;
      }
      this.beforeEdit = todo.title;
      this.beforeEditDueDate = todo.dueDate;
      this.beforeEditDescription = todo.description;
      todo.edit = true;
    },
    saveEditToDo(todo) {
      todo.edit = false;
    },
    cancelEditToDo(todo) {
      todo.title = this.beforeEdit;
      todo.dueDate = this.beforeEditDueDate;
      todo.description = this.beforeEditDescription;
      todo.edit = false;
    },
    changeAllTodos() {
      this.todos.forEach(function(todo) {
        todo.completed = event.target.checked;
      });
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      const sortable = Sortable.create(document.getElementById("sortable"), {
        animation: 200,
        onUpdate: () => {
          this.order = sortable.toArray();
        }
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.main-point.checked {
  font-style: italic;
  font-weight: bold;
}
.filter {
  .activated {
    font-weight: bold;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>