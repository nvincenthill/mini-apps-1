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
        handleBackButton: this.handleBackButton,
        handleNextButton: this.handleNextButton,
        handleInput: this.handleInput,
        name: this.props.name
      }) : null,
      this.state.formDisplayed === 2 ? React.createElement(FormTwo, {
        handleBackButton: this.handleBackButton,
        handleNextButton: this.handleNextButton,
        handleInput: this.handleInput
      }) : null,
      this.state.formDisplayed === 3 ? React.createElement(FormThree, {
        formDisplayed: this.state.formDisplayed,
        handleBackButton: this.handleBackButton,
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
      React.createElement(NavButtons, {
        handleNextButton: this.props.handleNextButton,
        handleBackButton: this.props.handleBackButton
      }),
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
          placeholder: "ilikecheese",
          value: this.props.password,
          onChange: e => this.props.handleInput(e, "password")
        })
      )
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
      React.createElement(NavButtons, {
        handleNextButton: this.props.handleNextButton,
        handleBackButton: this.props.handleBackButton
      }),
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
          "Address Information"
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
      )
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
      React.createElement(NavButtons, {
        formDisplayed: this.props.formDisplayed,
        handleNextButton: this.props.handleNextButton,
        handleBackButton: this.props.handleBackButton
      }),
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

class NavButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const backButton = React.createElement(
      "button",
      { id: "back-button", onClick: () => this.props.handleBackButton() },
      "\u25C0"
    );
    const forwardButton = React.createElement(
      "button",
      { id: "next-button", onClick: () => this.props.handleNextButton() },
      "\u25B6"
    );
    const blankButton = React.createElement(
      "button",
      { id: "blank-button" },
      "\u25B6"
    );
    return React.createElement(
      "div",
      { className: "next-button-container" },
      backButton,
      this.props.formDisplayed === 3 ? blankButton : forwardButton
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
        "Submit"
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwibmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJhZGRyZXNzTGluZU9uZSIsImFkZHJlc3NMaW5lVHdvIiwiY2l0eSIsInppcCIsImNjbiIsImV4cERhdGUiLCJjdnYiLCJiaWxsaW5nWmlwIiwiZm9ybURpc3BsYXllZCIsImlzT2theVRvUHJvY2VlZCIsImhhbmRsZU5leHRCdXR0b24iLCJiaW5kIiwiaGFuZGxlQmFja0J1dHRvbiIsImhhbmRsZVB1cmNoYXNlIiwiaGFuZGxlSW5wdXQiLCJmb3JtIiwic2V0U3RhdGUiLCJwb3N0RGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJiZWdpbkNoZWNrb3V0IiwiZSIsInByb3BlcnR5IiwidGFyZ2V0IiwidmFsdWUiLCJ1cmwiLCJkYXRhIiwiaGVsbG8iLCJmZXRjaCIsIm1ldGhvZCIsIm1vZGUiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJib2R5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwicmVuZGVyIiwiY2hlY2tvdXRCdXR0b24iLCJGb3JtT25lIiwiRm9ybVR3byIsIkZvcm1UaHJlZSIsIk5hdkJ1dHRvbnMiLCJiYWNrQnV0dG9uIiwiZm9yd2FyZEJ1dHRvbiIsImJsYW5rQnV0dG9uIiwiUHVyY2hhc2VCdXR0b24iLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLE1BQU1BLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsWUFBTSxFQURLO0FBRVhDLGFBQU8sRUFGSTtBQUdYQyxnQkFBVSxFQUhDO0FBSVhDLHNCQUFnQixFQUpMO0FBS1hDLHNCQUFnQixFQUxMO0FBTVhDLFlBQU0sRUFOSztBQU9YTixhQUFPLEVBUEk7QUFRWE8sV0FBSyxFQVJNO0FBU1hDLFdBQUssRUFUTTtBQVVYQyxlQUFTLEVBVkU7QUFXWEMsV0FBSyxFQVhNO0FBWVhDLGtCQUFZLEVBWkQ7QUFhWEMscUJBQWUsQ0FiSjtBQWNYQyx1QkFBaUI7QUFkTixLQUFiO0FBZ0JBLFNBQUtDLGdCQUFMLEdBQXdCLEtBQUtBLGdCQUFMLENBQXNCQyxJQUF0QixDQUEyQixJQUEzQixDQUF4QjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLEtBQUtBLGdCQUFMLENBQXNCRCxJQUF0QixDQUEyQixJQUEzQixDQUF4QjtBQUNBLFNBQUtFLGNBQUwsR0FBc0IsS0FBS0EsY0FBTCxDQUFvQkYsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBdEI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CLEtBQUtBLFdBQUwsQ0FBaUJILElBQWpCLENBQXNCLElBQXRCLENBQW5CO0FBQ0Q7O0FBRURDLHFCQUFtQjtBQUNqQixRQUFJRyxPQUFPLEtBQUtuQixLQUFMLENBQVdZLGFBQXRCO0FBQ0EsU0FBS1EsUUFBTCxDQUFjLEVBQUVSLGVBQWVPLE9BQU8sQ0FBeEIsRUFBZDtBQUNEOztBQUVETCxxQkFBbUI7QUFDakIsUUFBSUssT0FBTyxLQUFLbkIsS0FBTCxDQUFXWSxhQUF0QjtBQUNBLFNBQUtRLFFBQUwsQ0FBYyxFQUFFUixlQUFlTyxPQUFPLENBQXhCLEVBQWQ7O0FBRUE7QUFDQSxTQUFLRSxRQUFMLENBQWUsdUJBQWYsRUFBdUNDLEtBQUtDLFNBQUwsQ0FBZSxLQUFLdkIsS0FBcEIsQ0FBdkM7QUFDRDs7QUFFRHdCLGtCQUFnQjtBQUNkLFNBQUtWLGdCQUFMO0FBQ0Q7O0FBRURHLG1CQUFpQjtBQUNmLFNBQUtHLFFBQUwsQ0FBYyxFQUFFUixlQUFlLENBQWpCLEVBQWQ7O0FBRUE7QUFDQSxTQUFLUyxRQUFMLENBQWUsZ0NBQWYsRUFBZ0RDLEtBQUtDLFNBQUwsQ0FBZSxLQUFLdkIsS0FBcEIsQ0FBaEQ7QUFDRDs7QUFFRGtCLGNBQVlPLENBQVosRUFBZUMsUUFBZixFQUF5QjtBQUN2QixTQUFLTixRQUFMLENBQWMsRUFBRSxDQUFDTSxRQUFELEdBQVlELEVBQUVFLE1BQUYsQ0FBU0MsS0FBdkIsRUFBZDtBQUNEOztBQUVEUCxXQUFTUSxNQUFPLEVBQWhCLEVBQW1CQyxPQUFPLEVBQUVDLE9BQU8sT0FBVCxFQUExQixFQUE4QztBQUM1QztBQUNBLFdBQU9DLE1BQU1ILEdBQU4sRUFBVztBQUNoQkksY0FBUSxNQURRLEVBQ0E7QUFDaEJDLFlBQU0sTUFGVSxFQUVGO0FBQ2RDLGFBQU8sVUFIUyxFQUdHO0FBQ25CQyxtQkFBYSxhQUpHLEVBSVk7QUFDNUJDLGVBQVM7QUFDUCx3QkFBZ0I7QUFDaEI7QUFGTyxPQUxPO0FBU2hCQyxnQkFBVSxRQVRNLEVBU0k7QUFDcEJDLGdCQUFVLGFBVk0sRUFVUztBQUN6QkMsWUFBTVYsSUFYVSxDQVdMO0FBWEssS0FBWCxFQWFKVyxJQWJJLENBYUNDLFlBQVk7QUFDaEI7QUFDQSxhQUFPQSxTQUFTQyxJQUFULEVBQVA7QUFDRCxLQWhCSSxFQWdCRjtBQWhCRSxLQWlCSkMsS0FqQkksQ0FpQkVDLFNBQVNDLFFBQVFELEtBQVIsQ0FBZSxpQkFBZixFQUFpQ0EsS0FBakMsQ0FqQlgsQ0FBUDtBQWtCRDs7QUFFREUsV0FBUztBQUNQLFVBQU1DLGlCQUNKO0FBQUE7QUFBQSxRQUFRLElBQUcsaUJBQVgsRUFBNkIsU0FBUyxNQUFNLEtBQUt4QixhQUFMLEVBQTVDO0FBQUE7QUFBQSxLQURGO0FBS0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLEtBQWY7QUFHRyxXQUFLeEIsS0FBTCxDQUFXWSxhQUFYLEtBQTZCLENBQTdCLEdBQWlDb0MsY0FBakMsR0FBa0QsSUFIckQ7QUFLRyxXQUFLaEQsS0FBTCxDQUFXWSxhQUFYLEtBQTZCLENBQTdCLEdBQ0Msb0JBQUMsT0FBRDtBQUNFLDBCQUFrQixLQUFLSSxnQkFEekI7QUFFRSwwQkFBa0IsS0FBS0YsZ0JBRnpCO0FBR0UscUJBQWEsS0FBS0ksV0FIcEI7QUFJRSxjQUFNLEtBQUtuQixLQUFMLENBQVdFO0FBSm5CLFFBREQsR0FPRyxJQVpOO0FBYUcsV0FBS0QsS0FBTCxDQUFXWSxhQUFYLEtBQTZCLENBQTdCLEdBQ0Msb0JBQUMsT0FBRDtBQUNFLDBCQUFrQixLQUFLSSxnQkFEekI7QUFFRSwwQkFBa0IsS0FBS0YsZ0JBRnpCO0FBR0UscUJBQWEsS0FBS0k7QUFIcEIsUUFERCxHQU1HLElBbkJOO0FBb0JHLFdBQUtsQixLQUFMLENBQVdZLGFBQVgsS0FBNkIsQ0FBN0IsR0FDQyxvQkFBQyxTQUFEO0FBQ0UsdUJBQWUsS0FBS1osS0FBTCxDQUFXWSxhQUQ1QjtBQUVFLDBCQUFrQixLQUFLSSxnQkFGekI7QUFHRSwwQkFBa0IsS0FBS0YsZ0JBSHpCO0FBSUUscUJBQWEsS0FBS0ksV0FKcEI7QUFLRSx3QkFBZ0IsS0FBS0Q7QUFMdkIsUUFERCxHQVFHO0FBNUJOLEtBREY7QUFnQ0Q7QUFqSCtCOztBQW9IbEMsTUFBTWdDLE9BQU4sU0FBc0JyRCxNQUFNQyxTQUE1QixDQUFzQztBQUNwQ0MsY0FBWUMsS0FBWixFQUFtQjtBQUNqQixVQUFNQSxLQUFOO0FBQ0Q7O0FBRURnRCxXQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLE1BQWY7QUFDRSwwQkFBQyxVQUFEO0FBQ0UsMEJBQWtCLEtBQUtoRCxLQUFMLENBQVdlLGdCQUQvQjtBQUVFLDBCQUFrQixLQUFLZixLQUFMLENBQVdpQjtBQUYvQixRQURGO0FBS0U7QUFBQTtBQUFBLFVBQUksV0FBVSxZQUFkO0FBQUE7QUFBQSxPQUxGO0FBTUU7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsZUFBZDtBQUFBO0FBQUEsU0FERjtBQUVFO0FBQUE7QUFBQSxZQUFHLFdBQVUsZUFBYjtBQUFBO0FBQUEsU0FGRjtBQUdFO0FBQ0UsZ0JBQUssTUFEUDtBQUVFLGNBQUcsU0FGTDtBQUdFLHVCQUFZLE9BSGQ7QUFJRSxpQkFBTyxLQUFLakIsS0FBTCxDQUFXRSxJQUpwQjtBQUtFLG9CQUFVd0IsS0FBSyxLQUFLMUIsS0FBTCxDQUFXbUIsV0FBWCxDQUF1Qk8sQ0FBdkIsRUFBMEIsTUFBMUI7QUFMakIsVUFIRjtBQVVFO0FBQUE7QUFBQSxZQUFHLFdBQVUsZUFBYjtBQUFBO0FBQUEsU0FWRjtBQVdFO0FBQ0UsZ0JBQUssTUFEUDtBQUVFLGNBQUcsU0FGTDtBQUdFLHVCQUFZLGlCQUhkO0FBSUUsaUJBQU8sS0FBSzFCLEtBQUwsQ0FBV0csS0FKcEI7QUFLRSxvQkFBVXVCLEtBQUssS0FBSzFCLEtBQUwsQ0FBV21CLFdBQVgsQ0FBdUJPLENBQXZCLEVBQTBCLE9BQTFCO0FBTGpCLFVBWEY7QUFrQkU7QUFBQTtBQUFBLFlBQUcsV0FBVSxlQUFiO0FBQUE7QUFBQSxTQWxCRjtBQW1CRTtBQUNFLGdCQUFLLE1BRFA7QUFFRSxjQUFHLFNBRkw7QUFHRSx1QkFBWSxhQUhkO0FBSUUsaUJBQU8sS0FBSzFCLEtBQUwsQ0FBV0ksUUFKcEI7QUFLRSxvQkFBVXNCLEtBQUssS0FBSzFCLEtBQUwsQ0FBV21CLFdBQVgsQ0FBdUJPLENBQXZCLEVBQTBCLFVBQTFCO0FBTGpCO0FBbkJGO0FBTkYsS0FERjtBQW9DRDtBQTFDbUM7O0FBNkN0QyxNQUFNeUIsT0FBTixTQUFzQnRELE1BQU1DLFNBQTVCLENBQXNDO0FBQ3BDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDRDs7QUFFRGdELFdBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsTUFBZjtBQUNFLDBCQUFDLFVBQUQ7QUFDRSwwQkFBa0IsS0FBS2hELEtBQUwsQ0FBV2UsZ0JBRC9CO0FBRUUsMEJBQWtCLEtBQUtmLEtBQUwsQ0FBV2lCO0FBRi9CLFFBREY7QUFLRTtBQUFBO0FBQUEsVUFBSSxXQUFVLFlBQWQ7QUFBQTtBQUFBLE9BTEY7QUFNRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSxlQUFkO0FBQUE7QUFBQSxTQURGO0FBR0U7QUFBQTtBQUFBLFlBQUcsV0FBVSxlQUFiO0FBQUE7QUFBQSxTQUhGO0FBSUU7QUFDRSxnQkFBSyxNQURQO0FBRUUsY0FBRyxTQUZMO0FBR0UsdUJBQVksc0JBSGQ7QUFJRSxpQkFBTyxLQUFLakIsS0FBTCxDQUFXSyxjQUpwQjtBQUtFLG9CQUFVcUIsS0FBSyxLQUFLMUIsS0FBTCxDQUFXbUIsV0FBWCxDQUF1Qk8sQ0FBdkIsRUFBMEIsZ0JBQTFCO0FBTGpCLFVBSkY7QUFXRTtBQUFBO0FBQUEsWUFBRyxXQUFVLGVBQWI7QUFBQTtBQUFBLFNBWEY7QUFZRTtBQUNFLGdCQUFLLE1BRFA7QUFFRSxjQUFHLFNBRkw7QUFHRSx1QkFBWSxPQUhkO0FBSUUsaUJBQU8sS0FBSzFCLEtBQUwsQ0FBV00sY0FKcEI7QUFLRSxvQkFBVW9CLEtBQUssS0FBSzFCLEtBQUwsQ0FBV21CLFdBQVgsQ0FBdUJPLENBQXZCLEVBQTBCLGdCQUExQjtBQUxqQixVQVpGO0FBbUJFO0FBQUE7QUFBQSxZQUFHLFdBQVUsZUFBYjtBQUFBO0FBQUEsU0FuQkY7QUFvQkU7QUFDRSxnQkFBSyxNQURQO0FBRUUsY0FBRyxTQUZMO0FBR0UsdUJBQVksV0FIZDtBQUlFLGlCQUFPLEtBQUsxQixLQUFMLENBQVdPLElBSnBCO0FBS0Usb0JBQVVtQixLQUFLLEtBQUsxQixLQUFMLENBQVdtQixXQUFYLENBQXVCTyxDQUF2QixFQUEwQixNQUExQjtBQUxqQixVQXBCRjtBQTJCRTtBQUFBO0FBQUEsWUFBRyxXQUFVLGVBQWI7QUFBQTtBQUFBLFNBM0JGO0FBNEJFO0FBQ0UsZ0JBQUssTUFEUDtBQUVFLGNBQUcsU0FGTDtBQUdFLHVCQUFZLElBSGQ7QUFJRSxpQkFBTyxLQUFLMUIsS0FBTCxDQUFXQyxLQUpwQjtBQUtFLG9CQUFVeUIsS0FBSyxLQUFLMUIsS0FBTCxDQUFXbUIsV0FBWCxDQUF1Qk8sQ0FBdkIsRUFBMEIsT0FBMUI7QUFMakIsVUE1QkY7QUFtQ0U7QUFBQTtBQUFBLFlBQUcsV0FBVSxlQUFiO0FBQUE7QUFBQSxTQW5DRjtBQW9DRTtBQUNFLGdCQUFLLE1BRFA7QUFFRSxjQUFHLFNBRkw7QUFHRSx1QkFBWSxPQUhkO0FBSUUsaUJBQU8sS0FBSzFCLEtBQUwsQ0FBV1EsR0FKcEI7QUFLRSxvQkFBVWtCLEtBQUssS0FBSzFCLEtBQUwsQ0FBV21CLFdBQVgsQ0FBdUJPLENBQXZCLEVBQTBCLEtBQTFCO0FBTGpCO0FBcENGO0FBTkYsS0FERjtBQXFERDtBQTNEbUM7O0FBOER0QyxNQUFNMEIsU0FBTixTQUF3QnZELE1BQU1DLFNBQTlCLENBQXdDO0FBQ3RDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDRDs7QUFFRGdELFdBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsTUFBZjtBQUNFLDBCQUFDLFVBQUQ7QUFDRSx1QkFBZSxLQUFLaEQsS0FBTCxDQUFXYSxhQUQ1QjtBQUVFLDBCQUFrQixLQUFLYixLQUFMLENBQVdlLGdCQUYvQjtBQUdFLDBCQUFrQixLQUFLZixLQUFMLENBQVdpQjtBQUgvQixRQURGO0FBTUU7QUFBQTtBQUFBLFVBQUksV0FBVSxZQUFkO0FBQUE7QUFBQSxPQU5GO0FBUUU7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsZUFBZDtBQUFBO0FBQUEsU0FERjtBQUVFO0FBQUE7QUFBQSxZQUFHLFdBQVUsZUFBYjtBQUFBO0FBQUEsU0FGRjtBQUdFO0FBQ0UsZ0JBQUssTUFEUDtBQUVFLGNBQUcsU0FGTDtBQUdFLHVCQUFZLHFCQUhkO0FBSUUsaUJBQU8sS0FBS2pCLEtBQUwsQ0FBV1MsR0FKcEI7QUFLRSxvQkFBVWlCLEtBQUssS0FBSzFCLEtBQUwsQ0FBV21CLFdBQVgsQ0FBdUJPLENBQXZCLEVBQTBCLEtBQTFCO0FBTGpCLFVBSEY7QUFVRTtBQUFBO0FBQUEsWUFBRyxXQUFVLGVBQWI7QUFBQTtBQUFBLFNBVkY7QUFXRTtBQUNFLGdCQUFLLE1BRFA7QUFFRSxjQUFHLFNBRkw7QUFHRSx1QkFBWSxLQUhkO0FBSUUsaUJBQU8sS0FBSzFCLEtBQUwsQ0FBV1csR0FKcEI7QUFLRSxvQkFBVWUsS0FBSyxLQUFLMUIsS0FBTCxDQUFXbUIsV0FBWCxDQUF1Qk8sQ0FBdkIsRUFBMEIsS0FBMUI7QUFMakIsVUFYRjtBQWtCRTtBQUFBO0FBQUEsWUFBRyxXQUFVLGVBQWI7QUFBQTtBQUFBLFNBbEJGO0FBbUJFO0FBQ0UsZ0JBQUssTUFEUDtBQUVFLGNBQUcsU0FGTDtBQUdFLHVCQUFZLE9BSGQ7QUFJRSxpQkFBTyxLQUFLMUIsS0FBTCxDQUFXWSxVQUpwQjtBQUtFLG9CQUFVYyxLQUFLLEtBQUsxQixLQUFMLENBQVdtQixXQUFYLENBQXVCTyxDQUF2QixFQUEwQixZQUExQjtBQUxqQjtBQW5CRixPQVJGO0FBbUNFLDBCQUFDLGNBQUQsSUFBZ0IsZ0JBQWdCLEtBQUsxQixLQUFMLENBQVdrQixjQUEzQztBQW5DRixLQURGO0FBdUNEO0FBN0NxQzs7QUFnRHhDLE1BQU1tQyxVQUFOLFNBQXlCeEQsTUFBTUMsU0FBL0IsQ0FBeUM7QUFDdkNDLGNBQVlDLEtBQVosRUFBbUI7QUFDakIsVUFBTUEsS0FBTjtBQUNEOztBQUVEZ0QsV0FBUztBQUNQLFVBQU1NLGFBQ0o7QUFBQTtBQUFBLFFBQVEsSUFBRyxhQUFYLEVBQXlCLFNBQVMsTUFBTSxLQUFLdEQsS0FBTCxDQUFXaUIsZ0JBQVgsRUFBeEM7QUFBQTtBQUFBLEtBREY7QUFLQSxVQUFNc0MsZ0JBQ0o7QUFBQTtBQUFBLFFBQVEsSUFBRyxhQUFYLEVBQXlCLFNBQVMsTUFBTSxLQUFLdkQsS0FBTCxDQUFXZSxnQkFBWCxFQUF4QztBQUFBO0FBQUEsS0FERjtBQUtBLFVBQU15QyxjQUFjO0FBQUE7QUFBQSxRQUFRLElBQUcsY0FBWDtBQUFBO0FBQUEsS0FBcEI7QUFDQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsdUJBQWY7QUFDR0YsZ0JBREg7QUFFRyxXQUFLdEQsS0FBTCxDQUFXYSxhQUFYLEtBQTZCLENBQTdCLEdBQWlDMkMsV0FBakMsR0FBK0NEO0FBRmxELEtBREY7QUFNRDtBQXZCc0M7O0FBMEJ6QyxNQUFNRSxjQUFOLFNBQTZCNUQsTUFBTUMsU0FBbkMsQ0FBNkM7QUFDM0NDLGNBQVlDLEtBQVosRUFBbUI7QUFDakIsVUFBTUEsS0FBTjtBQUNEOztBQUVEZ0QsV0FBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSwyQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUNFLGNBQUcsaUJBREw7QUFFRSxtQkFBUyxNQUFNLEtBQUtoRCxLQUFMLENBQVdrQixjQUFYO0FBRmpCO0FBQUE7QUFBQTtBQURGLEtBREY7QUFVRDtBQWhCMEM7O0FBbUI3Q3dDLFNBQVNWLE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUF5QlcsU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUF6QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPOiBWYWxpZGF0aW9uXG4vLyBEb24ndCBhbGxvdyB0aGUgdXNlciB0byBwcm9jZWVkIHVudGlsIGFsbCB0aGUgcmVxdWlyZWQgZmllbGRzIGFyZSBmaWxsZWQgaW4uIEFkZHJlc3MgbGluZSAyIHNob3VsZCBiZSBvcHRpb25hbC4gQmUgc3VyZSB0byBkaXNwbGF5IGFwcHJvcHJpYXRlIGVycm9yIG1lc3NhZ2VzIHRvIHRoZSB1c2VyLCBzbyB0aGV5IGtub3cgd2h5IHRoZXkgYXJlIG5vdCBhbGxvd2VkIHRvIHByb2NlZWQuXG4vLyBWYWxpZGF0ZSB0aGUgZm9ybSBmaWVsZHMuIERvbid0IGFsbG93IHRoZSB1c2VyIHRvIHByb2NlZWQgdG8gdGhlIG5leHQgc3RlcCBhbmQgZG8gbm90IHNhdmUgdGhlIGRhdGEgdW50aWwgdGhlIGZpZWxkcyBhcmUgdmFsaWQuIFZhbGlkYXRpb24gbWVhbnMgdGhhdCB5b3UgbXVzdCBwcmV2ZW50IHRoZSB1c2VyIGZyb20gZW50ZXJpbmcgaGFoYSBhcyB0aGUgZW1haWwgYWRkcmVzcyAtLSB0aGUgZW1haWwgYWRkcmVzcyBoYXZlIGEgdmFsaWQgZGF0YS1zaGFwZS4gWW91J2xsIGhhdmUgdG8gZGVjaWRlIHdoaWNoIGZpZWxkcyBkZXNlcnZlIHZhbGlkYXRpb24gYW5kIHdoaWNoIGRvIG5vdC4gQmUgc3VyZSB0byBkaXNwbGF5IGFwcHJvcHJpYXRlIGVycm9yIG1lc3NhZ2VzIHRvIHRoZSB1c2VyLCBzbyB0aGV5IGtub3cgd2h5IHRoZXkgYXJlIG5vdCBhbGxvd2VkIHRvIHByb2NlZWQuXG5cbi8vIFRPRE86IEFkZCBsb2NhbCBzdG9yYWdlXG4vLyBJZiB0aGUgd2luZG93IGlzIGNsb3NlZCBhbmQgcmVvcGVuZWQsIHRoZSBjaGVja291dCBwcm9jZXNzIHNob3VsZCBjb250aW51ZSBhdCB0aGUgc2FtZSBzdGVwIHRoZSB1c2VyIHdhcyBvbiB3aGVuIHRoZSB3aW5kb3cgd2FzIGNsb3NlZCAoaXQncyBvayBpZiB0aGUgZmllbGRzIG9uIHRoZSBcImN1cnJlbnRcIiBzdGVwIGFyZSBibGFuayB3aGVuIHRoZSB3aW5kb3cgaXMgcmVvcGVuZWQpLiBUaGUgYXBwIHNob3VsZCBjb250aW51ZSB0byBwdXQgdGhlIHJlbWFpbmluZyBkYXRhIGludG8gdGhlIHNhbWUgcmVjb3JkIGl0IHdhcyB1c2luZyBiZWZvcmUgdGhlIHdpbmRvdyB3YXMgY2xvc2VkLiBPbmNlIFB1cmNoYXNlIGlzIGNsaWNrZWQsIGl0IHNob3VsZCBub3QgYmUgcG9zc2libGUgdG8gY29udGludWUuXG5cbi8vIFRPRE86IEltcGxlbWVudCB1bml0IHRlc3RzXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYW1lOiBcIlwiLFxuICAgICAgZW1haWw6IFwiXCIsXG4gICAgICBwYXNzd29yZDogXCJcIixcbiAgICAgIGFkZHJlc3NMaW5lT25lOiBcIlwiLFxuICAgICAgYWRkcmVzc0xpbmVUd286IFwiXCIsXG4gICAgICBjaXR5OiBcIlwiLFxuICAgICAgc3RhdGU6IFwiXCIsXG4gICAgICB6aXA6IFwiXCIsXG4gICAgICBjY246IFwiXCIsXG4gICAgICBleHBEYXRlOiBcIlwiLFxuICAgICAgY3Z2OiBcIlwiLFxuICAgICAgYmlsbGluZ1ppcDogXCJcIixcbiAgICAgIGZvcm1EaXNwbGF5ZWQ6IDAsXG4gICAgICBpc09rYXlUb1Byb2NlZWQ6IHRydWVcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlTmV4dEJ1dHRvbiA9IHRoaXMuaGFuZGxlTmV4dEJ1dHRvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQmFja0J1dHRvbiA9IHRoaXMuaGFuZGxlQmFja0J1dHRvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUHVyY2hhc2UgPSB0aGlzLmhhbmRsZVB1cmNoYXNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUJhY2tCdXR0b24oKSB7XG4gICAgbGV0IGZvcm0gPSB0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvcm1EaXNwbGF5ZWQ6IGZvcm0gLSAxIH0pO1xuICB9XG5cbiAgaGFuZGxlTmV4dEJ1dHRvbigpIHtcbiAgICBsZXQgZm9ybSA9IHRoaXMuc3RhdGUuZm9ybURpc3BsYXllZDtcbiAgICB0aGlzLnNldFN0YXRlKHsgZm9ybURpc3BsYXllZDogZm9ybSArIDEgfSk7XG5cbiAgICAvL1RPRE86IEFkZCBub2RlIEVOViB2YXJpYWJsZXNcbiAgICB0aGlzLnBvc3REYXRhKGBodHRwOi8vbG9jYWxob3N0OjMwMDBgLCBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSk7XG4gIH1cblxuICBiZWdpbkNoZWNrb3V0KCkge1xuICAgIHRoaXMuaGFuZGxlTmV4dEJ1dHRvbigpO1xuICB9XG5cbiAgaGFuZGxlUHVyY2hhc2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvcm1EaXNwbGF5ZWQ6IDAgfSk7XG5cbiAgICAvL1RPRE86IEFkZCBub2RlIEVOViB2YXJpYWJsZXNcbiAgICB0aGlzLnBvc3REYXRhKGBodHRwOi8vbG9jYWxob3N0OjMwMDAvcHVyY2hhc2VgLCBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSk7XG4gIH1cblxuICBoYW5kbGVJbnB1dChlLCBwcm9wZXJ0eSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBbcHJvcGVydHldOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIHBvc3REYXRhKHVybCA9IGBgLCBkYXRhID0geyBoZWxsbzogXCJ3b3JsZFwiIH0pIHtcbiAgICAvLyBEZWZhdWx0IG9wdGlvbnMgYXJlIG1hcmtlZCB3aXRoICpcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgbW9kZTogXCJjb3JzXCIsIC8vIG5vLWNvcnMsIGNvcnMsICpzYW1lLW9yaWdpblxuICAgICAgY2FjaGU6IFwibm8tY2FjaGVcIiwgLy8gKmRlZmF1bHQsIG5vLWNhY2hlLCByZWxvYWQsIGZvcmNlLWNhY2hlLCBvbmx5LWlmLWNhY2hlZFxuICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICB9LFxuICAgICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICBib2R5OiBkYXRhIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS50ZXh0KCkpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSkgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGBGZXRjaCBFcnJvciA6XFxuYCwgZXJyb3IpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjaGVja291dEJ1dHRvbiA9IChcbiAgICAgIDxidXR0b24gaWQ9XCJjaGVja291dC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLmJlZ2luQ2hlY2tvdXQoKX0+XG4gICAgICAgIGNoZWNrIG1lIG91dFxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgICAgey8qIDxoMSBjbGFzc05hbWU9XCJ0aXRsZVwiPkNoZWNrb3V0IEFwcDwvaDE+ICovfVxuXG4gICAgICAgIHt0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQgPT09IDAgPyBjaGVja291dEJ1dHRvbiA6IG51bGx9XG5cbiAgICAgICAge3RoaXMuc3RhdGUuZm9ybURpc3BsYXllZCA9PT0gMSA/IChcbiAgICAgICAgICA8Rm9ybU9uZVxuICAgICAgICAgICAgaGFuZGxlQmFja0J1dHRvbj17dGhpcy5oYW5kbGVCYWNrQnV0dG9ufVxuICAgICAgICAgICAgaGFuZGxlTmV4dEJ1dHRvbj17dGhpcy5oYW5kbGVOZXh0QnV0dG9ufVxuICAgICAgICAgICAgaGFuZGxlSW5wdXQ9e3RoaXMuaGFuZGxlSW5wdXR9XG4gICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHt0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQgPT09IDIgPyAoXG4gICAgICAgICAgPEZvcm1Ud29cbiAgICAgICAgICAgIGhhbmRsZUJhY2tCdXR0b249e3RoaXMuaGFuZGxlQmFja0J1dHRvbn1cbiAgICAgICAgICAgIGhhbmRsZU5leHRCdXR0b249e3RoaXMuaGFuZGxlTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgIGhhbmRsZUlucHV0PXt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7dGhpcy5zdGF0ZS5mb3JtRGlzcGxheWVkID09PSAzID8gKFxuICAgICAgICAgIDxGb3JtVGhyZWVcbiAgICAgICAgICAgIGZvcm1EaXNwbGF5ZWQ9e3RoaXMuc3RhdGUuZm9ybURpc3BsYXllZH1cbiAgICAgICAgICAgIGhhbmRsZUJhY2tCdXR0b249e3RoaXMuaGFuZGxlQmFja0J1dHRvbn1cbiAgICAgICAgICAgIGhhbmRsZU5leHRCdXR0b249e3RoaXMuaGFuZGxlTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgIGhhbmRsZUlucHV0PXt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgICAgaGFuZGxlUHVyY2hhc2U9e3RoaXMuaGFuZGxlUHVyY2hhc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIEZvcm1PbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgIDxOYXZCdXR0b25zXG4gICAgICAgICAgaGFuZGxlTmV4dEJ1dHRvbj17dGhpcy5wcm9wcy5oYW5kbGVOZXh0QnV0dG9ufVxuICAgICAgICAgIGhhbmRsZUJhY2tCdXR0b249e3RoaXMucHJvcHMuaGFuZGxlQmFja0J1dHRvbn1cbiAgICAgICAgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvcm0tdGl0bGVcIj4xIC8gMzwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImFkZHJlc3MtdGl0bGVcIj5BY2NvdW50IEluZm9ybWF0aW9uPC9oMz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+TmFtZTwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk1pY2t5XCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwibmFtZVwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvcm0tc3VidGl0bGVcIj5FbWFpbDwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm1vdXNlQGdtYWlsLmNvbVwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5lbWFpbH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJlbWFpbFwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvcm0tc3VidGl0bGVcIj5QYXNzd29yZDwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cImlsaWtlY2hlZXNlXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnBhc3N3b3JkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcInBhc3N3b3JkXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBGb3JtVHdvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICA8TmF2QnV0dG9uc1xuICAgICAgICAgIGhhbmRsZU5leHRCdXR0b249e3RoaXMucHJvcHMuaGFuZGxlTmV4dEJ1dHRvbn1cbiAgICAgICAgICBoYW5kbGVCYWNrQnV0dG9uPXt0aGlzLnByb3BzLmhhbmRsZUJhY2tCdXR0b259XG4gICAgICAgIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb3JtLXRpdGxlXCI+MiAvIDM8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJhZGRyZXNzLXRpdGxlXCI+QWRkcmVzcyBJbmZvcm1hdGlvbjwvaDM+XG5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+TGluZSAxPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiNTIyNSBOVyBCZWxoYXZlbiBEci5cIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuYWRkcmVzc0xpbmVPbmV9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiYWRkcmVzc0xpbmVPbmVcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+TGluZSAyPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUE8gIzFcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuYWRkcmVzc0xpbmVUd299XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiYWRkcmVzc0xpbmVUd29cIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+Q2l0eTwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNvcnZhbGxpc1wiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jaXR5fVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcImNpdHlcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+U3RhdGU8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJPUlwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5zdGF0ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJzdGF0ZVwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvcm0tc3VidGl0bGVcIj5aaXAgQ29kZTwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjk3MzMwXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnppcH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJ6aXBcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIEZvcm1UaHJlZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgPE5hdkJ1dHRvbnNcbiAgICAgICAgICBmb3JtRGlzcGxheWVkPXt0aGlzLnByb3BzLmZvcm1EaXNwbGF5ZWR9XG4gICAgICAgICAgaGFuZGxlTmV4dEJ1dHRvbj17dGhpcy5wcm9wcy5oYW5kbGVOZXh0QnV0dG9ufVxuICAgICAgICAgIGhhbmRsZUJhY2tCdXR0b249e3RoaXMucHJvcHMuaGFuZGxlQmFja0J1dHRvbn1cbiAgICAgICAgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvcm0tdGl0bGVcIj4zIC8gMzwvaDI+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiYWRkcmVzcy10aXRsZVwiPlBheW1lbnQgSW5mb3JtYXRpb248L2gzPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvcm0tc3VidGl0bGVcIj5DQ04jPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMDAwMC0wMDAwLTAwMDAtMDAwMFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jY259XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiY2NuXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkNWVjwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjEyM1wiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jdnZ9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiY3Z2XCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkJpbGxpbmcgWmlwIENvZGU8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCI5NzMzMFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5iaWxsaW5nWmlwfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcImJpbGxpbmdaaXBcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxQdXJjaGFzZUJ1dHRvbiBoYW5kbGVQdXJjaGFzZT17dGhpcy5wcm9wcy5oYW5kbGVQdXJjaGFzZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgTmF2QnV0dG9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGJhY2tCdXR0b24gPSAoXG4gICAgICA8YnV0dG9uIGlkPVwiYmFjay1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLmhhbmRsZUJhY2tCdXR0b24oKX0+XG4gICAgICAgIOKXgFxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgICBjb25zdCBmb3J3YXJkQnV0dG9uID0gKFxuICAgICAgPGJ1dHRvbiBpZD1cIm5leHQtYnV0dG9uXCIgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5oYW5kbGVOZXh0QnV0dG9uKCl9PlxuICAgICAgICDilrZcbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gICAgY29uc3QgYmxhbmtCdXR0b24gPSA8YnV0dG9uIGlkPVwiYmxhbmstYnV0dG9uXCI+4pa2PC9idXR0b24+O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5leHQtYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICB7YmFja0J1dHRvbn1cbiAgICAgICAge3RoaXMucHJvcHMuZm9ybURpc3BsYXllZCA9PT0gMyA/IGJsYW5rQnV0dG9uIDogZm9yd2FyZEJ1dHRvbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgUHVyY2hhc2VCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdXJjaGFzZS1idXR0b24tY29udGFpbmVyXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBpZD1cInB1cmNoYXNlLWJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5oYW5kbGVQdXJjaGFzZSgpfVxuICAgICAgICA+XG4gICAgICAgICAgU3VibWl0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpKTtcbiJdfQ==