var TaskSection = React.createClass({
    getInitialState: function() {
        return {
            tasks: []
        }
    },

    componentDidMount: function() {
        this.loadTasksFromServer();
        setInterval(this.loadTasksFromServer, 2000);
    },

    loadTasksFromServer: function() {
        $.ajax({
            url: this.props.url,
            success: function (data) {
                this.setState({tasks: data.tasks});
            }.bind(this)
        });
    },

    render: function() {
        return (
            <div>
                <div className="tasks-container">
                    <h2 className="tasks-header">Tasks</h2>
                    <div><i className="fa fa-plus plus-btn"></i></div>
                </div>
                <TaskList tasks={this.state.tasks} />
            </div>
        );
    }
});

var TaskList = React.createClass({
    render: function() {
        var taskNodes = this.props.tasks.map(function(task) {
            return (
                <TaskBox username={task.username} avatarUri={task.avatarUri} date={task.date} key={task.id}>{task.task}</TaskBox>
            );
        });

        return (
            <section id="cd-timeline">
                {taskNodes}
            </section>
        );
    }
});

var TaskBox = React.createClass({
    render: function() {
        return (
            <div className="cd-timeline-block">
                <div className="cd-timeline-img">
                    <img src={this.props.avatarUri} className="img-circle" alt="Leanna!" />
                </div>
                <div className="cd-timeline-content">
                    <h2><a href="#">{this.props.username}</a></h2>
                    <p>{this.props.children}</p>
                    <span className="cd-date">{this.props.date}</span>
                </div>
            </div>
        );
    }
});

window.TaskSection = TaskSection;
