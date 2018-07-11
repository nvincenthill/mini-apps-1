class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      addressLineOne: "",
      addressLineTwo: "",
      city: "",
      state: "",
      zip: "",
      ccn: "",
      expDate: "",
      cvv: "",
      billingZip: ""
    };
  }

  handleCheckout() {
    alert("checking out!");
  }

  render() {
    return (
      <div className="app">
        {/* <h1 className="title">Checkout App</h1> */}
        <div>
          <button id="checkout-button" onClick={() => this.handleCheckout()}>
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
