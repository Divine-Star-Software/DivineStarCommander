<h1 align="center">
 &#9733; Divine Star Logger &#9733;
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---

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

A tool for making command lines tools with TypeScript or Javascript using Node.Js. It handles command line args, user input, help screen,
colored messages, progress bars, and so on. 

## Why?

To make an easy chainable way to create a CLI fast. 

### Example

```typescript
const dsLog : DSLogger = require("../../dist/index.js");
(async () => {
  //define program splash screen
  const splash = () => {
    dsLog
      .newScreen()
      .show(dsLog.getString("star"), "Raw")
      .logProgramTitle()
      .sleep(500);
  };
  dsLog
    //Define the program 
    .defineSplashScreen(splash)
    .defineProgramTitle("[ DS TESTING ]")
    .defineHelpText("This is an easy command line tool.")
    //Add command line args
    .addParam({
      flag: "a",
      name: "auto",
      desc: "Auto parse",
      type: "boolean",
      required: false,
      valueNeeded: true,
    })
    .addParam({
      flag: "b",
      name: "batch",
      desc: "Auto batch",
      type: "string",
      required: false,
      valueNeeded: true,
    })
    .addParam({
      flag: "c",
      name: "cache",
      desc: "Auto cache",
      type: "number",
      required: false,
      valueNeeded: false,
    })
    .newScreen()
    //Get command line args
    .initProgramInput()
    //Check if they are set
    .ifParamIsset("a", (value: any, args: any) => {
      dsLog.showSleep(value, "Info");
    })
    .ifParamIsset("b", (value: any, args: any) => {
      dsLog.showSleep(value, "Info");
    })
    .ifParamIsset("c", (value: any, args: any) => {
      dsLog.showSleep(value, "Info");
    })
    .newScreen()
    .show(dsLog.getParam("a"), "Raw")
    .show(dsLog.getParam("b"), "Raw")
    .show(dsLog.getParam("c"), "Raw")
    .sleep(1000)
    //Start a new screen
    .splashScreen()
    .showSleep("BLINK", "Blink")
    .showSleep("Some Info", "Info")
    .showSleep("Everything is fine", "Good")
    .showSleep("Everything is not fine.", "Error")
    .showSleep("Something may be wrong", "Warning")
    .newScreen()
    //Add a progress and service bar
    .newProgressBar("test");
  await dsLog.incrementProgressBar("test", 100);
  dsLog.newServiceBar("test");
  (await dsLog.asyncSleep(3000))
  .destroyServiceBar("test")
  .newScreen()
    .showSleep("All good.", "Raw")
    .newScreen()
    //Get users input
    .show("Starting user input", "Info")
    .ask("enter name ", "name", "string")
    .ask("enter num ", "num", "number");
  (await dsLog.startPrompt())
  .showSleep(dsLog.getInput("name"), "Info")
    .restartPrompt()
    .ask("enter email ", "email", "email")
    .ask("enter password ", "pass", "password")
    .ask("enter comment ", "comment", "string");
  (await dsLog.startPrompt())
  .showSleep(dsLog.getInput("comment"), "Info")
})();
```

# Documentation

If you use this as a node module it will auto require "readline" which is built into node.js.

If you need to access readline later you can grab it from the dslog object.

## Functions And Types
### Program Params
> **Param Types**

| Type          | Description                                         |
| ------------- | --------------------------------------------------- |
| **string**    | Just chars.                                         |
| **stringall** | A string of chars and numbers.                      |
| **string**    | Just numbers.                                         |
| **boolean**   | Can be left blank for true or user can input "true"/"false"|

> **Param Object**

| Type          | Description                                         |
| ------------- | --------------------------------------------------- |
| **flag**      | Flag for cli to look for. Must be a single char. It look for your flag with "-" appended.|
| **name**      | Name for cli to look for. Must be a single char. It look for your flag with "--" appended.|
| **desc**      | Description used for help screen.|
| **type**      | The type of param. Must be ParamType.|
| **required**  | Default is false. If set to true the prgram will show an error if this param is not set. |
| **valueNeeded** | Default is false. If set to true the user must enter a value for a flag if used. Otherwise the param is set to a blank string for numbers. For boolean it is auto set to true. And finally for numbers it will default to 0.|
> **Functions**

| Function          | Params                                                                   | Returns                       | Description                    |
| ----------------- | ------------------------------------------------------------------------ | ----------------------------- | ------------------------------ |
| **addParam**      | param : ParamObject                                                      | self                          | Adds a param to the program.   |
| **getParam**      | getParam : string                                                        | self                          | Get a users input for a param. |
| **ifParamIsset**  | **param** : string, **func** : (**value**:any,**args**:any)=>{} ,**args** : any | self  | If a param is set run a function that will be passed the value and any args you give as the arg object.  |
| **initProgramInput**| none                                                                   | self | Parse the users input. Must be called in order for the param functions to work. |

### Show and Log Functions
> **Functions**

| Function          | Params                                                                   | Returns                       | Description                    |
| ----------------- | ------------------------------------------------------------------------ | ----------------------------- | ------------------------------ |
| **startPrompt**   | none                                                                     | Promise of self               | Starts the user input prompt.  |
| **restartPrompt** | none                                                                     | self                          | Re-sets the user input prompt. |
| **ask**           | **question** : string, **varName** : string ,**varType** : QuestionTypes | self                          |                                |
| **getInput**      | none                                                                     | string or number or undefined | Get input from question        |
### Show and Log Functions
> **Message Types**

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

> **Functions**

| Function            | Params                                                         | Returns | Description |
| ------------------- | -------------------------------------------------------------- | ------- | ------------|
| **show**            | **message** : string, **type** : MessageType                   | self    | Logs message at current row.                                                     |
| **showSleep**       | **message** : string, **type** : MessageType, **ms** : number  | self    | Logs message at current sleep row then sync sleep for given miliseconds.         |
| **showAt**          | **message** : string, **type** : MessageType, **row** : number | self    | Logs message at given row.                                                       |
| **logProgramTitle** | none                                                           | self    | Logs the program defined title at the current row with the given title style.    |
| **logSeperator**    | none                                                           | self    | Logs the program defined seperator at the current row with the given info style. |
| **splashScreen**    | none                                                           | self    | Logs the program defined splashscreen at the current row.                        |
| **newScreen**       | none                                                           | self    | Clears the screen and resets the console log row.                                |
### User Input Function
>  **Question Types**

| Type          | Description                                         |
| ------------- | --------------------------------------------------- |
| **string**    | Just chars.                                         |
| **stringall** | A string of chars and numbers.                      |
| **number**    | Just numbers.                                       |
| **digit**     | Just one digit.                                     |
| **email**     | An email.                                           |
| **password**  | String of chars and numbers. Output will be hidden. |

> **Functions**

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
