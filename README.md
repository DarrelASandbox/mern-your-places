## About The Project

- React, NodeJS, Express & MongoDB - The MERN Fullstack Guide
- Build fullstack React.js applications with Node.js, Express.js & MongoDB (MERN) with this project-focused course
- Tutorial for YourPlaces
- [Maximilian Schwarzmüller](https://github.com/maxschwarzmueller)
- [Manuel Lorenz](https://academind.com/)
- [Academind](https://academind.com/)

&nbsp;

## Installation

1. Install NPM packages.

```sh
npm install
```

2. Rename <code>.env.temp</code> to <code>.env</code>
3. Fill in the respective fields in the .env files (frontend & backend)

&nbsp;

## Notes

### ReactDOM.createPortal(child, container)

- Move overlay (e.g. SideDrawer.js) under <code>body</code>

![drawer-hook](screenshots/drawer-hook.png)

### useEffect()

- Hooks are an important concept in modern React - they allow you to add various functionalities to functional components. And that's important: <b>Only to functional components.</b>

- <i>If you're building class-based components (which you also can), you can't use hooks - you got different APIs there.</i>

- <code>useState()</code> allowed us to register state which then is managed inside of a component. When state is changed, the component re-renders (or to be precise: It is re-evaluated and might lead to a re-rendering of the DOM).

- <code>useEffect()</code> does something different: It allows you to <b>register some logic</b> (i.e. a JS function) which will be executed when certain <b>dependencies</b> - which you define - change.
- Let's have a look at the <code>Map</code> example:

```js
useEffect(() => {
  const map = new window.google.maps.Map(mapRef.current, {
    center: center,
    zoom: zoom,
  });

  new window.google.maps.Marker({ position: center, map: map });
}, [center, zoom]);
```

- The logic here (i.e. the function) is to render a map + a marker on the map. The dependencies, that define when this logic should re-run, are our <code>center</code> and <code>zoom</code> variables. Whenever at least one of these two dependencies changes, the function re-runs. And that makes sense: If we got a new center or zoom level, we want to re-render the map!

- However, React does not track these dependencies behind the scenes. Instead, <code>useEffect()</code> re-evaluates the dependency values whenever the component in which you use <code>useEffect()</code> is re-evaluated (i.e. whenever the component's props or state changed).

- If the component is re-evaluated and the dependencies did NOT change, the logic in <code>useEffect()</code> won't run again.

- Important: The <code>useEffect()</code> logic re-runs <b>AFTER</b> the component (including its JSX code) was re-evaluated. That means, that the first execution of the <code>useEffect()</code> logic (when a component mounts for the first time) will <b>ALWAYS</b> happen <b>AFTER</b> the component rendered for the first time.

&nbsp;

---

&nbsp;

### Custom Hooks

- You can build a hook that uses other built-in hooks (like <code>useState()</code>) and any component that uses your hook will then use the built-in hooks you might be using in your custom hook as well.

- This allows you to build hooks like the <code>useForm()</code> hook we started to build in the previous lecture. The idea here is that we can share our stateful form logic (that uses <code>useReducer()</code> in our case) across components. This avoids code duplication, makes it easy to change the code and leads to more readable code.

- With all that "custom hook" jargon, it's easy to overlook that custom hooks in the end are normal JavaScript functions though - never forget that!

- If you use <code>useForm()</code> in your component function, it will get called for every re-evaluation of your component (i.e. for every re-render cycle). Hence all the logic in a custom hook runs every time your component function is executed.

- Of course a lot of built-in hooks like <code>useState()</code> or <code>useReducer()</code> have mechanisms to ensure that state changes are kept across re-render cycles.

&nbsp;

### Custom Error

- [MDN - Custom Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types)
- [SO - How to reject in async/await syntax?](https://stackoverflow.com/questions/42453683/how-to-reject-in-async-await-syntax)

&nbsp;

> <b>Elson:</b> Difference between Throw error and returning next(error)

> <b>Maximilian:</b> Yes, absolutely - and we do highlight that in the course. In an async task (e.g. in a promise), you need to use next(error) - throw error will NOT cause the error handling middleware to become active.

&nbsp;

---

&nbsp;

### NOSQL VS SQL

|                  NOSQL                   |                      SQL                      |
| :--------------------------------------: | :-------------------------------------------: |
|             MongoDB, CouchDB             |                 MySQL, MS SQL                 |
|         Enforces no Data Schema          |         Enforces a Strict Data Schema         |
|        Less Focused on Relations         |         RElations are a Core Feature          |
|         "Independent Documents"          |              Records are Related              |
| Great for: Logs, Orders, (Chat) Messages | Great for: Shopping Carts, Contacts, Networks |

&nbsp;

> <b>James: </b>Bcrypt vs Crypto

> <b>Adam: </b>The native crypto module is too fast at creating its hashes so it's not something you want to use for hashing passwords. You want something on the slower end like bcrypt or agron2 to help mitigate brute force attacks.

&nbsp;

---

&nbsp;

### Transactions

- [mongoose transactions](https://mongoosejs.com/docs/transactions.html)

> <b>Artur: </b>Potential security leak with populate()

> Bare in mind that if you use populate() the referenced object is inserted as-is. Thus, if we return the delete place to the frontend (for a notification for example), the creator is exported in the JSON as well. Together with the password of course.

> <b>Adam: </b>You can specify the fields you want to exclude from .populate() as its second parameter:

```js
.populate('something', '-field1 -field2')
```

&nbsp;

---

&nbsp;

> <b>Guilherme: </b>For which reason a session has to be started?

> <b>Jost: </b>In general (not specific to MongoDB), if you have multiple database accesses, it is safer to do this in a transaction. In this way the related parts are prevented from being modified by another user, until the transaction is finished.

> A simple real world example would be that two persons want to take out money from the same account, using two different cash machines. Without blocking the access until the first person has finished the whole transaction, it might happen that both get the same account status of 100$ displayed in the beginning, and then both draw 100$ from this account without being aware of the fact that the account is in the red in the end.

> <b>BTW:</b> Remember that the problem arises since the database access is asynchronous. For the same reason we don't need transactions for accessing the browser's localStorage (synchronous), but we need transactions for accessing the browser's IndexedDB (asynchronous).

&nbsp;

---

&nbsp;

> <b>Artur: </b>Do we need session.endSession()?

> <b>Adam: </b>Nope, sessions are also closed during garbage collection so it doesn't need to be called.

&nbsp;

---

&nbsp;
