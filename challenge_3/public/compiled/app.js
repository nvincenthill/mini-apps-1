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
    this.postData(this.state);
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
          placeholder: "Corvaliis",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwibmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJhZGRyZXNzTGluZU9uZSIsImFkZHJlc3NMaW5lVHdvIiwiY2l0eSIsInppcCIsImNjbiIsImV4cERhdGUiLCJjdnYiLCJiaWxsaW5nWmlwIiwiZm9ybURpc3BsYXllZCIsImhhbmRsZU5leHRCdXR0b24iLCJiaW5kIiwiaGFuZGxlUHVyY2hhc2UiLCJoYW5kbGVJbnB1dCIsImZvcm0iLCJzZXRTdGF0ZSIsInBvc3REYXRhIiwiYmVnaW5DaGVja291dCIsImFsZXJ0IiwiZSIsInByb3BlcnR5IiwidGFyZ2V0IiwidmFsdWUiLCJ1cmwiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImZldGNoIiwibWV0aG9kIiwibW9kZSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwicmVkaXJlY3QiLCJyZWZlcnJlciIsImJvZHkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJlcnJvciIsInJlbmRlciIsImNoZWNrb3V0QnV0dG9uIiwiRm9ybU9uZSIsIkZvcm1Ud28iLCJGb3JtVGhyZWUiLCJOZXh0QnV0dG9uIiwiUHVyY2hhc2VCdXR0b24iLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsWUFBTSxFQURLO0FBRVhDLGFBQU8sRUFGSTtBQUdYQyxnQkFBVSxFQUhDO0FBSVhDLHNCQUFnQixFQUpMO0FBS1hDLHNCQUFnQixFQUxMO0FBTVhDLFlBQU0sRUFOSztBQU9YTixhQUFPLEVBUEk7QUFRWE8s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QnpDLE1BQU1xQyxjQUFOLFNBQTZCdEQsTUFBTUMsU0FBbkMsQ0FBNkM7QUFDM0NDLGNBQVlDLEtBQVosRUFBbUI7QUFDakIsVUFBTUEsS0FBTjtBQUNEOztBQUVENkMsV0FBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSwyQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUNFLGNBQUcsaUJBREw7QUFFRSxtQkFBUyxNQUFNLEtBQUs3QyxLQUFMLENBQVdnQixjQUFYO0FBRmpCO0FBQUE7QUFBQTtBQURGLEtBREY7QUFVRDtBQWhCMEM7O0FBbUI3Q29DLFNBQVNQLE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUF5QlEsU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUF6QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmFtZTogXCJcIixcbiAgICAgIGVtYWlsOiBcIlwiLFxuICAgICAgcGFzc3dvcmQ6IFwiXCIsXG4gICAgICBhZGRyZXNzTGluZU9uZTogXCJcIixcbiAgICAgIGFkZHJlc3NMaW5lVHdvOiBcIlwiLFxuICAgICAgY2l0eTogXCJcIixcbiAgICAgIHN0YXRlOiBcIlwiLFxuICAgICAgemlwOiBcIlwiLFxuICAgICAgY2NuOiBcIlwiLFxuICAgICAgZXhwRGF0ZTogXCJcIixcbiAgICAgIGN2djogXCJcIixcbiAgICAgIGJpbGxpbmdaaXA6IFwiXCIsXG4gICAgICBmb3JtRGlzcGxheWVkOiAwXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZU5leHRCdXR0b24gPSB0aGlzLmhhbmRsZU5leHRCdXR0b24uYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVB1cmNoYXNlID0gdGhpcy5oYW5kbGVQdXJjaGFzZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVOZXh0QnV0dG9uKCkge1xuICAgIGxldCBmb3JtID0gdGhpcy5zdGF0ZS5mb3JtRGlzcGxheWVkO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBmb3JtRGlzcGxheWVkOiBmb3JtICsgMSB9KTtcblxuICAgIC8vIHNhdmUgZGF0YSB0byBzZXJ2ZXIvZGJcbiAgICB0aGlzLnBvc3REYXRhKHRoaXMuc3RhdGUpO1xuICB9XG5cbiAgYmVnaW5DaGVja291dCgpIHtcbiAgICB0aGlzLmhhbmRsZU5leHRCdXR0b24oKTtcbiAgfVxuXG4gIGhhbmRsZVB1cmNoYXNlKCkge1xuICAgIGFsZXJ0KFwicHVyY2hhc2UgY29tcGxldGVcIik7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvcm1EaXNwbGF5ZWQ6IDAgfSk7XG4gIH1cblxuICBoYW5kbGVJbnB1dChlLCBwcm9wZXJ0eSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBbcHJvcGVydHldOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIHBvc3REYXRhKHVybCA9IGBgLCBkYXRhID0ge30pIHtcbiAgICBjb25zb2xlLmxvZyhcInBvc3RpbmcgZGF0YVwiKTtcbiAgICAvLyBEZWZhdWx0IG9wdGlvbnMgYXJlIG1hcmtlZCB3aXRoICpcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgbW9kZTogXCJjb3JzXCIsIC8vIG5vLWNvcnMsIGNvcnMsICpzYW1lLW9yaWdpblxuICAgICAgY2FjaGU6IFwibm8tY2FjaGVcIiwgLy8gKmRlZmF1bHQsIG5vLWNhY2hlLCByZWxvYWQsIGZvcmNlLWNhY2hlLCBvbmx5LWlmLWNhY2hlZFxuICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXG4gICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICB9LFxuICAgICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICBib2R5OiBkYXRhIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS50ZXh0KCkpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSkgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGBGZXRjaCBFcnJvciA6XFxuYCwgZXJyb3IpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjaGVja291dEJ1dHRvbiA9IChcbiAgICAgIDxidXR0b24gaWQ9XCJjaGVja291dC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLmJlZ2luQ2hlY2tvdXQoKX0+XG4gICAgICAgIGNoZWNrIG1lIG91dFxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgICAgey8qIDxoMSBjbGFzc05hbWU9XCJ0aXRsZVwiPkNoZWNrb3V0IEFwcDwvaDE+ICovfVxuXG4gICAgICAgIHt0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQgPT09IDAgPyBjaGVja291dEJ1dHRvbiA6IG51bGx9XG5cbiAgICAgICAge3RoaXMuc3RhdGUuZm9ybURpc3BsYXllZCA9PT0gMSA/IChcbiAgICAgICAgICA8Rm9ybU9uZVxuICAgICAgICAgICAgaGFuZGxlTmV4dEJ1dHRvbj17dGhpcy5oYW5kbGVOZXh0QnV0dG9ufVxuICAgICAgICAgICAgaGFuZGxlSW5wdXQ9e3RoaXMuaGFuZGxlSW5wdXR9XG4gICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHt0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQgPT09IDIgPyAoXG4gICAgICAgICAgPEZvcm1Ud29cbiAgICAgICAgICAgIGhhbmRsZU5leHRCdXR0b249e3RoaXMuaGFuZGxlTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgIGhhbmRsZUlucHV0PXt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7dGhpcy5zdGF0ZS5mb3JtRGlzcGxheWVkID09PSAzID8gKFxuICAgICAgICAgIDxGb3JtVGhyZWVcbiAgICAgICAgICAgIGhhbmRsZU5leHRCdXR0b249e3RoaXMuaGFuZGxlTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgIGhhbmRsZUlucHV0PXt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgICAgaGFuZGxlUHVyY2hhc2U9e3RoaXMuaGFuZGxlUHVyY2hhc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIEZvcm1PbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb3JtLXRpdGxlXCI+MSAvIDM8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJhZGRyZXNzLXRpdGxlXCI+QWNjb3VudCBJbmZvcm1hdGlvbjwvaDM+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPk5hbWU8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJNaWNreVwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcIm5hbWVcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+RW1haWw8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJtb3VzZUBnbWFpbC5jb21cIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZW1haWx9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiZW1haWxcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+UGFzc3dvcmQ8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJpbGlla2NoZWVzZVwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5wYXNzd29yZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJwYXNzd29yZFwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPE5leHRCdXR0b24gaGFuZGxlTmV4dEJ1dHRvbj17dGhpcy5wcm9wcy5oYW5kbGVOZXh0QnV0dG9ufSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBGb3JtVHdvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9ybS10aXRsZVwiPjIgLyAzPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiYWRkcmVzcy10aXRsZVwiPkFkZHJlc3M8L2gzPlxuXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkxpbmUgMTwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjUyMjUgTlcgQmVsaGF2ZW4gRHIuXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmFkZHJlc3NMaW5lT25lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcImFkZHJlc3NMaW5lT25lXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkxpbmUgMjwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBPICMxXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmFkZHJlc3NMaW5lVHdvfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcImFkZHJlc3NMaW5lVHdvXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkNpdHk8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb3J2YWxpaXNcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuY2l0eX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJjaXR5XCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPlN0YXRlPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT1JcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuc3RhdGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwic3RhdGVcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+WmlwIENvZGU8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCI5NzMzMFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy56aXB9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiemlwXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8TmV4dEJ1dHRvbiBoYW5kbGVOZXh0QnV0dG9uPXt0aGlzLnByb3BzLmhhbmRsZU5leHRCdXR0b259IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIEZvcm1UaHJlZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvcm0tdGl0bGVcIj4zIC8gMzwvaDI+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiYWRkcmVzcy10aXRsZVwiPlBheW1lbnQgSW5mb3JtYXRpb248L2gzPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvcm0tc3VidGl0bGVcIj5DQ04jPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMDAwMC0wMDAwLTAwMDAtMDAwMFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jY259XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiY2NuXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkNWVjwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjEyM1wiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jdnZ9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiY3Z2XCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkJpbGxpbmcgWmlwIENvZGU8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCI5NzMzMFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5iaWxsaW5nWmlwfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcImJpbGxpbmdaaXBcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxQdXJjaGFzZUJ1dHRvbiBoYW5kbGVQdXJjaGFzZT17dGhpcy5wcm9wcy5oYW5kbGVQdXJjaGFzZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgTmV4dEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5leHQtYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICA8YnV0dG9uIGlkPVwibmV4dC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLmhhbmRsZU5leHRCdXR0b24oKX0+XG4gICAgICAgICAg4p6eXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBQdXJjaGFzZUJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB1cmNoYXNlLWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGlkPVwicHVyY2hhc2UtYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLmhhbmRsZVB1cmNoYXNlKCl9XG4gICAgICAgID5cbiAgICAgICAgICBzdWJtaXRcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpO1xuIl19