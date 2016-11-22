var TaskSection = React.createClass({
    getInitialState: function () {
        return {
            tasks: [],
            totalCount: 0
        }
    },
    componentDidMount: function () {
        this.loadTasksFromServer();
    },
    loadTasksFromServerActive: function () {
        var currentUrl=this.props.url+"active/";

        $.ajax({
            url: currentUrl,
            success: function (data) {
                this.setState({tasks: data.tasks});
                this.setState({totalCount: data.totalCount});
            }.bind(this)
        });
    },
    loadTasksFromServerArchive: function () {
        var currentUrl=this.props.url+"archive/";

        $.ajax({
            url: currentUrl,
            success: function (data) {
                this.setState({tasks: data.tasks});
                this.setState({totalCount: data.totalCount});
            }.bind(this)
        });
    },
    loadTasksFromServer: function () {
        var currentUrl=this.props.url+"all/";

        $.ajax({
            url: currentUrl,
            success: function (data) {
                this.setState({tasks: data.tasks});
                this.setState({totalCount: data.totalCount});
            }.bind(this)
        });
    },
    handleTaskAdd: function (newTask) {
        
        var newTasks = this.state.tasks.slice();
        newTasks.unshift(newTask);
        this.setState({ tasks: newTasks})
        
        $.ajax({
            url: "create",
            type: "GET",
            data: newTask, //
            success: function (data) {
            }.bind(this)
        });
    },
    handlerTaskDelete: function (task) {
        var taskId = task.id
        var newTasks = this.state.tasks.filter(function(task){
            return task.id!==taskId
        })
        this.setState({tasks: newTasks})
        
        $.ajax({
            url: "delete",
            type: "GET",
            data: task, //
            success: function (data) {
            }.bind(this)
        });
    },
    handlerTaskUpdate: function (task) {
        task.condition=(task.condition=="active")?("archive"):("active")
       
        $.ajax({
            url: "update",
            type: "GET",
            data: task, //
            success: function (data) {
            }.bind(this)
        });
    },
    render: function () {
        return (
            < section className = "todoapp" >
                <div>
                    < TaskAppend onTaskAdd={this.handleTaskAdd}/ >
                    < section className = "main" >
                        < input className = "toggle-all" type = "checkbox" / >
                        
                        < TaskList tasks = {this.state.tasks} 
                                    onTaskDelete={this.handlerTaskDelete}
                                    onTaskUpdate={this.handlerTaskUpdate} / >
                         
                    < /section>
                    < footer className = "footer" >
                        < span className = "todo-count" >
                            < strong > {this.state.totalCount} < /strong>
                            < span > < /span>
                            < span > items < /span>
                            < span > count < /span>
                        < /span>
                        < ul className = "filters" >
                            < li >
                                < a href = "#/" onClick={this.loadTasksFromServer}   > All < /a>
                            < /li>
                            < span > < /span>
                            < li >
                                < a href = "#/active" onClick={this.loadTasksFromServerActive}   > Active < /a>
                            < /li>
                            < span > < /span>
                            < li >
                                < a href = "#/completed" onClick={this.loadTasksFromServerArchive}   > Completed < /a>
                            < /li>
                        < /ul>
//                      < button className = "clear-completed" > Clear completed < /button>
                    < /footer>
                </div>
            < /section>
                );
    }
});

var TaskList = React.createClass({
    
    render: function () {
        var onTaskDelete=this.props.onTaskDelete;
        var onTaskUpdate=this.props.onTaskUpdate;
        
        var taskNodes = this.props.tasks.map(function (task) {
            return (
                < TaskBox id = {task.id} 
                    onDelete={onTaskDelete.bind(null,task)} 
                    onUpdate={onTaskUpdate.bind(null,task)} 
                    title = {task.title} 
                    condition = {task.condition} 
                    key = {task.id} > {task.title} < /TaskBox>
                    );
        });

        return (
                < ul className = "todo-list" >
                    {taskNodes}
                < /ul>



                );
    }
});

var TaskAppend = React.createClass({
    getInitialState: function () {
        return {valuetext: ""};
    },
    handleClick: function () {
        var newTask={
            title: this.state.valuetext,
            id: Date.now(),
            condition: "active"
        }
        
        this.props.onTaskAdd(newTask)
        
        this.setState({valuetext: ""});
        //this.setState({taskname: this.refs.valuetext.value});
 

        
    },
    
    handleTextChange: function (event) {
        this.setState({valuetext: event.target.value});
    },
    
    render: function () {
        return (
                < header className = "header"> < h1 className = "tasks-header" > Tasks < /h1>
                < button  className = "add-button  btn btn-primary" onClick = {this.handleClick}   > Добавить < /button >
                < input className = "new-todo" ref = "valuetext"  placeholder = "Tasks to add..."
                    onChange={this.handleTextChange}
                    value = {this.state.valuetext} / >
                < /header>
                );
    }
});
 

var TaskBox = React.createClass({
    getInitialState: function () {
        return{
            conditionclass: (this.props.condition=="active")?(""):("completed")
        }
    },
    setCondition: function () {
        if(this.state.conditionclass == "completed")
        {
            this.state.conditionclass ="";
            this.setState({conditionclass: "" })
        }else{
            this.state.conditionclass ="completed";
            this.setState({conditionclass: "completed" })
        }
        this.props.onUpdate();
    },
    render: function () {
         
        return (
                < li className = {this.state.conditionclass} >
                    < div className = "view" id = {this.props.id} >
                        < input onClick = {this.setCondition} className = "toggle" type = "checkbox" / >
                        < label > {this.props.title} < /label>
                        < button className = "destroy" onClick={this.props.onDelete} > < /button>
                    < /div>
                    < input className = "edit" value = {this.props.title} / >
                < /li>
                );
    }
});

window.TaskSection = TaskSection;
