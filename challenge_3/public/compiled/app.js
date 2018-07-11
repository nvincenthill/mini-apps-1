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
  }

  handleInput(e, property) {
    this.setState({ [property]: e.target.value });
  }

  postData(url = ``, data = { hello: "world" }) {
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
    const checkoutButton = React.createElement(
      "button",
      { id: "checkout-button", onClick: () => this.beginCheckout() },
      "check me out"
    );
    return React.createElement(
      "div",
      { className: "app" },
      this.state.formDisplayed === 0 ? checkoutButton : null,
      this.state.formDisplayed === 1
        ? React.createElement(FormOne, {
            handleNextButton: this.handleNextButton,
            handleInput: this.handleInput,
            name: this.props.name
          })
        : null,
      this.state.formDisplayed === 2
        ? React.createElement(FormTwo, {
            handleNextButton: this.handleNextButton,
            handleInput: this.handleInput
          })
        : null,
      this.state.formDisplayed === 3
        ? React.createElement(FormThree, {
            handleNextButton: this.handleNextButton,
            handleInput: this.handleInput,
            handlePurchase: this.handlePurchase
          })
        : null
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
      React.createElement("h2", { className: "form-title" }, "1 / 3"),
      React.createElement(
        "div",
        { className: "input-container" },
        React.createElement(
          "h3",
          { className: "address-title" },
          "Account Information"
        ),
        React.createElement("p", { className: "form-subtitle" }, "Name"),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "Micky",
          value: this.props.name,
          onChange: e => this.props.handleInput(e, "name")
        }),
        React.createElement("p", { className: "form-subtitle" }, "Email"),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "mouse@gmail.com",
          value: this.props.email,
          onChange: e => this.props.handleInput(e, "email")
        }),
        React.createElement("p", { className: "form-subtitle" }, "Password"),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "iliekcheese",
          value: this.props.password,
          onChange: e => this.props.handleInput(e, "password")
        })
      ),
      React.createElement(NextButton, {
        handleNextButton: this.props.handleNextButton
      })
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
      React.createElement("h2", { className: "form-title" }, "2 / 3"),
      React.createElement(
        "div",
        { className: "input-container" },
        React.createElement("h3", { className: "address-title" }, "Address"),
        React.createElement("p", { className: "form-subtitle" }, "Line 1"),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "5225 NW Belhaven Dr.",
          value: this.props.addressLineOne,
          onChange: e => this.props.handleInput(e, "addressLineOne")
        }),
        React.createElement("p", { className: "form-subtitle" }, "Line 2"),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "PO #1",
          value: this.props.addressLineTwo,
          onChange: e => this.props.handleInput(e, "addressLineTwo")
        }),
        React.createElement("p", { className: "form-subtitle" }, "City"),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "Corvallis",
          value: this.props.city,
          onChange: e => this.props.handleInput(e, "city")
        }),
        React.createElement("p", { className: "form-subtitle" }, "State"),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "OR",
          value: this.props.state,
          onChange: e => this.props.handleInput(e, "state")
        }),
        React.createElement("p", { className: "form-subtitle" }, "Zip Code"),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "97330",
          value: this.props.zip,
          onChange: e => this.props.handleInput(e, "zip")
        })
      ),
      React.createElement(NextButton, {
        handleNextButton: this.props.handleNextButton
      })
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
      React.createElement("h2", { className: "form-title" }, "3 / 3"),
      React.createElement(
        "div",
        { className: "input-container" },
        React.createElement(
          "h3",
          { className: "address-title" },
          "Payment Information"
        ),
        React.createElement("p", { className: "form-subtitle" }, "CCN#"),
        React.createElement("input", {
          type: "text",
          id: "myinput",
          placeholder: "0000-0000-0000-0000",
          value: this.props.ccn,
          onChange: e => this.props.handleInput(e, "ccn")
        }),
        React.createElement("p", { className: "form-subtitle" }, "CVV"),
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
      React.createElement(PurchaseButton, {
        handlePurchase: this.props.handlePurchase
      })
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

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById("root")
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwibmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJhZGRyZXNzTGluZU9uZSIsImFkZHJlc3NMaW5lVHdvIiwiY2l0eSIsInppcCIsImNjbiIsImV4cERhdGUiLCJjdnYiLCJiaWxsaW5nWmlwIiwiZm9ybURpc3BsYXllZCIsImhhbmRsZU5leHRCdXR0b24iLCJiaW5kIiwiaGFuZGxlUHVyY2hhc2UiLCJoYW5kbGVJbnB1dCIsImZvcm0iLCJzZXRTdGF0ZSIsInBvc3REYXRhIiwiYmVnaW5DaGVja291dCIsImFsZXJ0IiwiZSIsInByb3BlcnR5IiwidGFyZ2V0IiwidmFsdWUiLCJ1cmwiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImZldGNoIiwibWV0aG9kIiwibW9kZSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwicmVkaXJlY3QiLCJyZWZlcnJlciIsImJvZHkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJlcnJvciIsInJlbmRlciIsImNoZWNrb3V0QnV0dG9uIiwiRm9ybU9uZSIsIkZvcm1Ud28iLCJGb3JtVGhyZWUiLCJOZXh0QnV0dG9uIiwiUHVyY2hhc2VCdXR0b24iLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEdBQU4sU0FBa0JDLE1BQU1DLFNBQXhCLENBQWtDO0FBQ2hDQyxjQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsWUFBTSxFQURLO0FBRVhDLGFBQU8sRUFGSTtBQUdYQyxnQkFBVSxFQUhDO0FBSVhDLHNCQUFnQixFQUpMO0FBS1hDLHNCQUFnQixFQUxMO0FBTVhDLFlBQU0sRUFOSztBQU9YTixhQUFPLEVBUEk7QUFRWE8s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RjtBQU9EO0FBYnNDOztBQWdCekMsTUFBTXFDLGNBQU4sU0FBNkJ0RCxNQUFNQyxTQUFuQyxDQUE2QztBQUMzQ0MsY0FBWUMsS0FBWixFQUFtQjtBQUNqQixVQUFNQSxLQUFOO0FBQ0Q7O0FBRUQ2QyxXQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDJCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsY0FBRyxpQkFETDtBQUVFLG1CQUFTLE1BQU0sS0FBSzdDLEtBQUwsQ0FBV2dCLGNBQVg7QUFGakI7QUFBQTtBQUFBO0FBREYsS0FERjtBQVVEO0FBaEIwQzs7QUFtQjdDb0MsU0FBU1AsTUFBVCxDQUFnQixvQkFBQyxHQUFELE9BQWhCLEVBQXlCUSxTQUFTQyxjQUFULENBQXdCLE1BQXhCLENBQXpCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYW1lOiBcIlwiLFxuICAgICAgZW1haWw6IFwiXCIsXG4gICAgICBwYXNzd29yZDogXCJcIixcbiAgICAgIGFkZHJlc3NMaW5lT25lOiBcIlwiLFxuICAgICAgYWRkcmVzc0xpbmVUd286IFwiXCIsXG4gICAgICBjaXR5OiBcIlwiLFxuICAgICAgc3RhdGU6IFwiXCIsXG4gICAgICB6aXA6IFwiXCIsXG4gICAgICBjY246IFwiXCIsXG4gICAgICBleHBEYXRlOiBcIlwiLFxuICAgICAgY3Z2OiBcIlwiLFxuICAgICAgYmlsbGluZ1ppcDogXCJcIixcbiAgICAgIGZvcm1EaXNwbGF5ZWQ6IDBcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlTmV4dEJ1dHRvbiA9IHRoaXMuaGFuZGxlTmV4dEJ1dHRvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUHVyY2hhc2UgPSB0aGlzLmhhbmRsZVB1cmNoYXNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZU5leHRCdXR0b24oKSB7XG4gICAgbGV0IGZvcm0gPSB0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvcm1EaXNwbGF5ZWQ6IGZvcm0gKyAxIH0pO1xuXG4gICAgLy8gc2F2ZSBkYXRhIHRvIHNlcnZlci9kYlxuICAgIC8vVE9ETzogQWRkIG5vZGUgRU5WIHZhcmlhYmxlc1xuICAgIHRoaXMucG9zdERhdGEoYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMGAsIHRoaXMuc3RhdGUpO1xuICB9XG5cbiAgYmVnaW5DaGVja291dCgpIHtcbiAgICB0aGlzLmhhbmRsZU5leHRCdXR0b24oKTtcbiAgfVxuXG4gIGhhbmRsZVB1cmNoYXNlKCkge1xuICAgIGFsZXJ0KFwicHVyY2hhc2UgY29tcGxldGVcIik7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvcm1EaXNwbGF5ZWQ6IDAgfSk7XG4gIH1cblxuICBoYW5kbGVJbnB1dChlLCBwcm9wZXJ0eSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBbcHJvcGVydHldOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIHBvc3REYXRhKHVybCA9IGBgLCBkYXRhID0ge30pIHtcbiAgICBjb25zb2xlLmxvZyhcInBvc3RpbmcgZGF0YVwiKTtcbiAgICAvLyBEZWZhdWx0IG9wdGlvbnMgYXJlIG1hcmtlZCB3aXRoICpcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgICAgbW9kZTogXCJjb3JzXCIsIC8vIG5vLWNvcnMsIGNvcnMsICpzYW1lLW9yaWdpblxuICAgICAgY2FjaGU6IFwibm8tY2FjaGVcIiwgLy8gKmRlZmF1bHQsIG5vLWNhY2hlLCByZWxvYWQsIGZvcmNlLWNhY2hlLCBvbmx5LWlmLWNhY2hlZFxuICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXG4gICAgICAgIC8vIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICB9LFxuICAgICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqY2xpZW50XG4gICAgICBib2R5OiBkYXRhIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS50ZXh0KCkpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSkgLy8gcGFyc2VzIHJlc3BvbnNlIHRvIEpTT05cbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGBGZXRjaCBFcnJvciA6XFxuYCwgZXJyb3IpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjaGVja291dEJ1dHRvbiA9IChcbiAgICAgIDxidXR0b24gaWQ9XCJjaGVja291dC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLmJlZ2luQ2hlY2tvdXQoKX0+XG4gICAgICAgIGNoZWNrIG1lIG91dFxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgICAgey8qIDxoMSBjbGFzc05hbWU9XCJ0aXRsZVwiPkNoZWNrb3V0IEFwcDwvaDE+ICovfVxuXG4gICAgICAgIHt0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQgPT09IDAgPyBjaGVja291dEJ1dHRvbiA6IG51bGx9XG5cbiAgICAgICAge3RoaXMuc3RhdGUuZm9ybURpc3BsYXllZCA9PT0gMSA/IChcbiAgICAgICAgICA8Rm9ybU9uZVxuICAgICAgICAgICAgaGFuZGxlTmV4dEJ1dHRvbj17dGhpcy5oYW5kbGVOZXh0QnV0dG9ufVxuICAgICAgICAgICAgaGFuZGxlSW5wdXQ9e3RoaXMuaGFuZGxlSW5wdXR9XG4gICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHt0aGlzLnN0YXRlLmZvcm1EaXNwbGF5ZWQgPT09IDIgPyAoXG4gICAgICAgICAgPEZvcm1Ud29cbiAgICAgICAgICAgIGhhbmRsZU5leHRCdXR0b249e3RoaXMuaGFuZGxlTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgIGhhbmRsZUlucHV0PXt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7dGhpcy5zdGF0ZS5mb3JtRGlzcGxheWVkID09PSAzID8gKFxuICAgICAgICAgIDxGb3JtVGhyZWVcbiAgICAgICAgICAgIGhhbmRsZU5leHRCdXR0b249e3RoaXMuaGFuZGxlTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgIGhhbmRsZUlucHV0PXt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgICAgaGFuZGxlUHVyY2hhc2U9e3RoaXMuaGFuZGxlUHVyY2hhc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIEZvcm1PbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb3JtLXRpdGxlXCI+MSAvIDM8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJhZGRyZXNzLXRpdGxlXCI+QWNjb3VudCBJbmZvcm1hdGlvbjwvaDM+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPk5hbWU8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJNaWNreVwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcIm5hbWVcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+RW1haWw8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJtb3VzZUBnbWFpbC5jb21cIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZW1haWx9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiZW1haWxcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+UGFzc3dvcmQ8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJpbGlla2NoZWVzZVwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5wYXNzd29yZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJwYXNzd29yZFwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPE5leHRCdXR0b24gaGFuZGxlTmV4dEJ1dHRvbj17dGhpcy5wcm9wcy5oYW5kbGVOZXh0QnV0dG9ufSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBGb3JtVHdvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9ybS10aXRsZVwiPjIgLyAzPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiYWRkcmVzcy10aXRsZVwiPkFkZHJlc3M8L2gzPlxuXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkxpbmUgMTwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjUyMjUgTlcgQmVsaGF2ZW4gRHIuXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmFkZHJlc3NMaW5lT25lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcImFkZHJlc3NMaW5lT25lXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkxpbmUgMjwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBPICMxXCJcbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmFkZHJlc3NMaW5lVHdvfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcImFkZHJlc3NMaW5lVHdvXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkNpdHk8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb3J2YWxpaXNcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuY2l0eX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMucHJvcHMuaGFuZGxlSW5wdXQoZSwgXCJjaXR5XCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPlN0YXRlPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT1JcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuc3RhdGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwic3RhdGVcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb3JtLXN1YnRpdGxlXCI+WmlwIENvZGU8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCI5NzMzMFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy56aXB9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiemlwXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8TmV4dEJ1dHRvbiBoYW5kbGVOZXh0QnV0dG9uPXt0aGlzLnByb3BzLmhhbmRsZU5leHRCdXR0b259IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIEZvcm1UaHJlZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvcm0tdGl0bGVcIj4zIC8gMzwvaDI+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiYWRkcmVzcy10aXRsZVwiPlBheW1lbnQgSW5mb3JtYXRpb248L2gzPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvcm0tc3VidGl0bGVcIj5DQ04jPC9wPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgaWQ9XCJteWlucHV0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMDAwMC0wMDAwLTAwMDAtMDAwMFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jY259XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiY2NuXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkNWVjwvcD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGlkPVwibXlpbnB1dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjEyM1wiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jdnZ9XG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB0aGlzLnByb3BzLmhhbmRsZUlucHV0KGUsIFwiY3Z2XCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1zdWJ0aXRsZVwiPkJpbGxpbmcgWmlwIENvZGU8L3A+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBpZD1cIm15aW5wdXRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCI5NzMzMFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5iaWxsaW5nWmlwfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5wcm9wcy5oYW5kbGVJbnB1dChlLCBcImJpbGxpbmdaaXBcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxQdXJjaGFzZUJ1dHRvbiBoYW5kbGVQdXJjaGFzZT17dGhpcy5wcm9wcy5oYW5kbGVQdXJjaGFzZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgTmV4dEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5leHQtYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICA8YnV0dG9uIGlkPVwibmV4dC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLmhhbmRsZU5leHRCdXR0b24oKX0+XG4gICAgICAgICAg4p6eXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBQdXJjaGFzZUJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB1cmNoYXNlLWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGlkPVwicHVyY2hhc2UtYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLmhhbmRsZVB1cmNoYXNlKCl9XG4gICAgICAgID5cbiAgICAgICAgICBzdWJtaXRcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpO1xuIl19
