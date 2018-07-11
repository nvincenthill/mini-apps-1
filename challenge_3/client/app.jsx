class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "Hello world!"
    };
  }
  render() {
    return (
      <div>
        <h1>Checkout App</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
