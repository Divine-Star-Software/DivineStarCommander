type ConsoleCodes = |
  "Reset" |
  "Bright" |
  "Dim" |
  "Underscore" |
  "Blink" |
  "Reverse" |
  "Hidden"
type ConsoleColors = |
  "Black" |
  "Red" |
  "Green" |
  "Yellow" |
  "Blue" |
  "Magenta" |
  "Cyan" |
  "White"
type StyleObject = {
  fg ? : ConsoleColors | "none",
  bg ? : ConsoleColors | "none",
  reverse ? : boolean,
  bright ? : boolean
  dim ? : boolean,
  underscore ? : boolean,
  blink ? : boolean,
  hidden ? : boolean
}
type DisplayScreens = |
  "splash" |
  "programInitError" |
  "helpScreen" |
  "crash" |
  "done" |
  "noInput"
type MessageTypes = |
  "Blink" |
  "Error" |
  "Title" |
  "Info" |
  "Good" |
  "Warning" |
  "Raw" |
  "Data";
type QuestionDisplayTypes = |
"question-start" |
  "question" |
  "delimiter" |
  "re-ask-start" |
  "re-ask" |
  "re-ask-delimiter"
type QuestionsTypes = |
  "string" |
  "number" |
  "digit" |
  "email" |
  "password" |
  "stringall" |
  "custom"
type ParamTypes = "boolean" | "string" | "number" | "stringall" | "string[]" | "stringAll[]" | "number[]";
type ProgramParams = {
  flag: string;
  name: string;
  desc: string;
  type: ParamTypes;
  required ? : boolean;
  valueNeeded ? : boolean;
}
type ProgramParamsDataTypes = number | boolean | string | string[] | number[] | undefined
type Strings = |
  "title" |
  "helpText" |
  "star" |
  "seperator" |
  "questionStart" |
  "questionDelimiter" |
  "reAskStart" |
  "reAskText" |
  "reAskDelimiter" 
type StoredQuestions ={
  varName: string,
  varType: QuestionsTypes,
  reAsk ?: boolean,
  failPrompt ?: string, 
  attempts ?: number | "all",
  fails ?: number
  customName ?: string
}
type ProgressBarStyle = {
  base : string,
  baseStyle : StyleObject,
  loaded : string,
  loadedStyle : StyleObject,
  size : number,
  interval : number
}
type ServiceBarStyle = {
  base : string,
  baseStyle : StyleObject,
  loadedOne : string,
  loadedOneStyle : StyleObject,
  loadedTwo : string,
  loadedTwoStyle : StyleObject,
  cap : string,
  capStyle : StyleObject
  size : number,
  interval : number
}

/** 
  # DSLogger
  ---
  All in one CLI solution for Node.Js made by Divine Star
  @organization Divine Star LLC
  @author Luke Johnson
  @since 9-19-2021
  @version 1.0.1
  */
class DSLogger {
  defaultSleepTime = 800;
  //strings
  strings: Record < Strings, string > = {
    title: "[ Divine Star Logger ]",
    helpText: "",
    star: `            [1m[35m.[0m
           [1m[35m,[0m[1m[35mX[0m[1m[35m,[0m
          [1m[35m,[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m,[0m
    [1m[35m'[0m[1m[35mx[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mx[0m[1m[35m'[0m
      [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
        [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
        [1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m
       [1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m   [1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m
      [1m[35mX[0m[1m[35m'[0m         [1m[35m'[0m[1m[35mX[0m`,
    seperator: "{-----------------------------}",
    questionStart : "-->",
    questionDelimiter: ":",
    reAskStart: "X->",
    reAskText : "The input was not correct please re-enter",
    reAskDelimiter: ":"

  };

