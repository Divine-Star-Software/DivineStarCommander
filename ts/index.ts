type MessageTypes =
  | "Blink"
  | "Error"
  | "Title"
  | "Info"
  | "Good"
  | "Warning"
  | "Raw"
  | "Data";

/**
  # DSLogger
  ---
  Helper class for the programs output. 
  
  @author Luke Johnson
  @since 9-19-2021
  @version 0.0.1
  */
 class DSLogger {
  //strings
  strings: Record<string, string> = {
    title: "[ Divine Star Logger ]",
    star: `            [1m[35m.[0m
           [1m[35m,[0m[1m[35mX[0m[1m[35m,[0m
          [1m[35m,[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m,[0m
    [1m[35m'[0m[1m[35mx[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mx[0m[1m[35m'[0m
      [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
        [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
        [1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m
       [1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m   [1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m
      [1m[35mX[0m[1m[35m'[0m         [1m[35m'[0m[1m[35mX[0m`,
    seperator: "-----------------------------",

    blinkStyle: "\x1b[5m",
    titleStyle: "\x1b[37m\x1b[1m\x1b[45m",
    errorStyle: "\x1b[1m\x1b[41m\x1b[37m",
    warningStyle: "\x1b[1m\x1b[37m\x1b[43m",
    infoStyle: "\x1b[1m\x1b[37m\x1b[46m",
    goodStyle: "\x1b[1m\x1b[37m\x1b[42m",
  };



  splash: Function = () => {};
  ProgressBar = LoadingBar;
  ServiceBar = ServiceBar;

  currentRow = 0;

  progressBars: Record<string, LoadingBar> = {};
  serviceBars: Record<string, ServiceBar> = {};

  constructor(private rdl: any) {}

  clearRows(rowStart: number, rowEnd: number) {
    while (rowStart < rowEnd) {
      let i = 50;
      while (i--) {
        this.rdl.cursorTo(process.stdout, i, rowStart);
        process.stdout.write(" ");
      }
      rowStart++;
    }
    return this;
  }

  getRow() {
    return this.currentRow;
  }

  setRow(num: number) {
    this.currentRow = num;
    this.rdl.cursorTo(process.stdout, 0, this.currentRow);
    return this;
  }

  addRow() {
    this.currentRow++;
    return this;
  }
  newServiceBar(name: string) {
    const bar = new this.ServiceBar(this.rdl, this.currentRow, 31, 0, 80);
    this.currentRow++;
    this.serviceBars[name] = bar;
    return this;
  }
  reInitServiceBar(name: string) {
    this.serviceBars[name].reInit();
    return this;
  }

  newProgressBar(name: string) {
    const bar = new this.ProgressBar(this.rdl, this.currentRow, 30);
    this.currentRow++;
    bar.start();
    this.progressBars[name] = bar;
    return this;
  }

  async incrementProgressBar(name: string, amount: number) {
    await this.progressBars[name].addProgressPerfect(amount);
    return this;
  }

  sleep(ms: number) {
    var waitTill = new Date(new Date().getTime() + ms);
    while (waitTill > new Date()) {}
    return this;
  }
  asyncSleep(ms: number): Promise<this> {
    let self = this;
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(self);
      }, ms)
    );
  }

  newScreen() {
    console.clear();
    this.currentRow = 0;
    return this;
  }

  showAt(message: any, type: MessageTypes, row: number) {
    let output = message;
    if (type != "Raw" && type != "Data") {
      output = this._addColor(type, message);
    }
    if (type == "Data") {
      output = JSON.stringify(message, null, 3);
    }
    this.rdl.cursorTo(process.stdout, 0, row);
    console.log(output);
    return this;
  }

  show(message: any, type: MessageTypes) {
    let output = message;
    if (type != "Raw" && type != "Data") {
      output = this._addColor(type, message);
    }
    if (type == "Data") {
      output = JSON.stringify(message, null, 3);
    }
    const lines = this._countLines(output);
    this.rdl.cursorTo(process.stdout, 0, this.currentRow);
    this.currentRow += lines;

    console.log(output);
    return this;
  }

  showSleep(message: any, type: MessageTypes, sleep: number = 800) {
    this.show(message, type);
    this.sleep(sleep);
    return this;
  }

  _addColor(type: MessageTypes, message: any) {
    let returnString = "";
    switch (type) {
      case "Blink":
        returnString += this.getString("blinkStyle");
        break;
      case "Error":
        returnString += this.getString("errorStyle");
        break;
      case "Title":
        returnString += this.getString("titleStyle");
        break;
      case "Info":
        returnString += this.getString("infoStyle");
        break;
      case "Good":
        returnString += this.getString("goodStyle");
        break;
      case "Warning":
        returnString += this.getString("warningStyle");
        break;
    }
    returnString += message + "\x1b[0m";
    return returnString;
  }

  _countLines(message: string) {
    return message.split(/\r\n|\r|\n/).length;
  }

  logSeperator() {
    this.show("{-----------------------------}", "Info");
    return this;
  }

  logProgramTitle() {
    this.show(this.getString("title"), "Title");
    return this;
  }


  defineMessageStyle(type : MessageTypes,styleString : string){
    switch (type) {
      case "Blink":
       this.strings["blinkStyle"] = styleString;
        break;
      case "Error":
       this.strings["errorStyle"] = styleString;
        break;
      case "Title":
        this.strings["titleStyle"] = styleString;
        break;
      case "Info":
       this.strings["infoStyle"] = styleString;
        break;
      case "Good":
        this.strings["goodStyle"] = styleString;
        break;
      case "Warning":
       this.strings["warningStyle"] = styleString;
        break;
    }
    return this;
  }


  defineProgramTitle(title : string){
    this.strings['title'] = title;
    return this;
  }


  defineSplashScreen(func: Function) {
    this.splash = func;
    return this;
  }


  splashScreen() {
    this.splash();
    return this;
  }

  getString(id: string) {
    return this.strings[id];
  }
}

class LoadingBar {
  done = false;
  cursor = 0;
  timer: any = null;
  constructor(private rdl: any, public row: number, public size: number) {}
  start() {
    //    process.stdout.write("\x1B[?25l")

    for (let i = 0; i < this.size; i++) {
      process.stdout.write("-");
      //process.stdout.write("=");
    }

    this.rdl.cursorTo(process.stdout, 0, this.row);
  }

  autoFill() {
    this.rdl.cursorTo(process.stdout, 0, this.row);
    const prom = new Promise((resolve) => {
      this.start();
      this.rdl.cursorTo(process.stdout, 0, this.row);
      this.timer = setInterval(() => {
        this.addProgress(1);
        if (this.cursor >= this.size) {
          clearInterval(this.timer);
          resolve(true);
          //  rdl.cursorTo(process.stdout, this.cursor, done);
        }
      }, 1200);
    });
    return prom;
  }

  /**Add Progress Percent
   * ---
   * Adds progress to the bar relative to the size.
   * @param percent Supply an int between 1 - 100
   */
  addProgressPerfect(percent: number): Promise<true> | Promise<unknown> {
    const num = this.size * (percent / 100);
    return this.addProgress(num);
  }

  addProgress(amount: number): Promise<true> | Promise<unknown> {
    this.rdl.cursorTo(process.stdout, this.cursor, this.row);
    let doneLocal = false;
    const prom = new Promise((resolve) => {
      let num = this.cursor + amount;
      const timer = setInterval(() => {
        if (this.done || doneLocal) {
          clearInterval(timer);
          resolve(true);
          return;
        }
        this.cursor++;

        if (this.cursor >= this.size) {
          this.done = true;
          process.stdout.write("=");
          console.log("\r");
        } else if (this.cursor >= num) {
          process.stdout.write("=");
          doneLocal = true;
        } else {
          process.stdout.write("=");
        }
      }, 20);
    });
    return prom;
  }

  finish() {
    const left = this.size - this.cursor;
    this.addProgress(left);
  }
}

class ServiceBar {
  cursor = 0;
  inte: any;
  constructor(
    private rdl: any,
    public rows: number = 0,
    public size: number = 32,
    public start: number = 2,
    public interval: number = 150
  ) {
    this._init();
  }

  clear() {
    clearInterval(this.inte);
  }

  reInit() {
    clearInterval(this.inte);
    this._init();
  }

  _init() {
    this.rdl.cursorTo(process.stdout, this.start, this.rows);
    for (let i = this.start; i < this.size; i++) {
      this._X();
    }
    this.cursor = this.start;
    this.inte = setInterval(() => {
      this.rdl.cursorTo(process.stdout, this.cursor, this.rows);
      this.cursor++;
      if (this.cursor % 2) {
        this._Bar();
      } else {
        this._O();
      }
      if (this.cursor == this.size) {
        this.cursor = this.start;

        this._Cap();
        this.rdl.cursorTo(process.stdout, this.start, this.rows);
        for (let i = this.start; i < this.size; i++) {
          this._X();
        }
      }
    }, this.interval);
  }

  _O() {
    const char = "0";
    process.stdout.write(`\x1b[37m\x1b[45m${char}\x1b[0m`);
  }

  _X() {
    process.stdout.write("\x1b[37m\x1b[44mX\x1b[0m");
  }
  _Cap() {
    process.stdout.write("\x1b[37m\x1b[43m}\x1b[0m");
  }
  _Bar() {
    process.stdout.write("\x1b[37m\x1b[44m|\x1b[0m");
  }
}

const rdl = require("readline");
const DS = new DSLogger(rdl);
module.exports = DS;