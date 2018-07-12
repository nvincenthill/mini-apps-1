// TODO

// Don't allow the user to proceed until all the required fields are filled in. Address line 2 should be optional. Be sure to display appropriate error messages to the user, so they know why they are not allowed to proceed.

// Validate the form fields. Don't allow the user to proceed to the next step and do not save the data until the fields are valid. Validation means that you must prevent the user from entering haha as the email address -- the email address have a valid data-shape. You'll have to decide which fields deserve validation and which do not. Be sure to display appropriate error messages to the user, so they know why they are not allowed to proceed.

// If the window is closed and reopened, the checkout process should continue at the same step the user was on when the window was closed (it's ok if the fields on the "current" step are blank when the window is reopened). The app should continue to put the remaining data into the same record it was using before the window was closed. Once Purchase is clicked, it should not be possible to continue.

// Allow the user to move back and forward through the checkout process.

// When the user reaches the confirmation page, let the user edit any prior step. After editing fields in that step, the user should be returned to the confirmation page.

// Write tests and use Nighwatch.js to confirm your entire checkout flow is working correctly.

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
    this.postData(`http://localhost:3000`, JSON.stringify(this.state));
  }

  beginCheckout() {
    this.handleNextButton();
  }

  handlePurchase() {
    alert("purchase complete");
    this.setState({ formDisplayed: 0 });
    this.postData(`http://localhost:3000/purchase`, JSON.stringify(this.state));
  }

  handleInput(e, property) {
    this.setState({ [property]: e.target.value });
  }

  postData(url = ``, data = { hello: "world" }) {
    console.log("posting data", data);
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
    }).then(response => {
      // console.log(response.text());
      return response.json();
    }) // parses response to JSON
    .catch(error => console.error(`Fetch Error :\n`, error));
  }

  render() {
    const checkoutButton = React.createElement(
      "button",
      { id: "checkout-button", onClick: () => this.beginCheckout() },
      "check me out"
    );
    return React.createElement(
      "div",
      { className: "app" },
      this.state.formDisplayed === 0 ? checkoutButton : null,
      this.state.formDisplayed === 1 ? React.createElement(FormOne, {
        handleNextButton: this.handleNextButton,
        handleInput: this.handleInput,
        name: this.props.name
      }) : null,
      this.state.formDisplayed === 2 ? React.createElement(FormTwo, {
        handleNextButton: this.handleNextButton,
        handleInput: this.handleInput
      }) : null,
      this.state.formDisplayed === 3 ? React.createElement(FormThree, {
        handleNextButton: this.handleNextButton,
        handleInput: this.handleInput,
        handlePurchase: this.handlePurchase
      }) : null
    );
  }
}

class FormOne extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "div",
      { className: "form" },
      React.createElement(
        "h2",
        { className: "form-title" },
        "1 / 3"
      ),
      React.createElement(
        "div",
        { className: "input-container" },
        React.createElement(
          "h3",
          { className: "address-title" },
          "Account Information"
        ),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "Name"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "Micky",
          value: this.props.name,
          onChange: e => this.props.handleInput(e, "name")
        }),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "Email"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "mouse@gmail.com",
          value: this.props.email,
          onChange: e => this.props.handleInput(e, "email")
        }),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "Password"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "iliekcheese",
          value: this.props.password,
          onChange: e => this.props.handleInput(e, "password")
        })
      ),
      React.createElement(NextButton, { handleNextButton: this.props.handleNextButton })
    );
  }
}

class FormTwo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "div",
      { className: "form" },
      React.createElement(
        "h2",
        { className: "form-title" },
        "2 / 3"
      ),
      React.createElement(
        "div",
        { className: "input-container" },
        React.createElement(
          "h3",
          { className: "address-title" },
          "Address"
        ),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "Line 1"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "5225 NW Belhaven Dr.",
          value: this.props.addressLineOne,
          onChange: e => this.props.handleInput(e, "addressLineOne")
        }),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "Line 2"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "PO #1",
          value: this.props.addressLineTwo,
          onChange: e => this.props.handleInput(e, "addressLineTwo")
        }),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "City"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "Corvallis",
          value: this.props.city,
          onChange: e => this.props.handleInput(e, "city")
        }),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "State"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "OR",
          value: this.props.state,
          onChange: e => this.props.handleInput(e, "state")
        }),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "Zip Code"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "97330",
          value: this.props.zip,
          onChange: e => this.props.handleInput(e, "zip")
        })
      ),
      React.createElement(NextButton, { handleNextButton: this.props.handleNextButton })
    );
  }
}

