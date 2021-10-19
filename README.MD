<h1 align="center">
 ⛯ Divine Star Commander ⛯
</h1>
 
<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>


---

![GitHub top language](https://img.shields.io/github/languages/top/lucasdamianjohnson/DivineStarCommander?color=purple&style=plastic)
![GitHub repo size](https://img.shields.io/github/repo-size/lucasdamianjohnson/DivineStarCommander?color=purple&style=plastic)
![npm own loads](https://img.shields.io/npm/dt/dscom?color=purple&style=plastic)
![GitHub latest release](https://img.shields.io/github/v/release/lucasdamianjohnson/DivineStarCommander?color=purple&style=plastic)
![GitHub latest version](https://img.shields.io/npm/v/dscom?color=purple&style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/lucasdamianjohnson/DivineStarCommander?color=purple&style=plastic)
![GitHub commit actiivty](https://img.shields.io/github/commit-activity/y/lucasdamianjohnson/DivineStarCommander?color=purple&style=plastic)
![GitHub followers](https://img.shields.io/github/followers/lucasdamianjohnson?color=purple&style=plastic)
![GitHub stars](https://img.shields.io/github/stars/lucasdamianjohnson/DivineStarCommander?color=purple&style=plastic)
![GitHub watchers](https://img.shields.io/github/watchers/lucasdamianjohnson/DivineStarCommander?color=purple&style=plastic)
 

## What Is It?
 
A tool for making command line tools with TypeScript or Javascript using Node.Js. It handles command line args, user input, help screen,
colored messages, progress bars, and so on.
 
## Why?
 
To make an easy chainable way to create a CLI fast. This provides a complete package for basic or advanced command line tools with many 
customizable options. The aim is to create an enjoyable and understadnable syntax that allows for efficent creation of command
line user interfaces so developers can focus more on developing their applications. 

## How To Start
### [Vist The Wiki](https://github.com/lucasdamianjohnson/DivineStarCommander/wiki)

Start a new node project and install typescrit and dscom .

```console
  npm init
  npm i --save-dev typescript tslib @types/node
  npm i --save dscom
```

In your typescript config file set the types to be.

```json
{
    "types": ["node", "tslib", "dscom"]
}
```

And then you can simply require the dsCom object and define it as DSCommander.

See the code bellow to get started quickly. It shows the program setting up input params, logging some text, and then asking for the user's input and displaying their input. 

### Starter Code

```typescript
const dsCom: DSCommander = require("dscom");
(async () => {
    (await dsCom.initProgramInput()).$ENABLESHOW //enable use of show functions
        .defineSleepTime(100)
        //Check if they are set
        .ifParamIsset("a", (value: any, args: any) => {
            dsCom.showSleep(value, "Info");
        })
        .ifParamIsset("b", (value: any, args: any) => {
            dsCom.showSleep(value, "Info");
        })
        .ifParamIsset("c", (value: any, args: any) => {
            dsCom.showSleep(value, "Info");
        })
        .newScreen()
        .RAW.show(dsCom.getParam("a"))
        .show(dsCom.getParam("b"))
        .show(dsCom.getParam("c"))
        .sleep(1000)
        //Start a new screen
        .splashScreen()
        .BLINK.showSleep("BLINK")
        .INFO.showSleep("Some Info.")
        .GOOD.showSleep("Everything is fine.")
        .ERROR.showSleep("Everything is not fine.")
        .WARNING.showSleep("Something may be wrong.")
        .sleep(500)
        .CLEAR
        //Show message in boxes
        .BOXIN.BOXDASHEDHEAVY4.BTAC.BR.G.show([
            "Divine Star Software",
            "Presents",
            "Divine Star Commander",
            "The Ultimate Command Line Interface",
            "Creation Tool",
        ])
        .sleep(500)
        .BOXEND.BOXIN.BOXTEXTALINGRIGHT.BR.B.show([
            "Divine Star Software",
            "Presents",
            "Divine Star Commander",
            "The Ultimate Command Line Interface",
            "Creation Tool",
        ])
        .BOXEND.sleep(500)
        //Add a progress and service bar
        .newProgressBar("test");
    await dsCom.incrementProgressBar("test", 100);
    dsCom.newServiceBar("test");
    (await dsCom.asyncSleep(3000))
        .destroyServiceBar("test")
        .newScreen()
        .showSleep("All good.", "Raw")
        .newScreen()
        //Get users input
        .show("Starting user input", "Info")
        .ask("enter name", "name", "string")
        .ask("enter num", "num", "number");
    (await dsCom.startPrompt())
        .showSleep(dsCom.getInput("name"), "Info")
        .restartPrompt()
        .ask("enter email", "email", "email")
        .ask("enter password", "pass", "password")
        .fail(true, "Password is not correct.", 3, () => {
            process.exit(0);
        })
        .ask("enter comment", "comment", "string");
    (await dsCom.startPrompt()).ifInputIsset("comment", (value: any) => {
        dsCom.INFO.show(value);
    });
})();
```
