import { Component } from "react";

class Student extends Component {
  constructor(props) {
    super(props);
    this.classProperty = "some prop value";

    this.state = {
      studentNum: props.studentNum,
      firstName: props.firstName,
    };

    this.showMessage = this.showMessage.bind(this);
  }

  showMessage() {
    alert("Welcome to the website" + this.state.firstName);
  }

  incrementEventHandler = () => {
    this.classProperty =
      this.classProperty + ". The rest of the vaule string.";
    console.log(this.classProperty);
    this.setState({ studentNum: this.state.studentNum + 1 });
  };

  eventHandler = (event) => {
    console.log(event);
    console.log(event.target.name + " : " + event.target.value);
  };

  readName = (event) => {
    this.setState({ firstName: event.target.value });
  };

  render() {
    return (
      <article>
        <h2>Student Component</h2>
        <p>ClassProperty: {this.classProperty}</p>
        <p>Student Number: {this.state.studentNum}</p>
        <p>Whole state object {JSON.stringify(this.state)}</p>

        <input name="firstName" onChange={this.readName} />
        <br />
        <button onClick={this.incrementEventHandler}>Add</button>
        <button
          name="btnEvent"
          value="Event"
          onClick={(event) => this.eventHandler(event)}
        >
          Show Event
        </button>
        <button onClick={this.showMessage}>Click Me</button>
      </article>
    );
  }

  componentDidMount() {
    console.log("Student component mounted");
  }

  shouldComponentUpdate(newProps, newState) {
    console.log("The component should update to : " + JSON.stringify(newState));
    return true;
  }

  componentDidUpdate() {
    console.log("Student component updated");
  }

  componentWillUnmount() {
    console.log("Student component unmounted");
  }
}

export default Student;