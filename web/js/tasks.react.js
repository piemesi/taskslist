var TaskSection = React.createClass({
    getInitialState: function () {
        return {
            tasks: []
        }
    },
    componentDidMount: function () {
        this.loadTasksFromServer();
        this.loadTasksFromServer;
//        setInterval(this.loadTasksFromServer, 12000);
    },
    loadTasksFromServer: function () {
        $.ajax({
            url: this.props.url,
            success: function (data) {
                this.setState({tasks: data.tasks});
            }.bind(this)
        });
    },
    render: function () {
        return (
                < div >
                < div className = "tasks-container" >
                < TaskHeader / >
                < /div>
                < TaskList tasks = {this.state.tasks} / >
                < /div>
                );
    }
});

var TaskList = React.createClass({
    render: function () {
        var taskNodes = this.props.tasks.map(function (task) {
            return (
                    < TaskBox id = {task.id} title = {task.title} condition = {task.condition} key = {task.id} > {task.title} < /TaskBox>
                    );
        });

        return (
                < section id = "cd-timeline" >
        {taskNodes}
        < /section>
                );
    }
});

var TaskHeader = React.createClass({
    getInitialState: function () {
        return {taskname: ""};
    },
    handleClick: function () {
        this.setState({taskname: this.refs.valuetext.value});

        // сообщаем ServiceChooser, вызывая метод addTotal
        //this.props.addTotal( active ? this.props.price : -this.props.price );


        $.ajax({
            url: "create",
            type: "GET",
            data: {title: this.refs.valuetext.value},
            success: function (data) {
                console.log(data)
                this.loadTasksFromServer;
                //this.setState({tasks: data.tasks});
            }.bind(this)
        });
    },
    render: function () {
        return (
                < header > < h2 className = "tasks-header" > Tasks < /h2>
                < div onClick = {this.handleClick} > < i className = "fa fa-plus plus-btn" > Добавить < /i></div >
                < input className = "new-todo" ref = "valuetext"  placeholder = "Tasks to add..." value = {this.props.valuetext} / >
                < /header>
                );
    }
});
//<InputTag ref="valuetext"   />


var InputTag = React.createClass({
//    getInitialState: function() {
//        this.state = {
//       value: null,
//      };
//    },

//    constructor() {
//     //super();
//      this.state = {
//       value: null,
//      };
//    },
    render: function () {
        return (
                < input className = "new-todo" placeholder = "Tasks to add..." value = {this.props.value} / >
                );
    }
});

var TaskBox = React.createClass({
    render: function () {
        return (
                < div className = "cd-timeline-block" >
                < div className = "cd-timeline-img" >
        {this.props.id}
        < /div>
                < div className = "cd-timeline-content" >
                < h2 > < a href = "#" > {this.props.title} < /a></h2 >
                < span className = "cd-date" > {this.props.condition} < /span>
                < /div>
                < /div>
                );
    }
});

window.TaskSection = TaskSection;
