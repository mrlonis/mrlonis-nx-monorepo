# events-and-callbacks-interview-question

Assuming the body tag of the webpage contains the attribute `onload="onLoad()"`, what error will occur when the text input with id `input` is changed?

```js
var view = {
  name: null,
  handleNameChangedEvent: function (event) {
    this.setName(event.currentTarget.value);
    console.log(this.name);
  },
  setName: function (nameString) {
    this.name = nameString;
  }
};
function onLoad() {
  document.getElementById('input').addEventListener('change', view.handleNameChangedEvent);
}
```

1. no error will occur, `undefined` will be printed in the `console`
2. `this.setName` is not a function
3. no error will occur, nothing will be output
4. `handleNameChangedEvent` is not a function
