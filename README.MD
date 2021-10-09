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
![GitHub latest version](https://img.shields.io/npm/v/dsst?color=purple&style=plastic)
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
const dsLog : DSLogger = require("dslog");

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
  process.exit(1);
})();

```
# Documentation

If you use this as a node module it will auto require "readline" which is built into node.js. 

If you need to access readline later you can grab it from the dslog object. 

## Message Types
| Type | Description |
| --------------- | --------------- | 
| __Info__ | Message with blue background and white text. |
| __Good__ | Message with green background and white text. |
| __Warning__ | Message with yellow background and white text. |
| __Error__ | Message with red background and white text. |
| __Title__ | Message with purple background. |
| __Raw__ | Message with no styling. |
| __Data__ | Message sent as JSON object. Will be convereted to string and shown without styling. |
| __Blink__ | Message with blink style. |

## Functions

### Show and Log Functions
| Function | Params | Returns | Description | 
| --------------- | --------------- | --------------- | --------------- |
| __show__ | __message__ : string, __type__ : MessageType | self | Logs message at current row. |
| __showSleep__ | __message__ : string, __type__ : MessageType, __ms__ : number | self | Logs message at current sleep row then sync sleep for given miliseconds. |
| __showAt__ | __message__ : string, __type__ : MessageType, __row__ : number | self | Logs message at given row. |
| __logProgramTitle__ | none | self | Logs the program defined title at the current row with the given title style. |
| __logSeperator__ | none | self | Logs the program defined seperator at the current row with the given info style. |
| __splashScreen__ | none | self | Logs the program defined splashscreen at the current row. |
| __newScreen__ | none | self | Clears the screen and resets the console log row. |
### Progress Bar
| Function | Params | Returns | Description | 
| --------------- | --------------- |  --------------- |  --------------- |
| __newProgressBar__ | __name__ : string | self | Creates a new progress bar at the current row with the given name as its id. |
| __incrementProgressBar__ |  __name__: string, __amount__: number | Promise of self | Increase the given progress bars progress.  |
### Service Bar
| Function | Params | Returns | Description | 
| --------------- | --------------- |  --------------- |  --------------- |
| __newServiceBar__ | __name__ : string | self | Makes a continuous loading bar at the given row. |
| __reInitServiceBar__ | __name__ : string | self | Resets the service bar. |
### Row Functions
| Function | Params | Returns | Description | 
| --------------- | --------------- |  --------------- |  --------------- |
| __getRow__ | none | number | Gets the current output row. |
| __setRow__ |  __row__ : number | self | Sets the output row. |
| __addRow__ | none | self | Adds one to the current output row. |
| __clearRows__ | __start__ : number, __end__ : number  | self | Clears given row range. |
### Sleep Functions
| Function | Params | Returns | Description | 
| --------------- | --------------- |  --------------- |  --------------- |
| __sleep__ | __ms__ : number | self | Make the progarm sleep via a sync method. |
| __setRow__ |  __ms__ : number | Promise of self | Make the program sleep via an async method. |
### Define and Get Functions
| Function | Params | Returns | Description | 
| --------------- | --------------- |  --------------- |  --------------- |
| __defineSplashScreen__ | __func__ : Function | self | Define the function to be called for the splash screen. |
| __defineProgramTitle__ |  __title__ : string | self | Defines the  programs title. |
| __defineMessageStyle__ |  __type__: MessageTypes, __styleString__: string | self | Use console code to styleize messages. |
| __getString__ |  __name__ : string | self | Get a built in string. |








