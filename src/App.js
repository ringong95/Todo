import React, { Component, PropTypes } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [{ id: 0, title: 'Learn React', complete: false }],
      lastId: 0,
      inputValue: ''
    }
    this.removeCompleted = this.removeCompleted.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  removeCompleted() {
    let todos = this.state.todos.filter((todo) => !todo.complete);
    this.setState({ todos });
  }

  toggleComplete(item) {
    const newToDos = this.state.todos.map((todo) => {
      if (item.id === todo.id) {
        todo.complete = !todo.complete
      }
      return todo
    })
    this.setState({ todos: newToDos })
  }

  removeToDo(item) {
    const newToDos = this.state.todos.filter((todo) => {
      return todo.id !== item.id
    })
    this.setState({ todos: newToDos })
  }

  hasCompleted() {
    let newTodos = this.state.todos.filter((todo) => todo.complete);
    return newTodos.length ? true : false;
  }

  addToDo(event) {
    event.preventDefault();
    const id = this.state.lastId + 1;
    if (this.state.inputValue) {
      let newToDos = this.state.todos.concat({
        id,
        title: this.state.inputValue,
        complete: false
      });

      this.setState({
        todos: newToDos,
        lastId: id,
        inputValue: ''
      })
    }

  }

  handleInputChange(event) {
    // this.setState({ inputValue: event.target.value })
  }

  render() {
    let { todos } = this.state;

    return (
      <div className="todo-list">
        <h1> So Much To Do</h1>
        <div className="add-todo">
          <ToDoInput
            addToDo={this.addToDo}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            autoFocus={true}
            />
        </div>
        <ul>

          {todos.map((toDo, index) => {
            return (
              <Todo key={toDo.id}
                toDo={toDo}
                toggleComplete={this.toggleComplete.bind(this, toDo)}
                removeToDo={this.removeToDo.bind(this, toDo)} />)
          })}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={this.state.todos.length} />
          {this.hasCompleted() &&
            <ClearButton removeCompleted={this.removeCompleted} />
          }
        </div>
      </div>
    );
  }
}

const ToDoInput = ({ addToDo, value, onChange, autoFocus }) => (
  <form name="addTodo" onSubmit={addToDo}>
    <input type="text" value={value} onChange={onChange} autoFocus={autoFocus} />
    <span>(press enter to add)</span>
  </form>
)

const Todo = ({ toDo, toggleComplete, removeToDo }) => {
  return (
    <li>{toDo.title}
      <input
        type="checkbox"
        id={toDo.id}
        checked={toDo.complete}
        onChange={toggleComplete} />
      <label htmlFor={toDo.id}></label>
      <button>
        <i className="fa fa-trash"
          onClick={removeToDo}></i>
      </button>
    </li>
  )
}
Todo.propTypes = {
  removeToDo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  toDo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    complete: PropTypes.bool
  })
}

const ClearButton = ({ removeCompleted }) => {
  return (
    <div>

      <button onClick={removeCompleted} >
        Clear
   </button>

    </div>
  )

}

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

const ToDoCount = ({ number }) => {
  return (
    <p>{number} {number === 1 ? "Todo" : "Todos"} </p>
  )
}
ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};


export default App;
