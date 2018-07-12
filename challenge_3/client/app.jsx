// TODO: Validation
// Don't allow the user to proceed until all the required fields are filled in. Address line 2 should be optional. Be sure to display appropriate error messages to the user, so they know why they are not allowed to proceed.
// Validate the form fields. Don't allow the user to proceed to the next step and do not save the data until the fields are valid. Validation means that you must prevent the user from entering haha as the email address -- the email address have a valid data-shape. You'll have to decide which fields deserve validation and which do not. Be sure to display appropriate error messages to the user, so they know why they are not allowed to proceed.

// TODO: Add local storage
// If the window is closed and reopened, the checkout process should continue at the same step the user was on when the window was closed (it's ok if the fields on the "current" step are blank when the window is reopened). The app should continue to put the remaining data into the same record it was using before the window was closed. Once Purchase is clicked, it should not be possible to continue.

// TODO: Implement unit tests

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
      formDisplayed: 0,
      isOkayToProceed: true
    };
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleBackButton() {
    let form = this.state.formDisplayed;
    this.setState({ formDisplayed: form - 1 });
  }

  handleNextButton() {
    let form = this.state.formDisplayed;
    this.setState({ formDisplayed: form + 1 });

    //TODO: Add node ENV variables
    this.postData(`http://localhost:3000`, JSON.stringify(this.state));
  }

  beginCheckout() {
    this.handleNextButton();
  }

  handlePurchase() {
    this.setState({ formDisplayed: 0 });

    //TODO: Add node ENV variables
    this.postData(`http://localhost:3000/purchase`, JSON.stringify(this.state));
  }

  handleInput(e, property) {
    this.setState({ [property]: e.target.value });
  }

  postData(url = ``, data = { hello: "world" }) {
    // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json"
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
            handleBackButton={this.handleBackButton}
            handleNextButton={this.handleNextButton}
            handleInput={this.handleInput}
            name={this.props.name}
          />
        ) : null}
        {this.state.formDisplayed === 2 ? (
          <FormTwo
            handleBackButton={this.handleBackButton}
            handleNextButton={this.handleNextButton}
            handleInput={this.handleInput}
          />
        ) : null}
        {this.state.formDisplayed === 3 ? (
          <FormThree
            formDisplayed={this.state.formDisplayed}
            handleBackButton={this.handleBackButton}
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
        <NavButtons
          handleNextButton={this.props.handleNextButton}
          handleBackButton={this.props.handleBackButton}
        />
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
            placeholder="ilikecheese"
            value={this.props.password}
            onChange={e => this.props.handleInput(e, "password")}
          />
        </div>
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
        <NavButtons
          handleNextButton={this.props.handleNextButton}
          handleBackButton={this.props.handleBackButton}
        />
        <h2 className="form-title">2 / 3</h2>
        <div className="input-container">
          <h3 className="address-title">Address Information</h3>

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
            placeholder="Corvallis"
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
        <NavButtons
          formDisplayed={this.props.formDisplayed}
          handleNextButton={this.props.handleNextButton}
          handleBackButton={this.props.handleBackButton}
        />
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

class NavButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const backButton = (
      <button id="back-button" onClick={() => this.props.handleBackButton()}>
        ◀
      </button>
    );
    const forwardButton = (
      <button id="next-button" onClick={() => this.props.handleNextButton()}>
        ▶
      </button>
    );
    const blankButton = <button id="blank-button">▶</button>;
    return (
      <div className="next-button-container">
        {backButton}
        {this.props.formDisplayed === 3 ? blankButton : forwardButton}
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
          Submit
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
