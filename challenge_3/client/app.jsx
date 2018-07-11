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
      billingZip: "",
      formDisplayed: 0
    };
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleNextButton() {
    let form = this.state.formDisplayed;
    this.setState({ formDisplayed: form + 1 });

    // save data to server/db
    //TODO: Add node ENV variables
    this.postData(`http://localhost:3000`, this.state);
  }

  beginCheckout() {
    this.handleNextButton();
  }

  handlePurchase() {
    alert("purchase complete");
    this.setState({ formDisplayed: 0 });
  }

  handleInput(e, property) {
    this.setState({ [property]: e.target.value });
  }

  postData(url = ``, data = {}) {
    console.log("posting data");
    // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: data // body data type must match "Content-Type" header
    })
      .then(response => {
        // console.log(response.text());
        return response.json();
      }) // parses response to JSON
      .catch(error => console.error(`Fetch Error :\n`, error));
  }

  render() {
    const checkoutButton = (
      <button id="checkout-button" onClick={() => this.beginCheckout()}>
        check me out
      </button>
    );
    return (
      <div className="app">
        {/* <h1 className="title">Checkout App</h1> */}

        {this.state.formDisplayed === 0 ? checkoutButton : null}

        {this.state.formDisplayed === 1 ? (
          <FormOne
            handleNextButton={this.handleNextButton}
            handleInput={this.handleInput}
            name={this.props.name}
          />
        ) : null}
        {this.state.formDisplayed === 2 ? (
          <FormTwo
            handleNextButton={this.handleNextButton}
            handleInput={this.handleInput}
          />
        ) : null}
        {this.state.formDisplayed === 3 ? (
          <FormThree
            handleNextButton={this.handleNextButton}
            handleInput={this.handleInput}
            handlePurchase={this.handlePurchase}
          />
        ) : null}
      </div>
    );
  }
}

class FormOne extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form">
        <h2 className="form-title">1 / 3</h2>
        <div className="input-container">
          <h3 className="address-title">Account Information</h3>
          <p className="form-subtitle">Name</p>
          <input
            type="text"
            id="myinput"
            placeholder="Micky"
            value={this.props.name}
            onChange={e => this.props.handleInput(e, "name")}
          />
          <p className="form-subtitle">Email</p>
          <input
            type="text"
            id="myinput"
            placeholder="mouse@gmail.com"
            value={this.props.email}
            onChange={e => this.props.handleInput(e, "email")}
          />
          <p className="form-subtitle">Password</p>
          <input
            type="text"
            id="myinput"
            placeholder="iliekcheese"
            value={this.props.password}
            onChange={e => this.props.handleInput(e, "password")}
          />
        </div>
        <NextButton handleNextButton={this.props.handleNextButton} />
      </div>
    );
  }
}

class FormTwo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form">
        <h2 className="form-title">2 / 3</h2>
        <div className="input-container">
          <h3 className="address-title">Address</h3>

          <p className="form-subtitle">Line 1</p>
          <input
            type="text"
            id="myinput"
            placeholder="5225 NW Belhaven Dr."
            value={this.props.addressLineOne}
            onChange={e => this.props.handleInput(e, "addressLineOne")}
          />
          <p className="form-subtitle">Line 2</p>
          <input
            type="text"
            id="myinput"
            placeholder="PO #1"
            value={this.props.addressLineTwo}
            onChange={e => this.props.handleInput(e, "addressLineTwo")}
          />
          <p className="form-subtitle">City</p>
          <input
            type="text"
            id="myinput"
            placeholder="Corvaliis"
            value={this.props.city}
            onChange={e => this.props.handleInput(e, "city")}
          />
          <p className="form-subtitle">State</p>
          <input
            type="text"
            id="myinput"
            placeholder="OR"
            value={this.props.state}
            onChange={e => this.props.handleInput(e, "state")}
          />
          <p className="form-subtitle">Zip Code</p>
          <input
            type="text"
            id="myinput"
            placeholder="97330"
            value={this.props.zip}
            onChange={e => this.props.handleInput(e, "zip")}
          />
        </div>
        <NextButton handleNextButton={this.props.handleNextButton} />
      </div>
    );
  }
}

class FormThree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form">
        <h2 className="form-title">3 / 3</h2>

        <div className="input-container">
          <h3 className="address-title">Payment Information</h3>
          <p className="form-subtitle">CCN#</p>
          <input
            type="text"
            id="myinput"
            placeholder="0000-0000-0000-0000"
            value={this.props.ccn}
            onChange={e => this.props.handleInput(e, "ccn")}
          />
          <p className="form-subtitle">CVV</p>
          <input
            type="text"
            id="myinput"
            placeholder="123"
            value={this.props.cvv}
            onChange={e => this.props.handleInput(e, "cvv")}
          />
          <p className="form-subtitle">Billing Zip Code</p>
          <input
            type="text"
            id="myinput"
            placeholder="97330"
            value={this.props.billingZip}
            onChange={e => this.props.handleInput(e, "billingZip")}
          />
        </div>
        <PurchaseButton handlePurchase={this.props.handlePurchase} />
      </div>
    );
  }
}

class NextButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="next-button-container">
        <button id="next-button" onClick={() => this.props.handleNextButton()}>
          ➞
        </button>
      </div>
    );
  }
}

class PurchaseButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="purchase-button-container">
        <button
          id="purchase-button"
          onClick={() => this.props.handlePurchase()}
        >
          submit
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
