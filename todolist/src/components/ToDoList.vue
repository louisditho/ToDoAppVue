<template>
  <div>
    <div class="ldc-container">
      <div class="header">
        <h2>To Do List Apps</h2>
        <h5>by: Louis Ditho</h5>
      </div>
      <div class="todo-apps">
        <div class="todo-apps-input">
          <div class="main-input">
            <div class="d-flex">
              <div class="form-group pad-15">
                <label>To do title</label>
                <input
                  type="text"
                  class="todo-apps-input-input form-control"
                  palceholder="write your task here"
                  v-model="newToDo"
                  required
                />
              </div>
              <div class="form-group pad-15">
                <label>Due Date</label>
                <input
                  type="date"
                  class="todo-apps-input-date form-control"
                  palceholder="date"
                  v-model="newToDoDate"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea
                row="5"
                placeholder="write description here"
                v-model="newToDoDescription"
                class="form-control"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <button type="submit" @click="addToDo">Add To Do List</button>
            </div>
          </div>
          <div id="sortable">
            <div v-for="(todo,index) in todosFilter" :key="todo.id ">
              <div
                class="main-point"
                v-if="!todo.edit"
                :class="{checked : todo.completed === true}"
              >
                <div class="row-table">
                  <div class="checkbox">
                    <input type="checkbox" v-model="todo.completed" />
                  </div>
                  <div class="title-des">
                    <h3>{{ todo.title }}</h3>
                    <div class="duedate">{{ todo.dueDate }}</div>
                    <div class="description">{{ todo.description }}</div>
                  </div>
                  <div class="button-edit-delete">
                    <div class="pad6">
                      <button type="button" class="btn-edit" @click="editToDo(todo)">Edit</button>
                    </div>
                    <div class="pad6">
                      <button type="button" class="btn-remove" @click="removeToDo(index)">Remove</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="main-input">
                <div v-if="todo.edit" class="edit-point">
                  <div class="d-flex">
                    <div class="form-group pad-15">
                      <input type="text" v-model="todo.title" class="form-control" />
                    </div>
                    <div class="form-group pad-15">
                      <input type="date" v-model="todo.dueDate" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <textarea row="5" v-model="todo.description" class="form-control"></textarea>
                  </div>
                  <div class="d-flex">
                    <div class="form-group pad-15">
                      <button class="btn-cancel" type="button" @click="cancelEditToDo(todo)">Cancel</button>
                    </div>
                    <div class="form-group pad-15">
                      <button class="btn-save" type="button" @click="saveEditToDo(todo)">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="total-todo">
            <div>
              <div class="checkall">
                <input type="checkbox" :checked="!notAnyRemaining" @change="changeAllTodos" />
                <span>Check All</span>
              </div>
            </div>
            <div>
              <span>
                <b>{{ remaining }}</b> To Do List
              </span>
            </div>
          </div>
          <div class="filter">
            <div class="pad6">
              <button :class="{activated : filter == 'all'}" @click="filter = 'all'">Show All</button>
            </div>
            <div class="pad6">
              <button :class="{activated : filter == 'active'}" @click="filter = 'active'">Active</button>
            </div>
            <div class="pad6">
              <button
                :class="{activated : filter == 'completed'}"
                @click="filter = 'completed'"
              >Completed</button>
            </div>
            <div class="pad6" v-if="showClearCompleted">
              <transition name="fade">
                <button @click="clearCompleted">clear Completed</button>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="space-100"></div>
    <router-link tag="li" to="/learnapi">
      <a>Practice API</a>
    </router-link>
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          completed: false,
          edit: false
        },
        {
          id: "2",
          title: "testing for 2",
          duedate: "",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
.space-100 {
  height: 100px;
}
.ldc-container {
  background: linear-gradient(270deg, #ff6632, #283fb1);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 30s ease infinite;
  -moz-animation: AnimationName 30s ease infinite;
  animation: AnimationName 30s ease infinite;

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  width: 40%;
  margin: 0 auto;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  padding: 40px;
  border-radius: 40px;
  h5,
  h2 {
    margin-top: 0;
    color: white;
  }
  hr {
    margin-bottom: 2rem;
    border-color: #ccc;
    opacity: 0.5;
  }
}
.ldc-container .main-point.checked {
  font-style: italic;
  font-weight: bold;
}
.filter {
  display: flex;
  justify-content: space-between;
  margin: 0 -6px;
  margin-top: 2rem;
  .activated {
    font-weight: bold;
  }
  .pad6 {
    padding: 0 6px;
    width: 100%;
  }
  button {
    padding: 12px;
    border-radius: 4px;
    width: 100%;
    font-size: 14px;
    &:focus {
      outline: none;
    }
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

.todo-apps {
  .main-input {
    margin-bottom: 2rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1.5rem;
    button {
      margin-top: 1rem;
      background: #ff6632;
      border-radius: 100px;
      color: #ffffff;
      border: 1px solid #ff6632;
      -webkit-transition: 0.3s;
      -o-transition: 0.3s;
      transition: 0.3s;
      padding: 12px 24px;
      width: 100%;
      font-size: 14px;
      &:hover,
      &:focus {
        outline: none;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
      }
      &.btn-cancel {
        background: #eeeeee;
        border-radius: 100px;
        border: 1px solid #eeeeee;
        -webkit-transition: 0.3s;
        -o-transition: 0.3s;
        transition: 0.3s;
        color: #666666;
      }
    }
    .d-flex {
      display: flex;
      align-items: start;
      justify-content: space-between;
      margin: 0 -15px;
    }

    .form-group {
      margin-bottom: 1rem;
      width: 100%;
      &.pad-15 {
        padding: 0 15px;
      }
      input {
        width: 100%;
      }
      textarea {
        width: 100%;
      }
    }
    label {
      padding-left: 24px;
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.1em;
      color: white;
      margin-bottom: 6px;
      text-transform: uppercase;
      display: block;
      text-align: left;
    }
    .form-control {
      display: block;
      width: 100%;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      -webkit-transition: border-color 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
      transition: border-color 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
      -o-transition: border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
      background: #ffffff;
      border: 1px solid rgba(136, 136, 136, 0.3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 100px;
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #333333;
      padding: 14px 24px;
      &:focus {
        outline: none;
        border: 1px solid orange;
      }
    }
  }
}
textarea {
  resize: none;
}

.total-todo {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  span {
    font-size: 14px;
    color: white;
    b {
      color: gold;
    }
  }
  .checkall {
    width: 100%;
    span {
      margin-left: 15px;
    }
  }
}
.row-table {
  display: flex;
  align-items: start;
  width: 100%;
  justify-content: space-between;
  text-align: left;
  .title-des {
    margin-right: 20px;
    width: 100%;
  }
  h3 {
    margin-bottom: 0.5rem;
    margin-top: 0;
    color: white;
    font-size: 18px;
    font-weight: 500;
  }
  .duedate {
    font-size: 14px;
    font-style: italic;
    font-weight: bold;
    margin-bottom: 4px;
    color: gold;
  }
  .description {
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 4px;
    color: white;
  }
  .checkbox {
    width: 10%;
  }
  .button-edit-delete {
    display: inline-flex;
    width: 40%;
    margin: 0 -6px;
    .pad6 {
      padding: 0 6px;
    }
    button {
      width: 100%;
      font-size: 12px;
      &:focus,
      &:hover {
        outline: none;
      }
    }

    .btn-edit {
      background: #283fb1;
      border-radius: 100px;
      border: 1px solid #283fb1;
      -webkit-transition: 0.3s;
      -o-transition: 0.3s;
      transition: 0.3s;
      color: white;
      padding: 12px;
      border-radius: 4px;
    }
    .btn-remove {
      background: #eeeeee;
      border-radius: 100px;
      border: 1px solid #eeeeee;
      -webkit-transition: 0.3s;
      -o-transition: 0.3s;
      transition: 0.3s;
      padding: 12px;
      border-radius: 4px;
      color: #666666;
    }
  }
}
</style>