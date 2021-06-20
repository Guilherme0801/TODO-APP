import React, {Component} from 'react';
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'HTTP://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        //declarando o estado inicial do input
        this.state = {description : '',list:[]}
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)

        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=${description}` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description,list: resp.data}))
        }

    handleSearch() {
        debugger;
        this.refresh(this.state.description)
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL,{description})
            .then(res => this.refresh())
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(res => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`,{...todo, done: true})
        .then(res => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`,{...todo, done: false})
        .then(res => this.refresh(this.state.description))
    }

    handleChange(e) {
        this.setState({description : e.target.value}) 
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'/>

                <TodoForm   description={this.state.description}
                            handleAdd={this.handleAdd}
                            handleSearch={this.handleSearch}
                            handleChange={this.handleChange}/>
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    />
            </div>
        )
    }
}