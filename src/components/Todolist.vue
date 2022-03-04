<template>
  <div>
    <input type="text" class="todo-input" placeholder="Cose da fare"
    v-model="newTodo" @keyup.enter="addTodo">
    <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed">
        <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label" :class="{ completed : todo.completed }">
          {{ todo.title }}</div>
        <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)"
        @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
    <div class="extra-container">
      <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Seleziona tutto</label></div>
      <div>{{ remaining }} rimanenti</div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all'}" @click="filter = 'all'">Tutti</button>
        <button :class="{ active: filter == 'active'}" @click="filter = 'active'">Da svolgere</button>
        <button :class="{ active: filter == 'completed'}" @click="filter = 'completed'">Completati</button>
      </div>

      <div>
        <button v-if="showClearCompletedButton" @click="clearCompleted">
          Elimina task completati
        </button>
      </div>
    </div>

<!--Nella mia testa questa doveva essere una "bozza" per la navbar o qualcosa del genere-->
    <div class="extra-container">
      <nav>
        <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todolist',
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
      filter: 'all',
      todos: [
        {
          'id': 1,
          'title': 'Task di esempio 1',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Task di esempio 2',
          'completed': false,
          'editing': false,
        },
      ]
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(){
      return this.remaining != 0
    },
    todosFiltered(){
      if(this.filter == 'all'){
        return this.todos
      } else if(this.filter == 'active'){
        return this.todos.filter(todo => !todo.completed)
      } else if(this.filter == 'completed'){
        return this.todos.filter(todo => todo.completed)
      }

      return this.todos
    },
    showClearCompletedButton(){
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  methods: {
    addTodo(){
      if(this.newTodo.trim().length == 0){
        return
      }

      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
      })

      this.newTodo = ''
      this.idForTodo++
    },
    editTodo(todo){
      this.beforeEditCache = todo.title
      todo.editing = true
    },
    doneEdit(todo){
      if(todo.title.trim().length == 0){
        todo.title = this.beforeEditCache
      }
      todo.editing = false
    },
    cancelEdit(todo){
      todo.title = this.beforeEditCache
      todo.editing = false
    },
    removeTodo(index){
      this.todos.splice(index, 1)
    },
    checkAllTodos(){
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },
    clearCompleted(){
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.todo-input{
  font-size: 18xp;
  margin-bottom: 16px;
  padding: 10px 18px;
  width: 100%;  
}

.todo-input:focus{
  outline: 0;
}

.todo-item{
  align-items: concat;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.remove-item{
  cursor: pointer;
  margin-left: 14px;
}

.remove-item:hover{
  color: black;
}

.todo-item-left{
  align-items: center;
  display: flex;
}

.todo-item-label{
  border: 1px solid white;
  margin-left: 12px;
  padding: 10px;
}

.todo-item-edit{
  border: 1px solid #ccc;
  color: blue;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 24px;
  margin-left: 12px;
  padding: 10px;
  width: 100%;
}

.todo-item-edit:focus{
  outline: none;
}

.completed{
  color: grey;
  text-decoration: line-through;
}

.extra-container{
  align-items: center;
  border-top: 1px solid lightgrey;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 14px;
  padding-top: 14px;
}

button{
  appearance: none;
  background-color: white;
  font-size: 14px;
}

button:hover{
  background: lightgreen;
}

button:focus{
  outline: none;
}

.active{
  background: lightgreen;
}
</style>