class FormThree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "div",
      { className: "form" },
      React.createElement(
        "h2",
        { className: "form-title" },
        "3 / 3"
      ),
      React.createElement(
        "div",
        { className: "input-container" },
        React.createElement(
          "h3",
          { className: "address-title" },
          "Payment Information"
        ),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "CCN#"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "0000-0000-0000-0000",
          value: this.props.ccn,
          onChange: e => this.props.handleInput(e, "ccn")
        }),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "CVV"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "123",
          value: this.props.cvv,
          onChange: e => this.props.handleInput(e, "cvv")
        }),
        React.createElement(
          "p",
          { className: "form-subtitle" },
          "Billing Zip Code"
        ),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "97330",
          value: this.props.billingZip,
          onChange: e => this.props.handleInput(e, "billingZip")
        })
      ),
      React.createElement(PurchaseButton, { handlePurchase: this.props.handlePurchase })
    );
  }
}

class NextButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "div",
      { className: "next-button-container" },
      React.createElement(
        "button",
        { id: "next-button", onClick: () => this.props.handleNextButton() },
        "\u279E"
      )
    );
  }
}

class PurchaseButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "div",
      { className: "purchase-button-container" },
      React.createElement(
        "button",
        {
          id: "purchase-button",
          onClick: () => this.props.handlePurchase()
        },
        "submit"
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwibmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJhZGRyZXNzTGluZU9uZSIsImFkZHJlc3NMaW5lVHdvIiwiY2l0eSIsInppcCIsImNjbiIsImV4cERhdGUiLCJjdnYiLCJiaWxsaW5nWmlwIiwiZm9ybURpc3BsYXllZCIsImhhbmRsZU5leHRCdXR0b24iLCJiaW5kIiwiaGFuZGxlUHVyY2hhc2UiLCJoYW5kbGVJbnB1dCIsImZvcm0iLCJzZXRTdGF0ZSIsInBvc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImJlZ2luQ2hlY2tvdXQiLCJhbGVydCIsImUiLCJwcm9wZXJ0eSIsInRhcmdldCIsInZhbHVlIiwidXJsIiwiZGF0YSIsImhlbGxvIiwiY29uc29sZSIsImxvZyIsImZldGNoIiwibWV0aG9kIiwibW9kZSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwicmVkaXJlY3QiLCJyZWZlcnJlciIsImJvZHkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJlcnJvciIsInJlbmRlciIsImNoZWNrb3V0QnV0dG9uIiwiRm9ybU9uZSIsIkZvcm1Ud28iLCJGb3JtVGhyZWUiLCJOZXh0QnV0dG9uIiwiUHVyY2hhc2VCdXR0b24iLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLE1BQU1BLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsWUFBTSxFQURLO0FBRVhDLGFBQU8sRUFGSTtBQUdYQyxnQkFBVSxFQUhDO0FBSVhD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QXlDO0FBQ3ZDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDRDs7QUFFRGdELFdBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsdUJBQWY7QUFDRTtBQUFBO0FBQUEsVUFBUSxJQUFHLGFBQVgsRUFBeUIsU0FBUyxNQUFNLEtBQUtoRCxLQUFMLENBQVdjLGdCQUFYLEVBQXhDO0FBQUE7QUFBQTtBQURGLEtBREY7QUFPRDtBQWJzQzs7QUFnQnpDLE1BQU13QyxjQUFOLFNBQTZCekQsTUFBTUMsU0FBbkMsQ0FBNkM7QUFDM0NDLGNBQVlDLEtBQVosRUFBbUI7QUFDakIsVUFBTUEsS0FBTjtBQUNEOztBQUVEZ0QsV0FBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSwyQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUNFLGNBQUcsaUJBREw7QUFFRSxtQkFBUyxNQUFNLEtBQUtoRCxLQUFMLENBQVdnQixjQUFYO0FBRmpCO0FBQUE7QUFBQTtBQURGLEtBREY7QUFVRDtBQWhCMEM7O0FBbUI3Q3VDLFNBQVNQLE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUF5QlEsU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUF6QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPXG5cbi8vIERvbid0IGFsbG93IHRoZSB1c2VyIHRvIHByb2NlZWQgdW50aWwgYWxsIHRoZSByZXF1aXJlZCBmaWVsZHMgYXJlIGZpbGxlZCBpbi4gQWRkcmVzcyBsaW5lIDIgc2hvdWxkIGJlIG9wdGlvbmFsLiBCZSBzdXJlIHRvIGRpc3BsYXkgYXBwcm9wcmlhdGUgZXJyb3IgbWVzc2FnZXMgdG8gdGhlIHVzZXIsIHNvIHRoZXkga25vdyB3aHkgdGhleSBhcmUgbm90IGFsbG93ZWQgdG8gcHJvY2VlZC5cblxuLy8gVmFsaWRhdGUgdGhlIGZvcm0gZmllbGRzLiBEb24ndCBhbGxvdyB0aGUgdXNlciB0byBwcm9jZWVkIHRvIHRoZSBuZXh0IHN0ZXAgYW5kIGRvIG5vdCBzYXZlIHRoZSBkYXRhIHVudGlsIHRoZSBmaWVsZHMgYXJlIHZhbGlkLiBWYWxpZGF0aW9uIG1lYW5zIHRoYXQgeW91IG11c3QgcHJldmVudCB0aGUgdXNlciBmcm9tIGVudGVyaW5nIGhhaGEgYXMgdGhlIGVtYWlsIGFkZHJlc3MgLS0gdGhlIGVtYWlsIGFkZHJlc3MgaGF2ZSBhIHZhbGlkIGRhdGEtc2hhcGUuIFlvdSdsbCBoYXZlIHRvIGRlY2lkZSB3aGljaCBmaWVsZHMgZGVzZXJ2ZSB2YWxpZGF0aW9uIGFuZCB3aGljaCBkbyBub3QuIEJlIHN1cmUgdG8gZGlzcGxheSBhcHByb3ByaWF0ZSBlcnJvciBtZXNzYWdlcyB0byB0aGUgdXNlciwgc28gdGhleSBrbm93IHdoeSB0aGV5IGFyZSBub3QgYWxsb3dlZCB0byBwcm9jZWVkLlxuXG4vLyBJZiB0aGUgd2luZG93IGlzIGNsb3NlZCBhbmQgcmVvcGVuZWQsIHRoZSBjaGVja291dCBwcm9jZXNzIHNob3VsZCBjb250aW51ZSBhdCB0aGUgc2FtZSBzdGVwIHRoZSB1c2VyIHdhcyBvbiB3aGVuIHRoZSB3aW5kb3cgd2FzIGNsb3NlZCAoaXQncyBvayBpZiB0aGUgZmllbGRzIG9uIHRoZSBcImN1cnJlbnRcIiBzdGVwIGFyZSBibGFuayB3aGVuIHRoZSB3aW5kb3cgaXMgcmVvcGVuZWQpLiBUaGUgYXBwIHNob3VsZCBjb250aW51ZSB0byBwdXQgdGhlIHJlbWFpbmluZyBkYXRhIGludG8gdGhlIHNhbWUgcmVjb3JkIGl0IHdhcyB1c2luZyBiZWZvcmUgdGhlIHdpbmRvdyB3YXMgY2xvc2VkLiBPbmNlIFB1cmNoYXNlIGlzIGNsaWNrZWQsIGl0IHNob3VsZCBub3QgYmUgcG9zc2libGUgdG8gY29udGludWUuXG5cbi8vIEFsbG93IHRoZSB1c2VyIHRvIG1vdmUgYmFjayBhbmQgZm9yd2FyZCB0aHJvdWdoIHRoZSBjaGVja291dCBwcm9jZXNzLlxuXG4vLyBXaGVuIHRoZSB1c2VyIHJlYWNoZXMgdGhlIGNvbmZpcm1hdGlvbiBwYWdlLCBsZXQgdGhlIHVzZXIgZWRpdCBhbnkgcHJpb3Igc3RlcC4gQWZ0ZXIgZWRpdGluZyBmaWVsZHMgaW4gdGhhdCBzdGVwLCB0aGUgdXNlciBzaG91bGQgYmUgcmV0dXJuZWQgdG8gdGhlIGNvbmZpcm1hdGlvbiBwYWdlLlxuXG4vLyBXcml0ZSB0ZXN0cyBhbmQgdXNlIE5pZ2h3YXRjaC5qcyB0byBjb25maXJtIHlvdXIgZW50aXJlIGNoZWNrb3V0IGZsb3cgaXMgd29ya2luZyBjb3JyZWN0bHkuXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYW1lOiBcIlwiLFxuICAgICAgZW1haWw6IFwiXCIsXG4gICAgICBwYXNzd29yZDogXCJcIixcbiAgICAgIGFkZHJlc3NMaW5lT25lOiBcIlwiLFxuICAgICAgYWRkcmVzc0xpbmVUd286IFwiXCIsXG4gICAgICBjaXR5OiBcIlwiLFxuICAgICAgc3RhdGU6IFwiXCIsXG4gICAgICB6aXA6IFwiXCIsXG4gICAgICBjY246IFwiXCIsXG4gICAgICBleHBEYXRlOiBcIlwiLFxuICAgICAgY3Z2OiBcIlwiLFxuICAgICAgYmlsbGluZ1ppcDogXCJcIixcbiAgICAgIGZvcm1EaXNwbGF5ZWQ6IDBcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlTmV4dEJ1dHRvbiA9IHRoaXMuaGFuZGxlTmV4dEJ1dHRvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUHVyY2hhc2UgPSB0aGlzLmhhbmRsZVB1cmNoYXNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZU5leHRCdXR0b24oKSB7XG4gICAgbGV0IGZvcm0gPSB0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvcm1EaXNwbGF5ZWQ6IGZvcm0gKyAxIH0pO1xuXG4gICAgLy8gc2F2ZSBkYXRhIHRvIHNlcnZlci9kYlxuICAgIC8vVE9ETzogQWRkIG5vZGUgRU5WIHZhcmlhYmxlc1xuICAgIHRoaXMucG9zdERhdGEoYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMGAsIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKTtcbiAgfVxuXG4gIGJlZ2luQ2hlY2tvdXQoKSB7XG4gICAgdGhpcy5oYW5kbGVOZXh0QnV0dG9uKCk7XG4gIH1cblxuICBoYW5kbGVQdXJjaGFzZSgpIHtcbiAgICBhbGVydChcInB1cmNoYXNlIGNvbXBsZXRlXCIpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBmb3JtRGlzcGxheWVkOiAwIH0pO1xuICAgIHRoaXMucG9zdERhdGEoYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wdXJjaGFzZWAsIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKTtcbiAgfVxuXG4gIGhhbmRsZUlucHV0KGUsIHByb3BlcnR5KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IFtwcm9wZXJ0eV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9XG5cbiAgcG9zdERhdGEodXJsID0gYGAsIGRhdGEgPSB7IGhlbGxvOiBcIndvcmxkXCIgfSkge1xuICAgIGNvbnNvbGUubG9nKFwicG9zdGluZyBkYXRhXCIsIGRhdGEpO1xuICAgIC8vIERlZmF1bHQgb3B0aW9ucyBhcmUgbWFya2VkIHdpdGggKlxuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgICBtb2RlOiBcImNvcnNcIiwgLy8gbm8tY29ycywgY29ycywgKnNhbWUtb3JpZ2luXG4gICAgICBjYWNoZTogXCJuby1jYWNoZVwiLCAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkXG4gICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLCAvLyBpbmNsdWRlLCBzYW1lLW9yaWdpbiwgKm9taXRcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgLy8gXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgIH0sXG4gICAgICByZWRpcmVjdDogXCJmb2xsb3dcIiwgLy8gbWFudWFsLCAqZm9sbG93LCBlcnJvclxuICAgICAgcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gbm8tcmVmZXJyZXIsICpjbGllbnRcbiAgICAgIGJvZHk6IGRhdGEgLy8gYm9keSBkYXRhIHR5cGUgbXVzdCBtYXRjaCBcIkNvbnRlbnQtVHlwZVwiIGhlYWRlclxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnRleHQoKSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KSAvLyBwYXJzZXMgcmVzcG9uc2UgdG8gSlNPTlxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoYEZldGNoIEVycm9yIDpcXG5gLCBlcnJvcikpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNoZWNrb3V0QnV0dG9uID0gKFxuICAgICAgPGJ1dHRvbiBpZD1cImNoZWNrb3V0LWJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHRoaXMuYmVnaW5DaGVja291dCgpfT5cbiAgICAgICAgY2hlY2sgbWUgb3V0XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcFwiPlxuICAgICAgICB7LyogPGgxIGNsYXNzTmFtZT1cInRpdGxlXCI+Q2hlY2tvdXQgQXBwPC9oMT4gKi99XG5cbiAgICAgICAge3RoaXMuc3RhdGUuZm9ybURpc3BsYXllZCA9PT0gMCA/IGNoZWNrb3V0QnV0dG9uIDogbnVsbH1cblxuICAgICAgICB7dGhpcy5zdGF0ZS5mb3JtRGlzcGxheWVkID09PSAxID8gKFxuICAgICAgICAgIDxGb3JtT25lXG4gICAgICAgICAgICBoYW5kbGVOZXh0QnV0dG9uPXt0aGlzLmhhbmRsZU5leHRCdXR0b259XG4gICAgICAgICAgICBoYW5kbGVJbnB1dD17dGhpcy5oYW5kbGVJbnB1dH1cbiAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge3RoaXMuc3RhdGUuZm9ybURpc3BsYXllZCA9PT0gMiA/IChcbiAgICAgICAgICA8Rm9ybVR3b1xuICAgICAgICAgICAgaGFuZGxlTmV4dEJ1dHRvbj17dGhpcy5oYW5kbGVOZXh0QnV0dG9ufVxuICAgICAgICAgICAgaGFuZGxlSW5wdXQ9e3RoaXMuaGFuZGxlSW5wdXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHt0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQgPT09IDMgPyAoXG4gICAgICAgICAgPEZvcm1UaHJlZVxuICAgICAgICAgICAgaGFuZGxlTmV4dEJ1dHRvbj17dGhpcy5oYW5kbGVOZXh0QnV0dG9ufVxuICAgICAgICAgICAgaGFuZGxlSW5wdXQ9e3RoaXMuaGFuZGxlSW5wdXR9XG4gICAgICAgICAgICBoYW5kbGVQdXJjaGFzZT17dGhpcy5oYW5kbGVQdXJjaGFzZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgRm9ybU9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvcm0tdGl0bGVcIj4xIC8gMzwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImFkZHJlc3MtdGl0bGVcIj5BY2NvdW50IEluZm9ybWF0aW9uPC9oMz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+TmFtZTwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk1pY2t5XCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwibmFtZVwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvcm0tc3VidGl0bGVcIj5FbWFpbDwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm1vdXNlQGdtYWlsLmNvbVwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5lbWFpbH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJlbWFpbFwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvcm0tc3VidGl0bGVcIj5QYXNzd29yZDwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cImlsaWVrY2hlZXNlXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnBhc3N3b3JkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcInBhc3N3b3JkXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8TmV4dEJ1dHRvbiBoYW5kbGVOZXh0QnV0dG9uPXt0aGlzLnByb3BzLmhhbmRsZU5leHRCdXR0b259IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIEZvcm1Ud28gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb3JtLXRpdGxlXCI+MiAvIDM8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJhZGRyZXNzLXRpdGxlXCI+QWRkcmVzczwvaDM+XG5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+TGluZSAxPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiNTIyNSBOVyBCZWxoYXZlbiBEci5cIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuYWRkcmVzc0xpbmVPbmV9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiYWRkcmVzc0xpbmVPbmVcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+TGluZSAyPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUE8gIzFcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuYWRkcmVzc0xpbmVUd299XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiYWRkcmVzc0xpbmVUd29cIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+Q2l0eTwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNvcnZhbGxpc1wiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jaXR5fVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcImNpdHlcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+U3RhdGU8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJPUlwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5zdGF0ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJzdGF0ZVwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvcm0tc3VidGl0bGVcIj5aaXAgQ29kZTwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjk3MzMwXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnppcH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJ6aXBcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxOZXh0QnV0dG9uIGhhbmRsZU5leHRCdXR0b249e3RoaXMucHJvcHMuaGFuZGxlTmV4dEJ1dHRvbn0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgRm9ybVRocmVlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9ybS10aXRsZVwiPjMgLyAzPC9oMj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJhZGRyZXNzLXRpdGxlXCI+UGF5bWVudCBJbmZvcm1hdGlvbjwvaDM+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkNDTiM8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIwMDAwLTAwMDAtMDAwMC0wMDAwXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmNjbn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJjY25cIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+Q1ZWPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMTIzXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmN2dn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJjdnZcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+QmlsbGluZyBaaXAgQ29kZTwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjk3MzMwXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmJpbGxpbmdaaXB9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiYmlsbGluZ1ppcFwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFB1cmNoYXNlQnV0dG9uIGhhbmRsZVB1cmNoYXNlPXt0aGlzLnByb3BzLmhhbmRsZVB1cmNoYXNlfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBOZXh0QnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV4dC1idXR0b24tY29udGFpbmVyXCI+XG4gICAgICAgIDxidXR0b24gaWQ9XCJuZXh0LWJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMuaGFuZGxlTmV4dEJ1dHRvbigpfT5cbiAgICAgICAgICDinp5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIFB1cmNoYXNlQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVyY2hhc2UtYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgaWQ9XCJwdXJjaGFzZS1idXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMuaGFuZGxlUHVyY2hhc2UoKX1cbiAgICAgICAgPlxuICAgICAgICAgIHN1Ym1pdFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSk7XG4iXX0=