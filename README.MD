<h1 align="center">
 &#9733; Divine Star Logger &#9733;
</h1>

---

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

## What Is It?

A simple way to log output for a command line program. 

```typescript
const rdl = require("readline");
const dsLog = new DSLogger(rdl);

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