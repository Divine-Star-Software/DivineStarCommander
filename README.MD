<h1 align="center">
 &#9733; Divine Star Logger &#9733;
</h1>
 
<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>
 
---
 
![GitHub top language](https://img.shields.io/github/languages/top/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub repo size](https://img.shields.io/github/repo-size/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![npm own loads](https://img.shields.io/npm/dt/dslog?color=purple&style=plastic)
![GitHub latest release](https://img.shields.io/github/v/release/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub latest version](https://img.shields.io/npm/v/dslog?color=purple&style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub commit actiivty](https://img.shields.io/github/commit-activity/y/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub followers](https://img.shields.io/github/followers/lucasdamianjohnson?color=purple&style=plastic)
![GitHub stars](https://img.shields.io/github/stars/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
![GitHub watchers](https://img.shields.io/github/watchers/lucasdamianjohnson/DivineStarLoggger?color=purple&style=plastic)
 
## What Is It?
 
A tool for making command line tools with TypeScript or Javascript using Node.Js. It handles command line args, user input, help screen,
colored messages, progress bars, and so on.
 
## Why?
 
To make an easy chainable way to create a CLI fast. This provides a complete package for basic command line tools.

## How To Start

Start a new node project and install typescrit and dslog.

```console
  npm init
  npm i --save-dev typescript tslib @types/node
  npm i --save dslog
```

In your typescript config file set the types to be. 

```json
{

    "types" : ["node","tslib","dslog"]

}
```

And then you can simply require the dslog object and define it as DSLogger. 

See the code bellow to get started quickly. 
 
### Starter Code
 
```typescript
const dsLog : DSLogger = require("dslog");
(async () => {
  dsLog
    //Define the program
    .defineSplashScreen(() => {
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
    .newScreen();
    //Get command line args
    (await dsLog.initProgramInput())
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
    .RAW
    .show(dsLog.getParam("a"))
    .show(dsLog.getParam("b"))
    .show(dsLog.getParam("c"))
    .sleep(1000)
    //Start a new screen
    .splashScreen()
    .BLINK.showSleep("BLINK")
    .INFO.showSleep("Some Info.")
    .GOOD.showSleep("Everything is fine.")
    .ERROR.showSleep("Everything is not fine.")
    .WARNING.showSleep("Something may be wrong.").CLEAR
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
    .fail(true, "Password is not correct.", 3, () => {
      process.exit(0);
    })
    .ask("enter comment", "comment", "string");
  (await dsLog.startPrompt()).showSleep(dsLog.getInput("comment"), "Info");
})();
```
 
# Documentation
 
## Table Of Contents
 
- [Functions And Types](#functions-and-types)
  - [Program Params](#program-params)
  - [Show and Log Functions](#show-and-log-functions)
  -  - [Show vs Log](#show-vs-log)
  - [User Input Functions](#user-input-functions)
  - [Progress Bar](#progress-bar)
  - [Service Bar](#service-bar)
  - [Stylize Functions](#stylize-functions)
  - [Define and Get Functions](#define-and-get-functions)
  - [Row Functions](#row-functions)
  - [Sleep Functions](#row-functions)
  - [Do and Service Functions](#do-and-service-functions)
  - [Other Functions](#other-functions)
 
If you use this as a node module it will auto require "readline" which is built into node.js.
 
If you need to access readline later you can grab it from the dslog object.
 
## Functions And Types
 
### Program Params
 
Functions related to getting command line input for the program.

```typescript
dsLog
  .addParam({
    flag: "a",
    name: "auto",
    desc: "Auto parse",
    type: "string[]",
    required: false,
    valueNeeded: true,
  })
  .addParam({
    flag: "b",
    name: "batch",
    desc: "Batch parse",
    type: "boolean",
    required: false,
    valueNeeded: true,
  });
(await dsLog.initProgramInput())
  .ifParamIsset("a", (value: any, args: any) => {
    dsLog.logSleep(value);
  })
  .ifParamIsset("b", (value: any, args: any) => {
    dsLog.logSleep(value);
  })
  .logSleep(dsLog.getParam("b"));
```

> **Param Types**

| Type            | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| **string**      | Just chars.                                                 |
| **string[]**    | Just an arrary of strings with just chars.                  |
| **stringall**   | A string of chars and numbers.                              |
| **stringall[]** | A string array of chars and numbers.                        |
| **number**      | Just numbers.                                               |
| **number[]**    | Just an arrary of numbers.                                  |
| **boolean**     | Can be left blank for true or user can input "true"/"false" |
| **boolean[]**   | An array of booleans.                                       |

> **Param Object**

| Type            | Description                                                                                                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **flag**        | Flag for cli to look for. Must be a single char. It looks for your flag with "-" appended.                                                                                                                                   |
| **name**        | Name for cli to look for. Must be a single char. It looks for your flag with "--" appended.                                                                                                                                  |
| **desc**        | Description used for help screen.                                                                                                                                                                                            |
| **type**        | The type of param. Must be ParamType.                                                                                                                                                                                        |
| **required**    | Default is false. If set to true the program will show an error if this param is not set.                                                                                                                                    |
| **valueNeeded** | Default is false. If set to true the user must enter a value for a flag if used. Otherwise the param is set to a blank string for numbers. For boolean it is auto set to true. And finally for numbers it will default to 0. |

> **Functions**

| Function                 | Params                                                                          | Returns         | Description                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **addParam**             | param : ParamObject                                                             | self            | Adds a param to the program.                                                                                                   |
| **getInitalProgramArgs** | none                                                                            | string[]        | Get the params passed to the program before the start of the flags. For instance "node index.js -a" would return ['index.js']. |
| **getParam**             | getParam : string                                                               | self            | Get a user's input for a param.                                                                                                |
| **ifParamIsset**         | **param** : string, **func** : (**value**:any,**args**:any)=>{} ,**args** : any | self            | If a param is set, run a function that will be passed the value and any args you give as the arg object.                       |
| **initProgramInput**     | none                                                                            | Promise of self | Parse the user's input. Must be called in order for the param functions to work.                                               |

### Show and Log Functions

Functions related to logging to the console.

```typescript
dsLog
  .defineSleepTime(300)
  .INFO.logSleep(["Info 1", "Info 2", { cool: "This is cool" }])
  .WARNING.logSleep(["Warning 1", "Warning 2"])
  .RAW.logTable({ someData: ["1", "2", "4"] })
  .GOOD.defineSleepTime(100)
  .logSleep(["It", "is", "all", "good"]).CLEAR;
```

> **Message Types**

| Type        | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| **Info**    | Message with blue background and white text.                                        |
| **Good**    | Message with green background and white text.                                       |
| **Warning** | Message with yellow background and white text.                                      |
| **Error**   | Message with red background and white text.                                         |
| **Title**   | Message with purple background.                                                     |
| **Raw**     | Message with no styling.                                                            |
| **Data**    | Message sent as JSON object. Will be converted to string and shown without styling. |
| **Blink**   | Message with blink style.                                                           |


> **Functions**
#### Show vs Log

Log functions just log the message without setting the console cursor. While show functions set the cursor then show the message. This can be usefull to show content at a specific row. Thoe normal log functions will work just for basic program outoput. Also, please note before using the show function it is best to clear the screen. And the progress bar and service bar use show functions not log functions right now. This is so you can have multiple of them and keep track of them. 

| Function                    | Params                                                                                                                                                         | Returns | Description                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| **newScreen**               | none                                                                                                                                                           | self    | Clears the screen and resets the console log row.                                |
| **show**                    | **message** : string or number or object or any[], **type** ?: MessageType or "none"                                                                           | self    | Logs message at current row.                                                     |
| **showSleep**               | **message** : string or number or object or any[], **type** ?: MessageType or "none" , **ms** ?: number                                                        | self    | Logs message at current sleep row then sync sleep for given miliseconds.         |
| **showAt**                  | **message** : string or number or object or any[], **params** : {**row** ?: number,**type** : MessageType or "none", , **col** ?: number }                     | self    | Logs message at given row.                                                       |
| **showAtSleep**             | **message** : string or number or object or any[], **params** : {**row** ?: number, **type** ?: MessageType or "none",**sleep** ?: number, **col** ?: number } | self    | Logs message at given row and sleeps.                                            |
| **log**                     | **message** : string or number or object or any[], **type** ?: MessageType or "none"                                                                           | self    | Log message without adjusting cursor position.                                   |
| **logSleep**                | **message** : string or number or object or any[], **type** ?: MessageType or "none", **ms** : number                                                          | self    | Log message and sleep without adjusting cursor position.                         |
| **showTable**               | **data** : object or object[], **collumens** ?: string[]                                                                                                       | self    | Moves cursor to current row and runs console.table.                              |
| **logTable**                | **data** : object or object[], **collumens** ?: string[]                                                                                                       | self    | Runs console.table.                                                              |
| **showProgramTitle**        | none                                                                                                                                                           | self    | Logs the program defined title at the current row with the given title style.    |
| **showSeparator**           | none                                                                                                                                                          | self | Logs the program defined separator with the given info style. |
| **logProgramTitle**         | none                                                                                                                                                           | self    | Logs the program defined title with the title style.    |
| **logSeparator**            | none                                                                                                                                                           | self    | Logs the program defined separator with the given info style. |
| **displayScreen**           | (**screen**:Screens,**args**:any)                                                                                                                              | self    | Logs the program defined screen at the current                                   |
| **splashScreen**            | none                                                                                                                                                           | self    | Logs the program defined splashscreen at the current row.                        |
| **errorScreen**             | **message** : string                                                                                                                                           | self    | Logs the program defined error screen at the current row.                        |
| **crashScreen**             | **message** : string                                                                                                                                           | self    | Logs the program defined crash screen at the current row.                        |
| **promgramInitErrorScreen** | **message** : string                                                                                                                                           | self    | Logs the program defined program init error screen at the current row.           |

### User Input Functions

Functions related to getting the user's input.

```typescript
dsLog
  .defineValidator(
    "custom",
    async (input: string | string[]) => {
      if (Array.isArray(input)) return false;
      let yes = ["yes", "y"];
      if (yes.indexOf(input) > -1) {
        return true;
      }
      return false;
    },
    "yes"
  )
  .ask("What is your name?", "name", "string")
  .fail(true, "Please re-enter your name.")
  .ask("What is your email?", "name", "email")
  .fail(true, "Please re-enter your email.")
  .ask("Do you agree to the terms?", "terms", "custom", "yes")
  .fail(true, "Are you sure? Please re-enter:", 2, () => {
    dsLog.BR.R.logSleep("Exiting...").exit();
  });
(await dsLog.startPrompt()).BRIGHT.BLUE.logSleep([
  "Your name is:",
  dsLog.getInput("name"),
]);
```

> **Question Types**

| Type            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| **string**      | Just chars.                                                  |
| **string[]**    | Just an arrary of strings with just chars.                   |
| **stringall**   | A string of chars and numbers.                               |
| **stringall[]** | A string array of chars and numbers.                         |
| **number**      | Just numbers.                                                |
| **number[]**    | Just an arrary of numbers.                                   |
| **boolean**     | True or false.                                               |
| **boolean[]**   | An array of booleans.                                        |
| **digit**       | Just one digit.                                              |
| **email**       | An email.                                                    |
| **password**    | String of chars and numbers. Output will be hidden.          |
| **custom**      | Allow for a custom input type. Must define validation later. |

> **Functions**

| Function          | Params                                                                                                                    | Returns                       | Description                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **startPrompt**   | none                                                                                                                      | Promise of self               | Starts the user input prompt.                                                                                                         |
| **restartPrompt** | none                                                                                                                      | self                          | Re-sets the user input prompt.                                                                                                        |
| **ask**           | **question** : string, **varName** : string ,**varType** : QuestionTypes,**customName** ?: string                         | self                          | Add a question to the prompt. If using a custom question type you must supply the name of the custom type.                            |
| **fail**          | **reAsk** : boolean, **reAskMessage** : string,**attempts** ?: number or "all",**onFail** ?: Function,**arg** ?: any = {} | self                          | And a fail case to the last asked question. If reAsk is set to false it will run the function supplied and pass it the args supplied. |
| **getInput**      | none                                                                                                                      | string or number or undefined | Get input from question                                                                                                               |

### Progress Bar

Functions and types related to making a progress bar.

> **Progress Bar Style**

| Type            | Description                                           |
| --------------- | ----------------------------------------------------- |
| **base**        | The base char. Default is "-".                        |
| **baseStyle**   | A style object for the base char.                     |
| **loaded**      | A loaded part for the bar. Default is "=".            |
| **loadedStyle** | A style object for the loaded char.                   |
| **size**        | The size of the progress bar.                         |
| **interval**    | The interval at which the bar fills. Default is 20ms. |

> **Functions**

| Function                 | Params                                          | Returns         | Description                                                                  |
| ------------------------ | ----------------------------------------------- | --------------- | ---------------------------------------------------------------------------- |
| **newProgressBar**       | **name** : string,**style** ?: ProgressBarStyle | self            | Creates a new progress bar at the current row with the given name as its id. |
| **incrementProgressBar** | **name**: string, **amount**: number            | Promise of self | Increase the given progress bars progress.                                   |

### Service Bar

Functions and types related to creating a service bar.

> **Progres Bar Style**

| Type               | Description                                        |
| ------------------ | -------------------------------------------------- |
| **base**           | The base char for the service bar. Default is "X". |
| **baseStyle**      | Style object for base char.                        |
| **loadedOne**      | First char for load sequence. Default is "0".      |
| **loadedOneStyle** | Style object for loaded one char.                  |
| **loadedTwo**      | Second char for load sequence. Default is "\|".    |
| **loadedTwoStyle** | Style object for loaded two char.                  |
| **cap**            | Char to appear at the end of the service bar.      |
| **capStyle**       | Style for the cap char.                            |
| **size**           | Size of the service bar.                           |
| **interval**       | Interval at which the bar loads. Default is 80ms.  |

> **Functions**

| Function              | Params                                         | Returns | Description                                      |
| --------------------- | ---------------------------------------------- | ------- | ------------------------------------------------ |
| **newServiceBar**     | **name** : string,**style** ?: ServiceBarStyle | self    | Makes a continuous loading bar at the given row. |
| **reInitServiceBar**  | **name** : string                              | self    | Resets a service bar.                            |
| **destroyServiceBar** | **name** : string                              | self    | Destroys a service bar.                          |

### Stylize Functions

Functions and types related to stylizing text.

> **Console Colors**

| Color Name  |
| ----------- |
| **Black**   |
| **Red**     |
| **Green**   |
| **Yellow**  |
| **Blue**    |
| **Magenta** |
| **Cyan**    |
| **White**   |

> **Style Object**

All properties are optional.
| Name | Description |
| ----------- | ------------------------------------------------------------------------------------ |
| **fg** | Foreground color. Must be a ConsoleColor. |
| **bg** | Background color. Must be a ConsoleColor. |
| **bright** | Makes the colors bright. |
| **dim** | Makes the colors dim. |
| **underscore**| Makes the text underscored. |
| **blink** | Makes the text blink |
| **reverse** | Inverts the foreground and background colors. |
| **hidden** | Makes the text hidden. |

> **Style Functions**

| Function    | Params                                        | Returns | Description                                      |
| ----------- | --------------------------------------------- | ------- | ------------------------------------------------ |
| **stylize** | **text** : string, **styleObj** : StyleObject | self    | Returns a string stylized with the given format. |

> **Style Short Codes**

The functions themselves will just return stylized text made from the chain. If you use the style alias it will set the style for the next set of outputs.

The example below will show a message with a bright red background and white text and then a bright blue background and white text. Notice that the
style must be cleared in-between the messages. This is so you can just re-use the same style if you want.

```typescript
dsLog
  .newScreen()
  .BR.W.RBG.showSleep("Error Message")
  .ERROR.showSleep(["Error Message", "Error Message 1", "Error Message 2"])
  .CLEAR.BR.W.BBG.showSleep("Info Message")
  .INFO.showSleep("Info Message 1")
  .showSleep("This will be the same style")
  .CLEAR.showSleep("This will not be.");
```

> List of All Functions

| Function       | DIRECTIVE         | Params                                   | Returns | Description                                                               |
| -------------- | ------------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------- |
| **clear**      | CLEAR CL      | none                                     | self    | Returns a string stylized to be bright.                                   |
| **info**       | INFO          | **text** : string                        | string  | Returns a string stylized to be the "info" message type.                  |
| **good**       | GOOD          | **text** : string                        | string  | Returns a string stylized to be the "good" message type.                  |
| **error**      | ERROR         | **text** : string                        | string  | Returns a string stylized to be the "error" message type                  |
| **warning**    | WARNING       | **text** : string                        | string  | Returns a string stylized to be the "warning" message type                |
| **title**      | TITLE         | **text** : string                        | string  | Returns a string stylized to be the "title" message type.                 |
| **raw**        | RAW           | **text** : string                        | string  | Returns a string stylized to be the "raw" message type.                   |
| **bright**     | BRIGHT BR     | **text** : string                        | string  | Returns a string stylized to be bright.                                   |
| **dim**        | DIM D         | **text** : string                        | string  | Returns a string stylized to be dim.                                      |
| **invert**     | INVERT I      | **text** : string                        | string  | Returns a string stylized to invert the background and foreground colors. |
| **underscore** | UNDERSCORE UNDERLINE U  | **text** : string                        | string  | Returns a string stylized to be underscored.                              |
| **hidden**     | HIDDEN H      | **text** : string                        | string  | Returns a string stylized to be hidden.                                   |
| **black**      | BLACK BL      | **text** : string                        | string  | Returns a string stylized to be black.                                    |
| **red**        | RED R         | **text** : string                        | string  | Returns a string stylized to be red.                                      |
| **green**      | GREEN G       | **text** : string                        | string  | Returns a string stylized to be green.                                    |
| **yellow**     | YELLOW Y      | **text** : string                        | string  | Returns a string stylized to be yellow.                                   |
| **blue**       | BLUE B        | **text** : string                        | string  | Returns a string stylized to be blue.                                     |
| **magenta**    | MAGENTA M     | **text** : string                        | string  | Returns a string stylized to be magenta.                                  |
| **cyan**       | CYAN C        | **text** : string                        | string  | Returns a string stylized to be cyan.                                     |
| **white**      | WHITE W       | **text** : string                        | string  | Returns a string stylized to be white.                                    |
| **blackBG**    | BLACKBG BLBG  | **text** : string,**fg** ?: ConsoleColor | string  | Returns a string stylized to be black background.                         |
| **redBG**      | REDBG RBG     | **text** : string,**fg** ?: ConsoleColor | string  | Returns a string stylized to be red background.                           |
| **greenBG**    | GREENBG GBG   | **text** : string,**fg** ?: ConsoleColor | string  | Returns a string stylized to be green background.                         |
| **yellowBG**   | YELLOWBG YBG  | **text** : string,**fg** ?: ConsoleColor | string  | Returns a string stylized to be yellow background.                        |
| **blueBG**     | BLUEBG BBG    | **text** : string,**fg** ?: ConsoleColor | string  | Returns a string stylized to be blue background.                          |
| **magentaBG**  | MAGENTABG MBG | **text** : string,**fg** ?: ConsoleColor | string  | Returns a string stylized to be magenta background.                       |
| **cyanBG**     | CYANBG CBG    | **text** : string,**fg** ?: ConsoleColor | string  | Returns a string stylized to be cyan background.                          |
| **whiteBG**    | WHITEBG WBG   | **text** : string,**fg** ?: ConsoleColor | string  | Returns a string stylized to be white background.                         |

### Directives 

Directives are all cap vars in the class that will do things if you get them. In the style section each color and output style has it's own directive which can be called to stylize the next output. 
Every directive will just return DSLogger so you can chain them together. 

Below are other directives and their uses. 

```typescript

dsLog.NS.BR.W.logSleep(["This will clear the screen","log bright white text ","and then stop"]).NL.EXIT;

```

| Name | Description |
| ----------- | ------------------------------------------------------------------------------------ |
| **NS NEWSCREEN** | Runs clearScreen. |
| **NL NEWLINE RETURN** | Prints a new line to the console.  |
| **EXIT** |  Runs exit. |


### Define and Get Functions

Functions related to setting default strings, screens, and validation. This is for full customization of the program.

> **Strings**

Built in strings.
| Name | Description |
| ----------- | ------------------------------------------------------------------------------------ |
| **title** | Title of the program. |
| **helpText** | Text used for the help screen. |
| **star** | Star art. |
| **seperator**| The seperator displayed when using logSeperator() |
| **questionStart** | The string that appears at the start of a question. |
| **questionDelimiter** | The string that appears at the end of a question. |
| **reAskStart** | The string that appears at the start of a re-ask. |
| **reAskText** | The string that appears as the default for a re-ask. |
| **reAskDelimiter** | The string that appears at the end of a re-ask. |

> **QuestionDisplayTypes**

Defined styles for the question outputs.
| Name | Description |
| ----------- | ------------------------------------------------------------------------------------ |
| **question-star** | Style for question start string. |
| **question** | Style for questions. |
| **delimiter** | Style for question delimiter. |
| **re-ask-start**| Style for re-ask start |
| **re-ask** | Style for re-ask. |
| **re-ask-delimiter** | Style for re-ask delimiter |

> **Screens**

Built in screens.
| Name | Description |
| ----------- | ------------------------------------------------------------------------------------ |
| **splash** | The program splash screen. |
| **programInitError** | Program init error screen. |
| **helpScreen** | A userful help screen generated from the program params. |
| **crash** | A crash screen. |
| **done** | A screen to show when the program is done. |
| **noInput** | a screen to show when the program runs with no input. |

> **Functions**

| Function                   | Params                                                                                          | Returns | Description                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **defineValidator**        | type : QuestionTypes, **func** : (**input**:string)=Promise\<boolean\>, **customName** : string | self    | Define the function to be called to validate input.                                                                                         |
| **defineSleepTime**        | **sleep** : number,                                                                             | self    | Define the default sleep time in ms.                                                                                                        |
| **defineScreen**           | **screen** : Screens, **func** : Function                                                       | self    | Define the function to be called for a screen.                                                                                              |
| **defineSplashScreen**     | **func** : Function                                                                             | self    | Define the function to be called for the splash screen. This function is just to make it easy cause it is the most common screen to adjust. |
| **defineProgramTitle**     | **title** : string, **styleObj**: StyleObject                                                   | self    | Defines the programs title and optionally the style                                                                                         |
| **defineHelpText**         | **text** : string                                                                               | self    | Defines the programs help text.                                                                                                             |
| **defineQuestionStyle**    | **type**: QuestionDisplayTypes, **styleObj**: StyleObject                                       | self    | Use a style object to define a questions style.                                                                                             |
| **defineMessageStyle**     | **type**: MessageTypes, **styleObj**: StyleObject                                               | self    | Set a style object to define a message style.                                                                                               |
| **defineProgressBarStyle** | **style**: ProgressBarStyle                                                                     | self    | Define the default progress bar style.                                                                                                      |
| **defineServiceBarStyle**  | **style**: ServiceBarStyle                                                                      | self    | Define the default service bar style.                                                                                                       |
| **getString**              | **name** : String                                                                               | self    | Get a built in string.                                                                                                                      |
| **setString**              | **name** : String, **string** : string                                                          | self    | Set a built in string.                                                                                                                      |

### Row Functions

Functions related to the output row.

| Function      | Params                               | Returns | Description                         |
| ------------- | ------------------------------------ | ------- | ----------------------------------- |
| **getRow**    | none                                 | number  | Gets the current output row.        |
| **setRow**    | **row** : number                     | self    | Sets the output row.                |
| **addRow**    | none                                 | self    | Adds one to the current output row. |
| **clearRows** | **start** : number, **end** : number | self    | Clears given row range.             |

### Sleep Functions

Functions used to make the program sleep.

| Function       | Params          | Returns         | Description                                 |
| -------------- | --------------- | --------------- | ------------------------------------------- |
| **sleep**      | **ms** : number | self            | Make the progarm sleep via a sync method.   |
| **asyncSleep** | **ms** : number | Promise of self | Make the program sleep via an async method. |

### Do and Service Functions

 Used for running a function in the command chain or starting a service. A service is just some code that runs on an interval. 

```typescript 
  dsLog
    .defineSleepTime(200)
    .do(() => {
      dsLog.BRIGHT.GREEN.logSleep(["do", "some", "stuff"]).CLEAR;
    })
    .newService("service-1", {
      interval: 2000,
      run: (args: any) => {
        args.count++;
        dsLog.NEWSCREEN.DIM.MAGENTA.UNDERLINE
        .logSleep(`RAN : ${args.count} TIMES`).CLEAR
        .DIM.CYAN.
        logSleep(["running","the","service"]);
      },
      args: {count:0},
    });
```


| Function         | Params                                                                                              | Returns | Description                                 |
| ---------------- | --------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------- |
| **do**           | **func** : (arg:any)=>any,**arg** ?: any                                                            | self    | Run a function in the chain.                |
| **newService**   | **name** : string , params : {**interval** : number,run : **func** : (arg:any)=>any,**arg** : any } | self    | Run a function in the chain on an interval. |
| **clearService** | **name** : string                                                                                   | self    | Stops a service from running.               |

### Other Functions

Other usefull functions.

| Function         | Params                                                                                              | Returns | Description                                 |
| ---------------- | --------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------- |
| **exit**         | none                                                                                                | none    | Runs process.exit(0).                       |
| **done**         | none                                                                                                | none    | Shows the done screen and then exits.       |
| **countLines**   | text : string                                                                                       | number  | Count the numbers of lines in a string.     |
