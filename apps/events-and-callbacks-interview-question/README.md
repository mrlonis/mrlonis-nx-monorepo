# events-and-callbacks-interview-question

## Question

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

### Solution

In the provided code, when the text input with the id 'input' is changed, the handleNameChangedEvent function is set up as an event listener using the addEventListener method. The event listener is correctly defined, and it should work without errors. However, there is a potential issue with the context of the this keyword.

The correct answer is:

2. this.setName is not a function

The reason for this is that when the handleNameChangedEvent function is executed as an event handler, the context (this) inside the function will refer to the DOM element that triggered the event (event.currentTarget), not the view object. Therefore, when you try to call this.setName(event.currentTarget.value);, you are trying to call setName on a DOM element, which is not a function, leading to an error.

To fix this issue and ensure that this refers to the view object inside the handleNameChangedEvent function, you can use arrow function syntax for the event handler, as mentioned in the previous response:

```js
var view = {
  name: null,
  handleNameChangedEvent: (event) => {
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

With this change, this inside handleNameChangedEvent will correctly refer to the view object, and there will be no error.

## Solution Used

2. this.setName is not a function
