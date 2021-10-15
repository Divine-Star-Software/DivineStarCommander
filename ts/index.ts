type ConsoleCodes =
  | "Reset"
  | "Bright"
  | "Dim"
  | "Underscore"
  | "Blink"
  | "Reverse"
  | "Hidden";
type ConsoleColors =
  | "Black"
  | "Red"
  | "Green"
  | "Yellow"
  | "Blue"
  | "Magenta"
  | "Cyan"
  | "White";
type StyleObject = {
  fg?: ConsoleColors | "none";
  bg?: ConsoleColors | "none";
  reverse?: boolean;
  bright?: boolean;
  dim?: boolean;
  underscore?: boolean;
  blink?: boolean;
  hidden?: boolean;
};
type DisplayScreens =
  | "splash"
  | "programInitError"
  | "helpScreen"
  | "crash"
  | "error"
  | "done"
  | "noInput";
type MessageTypes =
  | "Blink"
  | "Error"
  | "Title"
  | "Info"
  | "Good"
  | "Warning"
  | "Raw"
  | "Data";
type QuestionDisplayTypes =
  | "question-start"
  | "question"
  | "delimiter"
  | "re-ask-start"
  | "re-ask"
  | "re-ask-delimiter";
type QuestionsTypes =
  | "string"
  | "string[]"
  | "stringall"
  | "stringall[]"
  | "boolean"
  | "boolean[]"
  | "number"
  | "number[]"
  | "digit"
  | "email"
  | "password"
  | "custom";
type ParamTypes =
  | "boolean"
  | "string"
  | "number"
  | "stringall"
  | "string[]"
  | "stringall[]"
  | "number[]"
  | "boolean[]";
type ProgramParams = {
  flag: string;
  name: string;
  desc: string;
  type: ParamTypes;
  required?: boolean;
  valueNeeded?: boolean;
};
type ProgramParamsDataTypes =
  | number
  | boolean
  | string
  | string[]
  | number[]
  | undefined;
type Strings =
  | "title"
  | "helpText"
  | "star"
  | "separator"
  | "questionStart"
  | "questionDelimiter"
  | "reAskStart"
  | "reAskText"
  | "reAskDelimiter";
