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

To make an easy chainable way to create a CLI fast. This provides a complete package for basic command line tools. 

### Example

```typescript
const dsLog : DSLogger = require("dslog");
(async () => {
  dsLog
    //Define the program 
    .defineSplashScreen(()=>{
      dsLog
      .newScreen()
      .show(dsLog.getString("star"), "Raw")
      .logProgramTitle()
      .sleep(500);
    })
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
    .ask("enter name", "name", "string")
    .ask("enter num", "num", "number");
  (await dsLog.startPrompt())
  .showSleep(dsLog.getInput("name"), "Info")
    .restartPrompt()
    .ask("enter email", "email", "email")
    .ask("enter password", "pass", "password")
    .ask("enter comment", "comment", "string");
  (await dsLog.startPrompt())
  .showSleep(dsLog.getInput("comment"), "Info")
})();
```

# Documentation

## Table Of Conents

* [Functions And Types](#functions-and-types) 
    * [Program Params](#program-params) 
    * [Show and Log Functions](#show-and-log-functions)
    * [User Input Function](#user-input-function)
    * [Progress Bar](#progress-bar)
    * [Service Bar](#service-bar)
    * [Stylize Functions](#stylize-functions)
    * [Define and Get Functions](#define-and-get-functions)
    * [Row Functions](#row-functions)
    * [Sleep Functions](#row-functions)

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
| **displayScreen**    | (**screen**:Screens,**args**:any)                                                           | self    | Logs the program defined screen at the current 
| **splashScreen**    | none                                                           | self    | Logs the program defined splashscreen at the current row.                        |
| **promgramInitErrorScreen** | **message** : string                 | self    | Logs the program defined program init error screen at the current row.                        |
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
| **custom**    | Allow for a custom input type. Must define validation later. |

> **Functions**

| Function          | Params                                                                   | Returns                       | Description                    |
| ----------------- | ------------------------------------------------------------------------ | ----------------------------- | ------------------------------ |
| **startPrompt**   | none                                                                     | Promise of self               | Starts the user input prompt.  |
| **restartPrompt** | none                                                                     | self                          | Re-sets the user input prompt. |
| **ask**           | **question** : string, **varName** : string ,**varType** : QuestionTypes,**customName** ?: string | self | Add a question to the prompt. If using a custom question type you must supply the name of the custom type.|
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
| **reInitServiceBar** | **name** : string | self    | Resets a service bar.                          |
| **destroyServiceBar**| **name** : string| self    | Destroys a service bar.                          |

### Stylize Functions

> **Console Colors**

| Color Name  | 
| ----------- | 
| **Black**   | 
| **Red**  |   
| **Green**  |
| **Yellow**|  
| **Blue**   |  
| **Magenta** |  
| **Cyan**  | 
| **White**  | 

> **Style Object**

All properties are optional. 
| Name        | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| **fg**   | Foreground color. Must be a ConsoleColor. |
| **bg**  | Background color. Must be a ConsoleColor. |
| **bright**     | Makes the colors bright. |
| **dim**     | Makes the colors dim. |
| **underscore**| Makes the text underscored. |
| **blink**   | Makes the text blink |
| **reverse** | Inverts the foreground and background colors. |
| **hidden**  | Makes the text hidden. |

> **Style Functions**

| Function               | Params                                          | Returns | Description                                             |
| ---------------------- | ----------------------------------------------- | ------- | ------------------------------------------------------- |
| **styleize** | **text** : string, **styleObj** : StyleObject             | self    | Returns a string stylized with the given format. |
| **black**      | **text** : string                                       | string    | Returns a string stylized to be black.         |
| **red**      | **text** : string                                         | string    | Returns a string stylized to be red.           |
| **green**      | **text** : string                                       | string    | Returns a string stylized to be green.         |
| **yellow**      | **text** : string                                      | string    | Returns a string stylized to be yellow.        |
| **blue**      | **text** : string                                        | string    | Returns a string stylized to be blue.          |
| **magenta**      | **text** : string                                     | string    | Returns a string stylized to be magenta.       |
| **cyan**      | **text** : string                                        | string    | Returns a string stylized to be cyan.          |
| **white**      | **text** : string                                       | string    | Returns a string stylized to be white.         |
| **brightBlack**  | **text** : string                                     | string    | Returns a string stylized to be bright black.         |
| **brightRed**    | **text** : string                                     | string    | Returns a string stylized to be bright red.           |
| **brightGreen**  | **text** : string                                     | string    | Returns a string stylized to be bright green.         |
| **brightYellow** | **text** : string                                     | string    | Returns a string stylized to be bright yellow.        |
| **brightBlue**   | **text** : string                                     | string    | Returns a string stylized to be bright blue.          |
| **brightMagenta**| **text** : string                                     | string    | Returns a string stylized to be bright magenta.       |
| **brightCyan**   | **text** : string                                     | string    | Returns a string stylized to be bright cyan.          |
| **brightWhite**  | **text** : string                                     | string    | Returns a string stylized to be bright white.         |
| **blackBG**      | **text** : string,**fg** ?: ConsoleColor               | string    | Returns a string stylized to be black blackground.         |
| **redBG**      | **text** : string,**fg** ?: ConsoleColor        | string    | Returns a string stylized to be red blackground.           |
| **greenBG**      | **text** : string,**fg** ?: ConsoleColor               | string    | Returns a string stylized to be green blackground.         |
| **yellowBG**      | **text** : string,**fg** ?: ConsoleColor                            | string    | Returns a string stylized to be yellow blackground.        |
| **blueBG**      | **text** : string,**fg** ?: ConsoleColor                                      | string    | Returns a string stylized to be blue blackground.          |
| **magentaBG**      | **text** : string,**fg** ?: ConsoleColor                   | string    | Returns a string stylized to be magenta blackground.       |
| **cyanBG**      | **text** : string,**fg** ?: ConsoleColor                         | string    | Returns a string stylized to be cyan blackground.          |
| **whiteBG**      | **text** : string,**fg** ?: ConsoleColor                      | string    | Returns a string stylized to be white blackground.         |
| **brightBlackBG**  | **text** : string,**fg** ?: ConsoleColor          | string    | Returns a string stylized to be bright black blackground.         |
| **brightRedBG**    | **text** : string,**fg** ?: ConsoleColor                      | string    | Returns a string stylized to be bright red blackground.           |
| **brightGreenBG**  | **text** : string,**fg** ?: ConsoleColor                        | string    | Returns a string stylized to be bright green blackground.         |
| **brightYellowBG** | **text** : string,**fg** ?: ConsoleColor                        | string    | Returns a string stylized to be bright yellow blackground.        |
| **brightBlueBG**   | **text** : string,**fg** ?: ConsoleColor                            | string    | Returns a string stylized to be bright blue blackground.          |
| **brightMagentaBG**| **text** : string,**fg** ?: ConsoleColor                             | string    | Returns a string stylized to be bright magenta blackground.       |
| **brightCyanBG**   | **text** : string,**fg** ?: ConsoleColor                               | string    | Returns a string stylized to be bright cyan blackground.          |
| **brightWhiteBG**  | **text** : string,**fg** ?: ConsoleColor                           | string    | Returns a string stylized to be bright white blackground.         |
### Define and Get Functions

> **Strings**

Built in strings.
| Name        | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| **title**   | Title of the program. |
| **helpText**  | Text used for the help screen. |
| **star**     | Star art. |
| **seperator**| The seperator displayed when using logSeperator() |
| **questionDelimiter**   | The string that appears at the end of a question. |

> **Screens**

Built in screens. 
| Name        | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| **splash**  | The program splash screen. |
| **programInitError**   | Program init error screen. |
| **helpScreen**  | A userful help screen generated from the program params. |
| **crash**  | A crash screen. |
| **done**  | A screen to show when the program is done. |
| **noInput**  | a screen to show when the program runs with no input.  |

> **Functions**

| Function               | Params                                          | Returns | Description                                             |
| ---------------------- | ----------------------------------------------- | ------- | ------------------------------------------------------- |
| **defineValidator**    | type : QuestionTypes, **func** : (**input**:string)=>boolean, **customName** : string  | self    | Define the function to be called to validate input. |
| **defineScreen**       | screen : Screens, **func** : Function           | self    | Define the function to be called for a screen. |
| **defineSplashScreen** | **func** : Function                             | self    | Define the function to be called for the splash screen. This function is just to make it easy cause it is the most common screen to adjust. |
| **defineProgramTitle** | **title** : string, **styleObj**: StyleObject   | self    | Defines the programs title and optionally the style     |
| **defineHelpText**     | **text** : string                               | self    | Defines the programs help text.                         |
| **defineQuestionStyle**| **type**: "question" or "re-ask" or "delimiter", **styleObj**: StyleObject | self    | Use a style object to define a questions style.   |
| **defineMessageStyle** | **type**: MessageTypes, **styleObj**: StyleObject | self    | se a style object to define a message style.  |
| **getString**          | **name** : String                               | self    | Get a built in string.                                  |
| **setString**          | **name** : String, **string** : string          | self    | Set a built in string.                                  |

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