  defaultPrgoressBarStyle : ProgressBarStyle = {
    base : "-",
  baseStyle : {},
  loaded : "=",
  loadedStyle : {},
  size : 30,
  interval : 15
  }
  defaultServiceBarStyle : ServiceBarStyle = {
    base : "X",
    baseStyle : {bg : "Blue",fg:"White"},
    loadedOne : "|",
    loadedOneStyle : {bg:"Blue",fg:"White"},
    loadedTwo : "0",
    loadedTwoStyle : {bg:"Magenta",fg:"White"},
    cap : "}",
    capStyle : {bg:"Yellow",fg:"White"},
    size : 30,
    interval : 80
  }
  consoleCodes: Record < ConsoleCodes, string > = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
  };
  consoleFGColors: Record < ConsoleColors, string > = {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
  }
  consoleBGColors: Record < ConsoleColors, string > = {
    Black: "\x1b[40m",
    Red: "\x1b[41m",
    Green: "\x1b[42m",
    Yellow: "\x1b[43m",
    Blue: "\x1b[44m",
    Magenta: "\x1b[45m",
    Cyan: "\x1b[46m",
    White: "\x1b[47m",
  }
  questionStyles: Record < QuestionDisplayTypes, StyleObject > = {
    "delimiter": {
      fg: "Cyan",
      bright: true
    },
    "question-start" : {
    },
    "question": {
    },
    "re-ask-start" : {
      fg: "Red",
      bright: true
    },
    "re-ask": {
    },
    "re-ask-delimiter": {
      fg: "White",
      bright: true
    }
  };
  messageStyles: Record < MessageTypes, StyleObject > = {
    "Blink": {
      blink: true
    },
    "Data": {},
    "Error": {
      fg: "White",
      bg: "Red",
      bright: true
    },
    "Good": {
      fg: "White",
      bg: "Green",
      bright: true
    },
    "Info": {
      fg: "White",
      bg: "Cyan",
      bright: true
    },
    "Raw": {},
    "Title": {
      fg: "White",
      bg: "Magenta",
      bright: true
    },
    "Warning": {
      fg: "White",
      bg: "Yellow",
      bright: true
    }

  }




  params: Map < string, ProgramParams > = new Map();
  paramValues: Map <
    string,
    ProgramParamsDataTypes > = new Map();
  requiredParams: Map < string, boolean > = new Map();
  inputs: Map < string, string | number | undefined > = new Map();

  lastQuestion :  string = "";
  askedQuestions = 0;
  questions: Record < string, StoredQuestions > = {};
  questionsFails: Record < string, {args : any,func:Function} > = {};
  currentRow = 0;
  rli: any;

  progressBars: Record < string, any > = {};
  serviceBars: Record < string, any > = {};

  validators: Record < QuestionsTypes, (input: string,type?:string) => boolean > = {
    number: (input: string) => {
      const reg = /^\d+$/;
      return reg.test(input);
    },
    digit: (input: string) => {
      const reg = /^[0-9]$/;
      return reg.test(input);
    },
    string: (input: string) => {
      const reg = /^[a-zA-Z]+$/;
      return reg.test(input);
    },
    email: (input: string) => {
      const reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(input);
    },
    password: (input: string) => {
      return true;
    },
    stringall: (input: string) => {
      return true;
    },
    custom: (input : string,type ?: string  ) =>{
      if(!type){
        return false;
      }
      return this.customValidators[type](input);
    }
  };

  customValidators : Record<string,(input:any)=>boolean>= {};

  screens: Record < DisplayScreens, Function > = {
    splash : () =>{

    },
    helpScreen: () => {
      console.log(this._addColor("Title", this.getString("title")) + "\n");
      console.log(this.getString("helpText") + "\n");
      const ii = " ";
      for (let pk of this.paramValues.keys()) {
        let start = "   ";
        let param = this.params.get(pk);
        if (!param) return;
        if (param.required) {
          start = " * ";
        }
        const message = `${start}-${param.flag}, --${param.name} [${param.type}] ${ii}| ${param.desc}`;
        console.log(message);
      }
      console.log("\n");
      process.exit(1);
    },
    programInitError: (message: string) => {
      this.newScreen()
        .show(message, "Error")
        .show("Run --help for more info.", "Raw");
      process.exit(0);
    },
    crash : (message : string) =>{

    },
    noInput : (message : string) =>{

    },
    done : (message : string) =>{

    }
  };

  constructor(private rdl: any) {}

  styleize(
    text: string,
    styleObj: StyleObject
  ): string {
    let front = "";
 
  
    if (styleObj.reverse) {
      front += this.consoleCodes["Reverse"];
    }
    if (styleObj.bright) {
      front += this.consoleCodes["Bright"];
    }
    if (styleObj.dim) {
      front += this.consoleCodes["Dim"];
    }
    if (styleObj.hidden) {
      front += this.consoleCodes["Hidden"];
    }
    if (styleObj.underscore) {
      front += this.consoleCodes["Underscore"];
    }
    if (styleObj.blink) {
      front += this.consoleCodes["Blink"];
    }
    if (styleObj.bg && styleObj.bg != "none") {
      front += this.consoleBGColors[styleObj.bg];
    }
    if (styleObj.fg && styleObj.fg != "none") {
      front += this.consoleFGColors[styleObj.fg];
    }
    return front + text + this.consoleCodes["Reset"];
  }
  getParam(name: string): ProgramParamsDataTypes {
    let p;
    if ((p = this.params.get(name))) {
      if (typeof this.paramValues.get(p.flag) !== "undefined") {
        return this.paramValues.get(p.flag);
      }
    }
    return undefined;
  }

  ifParamIsset(
    param: string,
    func: (value: ProgramParamsDataTypes, args: any) => {},
    args: any = {}
  ) {
    let p;
    if ((p = this.params.get(param))) {
      const v = this.paramValues.get(p.flag);
      if (typeof v !== "undefined") {
        func(v, {});
      }
    }
    return this;
  }

  _isProgramArg(arg: string) {
    const reg1 = /^-/;
    const reg2 = /^--/;
    return reg1.test(arg) || reg2.test(arg);
  }

  promgramInitErrorScreen(message: string) {
    this.screens["programInitError"](message);
  }

  initProgramInput() {
    const args = process.argv;
    const argsLength = args.length;
    let argc = 0;

    for (const arg of args) {
      if (this._isProgramArg(arg)) {
        if (arg == "--help") {
          this.screens["helpScreen"]();
        }
        const inputString = arg.replace(/-/g, "");
        if (this.params.get(inputString)) {
          const param = this.params.get(inputString);
          if (!param) return;
          let value: any = "";
          if (param.type == "boolean") {
            if (args[argc + 1]) {
              const ahead = args[argc + 1];
              if (ahead == "true") {
                value = true;
              }
              if (ahead == "false") {
                value = false;
              }
              if (this._isProgramArg(ahead)) {
                value = true;
              } else {
                this.promgramInitErrorScreen(
                  `${param.name} was supplied with the wrong value type. Either leave blank or use true or false. `
                );
              }
            } else {
              value = true;
            }
          }
          if (param.type == "string") {
            if (args[argc + 1]) {
              const ahead = args[argc + 1];
              if (!this.validators["string"](ahead)) {
                this.promgramInitErrorScreen(
                  `${param.name} was supplied with the wrong value type. Please enter a valid string with no numbers.`
                );
              } else {
                value = ahead;
              }
            } else if (param.valueNeeded || param.required) {
              this.promgramInitErrorScreen(
                `${param.name} was not supplied with a value.`
              );
            } else {
              value = "";
            }
          }
          if (param.type == "stringall") {
            if (args[argc + 1]) {
              const ahead = args[argc + 1];
              if (!this.validators["stringall"](ahead)) {
                this.promgramInitErrorScreen(
                  `${param.name} was supplied with the wrong value type. Please enter a valid string.`
                );
              } else {
                value = ahead;
              }
            } else if (param.valueNeeded || param.required) {
              this.promgramInitErrorScreen(
                `${param.name} was not supplied with a value.`
              );
            } else {
              value = "";
            }
          }
          if (param.type == "number") {
            if (args[argc + 1]) {
              const ahead = args[argc + 1];
              if (!this.validators["number"](ahead)) {
                this.promgramInitErrorScreen(
                  `${param.name} was supplied with the wrong value type. Please enter a valid number.`
                );
              } else {
                value = ahead;
              }
            } else if (param.valueNeeded || param.required) {
              this.promgramInitErrorScreen(
                `${param.name} was not supplied with a value.`
              );
            } else {
              value = 0;
            }
          }

          if (param.required) {
            this.requiredParams.set(param.flag, true);
          }
          this.paramValues.set(param.flag, value);
        }
      }
      argc++;
    }
    for (const pk of this.requiredParams.keys()) {
      if (!this.requiredParams.get(pk)) {
        const param = this.params.get(pk);
        if (!param) return;
        this.promgramInitErrorScreen(
          `${param.name} is required was not supplied with a value.`
        );
      }
    }

    return this;
  }



  addParam(param: ProgramParams) {
    if (this.params.get(param.flag)) {
      throw new Error("Duplicate param.");
    }
    this.params.set(param.flag, param);
    this.params.set(param.name, param);
    this.paramValues.set(param.flag, undefined);
    if (param.required) {
      this.requiredParams.set(param.flag, false);
    }
    return this;
  }
  restartPrompt() {
    this.questions = {};
    this.inputs = new Map();
    return this;
  }
  async startPrompt() {
    this.rli = rdl.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    for (const q of Object.keys(this.questions)) {
      await this._prompt(
        q,
        this.questions[q].varName,
        this.questions[q].varType,
        this.questions[q].customName
      );
    }

    this.rli.close();
    return this;
  }

  _prompt(question: string, varName: string, varType: QuestionsTypes,custonName?:string) {
    let passed = true;
    let gotinput = false;
    let asked = false;
    const q = this.questions[question];
    const qID = question;
    const prom = new Promise((resolve) => {
      if (varType == "password") {
        const stdin = process.openStdin();

        const listener = (char: string) => {
          char = char + "";
          switch (char) {
            case "\n":
            case "\r":
            case "\u0004":
              stdin.removeListener("data", listener);
            default:
              process.stdout.clearLine(1);
              this.rdl.cursorTo(process.stdout, 0);
              process.stdout.write(
                question + this.consoleCodes['Hidden'] + Array(this.rli.line.length + 1).join("*") + this.consoleCodes["Reset"]
              );
              break;
          }
        };
        process.stdin.on("data", listener);
      } else {
        process.stdin.on("data", (char: string) => {});
      }

      let inte: any;
      const go = () => {
        if (passed && gotinput) {
          resolve(true);
          clearInterval(inte);
        } else if (asked) {} else {
          asked = true;
          this.rli.question(question, (input: QuestionsTypes) => {
            this.rli.history.slice(1);
            this.currentRow += this._countLines(question);
            this.rdl.cursorTo(process.stdout, 0, this.currentRow);
            (async () => {
              asked = true;
              gotinput = true;

              let valid = false;

              if(varType != "custom"){
                valid = this.validators[varType](input);
              } else {
                valid = this.validators[varType](input,custonName);
              }

              if (!valid) {
                passed = false;
                gotinput = false;
                asked = false;


                if(q.attempts && q.attempts != "all" ) {
                    (q as any).fails++;
                    if(q.fails == q.attempts || !q.reAsk) {
                        this.questionsFails[qID].func( this.questionsFails[qID].args)
                    }

                }
                if(q.failPrompt){
                  question = 
                this.styleize(this.getString("reAskStart"), this.questionStyles["re-ask-start"]) +
                this.styleize(q.failPrompt,this.questionStyles["re-ask"]) + " " +
                this.styleize(this.getString("reAskDelimiter"),this.questionStyles["re-ask-delimiter"]) + " ";
                } else {
                question = 
                this.styleize(this.getString("reAskStart"), this.questionStyles["re-ask-start"]) +
                this.styleize(this.getString("reAskText"),this.questionStyles["re-ask"]) + " " +
                this.styleize(this.getString("reAskDelimiter"),this.questionStyles["re-ask-delimiter"]) + " ";
                }
              } else {
                passed = true;
              }

              if (passed) {
                this.inputs.set(varName, input);
                resolve(passed);
              }
            })();
          });
        }
      };
      go();
      inte = setInterval(() => {
        go();
      }, 100);
    });

    return prom;
  }

  

  fail(reAsk : boolean, reAskMessage : string,attempts : number | "all" ="all",onFail ?: Function,arg : any = {}){
    this.questions[this.lastQuestion].reAsk = reAsk;
    if(onFail){
      this.questionsFails[this.lastQuestion] = {
        func : onFail,
        args : arg
      }
 
    } 
    this.questions[this.lastQuestion].failPrompt = reAskMessage;
    if(attempts != "all") {
      this.questions[this.lastQuestion].attempts = attempts;
      this.questions[this.lastQuestion].fails = 0;
    }
    return this;
    
  }

  ask(question: string, varName: string, varType: QuestionsTypes,customName?:string) {
    this.askedQuestions++;
    this.inputs.set(varName, undefined);


    question =
      this.styleize(this.getString("questionStart"), this.questionStyles["question-start"]) +
      this.styleize(question, this.questionStyles["question"]) + " " +
      this.styleize(this.getString("questionDelimiter"), this.questionStyles["delimiter"]) 
      + " ";
    this.questions[question] = {
      varName: varName,
      varType: varType,
    };
    this.lastQuestion = question;
    if(customName){
      this.questions[question].customName = customName;
    }
    return this;
  }

  getInput(varName: string): string | number | undefined {
    return this.inputs.get(varName);
  }

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


  newServiceBar(name: string,serviceBarStyle : ServiceBarStyle) {
    let s;
    if(serviceBarStyle){
      s = serviceBarStyle
    } else {
      s = this.defaultServiceBarStyle;
    }
    const bar = new this.ServiceBar(this.rdl, this.currentRow, s.size, 0, s.interval,
      this.styleize(s.base,s.baseStyle),this.styleize(s.loadedOne,s.loadedOneStyle),
      this.styleize(s.loadedTwo,s.loadedTwoStyle),this.styleize(s.cap,s.capStyle));
    this.currentRow++;
    this.serviceBars[name] = bar;
    return this;
  }
  reInitServiceBar(name: string) {
    this.serviceBars[name].reInit();
    return this;
  }
  destroyServiceBar(name: string) {
    const bar = this.serviceBars[name];
    const row = bar.rows;
    bar.clear();
    this.clearRows(row, row);
    (this as any).serviceBars[name] = null;
    delete this.serviceBars[name];
    return this;
  }


  newProgressBar(name: string,progressBarStyle ?: ProgressBarStyle) {

    let d;
    if(progressBarStyle){
       d = progressBarStyle;
    } else {
      d = this.defaultPrgoressBarStyle;
    }
   const bar = new this.ProgressBar(this.rdl, this.currentRow, d.size,
    d.interval,this.styleize(d.base,d.baseStyle),this.styleize(d.loaded,d.loadedStyle));
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
  asyncSleep(ms: number): Promise < this > {
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

  showAt(message: any, type: MessageTypes, row: number,col : number = 0) {
    let output = message;
    if (type != "Raw" && type != "Data") {
      output = this._addColor(type, message);
    }
    if (type == "Data") {
      output = JSON.stringify(message, null, 3);
    }
    const lines = this._countLines(`${output}`);
    this.rdl.cursorTo(process.stdout, col, row);
    this.currentRow += lines;
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
    const lines = this._countLines(`${output}`);
    this.rdl.cursorTo(process.stdout, 0, this.currentRow);
    this.currentRow += lines;

    console.log(output);
    return this;
  }

  showSleep(message: any, type: MessageTypes, ms: number = this.defaultSleepTime) {
    this.show(message, type);
    this.sleep(ms);
    return this;
  }

  log(message : any,type : MessageTypes) {
    let output = message;
    if (type != "Raw" && type != "Data") {
      output = this._addColor(type, message);
    }
    if (type == "Data") {
      output = JSON.stringify(message, null, 3);
    }
    const lines = this._countLines(`${output}`);
    this.currentRow += lines;
    console.log(output);
    return this;
  }

  logSleep(message : any,type : MessageTypes, ms: number = this.defaultSleepTime) {
    this.log(message,type);
    this.sleep(ms);
    return this;
  }

  _addColor(type: MessageTypes, message: any) {
    return this.styleize(message, this.messageStyles[type]);
  }

  _countLines(message: string) {
    return message.split(/\r\n|\r|\n/).length;
  }

  logSeperator() {
    this.show(this.getString("seperator"), "Info");
    return this;
  }

  logProgramTitle() {
    this.show(this.getString("title"), "Title");
    return this;
  }


  defineValidator(type : QuestionsTypes,func : (input:any)=>boolean,name?:string){

    if(type==="custom"){
      if(!name)return;
      this.customValidators[name]=func;
    } else {
      this.validators[type] = func;
    }

  }

  defineQuestionStyle(type: QuestionDisplayTypes, styleObj: StyleObject) {
    this.questionStyles[type] = styleObj;
    return this;
  }

  defineMessageStyle(type: MessageTypes, styleObj: StyleObject) {
    this.messageStyles[type] = styleObj;
    return this;
  }

  defineProgressBarStyle(progressBarStyle : ProgressBarStyle) {
    this.defaultPrgoressBarStyle = progressBarStyle;
    return this;
  }
  defineServiceBarStyle(serviceBarStyle : ServiceBarStyle) {
    this.defaultServiceBarStyle = serviceBarStyle;
    return this;
  }

  defineProgramTitle(title: string, styleObj ? : StyleObject) {
    this.strings["title"] = title;
    if (styleObj) {
      this.messageStyles["Title"] = styleObj;
    }
    return this;
  }
  defineHelpText(text: string) {
    this.strings["helpText"] = text;
    return this;
  }

  defineScreen(screen : DisplayScreens,func : Function) {
    this.screens[screen] = func;
    return this;
  }

  displayScreen(screen : DisplayScreens, args : any = {} ){
      this.screens[screen](args);
  }

  defineSplashScreen(func: Function) {
    this.screens["splash"] = func;
    return this;
  }

  splashScreen() {
    this.screens["splash"]();
    return this;
  }

  getString(id: Strings) {
    return this.strings[id];
  }
  setString(id: Strings,string : string) {
    this.strings[id] = string;
    return this;
  }
  //Quick Styles
  //FG 
  //RED TEXT
  red(text: string) {
    return this.styleize(text, {
      fg: "Red"
    });
  }
  R = this.red;
  sR(text : string) {
    return this.show(this.R(text),"Raw");
  }
  ssR(text : string) {
    return this.showSleep(this.R(text),"Raw");
  }
  saR(text : string,row : number,col : number = 0) {
    return this.showAt(this.R(text),"Raw",row,col);
  }
  lR(text : string) {
    return this.log(this.R(text),"Raw");
  }
  lsR(text : string){
    return this.logSleep(this.R(text),"Raw");
  }

//Green Text
  green(text: string) {
    return this.styleize(text, {
      fg: "Green"
    });
  }
  G = this.green;
  sG(text : string) {
    return this.show(this.G(text),"Raw");
  }
  ssG(text : string) {
    return this.showSleep(this.G(text),"Raw");
  }
  saG(text : string,row : number,col : number = 0) {
    return this.showAt(this.G(text),"Raw",row,col);
  }
  lG(text : string) {
    return this.log(this.G(text),"Raw");
  }
  lsG(text : string){
    return this.logSleep(this.G(text),"Raw");
  }
  //Blue Text
  blue(text: string) {
    return this.styleize(text, {
      fg: "Green"
    });
  }
  B = this.blue;
  sB(text : string) {
    return this.show(this.B(text),"Raw");
  }
  ssB(text : string) {
    return this.showSleep(this.B(text),"Raw");
  }
  saB(text : string,row : number,col : number = 0) {
    return this.showAt(this.B(text),"Raw",row,col);
  }
  lB(text : string) {
    return this.log(this.B(text),"Raw");
  }
  lsB(text : string){
    return this.logSleep(this.B(text),"Raw");
  }
  //White Text
  white(text: string) {
    return this.styleize(text, {
      fg: "White"
    });
  }
  W = this.white;
  sW(text : string) {
    return this.show(this.W(text),"Raw");
  }
  ssW(text : string) {
    return this.showSleep(this.W(text),"Raw");
  }
  saW(text : string,row : number,col : number = 0) {
    return this.showAt(this.W(text),"Raw",row,col);
  }
  lW(text : string) {
    return this.log(this.W(text),"Raw");
  }
  lsW(text : string){
    return this.logSleep(this.W(text),"Raw");
  }
  black(text: string) {
    return this.styleize(text, {
      fg: "Black"
    });
  }
  //Black Text
  BL = this.black;
  sBL(text : string) {
    return this.show(this.BL(text),"Raw");
  }
  ssBL(text : string) {
    return this.showSleep(this.BL(text),"Raw");
  }
  saBL(text : string,row : number,col : number = 0) {
    return this.showAt(this.BL(text),"Raw",row,col);
  }
  lBL(text : string) {
    return this.log(this.BL(text),"Raw");
  }
  lsBL(text : string){
    return this.logSleep(this.BL(text),"Raw");
  }
  //Cyan Text
  cyan(text: string) {
    return this.styleize(text, {
      fg: "Cyan"
    });
  }
  C = this.cyan;
  sC(text : string) {
    return this.show(this.C(text),"Raw");
  }
  ssC(text : string) {
    return this.showSleep(this.C(text),"Raw");
  }
  saC(text : string,row : number,col : number = 0) {
    return this.showAt(this.C(text),"Raw",row,col);
  }
  lC(text : string) {
    return this.log(this.C(text),"Raw");
  }
  lsC(text : string){
    return this.logSleep(this.C(text),"Raw");
  }
  magenta(text: string) {
    return this.styleize(text, {
      fg: "Magenta"
    });
  }
  //Magenta Text
  M = this.magenta;
  sM(text : string) {
    return this.show(this.M(text),"Raw");
  }
  ssM(text : string) {
    return this.showSleep(this.M(text),"Raw");
  }
  saM(text : string,row : number,col : number = 0) {
    return this.showAt(this.M(text),"Raw",row,col);
  }
  lM(text : string) {
    return this.log(this.M(text),"Raw");
  }
  lsM(text : string){
    return this.logSleep(this.M(text),"Raw");
  }
  //Yellow Text
  yellow(text: string) {
    return this.styleize(text, {
      fg: "Yellow"
    });
  }
  Y = this.yellow;
  sY(text : string) {
    return this.show(this.Y(text),"Raw");
  }
  ssY(text : string) {
    return this.showSleep(this.Y(text),"Raw");
  }
  saY(text : string,row : number,col : number = 0) {
    return this.showAt(this.Y(text),"Raw",row,col);
  }
  lY(text : string) {
    return this.log(this.Y(text),"Raw");
  }
  lsY(text : string){
    return this.logSleep(this.Y(text),"Raw");
  }
  //Bright
  brightRed(text: string) {
    return this.styleize(text, {
      fg: "Red",
      bright: true
    });
  }
  BR = this.brightRed;
  sBR(text : string) {
    return this.show(this.BR(text),"Raw");
  }
  ssBR(text : string) {
    return this.showSleep(this.BR(text),"Raw");
  }
  saBR(text : string,row : number,col : number = 0) {
    return this.showAt(this.BR(text),"Raw",row,col);
  }
  lBR(text : string) {
    return this.log(this.BR(text),"Raw");
  }
  lsBR(text : string){
    return this.logSleep(this.BR(text),"Raw");
  }
  brightGreen(text: string) {
    return this.styleize(text, {
      fg: "Green",
      bright: true
    });
  }
  BG = this.brightGreen;
  brightBlue(text: string) {
    return this.styleize(text, {
      fg: "Green",
      bright: true
    });
  }
  BB = this.brightBlue;
  brightWhite(text: string) {
    return this.styleize(text, {
      fg: "White",
      bright: true
    });
  }
  BW  = this.brightWhite;
  brightBlack(text: string) {
    return this.styleize(text, {
      fg: "Black",
      bright: true
    });
  }
  BBL = this.brightBlack;
  brightCyan(text: string) {
    return this.styleize(text, {
      fg: "Cyan",
      bright: true
    });
  }
  BC = this.brightCyan;
  brightMagenta(text: string) {
    return this.styleize(text, {
      fg: "Magenta",
      bright: true
    });
  }
  BM = this.brightMagenta;
  brightYellow(text: string) {
    return this.styleize(text, {
      fg: "Yellow",
      bright: true
    });
  }
  BY = this.brightYellow;
  //Invert
  blackInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Black",
      bg : bg,
      reverse : true
    });
  }
  BLI = this.blackInvert;
  redInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Red",
      bg : bg,
      reverse : true
    });
  }
  RI = this.redInvert;
  greenInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Green",
      bg : bg,
      reverse : true
    });
  }
  GI = this.greenInvert;
  yellowInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Yellow",
      bg : bg,
      reverse : true
    });
  }
  YI = this.yellowInvert;
  blueInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Blue",
      bg : bg,
      reverse : true
    });
  }
  BI = this.blueInvert;
  magentaInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Magenta",
      bg : bg,
      reverse : true
    });
  }
  MI = this.magentaInvert;
  cyanInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Cyan",
      bg : bg,
      reverse : true
    });
  }
  CI = this.cyanInvert;
  whiteInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "White",
      bg : bg,
      reverse : true
    });
  }
  WI = this.whiteInvert;
  
  //Invert Bright
  brightBlackInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Black",
      bg : bg,
      reverse : true,
      bright : true
    });
  }
  BBLI = this.brightBlackInvert;
  brightRedInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Red",
      bg : bg,
      reverse : true,
      bright : true
    });
  }
  BRI = this.brightRedInvert;
  brightGreenInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Green",
      bg : bg,
      reverse : true,
      bright : true
    });
  }
  BGI = this.brightGreenInvert;
  brightYellowInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Yellow",
      bg : bg,
      reverse : true,
      bright : true
    });
  }
  BYI = this.brightYellowInvert;
  brightBlueInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Blue",
      bg : bg,
      reverse : true,
      bright : true
    });
  }
  BBI = this.brightBlackInvert;
  brightMagentaInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Magenta",
      bg : bg,
      reverse : true,
      bright : true
    });
  }
  BMI = this.brightBlueInvert;
  brightCyanInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "Cyan",
      bg : bg,
      reverse : true,
      bright : true
    });
  }
  BCI = this.brightCyanInvert;
  brightWhiteInvert(text: string,bg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      fg: "White",
      bg : bg,
      reverse : true,
      bright : true
    });
  }
  BWI = this.brightWhiteInvert;
  //BG
  redBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Red",
      fg: fg
    });
  }
  RBG = this.redBG;
  greenBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Green",
      fg: fg
    });
  }
  GBG = this.greenBG;
  blueBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Green",
      fg: fg
    });
  }
  BBG = this.blueBG
  whiteBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "White",
      fg: fg
    });
  }
  blackBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Black",
      fg: fg
    });
  }
  BLBG = this.blackBG;
  cyanBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Cyan",
      fg: fg
    });
  }
  CBG = this.cyanBG;
  magentaBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Magenta",
      fg: fg
    });
  }
  MBG = this.magentaBG;
  yellowBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Yellow",
      fg: fg
    });
  }
  YBG = this.yellowBG;
  //Bright
  brightRedBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Red",
      fg: fg
    });
  }
  BRBG = this.brightRedBG;
  brightGreenBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Green",
      fg: fg
    });
  }
  BGBG = this.brightGreenBG;
  brightBlueBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Green",
      fg: fg
    });
  }
  BBBG = this.brightBlueBG;
  brightWhiteBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "White",
      fg: fg
    });
  }
  BWBG = this.brightWhiteBG;
  brightBlackBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Black",
      fg: fg
    });
  }
  BBLBG = this.brightBlackBG;
  brightCyanBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Cyan",
      fg: fg
    });
  }
  BCBG = this.brightCyanBG;
  brightMagentaBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Magenta",
      fg: fg
    });
  }
  BMBG = this.brightMagentaBG;
  brightYellowBG(text: string, fg: ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Yellow",
      fg: fg
    });
  }
  BYBG = this.brightYellowBG;

  //Invert
  blackInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Black",
      fg : fg,
      reverse : true
    });
  }
  BLIBG = this.blackInvertBG;
  redInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Red",
      fg : fg,
      reverse : true
    });
  }
  RIBG = this.redInvertBG;
  greenInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Green",
      fg : fg,
      reverse : true
    });
  }
  GIBG = this.greenInvertBG;
  yellowInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Yellow",
      fg : fg,
      reverse : true
    });
  }
  YIGB = this.yellowInvertBG;
  blueInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Blue",
      fg : fg,
      reverse : true
    });
  }
  BIBG = this.blueInvertBG;
  magentaInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Magenta",
      fg : fg,
      reverse : true
    });
  }
  MIBG = this.magentaInvertBG;
  cyanInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Cyan",
      fg : fg,
      reverse : true
    });
  }
  CIBG = this.cyanInvertBG;
  whiteInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "White",
      fg : fg,
      reverse : true
    });
  }
  WIBG = this.whiteInvertBG;
  
  //Invert Bright
  brightBlackInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Black",
      fg : fg,
      reverse : true,
      bright : true
    });
  }
  BBLIBG = this.brightBlackInvertBG;
  brightRedInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Red",
      fg : fg,
      reverse : true,
      bright : true
    });
  }
  BRIBG = this.brightRedInvertBG;
  brightGreenInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Green",
      fg : fg,
      reverse : true,
      bright : true
    });
  }
  BGIBG = this.brightGreenInvertBG;
  brightYellowInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Yellow",
      fg : fg,
      reverse : true,
      bright : true
    });
  }
  BYIBG = this.BG;
  brightBlueInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Blue",
      fg : fg,
      reverse : true,
      bright : true
    });
  }
  BBIBG = this.brightBlueInvertBG;
  brightMagentaInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Magenta",
      fg : fg,
      reverse : true,
      bright : true
    });
  }
  BMIBG = this.brightMagentaInvertBG;
  brightCyanInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "Cyan",
      fg : fg,
      reverse : true,
      bright : true
    });
  }
  BCIBG = this.brightCyanInvertBG;
  brightWhiteInvertBG(text: string,fg : ConsoleColors | "none" = "none") {
    return this.styleize(text, {
      bg: "White",
      fg : fg,
      reverse : true,
      bright : true
    });
  }
  BWIBG = this.brightWhiteInvertBG;

  exit(){
    process.exit(0);
  }

  ServiceBar = class  {
    cursor = 0;
    inte: any;
    constructor(
      private rdl: any,
      public rows: number = 0,
      public size: number = 32,
      public start: number = 2,
      public interval: number = 150,
      public base = "X",
      public loadedOne = "0",
      public loadedTwo = "|",
      public cap = "}"
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
    _X() {
      process.stdout.write(`\x1b[37m\x1b[44m${this.base}\x1b[0m`);
    }
    _O() {
      process.stdout.write(`\x1b[37m\x1b[45m${this.loadedOne}\x1b[0m`);
    }
    _Bar() {
      process.stdout.write(`\x1b[37m\x1b[44m${this.loadedTwo}\x1b[0m`);
    }
    _Cap() {
      process.stdout.write(`\x1b[37m\x1b[43m${this.cap}\x1b[0m`);
    }
  
  }

  ProgressBar = class  {
    done = false;
    cursor = 0;
    timer: any = null;
    constructor(private rdl: any, 
      public row: number, 
      public size: number,
      public interval : number = 20,
      public base = "-",
      public loaded = "=") {}
    start() {
      for (let i = 0; i < this.size; i++) {
        process.stdout.write(this.base);
      }
      this.rdl.cursorTo(process.stdout, 0, this.row);
    }
    addProgressPerfect(percent: number): Promise < true > | Promise < unknown > {
      const num = this.size * (percent / 100);
      return this.addProgress(num);
    }
    addProgress(amount: number): Promise < true > | Promise < unknown > {
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
            process.stdout.write(this.loaded);
            console.log("\r");
          } else if (this.cursor >= num) {
            process.stdout.write(this.loaded);
            doneLocal = true;
          } else {
            process.stdout.write(this.loaded);
          }
        }, this.interval);
      });
      return prom;
    }
    finish() {
      const left = this.size - this.cursor;
      this.addProgress(left);
    }
  }
}
const rdl = require("readline");
const DS = new DSLogger(rdl);
module.exports = DS;