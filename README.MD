<h1 align="center">
 &#9733; Divine Star Logger &#9733;
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---

### Info

![GitHub top language](https://img.shields.io/github/languages/top/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub repo size](https://img.shields.io/github/repo-size/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub latest release](https://img.shields.io/github/v/release/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub latest version](https://img.shields.io/npm/v/dslog?color=purple&style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub commit actiivty](https://img.shields.io/github/commit-activity/y/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub followers](https://img.shields.io/github/followers/lucasdamianjohnson?color=purple&style=plastic)
![GitHub stars](https://img.shields.io/github/stars/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub watchers](https://img.shields.io/github/watchers/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)

## What Is It?

A simple way to log output for a command line program. It is written in typescript.
It can be used as a node module or you can just download the class itself and use it.

## Why?

To make an easy chainable way to display command line output using modern typescript.

### Example

```typescript
const dsLog: DSLogger = require("dslog");

(async () => {
  const splash = () => {
    dsLog
      .newScreen()
      .show(dsLog.getString("star"), "Raw")
      .logProgramTitle()
      .sleep(500);
  };
  dsLog
    .defineProgramTitle("[ DS LOGGER test ]")
    .defineSplashScreen(splash)
    .splashScreen()
    .showSleep("BLINK", "Blink")
    .showSleep("Some Info", "Info")
    .showSleep("Everything is fine", "Good")
    .showSleep("Everything is not fine.", "Error")
    .showSleep("Something may be wrong", "Warning")
    .newProgressBar("test");
  await dsLog.incrementProgressBar("test", 100);

  dsLog.newServiceBar("test");

  (await dsLog.asyncSleep(3000)).newScreen().show("All good.", "Raw");

  dsLog
    .newScreen()
    .ask("enter name ", "name", "string")
    .ask("enter num ", "num", "number");
  await dsLog.startPrompt();

  dsLog
    .restartPrompt()
    .ask("enter email ", "name1", "email")
    .ask("enter password ", "pass", "password")
    .ask("enter comment ", "comment", "string");
  await dsLog.startPrompt();
})();
```

# Documentation

If you use this as a node module it will auto require "readline" which is built into node.js.

If you need to access readline later you can grab it from the dslog object.

## Message Types

| Type        | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| **Info**    | Message with blue background and white text.                                         |
| **Good**    | Message with green background and white text.                                        |
| **Warning** | Message with yellow background and white text.                                       |
| **Error**   | Message with red background and white text.                                          |
| **Title**   | Message with purple background.                                                      |
| **Raw**     | Message with no styling.                                                             |
| **Data**    | Message sent as JSON object. Will be convereted to string and shown without styling. |
| **Blink**   | Message with blink style.                                                            |

## Functions

### Show and Log Functions

| Function            | Params                                                         | Returns | Description                                                                      |
| ------------------- | -------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| **show**            | **message** : string, **type** : MessageType                   | self    | Logs message at current row.                                                     |
| **showSleep**       | **message** : string, **type** : MessageType, **ms** : number  | self    | Logs message at current sleep row then sync sleep for given miliseconds.         |
| **showAt**          | **message** : string, **type** : MessageType, **row** : number | self    | Logs message at given row.                                                       |
| **logProgramTitle** | none                                                           | self    | Logs the program defined title at the current row with the given title style.    |
| **logSeperator**    | none                                                           | self    | Logs the program defined seperator at the current row with the given info style. |
| **splashScreen**    | none                                                           | self    | Logs the program defined splashscreen at the current row.                        |
| **newScreen**       | none                                                           | self    | Clears the screen and resets the console log row.                                |

### Question Types

| Type          | Description                                         |
| ------------- | --------------------------------------------------- |
| **string**    | Just chars.                                         |
| **stringall** | A string of chars and numbers.                      |
| **number**    | Just numbers.                                       |
| **digit**     | Just one digit.                                     |
| **email**     | An email.                                           |
| **password**  | String of chars and numbers. Output will be hidden. |

### User Input Function

| Function          | Params                                                                   | Returns                       | Description                    |
| ----------------- | ------------------------------------------------------------------------ | ----------------------------- | ------------------------------ |
| **startPrompt**   | none                                                                     | Promise of self               | Starts the user input prompt.  |
| **restartPrompt** | none                                                                     | self                          | Re-sets the user input prompt. |
| **ask**           | **question** : string, **varName** : string ,**varType** : QuestionTypes | self                          |                                |
| **getInput**      | none                                                                     | string or number or undefined | Get input from question        |

### Progress Bar

| Function                 | Params                               | Returns         | Description                                                                  |
| ------------------------ | ------------------------------------ | --------------- | ---------------------------------------------------------------------------- |
| **newProgressBar**       | **name** : string                    | self            | Creates a new progress bar at the current row with the given name as its id. |
| **incrementProgressBar** | **name**: string, **amount**: number | Promise of self | Increase the given progress bars progress.                                   |

### Service Bar

| Function             | Params            | Returns | Description                                      |
| -------------------- | ----------------- | ------- | ------------------------------------------------ |
| **newServiceBar**    | **name** : string | self    | Makes a continuous loading bar at the given row. |
| **reInitServiceBar** | **name** : string | self    | Resets the service bar.                          |

### Row Functions

| Function      | Params                               | Returns | Description                         |
| ------------- | ------------------------------------ | ------- | ----------------------------------- |
| **getRow**    | none                                 | number  | Gets the current output row.        |
| **setRow**    | **row** : number                     | self    | Sets the output row.                |
| **addRow**    | none                                 | self    | Adds one to the current output row. |
| **clearRows** | **start** : number, **end** : number | self    | Clears given row range.             |

### Sleep Functions

| Function   | Params          | Returns         | Description                                 |
| ---------- | --------------- | --------------- | ------------------------------------------- |
| **sleep**  | **ms** : number | self            | Make the progarm sleep via a sync method.   |
| **setRow** | **ms** : number | Promise of self | Make the program sleep via an async method. |

### Define and Get Functions

| Function               | Params                                          | Returns | Description                                             |
| ---------------------- | ----------------------------------------------- | ------- | ------------------------------------------------------- |
| **defineSplashScreen** | **func** : Function                             | self    | Define the function to be called for the splash screen. |
| **defineProgramTitle** | **title** : string                              | self    | Defines the programs title.                             |
| **defineMessageStyle** | **type**: MessageTypes, **styleString**: string | self    | Use console code to styleize messages.                  |
| **getString**          | **name** : string                               | self    | Get a built in string.                                  |