type StoredQuestions = {
  varName: string;
  varType: QuestionsTypes;
  reAsk?: boolean;
  failPrompt?: string;
  attempts?: number | "all";
  fails?: number;
  customName?: string;
};
type ProgressBarStyle = {
  base: string;
  baseStyle: StyleObject;
  loaded: string;
  loadedStyle: StyleObject;
  size: number;
  interval: number;
};
type ServiceBarStyle = {
  base: string;
  baseStyle: StyleObject;
  loadedOne: string;
  loadedOneStyle: StyleObject;
  loadedTwo: string;
  loadedTwoStyle: StyleObject;
  cap: string;
  capStyle: StyleObject;
  size: number;
  interval: number;
};

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
  //Used for chaining styles
  defaultStyleDelimiter: StyleObject = {};
  styleDelimiter: StyleObject = {};
  defaultSleepTime = 800;
  services: Record<string, any> = {};
  //strings
  strings: Record<Strings, string> = {
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
    separator: "{-----------------------------}",
    questionStart: "-->",
    questionDelimiter: ":",
    reAskStart: "X->",
    reAskText: "The input was not correct please re-enter",
    reAskDelimiter: ":",
  };
  defaultPrgoressBarStyle: ProgressBarStyle = {
    base: "-",
    baseStyle: {},
    loaded: "=",
    loadedStyle: {},
    size: 30,
    interval: 15,
  };
  defaultServiceBarStyle: ServiceBarStyle = {
    base: "X",
    baseStyle: {
      bg: "Blue",
      fg: "White",
    },
    loadedOne: "|",
    loadedOneStyle: {
      bg: "Blue",
      fg: "White",
    },
    loadedTwo: "0",
    loadedTwoStyle: {
      bg: "Magenta",
      fg: "White",
    },
    cap: "}",
    capStyle: {
      bg: "Yellow",
      fg: "White",
    },
    size: 30,
    interval: 80,
  };
  consoleCodes: Record<ConsoleCodes, string> = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
  };
  consoleFGColors: Record<ConsoleColors, string> = {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
  };
  consoleBGColors: Record<ConsoleColors, string> = {
    Black: "\x1b[40m",
    Red: "\x1b[41m",
    Green: "\x1b[42m",
    Yellow: "\x1b[43m",
    Blue: "\x1b[44m",
    Magenta: "\x1b[45m",
    Cyan: "\x1b[46m",
    White: "\x1b[47m",
  };
  questionStyles: Record<QuestionDisplayTypes, StyleObject> = {
    delimiter: {
      fg: "Cyan",
      bright: true,
    },
    "question-start": {},
    question: {},
    "re-ask-start": {
      fg: "Red",
      bright: true,
    },
    "re-ask": {},
    "re-ask-delimiter": {
      fg: "White",
      bright: true,
    },
  };
  messageStyles: Record<MessageTypes, StyleObject> = {
    Blink: {
      blink: true,
    },
    Data: {},
    Error: {
      fg: "White",
      bg: "Red",
      bright: true,
    },
    Good: {
      fg: "White",
      bg: "Green",
      bright: true,
    },
    Info: {
      fg: "White",
      bg: "Cyan",
      bright: true,
    },
    Raw: {},
    Title: {
      fg: "White",
      bg: "Magenta",
      bright: true,
    },
    Warning: {
      fg: "White",
      bg: "Yellow",
      bright: true,
    },
  };

  params: Map<string, ProgramParams> = new Map();
  paramValues: Map<string, ProgramParamsDataTypes> = new Map();
  requiredParams: Map<string, boolean> = new Map();
  inputs: Map<string, string | number | string[] | boolean | boolean[] | number[] | undefined> = new Map();

  lastQuestion: string = "";
  askedQuestions = 0;
  questions: Record<string, StoredQuestions> = {};
  questionsFails: Record<
    string,
    {
      args: any;
      func: Function;
    }
  > = {};
  currentRow = 0;
  rli: any;

  progressBars: Record<string, any> = {};
  serviceBars: Record<string, any> = {};

  //The delimiters userd for parsing array inputs
  arrayInputDelimiters = [",", "+"];
  booleanTrueStrings = ["true", "t", "yes", "y", "Y"];
  booleanFalseStrings = ["false", "f", "no", "no", "N"];

  validators: Record<
    QuestionsTypes,
    (input: string | string[], type?: string) => Promise<boolean>
  > = {
    digit: async (input: string | string[]) => {
      if (Array.isArray(input)) return false;
      const reg = /^[0-9]$/;
      return reg.test(input);
    },
    number: async (input: string | string[]) => {
      if (Array.isArray(input)) return false;
      const reg = /^\d+$/;
      return reg.test(input);
    },
    "number[]": async (input: string | string[]) => {
      if (!Array.isArray(input)) return false;
      const reg = /^\d+$/;
      for (const value of input) {
        if (!reg.test(value)) {
          return false;
        }
      }
      return true;
    },
    boolean: async (input: string | string[]) => {
      if (Array.isArray(input)) return false;
      if (
        this.booleanFalseStrings.indexOf(input) == -1 &&
        this.booleanTrueStrings.indexOf(input) == -1
      ) {
        return false;
      }
      return true;
    },
    "boolean[]": async (input: string | string[]) => {
      if (!Array.isArray(input)) return false;
      for (const value of input) {
        if (
          this.booleanFalseStrings.indexOf(value) == -1 &&
          this.booleanTrueStrings.indexOf(value) == -1
        ) {
          return false;
        }
      }
      return true;
    },
    string: async (input: string | string[]) => {
      if (Array.isArray(input)) return false;
      if (typeof input === "string" && input === "") return true;
      const reg = /\d/;
      return !reg.test(input);
    },
    "string[]": async (input: string | string[]) => {
      if (!Array.isArray(input)) return false;
       const reg = /\d/;
      for (let value of input) {
        value = value.trim();
        if (reg.test(value)) {
          return false;
        }
      } 
      return true;
    },
    stringall: async (input: string | string[]) => {
      if (Array.isArray(input)) return false;
      if (typeof input === "string" && input === "") return true;
      if (typeof input === "string") return true;
      return false;
    },
    "stringall[]": async (input: string | string[]) => {
      if (!Array.isArray(input)) return false;
      for (const value of input) {
        if (typeof value !== "string") {
          return false;
        }
      }
      return true;
    },
    email: async (input: string | string[]) => {
      if (Array.isArray(input)) return false;
      const reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(input);
    },
    password: async (input: string | string[]) => {
      return true;
    },
    custom: async (input: string | string[], type?: string) => {
      if (!type) {
        return false;
      }
      return this.customValidators[type](input);
    },
  };

  validInputTypes: string[] = [
    "string",
    "string[]",
    "number",
    "number[]",
    "boolean",
    "boolean[]",
    "stringall",
    "stringall[]",
  ];

  customValidators: Record<string, (input: any) => Promise<boolean>> = {};

  screens: Record<DisplayScreens, Function> = {
    splash: () => {},
    helpScreen: () => {
      this.TITLE.show(this.getString("title")).NL.RAW.show(
        this.getString("helpText")
      ).NL;
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

      this.NEWLINE.exit();
    },
    programInitError: (message: string) => {
      this.ERROR.log(message).RAW.log("Run --help for more info.").exit();
    },
    crash: (message: string) => {
      this.ERROR.log("The program has crashed.").RAW.log(message).exit();
    },
    error: (message: string) => {
      this.ERROR.log("The program has had an error.").RAW.log(message).exit();
    },
    noInput: () => {
      this.INFO.log("Please run --help to learn how to use this program.");
    },
    done: (message: string) => {
      this.INFO.log("The program is done running.", "Info").log(message).exit();
    },
  };

  constructor(public rdl: any) {}

  /** # Stylize
   * ---
   * Stylize the text with the given format.
   * @param text : string
   * @param styleObj : StyleObject
   */
  stylize(text: string, styleObj: StyleObject): string {
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
  /** # Get Raw Params
   * ---
   * Get the raw params submited to the program.
   * @returns
   */
  getRawParams(): string[] {
    return process.argv;
  }
  /**# Get Param
   * ---
   * Adds a command line arg to the program.
   * @param name Either the flag or the name of the param.
   */
  getParam(name: string): ProgramParamsDataTypes {
    let p;
    if ((p = this.params.get(name))) {
      if (typeof this.paramValues.get(p.flag) !== "undefined") {
        return this.paramValues.get(p.flag);
      }
    }
    return undefined;
  }
  /**# Add Param
   * ---
   * Adds a command line arg to the program.
   * @param param An object to specify the param.
   */
  addParam(param: ProgramParams) {
    if (this.params.get(param.flag)) {
      throw new Error("Duplicate param.");
    }
    if (this.validInputTypes.indexOf(param.type) == -1) {
      throw new Error("Not a valid input type.");
    }
    this.params.set(param.flag, param);
    this.params.set(param.name, param);
    this.paramValues.set(param.flag, undefined);
    if (param.required) {
      this.requiredParams.set(param.flag, false);
    }
    return this;
  }

  /** # If Param Isset
   * ---
   * If the param is set run a function.
   * @param param Either the name or the flag of the param.
   * @param func The function to be run. Will be passed the value of the param and the args given.
   * @param args Args to be passed to the function.
   */
  ifParamIsset(
    param: string,
    func: (value: ProgramParamsDataTypes, args: any) => {},
    args: any = {}
  ) {
    let p;
    if ((p = this.params.get(param))) {
      const v = this.paramValues.get(p.flag);
      if (typeof v !== "undefined") {
        func(v, args);
      }
    }
    return this;
  }

  initalProgramArgs: string[] = [];
  /**# Get Inital Program Args
   * ---
   * Get arugments that suplied to the program between the program name and the start of the flags.
   *
   * For instance if you run:
   *
   * node index.js -a
   *
   * It will return ["index.js"]
   * @returns
   */
  getInitalProgramArgs() {
    return this.initalProgramArgs;
  }

  /**# Init Program Input
   * ---
   * Parses the arguments sent to the program and stores the values.
   *
   * __Must run before you can access the values.__
   * @returns Promise\<this\>
   */
  async initProgramInput(): Promise<this> {
    const args = process.argv;
    const argsLength = args.length;
    let argc = 0;
    let inital = true;

    for (const arg of args) {
      if (this._isProgramArg(arg)) {
        inital = false;
        if (arg == "--help") {
          this.screens["helpScreen"]();
        }
        const inputString = arg.replace(/-/g, "");
        if (this.params.get(inputString)) {
          const param = this.params.get(inputString);
          if (!param) {
            this.screens["helpScreen"]();
            return this;
          }
          if (this.paramValues.get(param.flag)) {
            this.promgramInitErrorScreen(`${param.name} was set twice`);
          }
          //Set intial return value.
          let value: any = "";
          //First check normal types then check for array types.
          if (param.type == "boolean") {
            value = await this._getBooleanParamValue(param, args, argc);
            argc++;
          }
          if (param.type == "string") {
            value = await this._getStringParamValue(param, args, argc);
            argc++;
          }
          if (param.type == "stringall") {
            value = await this._getStringAllParamValue(param, args, argc);
            argc++;
          }
          if (param.type == "number") {
            value = await this._getNumberParamValue(param, args, argc);
            argc++;
          }
          if (param.type == "string[]") {
            let arrayResults = await this._getStringArrayParamValue(
              param,
              args,
              argc
            );
            argc = arrayResults.newArgCount;
            value = arrayResults.value;
          }
          if (param.type == "stringall[]") {
            let arrayResults = await this._getStringAllArrayParamValue(
              param,
              args,
              argc
            );
            argc = arrayResults.newArgCount;
            value = arrayResults.value;
          }
          if (param.type == "number[]") {
            let arrayResults = await this._getNumberArrayParamValue(
              param,
              args,
              argc
            );
            argc = arrayResults.newArgCount;
            value = arrayResults.value;
          }
          if (param.type == "boolean[]") {
           
            let arrayResults = await this._getBooleanArrayParamValue(
              param,
              args,
              argc
            );
            argc = arrayResults.newArgCount;
            value = arrayResults.value;
           
          }
          if (param.required) {
            this.requiredParams.set(param.flag, true);
          }
          this.paramValues.set(param.flag, value);
        }
      } else {
        if (inital && argc > 0) {
          this.initalProgramArgs.push(arg);
        }
        argc++;
      }
    }

    this._validateAllRequiredProgramParamsAreSet();

    return this;
  }

  _validateAllRequiredProgramParamsAreSet() {
    for (const pk of this.requiredParams.keys()) {
      if (!this.requiredParams.get(pk)) {
        const param = this.params.get(pk);
        if (!param) return;
        this.promgramInitErrorScreen(
          `${param.name} is required was not supplied with a value.`
        );
      }
    }
  }

  _isProgramArg(arg: string) {
    const reg1 = /^-/;
    const reg2 = /^--/;
    return reg1.test(arg) || reg2.test(arg);
  }

  _createStringFromParamArray(args: string[], argc: number) {
    let argStringArray: string[] = [];
    let argSearch = "";
    let newArgCount = argc + 1;
    while (args.length > newArgCount) {
      const value = args[newArgCount];
      argSearch = value;
      if (this._isProgramArg(argSearch) || value === undefined) {
        break;
      }
      argStringArray.push(value);
      newArgCount++;
    }
    return argStringArray.toString();
  }

  _getArrayValues(args: string[], argc: number) {
    let returnValue: string[] = [];
    let newArgCount: number = argc + 1;
    if (!this._isProgramArg(args[argc + 1])) {
      const ahead = this._createStringFromParamArray(args, argc);
      let isDelimiterArray = false;
      for (const delim of this.arrayInputDelimiters) {
        returnValue = ahead.split(delim);
        if (returnValue.length > 1) {
          isDelimiterArray = true;
          break;
        }
      }
      if (!isDelimiterArray) {
        returnValue = [];
        let argSearch = "";
        let argSearchCount = 0;
        let newArgCount = argc + 1;
        while (args.length > newArgCount) {
          newArgCount += argSearchCount;
          const value = args[newArgCount];
          if (this._isProgramArg(argSearch) || value === undefined) {
            break;
          }
          returnValue.push(value);
          argSearchCount++;
        }
      }
    }
    return {
      newArgCount: newArgCount,
      value: returnValue,
    };
  }

  async _getStringAllArrayParamValue(
    param: ProgramParams,
    args: string[],
    argc: number
  ): Promise<{ newArgCount: number; value: string[] }> {
    let value: string[] = [];
    let newArgCount = argc;
    if (args[argc + 1]) {
      const data = await this._getArrayValues(args, argc);
      newArgCount = data.newArgCount;

        if(!(await this.validators["stringall[]"](data.value))) {
          this.promgramInitErrorScreen(
            `${param.name} was supplied with the wrong value type. Please enter a valid string.`
          );
        }
         else {
          value = data.value;
        }
      
    } else if (param.valueNeeded || param.required) {
      this.promgramInitErrorScreen(
        `${param.name} was not supplied with a value.`
      );
    } else {
      value = [""];
    }
    return {
      newArgCount: newArgCount,
      value: value,
    };
  }

  async _getStringArrayParamValue(
    param: ProgramParams,
    args: string[],
    argc: number
  ): Promise<{ newArgCount: number; value: string[] }> {
    let value: string[] = [];
    let newArgCount = argc;
    if (args[argc + 1]) {
      const data = await this._getArrayValues(args, argc);
      newArgCount = data.newArgCount;

        if(!(await this.validators["string[]"](data.value))) {
          this.promgramInitErrorScreen(
            `${param.name} was supplied with the wrong value type. Please enter a valid string.`
          );
        }
         else {
          value = data.value;
        }
    } else if (param.valueNeeded || param.required) {
      this.promgramInitErrorScreen(
        `${param.name} was not supplied with a value.`
      );
    } else {
      value = [""];
    }

    return {
      newArgCount: newArgCount,
      value: value,
    };
  }

  async _getNumberArrayParamValue(
    param: ProgramParams,
    args: string[],
    argc: number
  ): Promise<{ newArgCount: number; value: number[] }> {
    let value: number[] = [];
    let newArgCount = argc;
    if (args[argc + 1]) {
      const data = await this._getArrayValues(args, argc);
      newArgCount = data.newArgCount;
      const valid = await this.validators["number[]"](data.value);
      if (!valid) {
        this.promgramInitErrorScreen(
          `${param.name} was supplied with the wrong value type. Please enter a valid number.`
        );
      }
      for (const values of data.value) {
          if (values.includes(".")) {
            value.push(parseFloat(values));
          } else {
            value.push(parseInt(values));
          }
      }
    } else if (param.valueNeeded || param.required) {
      this.promgramInitErrorScreen(
        `${param.name} was not supplied with a value.`
      );
    } else {
      value = [0];
    }

    return {
      newArgCount: newArgCount,
      value: value,
    };
  }

  async _getBooleanArrayParamValue(
    param: ProgramParams,
    args: string[],
    argc: number
  ): Promise<{ newArgCount: number; value: boolean[] }> {
    let value: boolean[] = [];
    let newArgCount = argc;
    if (args[argc + 1]) {
      const data = await this._getArrayValues(args, argc);
      newArgCount = data.newArgCount;
      const valid = await this.validators["boolean[]"](data.value);
      if (!valid) {
        this.promgramInitErrorScreen(
          `${
            param.name
          } was supplied with the wrong value type. Input must be either ${this.booleanTrueStrings.toString()} or${this.booleanFalseStrings.toString()}`
        );
      }
      for (const values of data.value) {
        if (this.booleanTrueStrings.indexOf(values) > -1) {
          value.push(true);
        }
        if(this.booleanFalseStrings.indexOf(values) > -1) {
          value.push(false);
        } 
      }
 
    } else if (param.valueNeeded || param.required) {
      this.promgramInitErrorScreen(
        `${param.name} was not supplied with a value.`
      );
    } else {
      value = [true];
    }
    return {
      newArgCount: newArgCount,
      value: value,
    };
  }

  async _getNumberParamValue(
    param: ProgramParams,
    args: string[],
    argc: number
  ): Promise<number> {
    let value = 0;
    if (args[argc + 1]) {
      const ahead = args[argc + 1];
      const valid = await this.validators["number"](ahead);
      if (!valid) {
        this.promgramInitErrorScreen(
          `${param.name} was supplied with the wrong value type. Please enter a valid number.`
        );
      } else {
        if (ahead.includes(".")) {
          value = parseFloat(ahead);
        } else {
          value = parseInt(ahead);
        }
      }
    } else if (param.valueNeeded || param.required) {
      this.promgramInitErrorScreen(
        `${param.name} was not supplied with a value.`
      );
    } else {
      value = 0;
    }
    return value;
  }
  async _getStringParamValue(
    param: ProgramParams,
    args: string[],
    argc: number
  ): Promise<string> {
    let value = "";
    if (args[argc + 1]) {
      const ahead = args[argc + 1];

      const valid = await this.validators["string"](ahead);
      if (!valid) {
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
    return value;
  }
  async _getStringAllParamValue(
    param: ProgramParams,
    args: string[],
    argc: number
  ): Promise<string> {
    let value = "";
    if (args[argc + 1]) {
      const ahead = args[argc + 1];
      const valid = await this.validators["stringall"](ahead);
      if (valid) {
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
    return value;
  }

 async _getBooleanParamValue(
    param: ProgramParams,
    args: string[],
    argc: number
  ): Promise<boolean> {
    let value = true;
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
    return value;
  }

  /**# Restart Prompt
   * ---
   * Restarat user input prompt.
   */
  restartPrompt() {
    this.questions = {};
    this.inputs = new Map();
    return this;
  }
  /**# Start Prompt
   * ---
   * Starts user input prompt.
   */
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

  async _convertInput(varType : QuestionsTypes , input : string ) {
    
    let arrayTypes = ["boolean[]","string[]","number[]","stringall[]"];
    if(arrayTypes.indexOf(varType) != -1) {
      const value = await this._getArrayValues([input],-1);
      return value.value;
    }
    return input;
  }

  async _prompt(
    question: string,
    varName: string,
    varType: QuestionsTypes,
    custonName?: string
  ) {
    let passed = true;
    let gotinput = false;
    let asked = false;
    const q = this.questions[question];
    const qID = question;
    const prom = new Promise((resolve) => {
      let inte: any;
      const go = () => {
        if (passed && gotinput) {
          resolve(true);
          clearInterval(inte);
        } else if (asked) {
        } else {
          asked = true;
          let stdin: any;
          let listener: any;
          if (varType == "password") {
            stdin = process.openStdin();

            listener = (char: string) => {
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
                    question +
                      this.consoleCodes["Hidden"] +
                      Array(this.rli.line.length + 1).join("*") +
                      this.consoleCodes["Reset"]
                  );
                  break;
              }
            };
            process.stdin.on("data", listener);
          } else {
            process.stdin.on("data", () => {});
          }
          this.rli.question(question, (input: QuestionsTypes) => {
            this.rli.history.slice(1);
            this.currentRow += this.countLines(question);
            this.rdl.cursorTo(process.stdout, 0);

            (async () => {
              asked = true;
              gotinput = true;
              let valid = false;
              let newInput : string | string[] = "";
              if (varType != "custom") {
                newInput = await this._convertInput(varType,input);
                valid = await this.validators[varType](newInput);
              } else {
                valid = await this.validators[varType](input, custonName);
              }
              if (!valid) {
                passed = false;
                gotinput = false;
                asked = false;
                if (q.varType == "password") {
                  stdin.removeListener("data", listener);
                }
                if (q.attempts && q.attempts != "all") {
                  (q as any).fails++;
                  if ((q as any).fails >= q.attempts || !q.reAsk) {
                    this.questionsFails[qID].func(
                      this.questionsFails[qID].args
                    );
                  }
                }
                if (q.failPrompt) {
                  question =
                    this.stylize(
                      this.getString("reAskStart"),
                      this.questionStyles["re-ask-start"]
                    ) +
                    this.stylize(q.failPrompt, this.questionStyles["re-ask"]) +
                    " " +
                    this.stylize(
                      this.getString("reAskDelimiter"),
                      this.questionStyles["re-ask-delimiter"]
                    ) +
                    " ";
                } else {
                  question =
                    this.stylize(
                      this.getString("reAskStart"),
                      this.questionStyles["re-ask-start"]
                    ) +
                    this.stylize(
                      this.getString("reAskText"),
                      this.questionStyles["re-ask"]
                    ) +
                    " " +
                    this.stylize(
                      this.getString("reAskDelimiter"),
                      this.questionStyles["re-ask-delimiter"]
                    ) +
                    " ";
                }
              } else {
                if (varType == "password") {
                  stdin.removeListener("data", listener);
                }
                passed = true;
              }
              if (passed) {
                this.inputs.set(varName, newInput);
                resolve(passed);
              }
            })();
          });
        }
      };
      go();
      inte = setInterval(() => {
        go();
      }, 10);
    });
    return prom;
  }
  /**# fail
   * --
   * Adds a fail case to the last asked question.
   * @param reAsk
   * @param reAskMessage
   * @param onFail
   * @param args
   */
  fail(
    reAsk: boolean,
    reAskMessage: string,
    attempts: number | "all" = "all",
    onFail?: Function,
    arg: any = {}
  ) {
    this.questions[this.lastQuestion].reAsk = reAsk;
    if (onFail) {
      this.questionsFails[this.lastQuestion] = {
        func: onFail,
        args: arg,
      };
    }
    this.questions[this.lastQuestion].failPrompt = reAskMessage;
    if (attempts != "all") {
      this.questions[this.lastQuestion].attempts = attempts;
      this.questions[this.lastQuestion].fails = 0;
    }

    return this;
  }
  /**# Ask
   * ---
   * Define a question to be asked by the pormpt
   * @param question
   * @param varName
   * @param varType
   * @param customType The name used for the custom question type.
   */
  ask(
    question: string,
    varName: string,
    varType: QuestionsTypes,
    customName?: string
  ) {
    this.askedQuestions++;
    this.inputs.set(varName, undefined);

    question =
      this.stylize(
        this.getString("questionStart"),
        this.questionStyles["question-start"]
      ) +
      this.stylize(question, this.questionStyles["question"]) +
      " " +
      this.stylize(
        this.getString("questionDelimiter"),
        this.questionStyles["delimiter"]
      ) +
      " ";
    this.questions[question] = {
      varName: varName,
      varType: varType,
    };
    this.lastQuestion = question;
    if (customName) {
      this.questions[question].customName = customName;
    }
    return this;
  }
  /**# Get Input
   * ---
   * Get input from question
   * @param varName
   */
  getInput(varName: string): string | number | any[] | undefined | boolean {
    return this.inputs.get(varName);
  }
  /**# Clear Rows
   * ---
   * Clears console output for a given row range.
   * @param rowStart
   * @param rowEnd
   */
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
  /**# Get Row
   * ---
   * Gets the current row number that the output is on.
   */
  getRow() {
    return this.currentRow;
  }
  /**# Set Row
   *---
   * Sets the console cursor to a row.
   * @param num
   */
  setRow(num: number) {
    this.currentRow = num;
    this.rdl.cursorTo(process.stdout, 0, this.currentRow);
    return this;
  }
  /**# Add Row
   * ---
   * Add one row to the current console cursor.
   */
  addRow() {
    this.currentRow++;
    return this;
  }
  /**# New Service Bar
   * ---
   * Makes a continuous loading bar.
   * @param name
   */
  newServiceBar(
    name: string,
    serviceBarStyle: ServiceBarStyle = this.defaultServiceBarStyle
  ) {
    const s = serviceBarStyle;
    const bar = new this.ServiceBar(
      this.rdl,
      this.currentRow,
      s.size,
      0,
      s.interval,
      this.stylize(s.base, s.baseStyle),
      this.stylize(s.loadedOne, s.loadedOneStyle),
      this.stylize(s.loadedTwo, s.loadedTwoStyle),
      this.stylize(s.cap, s.capStyle)
    );
    this.currentRow++;
    this.serviceBars[name] = bar;
    return this;
  }
  /**# Re Init Service Bar
   * ---
   * Restart a service bar.
   * @param name
   */
  reInitServiceBar(name: string) {
    this.serviceBars[name].reInit();
    return this;
  }
  /**# Destroy Service Bar
   * ---
   * Destroy a service bar.
   * @param name
   */
  destroyServiceBar(name: string) {
    const bar = this.serviceBars[name];
    const row = bar.rows;
    bar.clear();
    this.clearRows(row, row);
    (this as any).serviceBars[name] = null;
    delete this.serviceBars[name];
    return this;
  }
  /**# New Progress Bar
   * ---
   * Makes a new progress loading bar.
   * @param name of bar to be used as an id
   */
  newProgressBar(name: string, progressBarStyle?: ProgressBarStyle) {
    let d;
    if (progressBarStyle) {
      d = progressBarStyle;
    } else {
      d = this.defaultPrgoressBarStyle;
    }
    const bar = new this.ProgressBar(
      this.rdl,
      this.currentRow,
      d.size,
      d.interval,
      this.stylize(d.base, d.baseStyle),
      this.stylize(d.loaded, d.loadedStyle)
    );
    this.currentRow++;
    bar.start();
    this.progressBars[name] = bar;
    return this;
  }
  /**# Increment Progress Bar
   * ---
   * Adds progress to the progress bar.
   * @param name name of bar to increase
   * @param amount amount to increase by
   */
  async incrementProgressBar(name: string, amount: number) {
    await this.progressBars[name].addProgressPerfect(amount);
    return this;
  }
  /**# Sleep
   * ---
   * Makes the program sleep via a loop.
   * @param ms miliseconds to sleep
   */
  sleep(ms: number) {
    var waitTill = new Date(new Date().getTime() + ms);
    while (waitTill > new Date()) {}
    return this;
  }
  /**# Async Sleep
   * ---
   * Makes the program sleep via a promsie.
   * @param ms miliseconds to sleep
   */
  asyncSleep(ms: number): Promise<this> {
    let self = this;
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(self);
      }, ms)
    );
  }
  /** # New Screen
   * ---
   * Clears the screen and resets the row.
   */
  newScreen() {
    console.clear();
    this.currentRow = 0;
    return this;
  }

  /**# Get Message Array
   * ---
   * Returns back an array of strings with the given value.
   * Used display multi messsages.
   * @param message
   * @returns
   */
  _getMessageArray(
    message: string | number | object | any[]
  ): string[] | false {
    if (message == undefined) return false;
    let messageArray: string[] = [];
    if (Array.isArray(message)) {
      for (const mem of message) {
        if (typeof mem === "number" || typeof mem === "string") {
          messageArray.push(`${mem}`);
        } else if (typeof mem === "boolean") {
          if(mem) {
            messageArray.push(`true`);
          } else {
            messageArray.push(`false`);
          }
        } else if (typeof mem === "object") {
          messageArray.push(JSON.stringify(mem, null, 5));
        }
      }
    } else {
      if (typeof message === "object") {
        messageArray[0] == JSON.stringify(message, null, 5);
      } else if (typeof message === "boolean") {
        if(message) {
          messageArray.push(`true`);
        } else {
          messageArray.push(`false`);
        }
      } else {
        messageArray[0] = `${message}`;
      }
    }
    return messageArray;
  }

  _processMessage(message: string, type: MessageTypes | "none" = "none") {
    let output = message;
    if (type != "Raw" && type != "Data") {
      if (type != "none") {
        output = this.stylize(message, this.messageStyles[type]);
      } else {
        output = this.stylize(message, this.styleDelimiter);
      }
    }
    if (type == "Data") {
      output = JSON.stringify(message, null, 3);
    }
    return output;
  }
  /**# Show At Sleep
   * ---
   * Shows a message at a specific row then sleeps. You can supply it arguments with the params object.
   * @param message
   * @param params
   * @property __type__ : MessageType or "none"
   * @property __row__ : The row to log message at.
   * @property __col__ : The collumn to log text at. Default is 0.
   * @property __sleep__ : The miliseconds to sleep.
   *
   */
  showAtSleep(
    message: string | number | object | any[],
    params: {
      row?: number;
      col?: number;
      type?: MessageTypes | "none";
      sleep?: number;
    } = {
      row: this.currentRow,
      col: 0,
      type: "none",
      sleep: this.defaultSleepTime,
    }
  ) {
    const messageArray = this._getMessageArray(message);
    if (!messageArray) return this;
    for (const mem of messageArray) {
      this.showAt(mem, {
        row: params.row,
        type: params.type,
        col: params.col,
      });
      let sleep = this.defaultSleepTime;
      if (params.sleep) {
        sleep = params.sleep;
      }
      this.sleep(sleep);
    }
    return this;
  }
  /**# Show At
   * ---
   * Shows a message at a specific row. You can supply it arguments with the params object.
   * @param message
   * @param params
   * @property __type__ : MessageType or "none"
   * @property __row__ : The row to log message at.
   * @property __col__ : The collumn to log text at. Default is 0.
   *
   */
  showAt(
    message: string | number | object | any[],
    params: {
      row?: number;
      col?: number;
      type?: MessageTypes | "none";
    } = {
      row: this.currentRow,
      col: 0,
      type: "none",
    }
  ) {
    const messageArray = this._getMessageArray(message);
    if (!messageArray) return this;
    let col = 0;
    if (params.col) {
      col = params.col;
    }
    let row = this.currentRow;
    if (params.row) {
      row = params.row;
    }
    let type: MessageTypes | "none" = "none";
    if (params.type) {
      type = params.type;
    }
    for (const mem of messageArray) {
      let output = this._processMessage(mem, type);
      const lines = this.countLines(`${output}`);
      this.rdl.cursorTo(process.stdout, col, row);
      this.currentRow += lines;
      console.log(output);
    }
    return this;
  }
  /**# Show
   * ---
   * Shows a message. If no message type is set it will use the pre-defined default style or the
   * one created from a style chain.
   * @param message
   * @param type
   */
  show(
    message: string | number | object | any[],
    type: MessageTypes | "none" = "none"
  ): this {
    const messageArray = this._getMessageArray(message);
    if (!messageArray) return this;
    for (const mem of messageArray) {
      let output = this._processMessage(mem, type);
      const lines = this.countLines(`${output}`);
      this.rdl.cursorTo(process.stdout, 0, this.currentRow);
      this.currentRow += lines;
      console.log(output);
    }
    return this;
  }
  /**# Show Sleep
   * Shows a message and then sleeps
   *
   * @param message
   * @param type
   * @param ms
   */
  showSleep(
    message: string | number | object | any[],
    type: MessageTypes | "none" = "none",
    ms: number = this.defaultSleepTime
  ): this {
    const messageArray = this._getMessageArray(message);
    if (!messageArray) return this;
    for (const mem of messageArray) {
      this.show(mem, type);
      this.sleep(ms);
    }
    return this;
  }
  /**# Log
   * ---
   * Log message without adjusting cursor position.
   * @param message
   * @param type
   */
  log(
    message: string | number | object | any[],
    type: MessageTypes | "none" = "none"
  ): this {
    const messageArray = this._getMessageArray(message);
    if (!messageArray) return this;
    for (const mem of messageArray) {
      let output = this._processMessage(mem, type);
      const lines = this.countLines(`${output}`);
      this.currentRow += lines;
      console.log(output);
    }
    return this;
  }
  /** # Log Sleep
   * ---
   * Log message and sleep without adjusting cursor position.
   * @param message
   * @param type
   * @param ms
   */
  logSleep(
    message: string | number | object | any[],
    type: MessageTypes | "none" = "none",
    ms: number = this.defaultSleepTime
  ): this {
    const messageArray = this._getMessageArray(message);
    if (!messageArray) return this;
    for (const mem of messageArray) {
      this.log(mem, type);
      this.sleep(ms);
    }
    return this;
  }
  /** # Log Table
   * ---
   * Use console.table to show a table without adjusting cursor row position.
   * @param data
   * @param collumns
   * @returns
   */
  logTable(data: object | object[], collumns?: string[]): this {
    if (data == undefined) return this;
    let dataArray = [];
    if (Array.isArray(data)) {
      dataArray = data;
    } else {
      dataArray[0] = data;
    }
    for (const d of dataArray) {
      const lines = Object.keys(d).length + 2;
      this.currentRow += lines;
      console.table(d, collumns);
    }
    return this;
  }
  /** # Log Table
   * ---
   * Use console.table to show a table at current row position.
   * @param data
   * @param collumns
   * @returns
   */
  showTable(data: any, collumns?: string[]): this {
    if (data == undefined) return this;
    let dataArray = [];
    if (Array.isArray(data)) {
      dataArray = data;
    } else {
      dataArray[0] = data;
    }
    for (const d of dataArray) {
      const lines = Object.keys(d).length + 2;
      this.rdl.cursorTo(process.stdout, 0, this.currentRow);
      this.currentRow += lines;
      console.table(d, collumns);
    }
    return this;
  }
  /** Get Message Styled
   * ---
   * Return a string styled with one of the pre-defined message types.
   * @param type
   * @param message
   * @returns string
   */
  getMessageStyled(type: MessageTypes, message: any) {
    return this.stylize(message, this.messageStyles[type]);
  }
  /** # Count Lines
   * ---
   * Count the  numbers of new lines a string will add to the console.
   * @param message
   * @returns number
   */
  countLines(message: string) {
    return message.split(/\r\n|\r|\n/).length;
  }
  /** # Log Seperator
   * ---
   * Logs output seperator
   */
  logSeparator() {
    this.log(this.getString("separator"), "Info");
    return this;
  }
  /** # Log Program Title
   * ---
   * Logs program title
   */
  logProgramTitle() {
    this.log(this.getString("title"), "Title");
    return this;
  }
  /** # Show Seperator
   * ---
   * Show output seperator at current row.
   */
  showSeparator() {
    this.show(this.getString("separator"), "Info");
    return this;
  }
  /** # Show Program Title
   * ---
   *  Show program serperator at current row.
   */
  showProgramTitle() {
    this.show(this.getString("title"), "Title");
    return this;
  }
  /**# Define Sleep Time
   * ---
   * Defines the default sleep time.
   * @param sleep
   */
  defineSleepTime(sleep: number) {
    this.defaultSleepTime = sleep;
    return this;
  }
  /** # Define Validator
   * ---
   * Define a validate function for a question type.
   * @param type
   * @param func
   * @param name If using a custom question type you must set this param.
   */
  defineValidator(
    type: QuestionsTypes,
    func: (input: any) => Promise<boolean>,
    name?: string
  ) {
    if (type === "custom") {
      if (!name) {
        throw new Error("Must define name for custom question type.");
      }
      this.customValidators[name] = func;
    } else {
      this.validators[type] = func;
    }
    return this;
  }
  /**# Define Question Style
   * ---
   * Use a style object to define a questions style.
   * @param type "question" | "re-ask" | "delimiter"
   * @param styleString
   */
  defineQuestionStyle(type: QuestionDisplayTypes, styleObj: StyleObject) {
    this.questionStyles[type] = styleObj;
    return this;
  }
  /**# Define Message Style
   * ---
   * Use a style object to define a messages style.
   * @param type
   * @param styleString
   */
  defineMessageStyle(type: MessageTypes, styleObj: StyleObject) {
    this.messageStyles[type] = styleObj;
    return this;
  }
  /**# Define Progress Bar Style
   * ---
   * Define the default progress bar style.
   * @param progressBarStyle
   */
  defineProgressBarStyle(progressBarStyle: ProgressBarStyle) {
    this.defaultPrgoressBarStyle = progressBarStyle;
    return this;
  }
  /**# Define Service Bar Style
   * ---
   * Define the default service bar style.
   * @param serviceBarStyle
   */
  defineServiceBarStyle(serviceBarStyle: ServiceBarStyle) {
    this.defaultServiceBarStyle = serviceBarStyle;
    return this;
  }
  /**# Define Program Title
   * ---
   * Define the programs title.
   * @param title
   */
  defineProgramTitle(title: string, styleObj?: StyleObject) {
    this.strings["title"] = title;
    if (styleObj) {
      this.messageStyles["Title"] = styleObj;
    }
    return this;
  }
  /** # Define Help Text
   * ---
   * Defines the help text for the program.
   * @param text
   */
  defineHelpText(text: string) {
    this.strings["helpText"] = text;
    return this;
  }
  /**# Define Screen
   * ---
   * Define a function to be called for a screen.
   * @param screen
   * @param func
   */
  defineScreen(screen: DisplayScreens, func: Function) {
    this.screens[screen] = func;
    return this;
  }
  /**# Display Screen
   * ---
   * Display a built in screen.
   * @param screen
   * @param args Args to be pased to screen. Default is an enpty object.
   */
  displayScreen(screen: DisplayScreens, args: any = {}) {
    this.screens[screen](args);
  }
  /**# Define Splash Screen
   * ---
   * Define a function to be called for the splash screen.
   * @param func
   */
  defineSplashScreen(func: Function) {
    this.screens["splash"] = func;
    return this;
  }
  /**# Splash Screen
   * ---
   * Meant to show the programs title/splash screen.
   */
  splashScreen() {
    this.screens["splash"]();
    return this;
  }
  /** # Program Init Error Screen
   * ---
   * Screen to show if the program fails to get the right arguments.
   * @param message
   */
  promgramInitErrorScreen(message: string) {
    this.screens["programInitError"](message);
  }
  /** # Program Error Screen
   * ---
   * Screen to show if the program has an error.
   * @param message
   */
  errorScreen(message: string) {
    this.screens["error"](message);
  }
  /** # Program Crash Screen
   * ---
   * Screen to show if the program crashes.
   * @param message
   */
  crashScreen(message: string) {
    this.screens["crash"](message);
  }
  /**# Get String
   * ---
   * Get a built in string.
   * @param id
   */
  getString(id: Strings) {
    return this.strings[id];
  }
  /**# Set String
   * ---
   * Set a built in string.
   * @param id
   */
  setString(id: Strings, string: string) {
    this.strings[id] = string;
    return this;
  }
  _copyDefaultStyle(): StyleObject {
    return JSON.parse(JSON.stringify(this.defaultStyleDelimiter));
  }
  _copyMessageStyle(type: MessageTypes): StyleObject {
    return JSON.parse(JSON.stringify(this.messageStyles[type]));
  }
  //Quick Styles
  /**# Info
   * ---
   * Styles the text to be the "info" message style.
   * @returns string | this
   */
  info(text?: string): this | string {
    this.styleDelimiter = this._copyMessageStyle("Info");
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [INFO] Info
   * ---
   * Sets chain style to be the "info" message style..
   */
  get INFO() {
    this.styleDelimiter = this._copyMessageStyle("Info");
    return this;
  }
  /**# Good
   * ---
   * Styles the text to be the "good" message style.
   * @returns string | this
   */
  good(text?: string): string | this {
    this.styleDelimiter = this._copyMessageStyle("Good");
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [GOOD] Good
   * ---
   * Sets chain style to be the "good" message style..
   */
  get GOOD() {
    this.styleDelimiter = this._copyMessageStyle("Good");
    return this;
  }
  /**# Warning
   * ---
   * Styles the text to be the "warning" message style.
   * @returns string | this
   */
  warning(text?: string): string | this {
    this.styleDelimiter = this._copyMessageStyle("Warning");
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [WARNING] Warning
   * ---
   * Sets chain style to be the "warning" message style..
   */
  get WARNING() {
    this.styleDelimiter = this._copyMessageStyle("Warning");
    return this;
  }
  /**# Raw
   * ---
   * Styles the text to be the "raw" message style.
   * @returns string | this
   */
  raw(text?: string): string | this {
    this.styleDelimiter = this._copyMessageStyle("Raw");
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [RAW] Raw
   * ---
   * Sets chain style to be the "raw" message style..
   */
  get RAW() {
    this.styleDelimiter = this._copyMessageStyle("Raw");
    return this;
  }
  /**# Title
   * ---
   * Styles the text to be the "title" message style.
   * @returns string | this
   */
  title(text?: string): string | this {
    this.styleDelimiter = this._copyMessageStyle("Title");
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [TITLE] Raw
   * ---
   * Sets chain style to be the "title" message style..
   */
  get TITLE() {
    this.styleDelimiter = this._copyMessageStyle("Title");
    return this;
  }
  /**# Warning
   * ---
   * Styles the text to be the "error" message style.
   * @returns string | this
   */
  error(text?: string): string | this {
    this.styleDelimiter = this._copyMessageStyle("Error");
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [ERROR] Error
   * ---
   * Sets chain style to be the "error" message style..
   */
  get ERROR() {
    this.styleDelimiter = this._copyMessageStyle("Error");
    return this;
  }
  /**# [NS] New Screen
   * ---
   * Clears the screen.
   * Alias for newScreen()
   */
  get NS() {
    this.newScreen();
    return this;
  }
  /**# [NEWSCREEN] New Screen
   * ---
   * Clears the screen.
   * Alias for newScreen()
   */
  get NEWSCREEN() {
    this.newScreen();
    return this;
  }
  /**# New Line
   * ---
   * Adds a new line to the console.
   */
  newLine() {
    console.log("\n");
    this.currentRow++;
  }
  /**# [NL] New Line
   * ---
   * Adds a new line to the console.
   * Alias for newLine()
   */
  get NL() {
    this.newLine();
    return this;
  }
  /**# [NEWLINE] New Line
   * ---
   * Adds a new line to the console.
   * Alias for newLine()
   */
  get NEWLINE() {
    this.newLine();
    return this;
  }
  /**# [RETRUN] New Line
   * ---
   * Adds a new line to the console.
   * Alias for newLine()
   */
    get RETURN() {
    this.newLine();
    return this;
  }
  /**# Clear
   * ---
   * Clears the chain style.
   */
  clear() {
    this.styleDelimiter = this._copyDefaultStyle();
    return this;
  }
  /**# [CL] Clear Line
   * ---
   * Clears the chain style.
   * Alias for clear()
   */
  get CL() {
    this.styleDelimiter = this._copyDefaultStyle();
    return this;
  }
  /**# [CLEAR] Clear Line
   * ---
   * Clears the chain style.
   * Alias for clear()
   */
  get CLEAR() {
    this.styleDelimiter = this._copyDefaultStyle();
    return this;
  }
  /**# Blink
   * ---
   * Styles the text to blink.
   * @returns string
   */
  blink(text?: string): string | this {
    this.styleDelimiter.blink = true;
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [BI] Blink
   * ---
   * Sets chain style to blink.
   */
  get BI() {
    this.styleDelimiter.blink = true;
    return this;
  }
  /**# [BLINK] Blink
   * ---
   * Sets chain style to blink.
   */
  get BLINK() {
    this.styleDelimiter.blink = true;
    return this;
  }
  /**# Hidden
   * ---
   * Styles the text to be hidden.
   * @returns string
   */
  hidden(text?: string): string | this {
    this.styleDelimiter.hidden = true;
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [H] Hidden
   * ---
   * Sets chain style to be hidden..
   */
  get H() {
    this.styleDelimiter.hidden = true;
    return this;
  }
  /**# [HIDDEN] Hidden
   * ---
   * Sets chain style to be hidden.
   */
  get HIDDEN() {
    this.styleDelimiter.hidden = true;
    return this;
  }
  /**# Underscore
   * ---
   * Styles the text to be underscored.
   * @returns string
   */
  underscore(text?: string): string | this {
    this.styleDelimiter.underscore = true;
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [U] Underscore
   * ---
   * Sets chain style to be underscored.
   */
  get U() {
    this.styleDelimiter.underscore = true;
    return this;
  }
  /**# [UNDERSCORE] Underscore
   * ---
   * Sets chain style to be underscored.
   */
  get UNDERSCORE() {
    this.styleDelimiter.underscore = true;
    return this;
  }
  /** # Dim
   * ---
   * Returns a string styled to be dim.
   * @param text
   * @returns string
   */
  dim(text?: string): string | this {
    this.styleDelimiter.dim = true;
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [D] Dim
   * ---
   * Sets chain style to be dim.
   */
  get D() {
    this.styleDelimiter.dim = true;
    return this;
  }
  /**# [DIM] Dim
   * ---
   * Sets chain style to be dim.
   */
  get DIM() {
    this.styleDelimiter.dim = true;
    return this;
  }
  /** # Bright
   * ---
   * Returns a string styled to be bright.
   * @param text
   * @returns string
   */
  bright(text?: string): string | this {
    this.styleDelimiter.bright = true;
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [BR] Bright
   * ---
   * Sets chain style to be bright.
   */
  get BR() {
    this.styleDelimiter.bright = true;
    return this;
  }
  /**# [BRIGHT] Bright
   * ---
   * Sets chain style to be bright.
   */
  get BRIGHT() {
    this.styleDelimiter.bright = true;
    return this;
  }
  /** # Invert
   * ---
   * Returns a string styled to be reversed.
   * @param text
   * @returns string
   */
  invert(text?: string): string | this {
    this.styleDelimiter.reverse = true;
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [BRIGHT] Bright
   * ---
   * Sets chain style to be reversed.
   */
  get I() {
    this.styleDelimiter.reverse = true;
    return this;
  }
  /**# [BRIGHT] Bright
   * ---
   * Sets chain style to be reversed.
   */
  get INVERT() {
    this.styleDelimiter.reverse = true;
    return this;
  }
  /** # Red
   * ---
   * Returns a string styled to be red.
   * @param text
   * @returns string
   */
  red(text?: string): string | this {
    this.styleDelimiter.fg = "Red";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [R] Red
   * ---
   * Sets chain style to be red.
   */
  get R() {
    this.styleDelimiter.fg = "Red";
    return this;
  }
  /**# [RED] Red
   * ---
   * Sets chain style to be red.
   */
  get RED() {
    this.styleDelimiter.fg = "Red";
    return this;
  }
  /** # Green
   * ---
   * Returns a string styled to be green.
   * @param text
   * @returns string
   */
  green(text?: string): string | this {
    this.styleDelimiter.fg = "Green";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [G] Green
   * ---
   * Sets chain style to be green.
   */
  get G() {
    this.styleDelimiter.fg = "Green";
    return this;
  }
  /**# [GREEN] Green
   * ---
   * Sets chain style to be green.
   */
  get GREEN() {
    this.styleDelimiter.fg = "Green";
    return this;
  }
  /** # Blue
   * ---
   * Returns a string styled to be blue.
   * @param text
   * @returns string
   */
  blue(text?: string): string | this {
    this.styleDelimiter.fg = "Blue";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [B] Blue
   * ---
   * Sets chain style to be blue.
   */
  get B() {
    this.styleDelimiter.fg = "Blue";
    return this;
  }
  /**# [BLUE] Blue
   * ---
   * Sets chain style to be blue.
   */
  get BLUE() {
    this.styleDelimiter.fg = "Blue";
    return this;
  }
  /** # White
   * ---
   * Returns a string styled to be white.
   * @param text
   * @returns string
   */
  white(text?: string): string | this {
    this.styleDelimiter.fg = "White";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [W] White
   * ---
   * Sets chain style to be white.
   */
  get W() {
    this.styleDelimiter.fg = "White";
    return this;
  }
  /**# [WHITE] White
   * ---
   * Sets chain style to be white.
   */
  get WHITE() {
    this.styleDelimiter.fg = "White";
    return this;
  }
  /** # Black
   * ---
   * Returns a string styled to be black.
   * @param text
   * @returns string
   */
  black(text?: string): string | this {
    this.styleDelimiter.fg = "Black";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [BL] Black
   * ---
   * Sets chain style to be Black.
   */
  get BL() {
    this.styleDelimiter.fg = "Black";
    return this;
  }
  /**# [BLACK] Black
   * ---
   * Sets chain style to be Black.
   */
  get BLACK() {
    this.styleDelimiter.fg = "Black";
    return this;
  }
  /** # Cyan
   * ---
   * Returns a string styled to be cyan.
   * @param text
   * @returns string
   */
  cyan(text?: string) {
    this.styleDelimiter.fg = "Cyan";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [C] Cyan
   * ---
   * Sets chain style to be cyan.
   */
  get C() {
    this.styleDelimiter.fg = "Cyan";
    return this;
  }
  /**# [CYAN] Cyan
   * ---
   * Sets chain style to be cyan.
   */
  get CYAN() {
    this.styleDelimiter.fg = "Cyan";
    return this;
  }
  /** # Magenta
   * ---
   * Returns a string styled to be magenta.
   * @param text
   * @returns string
   */
  magenta(text?: string) {
    this.styleDelimiter.fg = "Magenta";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [M] Magenta
   * ---
   * Sets chain style to be magenta.
   */
  get M() {
    this.styleDelimiter.fg = "Magenta";
    return this;
  }
  /**# [MAGENTA] Magenta
   * ---
   * Sets chain style to be magenta.
   */
  get MAGENTA() {
    this.styleDelimiter.fg = "Magenta";
    return this;
  }
  /** # Yellow
   * ---
   * Returns a string styled to be yellow.
   * @param text
   * @returns string
   */
  yellow(text?: string) {
    this.styleDelimiter.fg = "Yellow";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [Y] Yellow
   * ---
   * Sets chain style to be yellow.
   */
  get Y() {
    this.styleDelimiter.fg = "Yellow";
    return this;
  }
  /**# [YELLOW] Yellow
   * ---
   * Sets chain style to be yellow.
   */
  get YELLOW() {
    this.styleDelimiter.fg = "Yellow";
    return this;
  }
  /** # Red Background
   * ---
   * Returns a string styled to have a red background.
   * @param text
   * @returns string
   */
  redBG(text?: string) {
    this.styleDelimiter.bg = "Red";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [RBG] Red Background
   * ---
   * Sets chain style to have a red background.
   */
  get RBG() {
    this.styleDelimiter.bg = "Red";
    return this;
  }
  /**# [REDBG] Red Background
   * ---
   * Sets chain style to have a red background.
   */
  get REDBG() {
    this.styleDelimiter.bg = "Red";
    return this;
  }
  /** # Green Background
   * ---
   * Returns a string styled to have a green background.
   * @param text
   * @returns string
   */
  greenBG(text?: string) {
    this.styleDelimiter.bg = "Green";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [GBG] Green Background
   * ---
   * Sets chain style to have a green background..
   */
  get GBG() {
    this.styleDelimiter.bg = "Green";
    return this;
  }
  /**# [GREENBG] Green Background
   * ---
   * Sets chain style to have a green background..
   */
  get GREENBG() {
    this.styleDelimiter.bg = "Green";
    return this;
  }
  /** # Blue Background
   * ---
   * Returns a string styled to have a blue background.
   * @param text
   * @returns string
   */
  blueBG(text?: string) {
    this.styleDelimiter.bg = "Blue";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [BBG] Blue Background
   * ---
   * Sets chain style to have a blue background.
   */
  get BBG() {
    this.styleDelimiter.bg = "Blue";
    return this;
  }
  /**# [BLUEBG] Blue Background
   * ---
   * Sets chain style to have a blue background.
   */
  get BLUEBG() {
    this.styleDelimiter.bg = "Blue";
    return this;
  }
  /** # White Background
   * ---
   * Returns a string styled to have a white background.
   * @param text
   * @returns string
   */
  whiteBG(text?: string) {
    this.styleDelimiter.bg = "White";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [WBG] Blue Background
   * ---
   * Sets chain style to have a white background.
   */
  get WBG() {
    this.styleDelimiter.bg = "White";
    return this;
  }
  /**# [WHITEBG] Blue Background
   * ---
   * Sets chain style to have a white background.
   */
  get WHITEBG() {
    this.styleDelimiter.bg = "White";
    return this;
  }
  /** # Black Background
   * ---
   * Returns a string styled to have a black background.
   * @param text
   * @returns string
   */
  blackBG(text?: string) {
    this.styleDelimiter.bg = "Black";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [BLBG] Black Background
   * ---
   * Sets chain style to have a black background.
   */
  get BLBG() {
    this.styleDelimiter.bg = "Black";
    return this;
  }
  /**# [BLACKBG] Black Background
   * ---
   * Sets chain style to have a black background.
   */
  get BLACKBG() {
    this.styleDelimiter.bg = "Black";
    return this;
  }
  /** # Cyan Background
   * ---
   * 
   * Returns a string styled to have a cyan background.
   * @param text
   * @returns string
   */
  cyanBG(text?: string) {
    this.styleDelimiter.bg = "Cyan";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [CBG] Cyan Background
   * ---
   * Sets chain style to have a cyan background.
   */
  get CBG() {
    this.styleDelimiter.bg = "Cyan";
    return this;
  }
  /**# [CYANBG] Cyan Background
   * ---
   * Sets chain style to have a cyan background.
   */
  get CYANBG() {
    this.styleDelimiter.bg = "Cyan";
    return this;
  }
  /** # Magenta Background
   * ---
   * Returns a string styled to have a magenta background.
   * @param text
   * @returns string
   */
  magentaBG(text?: string) {
    this.styleDelimiter.bg = "Magenta";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [MBG] Magenta Background
   * ---
   * Sets chain style to have a magenta background.
   */
  get MBG() {
    this.styleDelimiter.bg = "Magenta";
    return this;
  }
  /**# [MAGENTABG] Magenta Background
   * ---
   * Sets chain style to have a magenta background.
   */
  get MAGENTABG() {
    this.styleDelimiter.bg = "Magenta";
    return this;
  }
  /** # Yellow Background
   * ---
   * Returns a string styled to have a yellow background.
   * @param text
   * @returns string
   */
  yellowBG(text?: string) {
    this.styleDelimiter.bg = "Yellow";
    if (!text) return this;
    const string = this.stylize(text, this.styleDelimiter);
    this.styleDelimiter = this._copyDefaultStyle();
    return string;
  }
  /**# [YBG] Yellow Background
   * ---
   * Sets chain style to have a yellow background.
   */
  get YBG() {
    this.styleDelimiter.bg = "Yellow";
    return this;
  }
  /**# [YBG] Yellow Background
   * ---
   * Sets chain style to have a yellow background.
   */
  get YELLOWBG() {
    this.styleDelimiter.bg = "Yellow";
    return this;
  }
  /**# Do
   * ---
   * Run a function in the chain of functions.
   * @param func
   * @param arg
   * @returns
   */
  do(func: (arg?: any) => any, arg: any): this {
    func(arg);
    return this;
  }
  /**# New Service
   * ---
   * Run a function on an interval. 
   * @param name 
   * @param params \{interval : number,run : Function\}
   * @returns 
   */
  newService(name : string , params : {interval : number,run : Function,args : any}) {
    const inte = setInterval(()=>{params.run(params.args)},params.interval);
    this.services[name] = inte;
    return this;
  }
  /** # Clear Service
   * ---
   * Stop a serivce from running. 
   * @param name 
   */
  clearService(name : string) {
   clearInterval(this.services[name]);
   return this;
  }
   /**# Exit
   * ---
   * Makes the program exit.
   * Runs : process.exit(0)
   */
  exit() {
    process.exit(0);
  }
  /**# [EXIT] Exit
   * ---
   * Makes the program exit.
   * Runs : process.exit(0)
   */
  get EXIT(){
    this.exit();
    return this;
  }
  /**# Done
   * ---
   * Shows the done screen and then exits.
   * Runs : process.exit(1)
   */
  done() {
    this.screens["done"]();
    this.exit();
  }
  ServiceBar = class {
    cursor = 0;
    inte: any;
    constructor(
      public rdl: any,
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
  };

  ProgressBar = class {
    done = false;
    cursor = 0;
    timer: any = null;
    constructor(
      public rdl: any,
      public row: number,
      public size: number,
      public interval: number = 20,
      public base = "-",
      public loaded = "="
    ) {}
    start() {
      for (let i = 0; i < this.size; i++) {
        process.stdout.write(this.base);
      }
      this.rdl.cursorTo(process.stdout, 0, this.row);
    }
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
  };
}
const rdl = require("readline");
const DS = new DSLogger(rdl);
module.exports = DS;
