"use strict";
/**
  # DSLogger
  ---
  All in one CLI solution for Node.Js made by Divine Star
  @organization Divine Star LLC
  @author Luke Johnson
  @since 9-19-2021
  @version 1.0.1
  */
class DSCommander {
    constructor(rdl) {
        this.rdl = rdl;
        this.debugMode = false;
        //Used to keep track of number of console.group runs. So they can all be cleared later.
        this._numOfGroups = 0;
        this._directives = {
            debug: false,
            trace: false,
            group: false,
        };
        //Used for chaining styles
        this._defaultStyleDelimiter = {};
        this._styleDelimiter = {};
        this._defaultSleepTime = 800;
        this._services = {};
        //strings
        this._strings = {
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
        this._defaultPrgoressBarStyle = {
            base: "-",
            baseStyle: {},
            loaded: "=",
            loadedStyle: {},
            size: 30,
            interval: 15,
        };
        this._defaultServiceBarStyle = {
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
        this._consoleCodes = {
            Reset: "\x1b[0m",
            Bright: "\x1b[1m",
            Dim: "\x1b[2m",
            Underscore: "\x1b[4m",
            Blink: "\x1b[5m",
            Reverse: "\x1b[7m",
            Hidden: "\x1b[8m",
        };
        this._consoleFGColors = {
            Black: "\x1b[30m",
            Red: "\x1b[31m",
            Green: "\x1b[32m",
            Yellow: "\x1b[33m",
            Blue: "\x1b[34m",
            Magenta: "\x1b[35m",
            Cyan: "\x1b[36m",
            White: "\x1b[37m",
        };
        this._consoleBGColors = {
            Black: "\x1b[40m",
            Red: "\x1b[41m",
            Green: "\x1b[42m",
            Yellow: "\x1b[43m",
            Blue: "\x1b[44m",
            Magenta: "\x1b[45m",
            Cyan: "\x1b[46m",
            White: "\x1b[47m",
        };
        this._questionStyles = {
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
        this._messageStyles = {
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
        this._initalProgramArgs = [];
        this._params = new Map();
        this._paramValues = new Map();
        this._requiredParams = new Map();
        this._inputs = new Map();
        this._lastQuestion = "";
        this._askedQuestions = 0;
        this._questions = {};
        this._questionsFails = {};
        this.currentRow = 0;
        this.currentCol = 0;
        this._progressBars = {};
        this._serviceBars = {};
        //The delimiters userd for parsing array inputs
        this.arrayInputDelimiters = [",", "+"];
        this.booleanTrueStrings = ["true", "t", "yes", "y", "Y"];
        this.booleanFalseStrings = ["false", "f", "no", "no", "N"];
        this._validators = {
            digit: async (input) => {
                if (Array.isArray(input))
                    return false;
                const reg = /^[0-9]$/;
                return reg.test(input);
            },
            number: async (input) => {
                if (Array.isArray(input))
                    return false;
                const reg = /^\d+$/;
                return reg.test(input);
            },
            "number[]": async (input) => {
                if (!Array.isArray(input))
                    return false;
                const reg = /^\d+$/;
                for (const value of input) {
                    if (!reg.test(value)) {
                        return false;
                    }
                }
                return true;
            },
            boolean: async (input) => {
                if (Array.isArray(input))
                    return false;
                if (this.booleanFalseStrings.indexOf(input) == -1 &&
                    this.booleanTrueStrings.indexOf(input) == -1) {
                    return false;
                }
                return true;
            },
            "boolean[]": async (input) => {
                if (!Array.isArray(input))
                    return false;
                for (const value of input) {
                    if (this.booleanFalseStrings.indexOf(value) == -1 &&
                        this.booleanTrueStrings.indexOf(value) == -1) {
                        return false;
                    }
                }
                return true;
            },
            string: async (input) => {
                if (Array.isArray(input))
                    return false;
                if (typeof input === "string" && input === "")
                    return true;
                const reg = /\d/;
                return !reg.test(input);
            },
            "string[]": async (input) => {
                if (!Array.isArray(input))
                    return false;
                const reg = /\d/;
                for (let value of input) {
                    value = value.trim();
                    if (reg.test(value)) {
                        return false;
                    }
                }
                return true;
            },
            stringall: async (input) => {
                if (Array.isArray(input))
                    return false;
                if (typeof input === "string" && input === "")
                    return true;
                if (typeof input === "string")
                    return true;
                return false;
            },
            "stringall[]": async (input) => {
                if (!Array.isArray(input))
                    return false;
                for (const value of input) {
                    if (typeof value !== "string") {
                        return false;
                    }
                }
                return true;
            },
            email: async (input) => {
                if (Array.isArray(input))
                    return false;
                const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return reg.test(input);
            },
            password: async (input) => {
                return true;
            },
            custom: async (input, type) => {
                if (!type) {
                    return false;
                }
                return this._customValidators[type](input);
            },
        };
        this._validInputTypes = [
            "string",
            "string[]",
            "number",
            "number[]",
            "boolean",
            "boolean[]",
            "stringall",
            "stringall[]",
        ];
        this._customValidators = {};
        this._screens = {
            splash: () => { },
            helpScreen: () => {
                this.TITLE.log(this.getString("title")).NL.RAW.log(this.getString("helpText")).NL;
                const ii = " ";
                for (let pk of this._paramValues.keys()) {
                    let start = "   ";
                    let param = this._params.get(pk);
                    if (!param)
                        return;
                    if (param.required) {
                        start = " * ";
                    }
                    const message = `${start}-${param.flag}, --${param.name} [${param.type}] ${ii}| ${param.desc}`;
                    console.log(message);
                }
                this.NEWLINE.exit();
            },
            programInitError: (message) => {
                this.ERROR.log(message).RAW.log("Run --help for more info.").exit();
            },
            crash: (message) => {
                this.ERROR.log("The program has crashed.").RAW.log(message).exit();
            },
            error: (message) => {
                this.ERROR.log("The program has had an error.")
                    .RAW.log(message)
                    .exit();
            },
            noInput: () => {
                this.INFO.log("Please run --help to learn how to use this program.");
            },
            done: (message) => {
                this.INFO.log("The program is done running.", "Info")
                    .log(message)
                    .exit();
            },
        };
        this.boxChars = {
            "style-1": {
                top: "─",
            },
        };
        this._keyMap = {
            up: "\u001B\u005B\u0041",
            down: "\u001B\u005B\u0042",
            left: "\u001B\u005B\u0044",
            right: "\u001B\u005B\u0043",
            "ctrl+a": "\u0001",
            "ctrl+b": "\u0002",
            "ctrl+c": "\u0003",
            "ctrl+d": "\u0004",
            "ctrl+e": "\u0005",
            "ctrl+f": "\u0006",
            "ctrl+g": "\u0007",
            "ctrl+h": "\u0008",
            "ctrl+i": "\u0009",
            "ctrl+j": "\u000A",
            "ctrl+k": "\u000B",
            "ctrl+l": "\u000C",
            "ctrl+m": "\u000D",
            "ctrl+n": "\u000E",
            "ctrl+o": "\u000F",
            "ctrl+p": "\u0010",
            "ctrl+q": "\u0011",
            "ctrl+r": "\u0012",
            "ctrl+s": "\u0013",
            "ctrl+t": "\u0014",
            "ctrl+u": "\u0015",
            "ctrl+v": "\u0016",
            "ctrl+w": "\u0017",
            "ctrl+x": "\u0018",
            "ctrl+y": "\u0019",
            "ctrl+z": "\u001A",
            esc: "\x1B",
            del: "\x1B[3~",
            f1: "\x1B[[A",
            f2: "\x1B[[B",
            f3: "\x1B[[C",
            f4: "\x1B[[D",
            f5: "\x1B[[E",
            f6: "\x1B[17~",
            f7: "\x1B[18~",
            f8: "\x1B[19~",
            f9: "\x1B[20~",
            f10: "\x1B[21~",
            f12: "\x1B[24~",
            insert: "\x1B[2~",
            home: "\x1B[1~",
            end: "\x1B[4~",
            "page-up": "\x1B[5~",
            "page-down": "\x1B[6~",
            enter: "\r",
        };
        this._stdinKeyWatch = {};
        this._stdinCharWatch = {};
        this._stdinInputWatcher = () => { };
        this.ServiceBar = class {
            constructor(rdl, rows = 0, size = 32, start = 2, interval = 150, base = "X", loadedOne = "0", loadedTwo = "|", cap = "}") {
                this.rdl = rdl;
                this.rows = rows;
                this.size = size;
                this.start = start;
                this.interval = interval;
                this.base = base;
                this.loadedOne = loadedOne;
                this.loadedTwo = loadedTwo;
                this.cap = cap;
                this.cursor = 0;
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
                    }
                    else {
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
        this.ProgressBar = class {
            constructor(rdl, row, size, interval = 20, base = "-", loaded = "=") {
                this.rdl = rdl;
                this.row = row;
                this.size = size;
                this.interval = interval;
                this.base = base;
                this.loaded = loaded;
                this.done = false;
                this.cursor = 0;
                this.timer = null;
            }
            start() {
                for (let i = 0; i < this.size; i++) {
                    process.stdout.write(this.base);
                }
                this.rdl.cursorTo(process.stdout, 0, this.row);
            }
            addProgressPerfect(percent) {
                const num = this.size * (percent / 100);
                return this.addProgress(num);
            }
            addProgress(amount) {
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
                        }
                        else if (this.cursor >= num) {
                            process.stdout.write(this.loaded);
                            doneLocal = true;
                        }
                        else {
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
    /**# Start User Input Captcher
     * ---
     * Start capturing the users input for processing.
     * @returns this
     */
    startUserInputCaptcher() {
        this._stdin = process.openStdin();
        this._stdin.setRawMode(true);
        this._stdin.resume();
        this._stdin.setEncoding("utf8");
        const watcher = (key) => {
            if (this._stdinKeyWatch[key]) {
                let funcs = this._stdinKeyWatch[key];
                for (const func of funcs) {
                    if (func.args) {
                        func.run(func.args);
                    }
                    else {
                        func.run({});
                    }
                }
            }
            if (this._stdinCharWatch[key]) {
                let funcs = this._stdinCharWatch[key];
                for (const func of funcs) {
                    if (func.args) {
                        func.run(func.args);
                    }
                    else {
                        func.run({});
                    }
                }
            }
            if (key == this._keyMap["ctrl+c"]) {
                process.exit();
            }
        };
        this._stdin.on("data", watcher);
        this._stdinInputWatcher = watcher;
        return this;
    }
    /**# Stop User Input Captcher
     * ---
     * Stops the cature of the input from the user.
     * @returns this
     */
    stopUserInputCaptcher() {
        this._stdin.pause();
        if (this._stdinInputWatcher) {
            this._stdin.removeListener("data", this._stdinInputWatcher);
        }
        return this;
    }
    /**# On User Input Char
     * ---
     * If the program is capturing input set a trigger for a specific char.
     * The watcher object has two properties.
     * \{
     * __run__ : (args:any)=>{}
     * __args__ : any
     * \}
     *
     * The function will be passed the args you pass it in the object.
     * @param char | Char to watch
     * @param watcher | WatcherObject
     * @returns this
     */
    onUserInputChar(char, watcher) {
        this._stdinCharWatch[char] ? true : (this._stdinCharWatch[char] = []);
        this._stdinCharWatch[char].push(watcher);
        return this;
    }
    /**# On User Input Key
     * ---
     * If the program is capturing input set a trigger for a specific keyboard key.
     * The watcher object has two properties.
     * \{
     * __run__ : (args:any)=>{}
     * __args__ : any
     * \}
     *
     * The function will be passed the args you pass it in the object.
     * @param key | UserInputKeys
     * @param watcher | WatcherObject
     * @returns this
     */
    onUserInputKey(key, watcher) {
        const keyCode = this._keyMap[key];
        this._stdinKeyWatch[keyCode]
            ? true
            : (this._stdinKeyWatch[keyCode] = []);
        this._stdinKeyWatch[keyCode].push(watcher);
        return this;
    }
    /** # Stylize
     * ---
     * Stylize the text with the given format.
     * @param text : string
     * @param styleObj : StyleObject
     */
    stylize(text, styleObj) {
        let front = "";
        if (styleObj.reverse) {
            front += this._consoleCodes["Reverse"];
        }
        if (styleObj.bright) {
            front += this._consoleCodes["Bright"];
        }
        if (styleObj.dim) {
            front += this._consoleCodes["Dim"];
        }
        if (styleObj.hidden) {
            front += this._consoleCodes["Hidden"];
        }
        if (styleObj.underscore) {
            front += this._consoleCodes["Underscore"];
        }
        if (styleObj.blink) {
            front += this._consoleCodes["Blink"];
        }
        if (styleObj.bg && styleObj.bg != "none") {
            front += this._consoleBGColors[styleObj.bg];
        }
        if (styleObj.fg && styleObj.fg != "none") {
            front += this._consoleFGColors[styleObj.fg];
        }
        return front + text + this._consoleCodes["Reset"];
    }
    /** # Get Raw Params
     * ---
     * Get the raw params submited to the program.
     * @returns
     */
    getRawParams() {
        return process.argv;
    }
    /**# Get Param
     * ---
     * Adds a command line arg to the program.
     * @param name Either the flag or the name of the param.
     */
    getParam(name) {
        let p;
        if ((p = this._params.get(name))) {
            if (typeof this._paramValues.get(p.flag) !== "undefined") {
                return this._paramValues.get(p.flag);
            }
        }
        return undefined;
    }
    /**# Add Param
     * ---
     * Adds a command line arg to the program.
     * @param param An object to specify the param.
     */
    addParam(param) {
        if (this._params.get(param.flag)) {
            throw new Error("Duplicate param.");
        }
        if (this._validInputTypes.indexOf(param.type) == -1) {
            throw new Error("Not a valid input type.");
        }
        this._params.set(param.flag, param);
        this._params.set(param.name, param);
        this._paramValues.set(param.flag, undefined);
        if (param.required) {
            this._requiredParams.set(param.flag, false);
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
    ifParamIsset(param, func, args = {}) {
        let p;
        if ((p = this._params.get(param))) {
            const v = this._paramValues.get(p.flag);
            if (typeof v !== "undefined") {
                func(v, args);
            }
        }
        return this;
    }
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
        return this._initalProgramArgs;
    }
    /**# Init Program Input
     * ---
     * Parses the arguments sent to the program and stores the values.
     *
     * __Must run before you can access the values.__
     * @returns Promise\<this\>
     */
    async initProgramInput() {
        const args = process.argv;
        const argsLength = args.length;
        let argc = 0;
        let inital = true;
        for (const arg of args) {
            if (this._isProgramArg(arg)) {
                inital = false;
                if (arg == "--help") {
                    this._screens["helpScreen"]();
                }
                const inputString = arg.replace(/-/g, "");
                if (this._params.get(inputString)) {
                    const param = this._params.get(inputString);
                    if (!param) {
                        this._screens["helpScreen"]();
                        return this;
                    }
                    if (this._paramValues.get(param.flag)) {
                        this.promgramInitErrorScreen(`${param.name} was set twice`);
                    }
                    //Set intial return value.
                    let value = "";
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
                        let arrayResults = await this._getStringArrayParamValue(param, args, argc);
                        argc = arrayResults.newArgCount;
                        value = arrayResults.value;
                    }
                    if (param.type == "stringall[]") {
                        let arrayResults = await this._getStringAllArrayParamValue(param, args, argc);
                        argc = arrayResults.newArgCount;
                        value = arrayResults.value;
                    }
                    if (param.type == "number[]") {
                        let arrayResults = await this._getNumberArrayParamValue(param, args, argc);
                        argc = arrayResults.newArgCount;
                        value = arrayResults.value;
                    }
                    if (param.type == "boolean[]") {
                        let arrayResults = await this._getBooleanArrayParamValue(param, args, argc);
                        argc = arrayResults.newArgCount;
                        value = arrayResults.value;
                    }
                    if (param.required) {
                        this._requiredParams.set(param.flag, true);
                    }
                    this._paramValues.set(param.flag, value);
                }
            }
            else {
                if (inital && argc > 0) {
                    this._initalProgramArgs.push(arg);
                }
                argc++;
            }
        }
        this._validateAllRequiredProgramParamsAreSet();
        return this;
    }
    _validateAllRequiredProgramParamsAreSet() {
        for (const pk of this._requiredParams.keys()) {
            if (!this._requiredParams.get(pk)) {
                const param = this._params.get(pk);
                if (!param)
                    return;
                this.promgramInitErrorScreen(`${param.name} is required was not supplied with a value.`);
            }
        }
    }
    _isProgramArg(arg) {
        const reg1 = /^-/;
        const reg2 = /^--/;
        return reg1.test(arg) || reg2.test(arg);
    }
    _createStringFromParamArray(args, argc) {
        let argStringArray = [];
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
    _getArrayValues(args, argc) {
        let returnValue = [];
        let newArgCount = argc + 1;
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
    async _getStringAllArrayParamValue(param, args, argc) {
        let value = [];
        let newArgCount = argc;
        if (args[argc + 1]) {
            const data = await this._getArrayValues(args, argc);
            newArgCount = data.newArgCount;
            if (!(await this._validators["stringall[]"](data.value))) {
                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Please enter a valid string.`);
            }
            else {
                value = data.value;
            }
        }
        else if (param.valueNeeded || param.required) {
            this.promgramInitErrorScreen(`${param.name} was not supplied with a value.`);
        }
        else {
            value = [""];
        }
        return {
            newArgCount: newArgCount,
            value: value,
        };
    }
    async _getStringArrayParamValue(param, args, argc) {
        let value = [];
        let newArgCount = argc;
        if (args[argc + 1]) {
            const data = await this._getArrayValues(args, argc);
            newArgCount = data.newArgCount;
            if (!(await this._validators["string[]"](data.value))) {
                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Please enter a valid string.`);
            }
            else {
                value = data.value;
            }
        }
        else if (param.valueNeeded || param.required) {
            this.promgramInitErrorScreen(`${param.name} was not supplied with a value.`);
        }
        else {
            value = [""];
        }
        return {
            newArgCount: newArgCount,
            value: value,
        };
    }
    async _getNumberArrayParamValue(param, args, argc) {
        let value = [];
        let newArgCount = argc;
        if (args[argc + 1]) {
            const data = await this._getArrayValues(args, argc);
            newArgCount = data.newArgCount;
            const valid = await this._validators["number[]"](data.value);
            if (!valid) {
                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Please enter a valid number.`);
            }
            for (const values of data.value) {
                if (values.includes(".")) {
                    value.push(parseFloat(values));
                }
                else {
                    value.push(parseInt(values));
                }
            }
        }
        else if (param.valueNeeded || param.required) {
            this.promgramInitErrorScreen(`${param.name} was not supplied with a value.`);
        }
        else {
            value = [0];
        }
        return {
            newArgCount: newArgCount,
            value: value,
        };
    }
    async _getBooleanArrayParamValue(param, args, argc) {
        let value = [];
        let newArgCount = argc;
        if (args[argc + 1]) {
            const data = await this._getArrayValues(args, argc);
            newArgCount = data.newArgCount;
            const valid = await this._validators["boolean[]"](data.value);
            if (!valid) {
                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Input must be either ${this.booleanTrueStrings.toString()} or${this.booleanFalseStrings.toString()}`);
            }
            for (const values of data.value) {
                if (this.booleanTrueStrings.indexOf(values) > -1) {
                    value.push(true);
                }
                if (this.booleanFalseStrings.indexOf(values) > -1) {
                    value.push(false);
                }
            }
        }
        else if (param.valueNeeded || param.required) {
            this.promgramInitErrorScreen(`${param.name} was not supplied with a value.`);
        }
        else {
            value = [true];
        }
        return {
            newArgCount: newArgCount,
            value: value,
        };
    }
    async _getNumberParamValue(param, args, argc) {
        let value = 0;
        if (args[argc + 1]) {
            const ahead = args[argc + 1];
            const valid = await this._validators["number"](ahead);
            if (!valid) {
                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Please enter a valid number.`);
            }
            else {
                if (ahead.includes(".")) {
                    value = parseFloat(ahead);
                }
                else {
                    value = parseInt(ahead);
                }
            }
        }
        else if (param.valueNeeded || param.required) {
            this.promgramInitErrorScreen(`${param.name} was not supplied with a value.`);
        }
        else {
            value = 0;
        }
        return value;
    }
    async _getStringParamValue(param, args, argc) {
        let value = "";
        if (args[argc + 1]) {
            const ahead = args[argc + 1];
            const valid = await this._validators["string"](ahead);
            if (!valid) {
                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Please enter a valid string with no numbers.`);
            }
            else {
                value = ahead;
            }
        }
        else if (param.valueNeeded || param.required) {
            this.promgramInitErrorScreen(`${param.name} was not supplied with a value.`);
        }
        else {
            value = "";
        }
        return value;
    }
    async _getStringAllParamValue(param, args, argc) {
        let value = "";
        if (args[argc + 1]) {
            const ahead = args[argc + 1];
            const valid = await this._validators["stringall"](ahead);
            if (valid) {
                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Please enter a valid string.`);
            }
            else {
                value = ahead;
            }
        }
        else if (param.valueNeeded || param.required) {
            this.promgramInitErrorScreen(`${param.name} was not supplied with a value.`);
        }
        else {
            value = "";
        }
        return value;
    }
    async _getBooleanParamValue(param, args, argc) {
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
            }
            else {
                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Either leave blank or use true or false. `);
            }
        }
        else {
            value = true;
        }
        return value;
    }
    /**# Restart Prompt
     * ---
     * Restarat user input prompt.
     */
    restartPrompt() {
        this._questions = {};
        this._inputs = new Map();
        return this;
    }
    /**# Start Prompt
     * ---
     * Starts user input prompt.
     */
    async startPrompt() {
        this._stdin ? this._stdin.resume() : true;
        this.rli = rdl.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        for (const q of Object.keys(this._questions)) {
            await this._prompt(q, this._questions[q].varName, this._questions[q].varType, this._questions[q].customName);
        }
        this.rli.close();
        this._stdin ? this._stdin.pause() : true;
        return this;
    }
    async _convertInput(varType, input) {
        let arrayTypes = ["boolean[]", "string[]", "number[]", "stringall[]"];
        if (arrayTypes.indexOf(varType) != -1) {
            const value = await this._getArrayValues([input], -1);
            return value.value;
        }
        return input;
    }
    async _prompt(question, varName, varType, custonName) {
        let passed = true;
        let gotinput = false;
        let asked = false;
        const q = this._questions[question];
        const qID = question;
        const prom = new Promise((resolve) => {
            let inte;
            const go = () => {
                if (passed && gotinput) {
                    resolve(true);
                    clearInterval(inte);
                }
                else if (asked) {
                }
                else {
                    asked = true;
                    let listener;
                    if (varType == "password") {
                        this._stdin
                            ? true
                            : (this._stdin = process.openStdin());
                        listener = (char) => {
                            char = char + "";
                            switch (char) {
                                case "\n":
                                case "\r":
                                case "\u0004":
                                    this._stdin.removeListener("data", listener);
                                default:
                                    process.stdout.clearLine(1);
                                    this.rdl.cursorTo(process.stdout, 0);
                                    process.stdout.write(question +
                                        this._consoleCodes["Hidden"] +
                                        Array(this.rli.line.length + 1).join("*") +
                                        this._consoleCodes["Reset"]);
                                    break;
                            }
                        };
                        process.stdin.on("data", listener);
                    }
                    else {
                        if (listener) {
                            process.stdin.removeListener("data", listener);
                        }
                    }
                    this.rli.question(question, (input) => {
                        this.rli.history.slice(1);
                        this.currentRow += this.countLines(question);
                        this.rdl.cursorTo(process.stdout, 0);
                        (async () => {
                            asked = true;
                            gotinput = true;
                            let valid = false;
                            let newInput = "";
                            if (varType != "custom") {
                                newInput = await this._convertInput(varType, input);
                                valid = await this._validators[varType](newInput);
                            }
                            else {
                                valid = await this._validators[varType](input, custonName);
                            }
                            if (!valid) {
                                passed = false;
                                gotinput = false;
                                asked = false;
                                if (q.varType == "password") {
                                    this._stdin.removeListener("data", listener);
                                }
                                if (q.attempts && q.attempts != "all") {
                                    q.fails++;
                                    if (q.fails >= q.attempts ||
                                        !q.reAsk) {
                                        this._questionsFails[qID].func(this._questionsFails[qID].args);
                                    }
                                }
                                if (q.failPrompt) {
                                    question =
                                        this.stylize(this.getString("reAskStart"), this._questionStyles["re-ask-start"]) +
                                            this.stylize(q.failPrompt, this._questionStyles["re-ask"]) +
                                            " " +
                                            this.stylize(this.getString("reAskDelimiter"), this._questionStyles["re-ask-delimiter"]) +
                                            " ";
                                }
                                else {
                                    question =
                                        this.stylize(this.getString("reAskStart"), this._questionStyles["re-ask-start"]) +
                                            this.stylize(this.getString("reAskText"), this._questionStyles["re-ask"]) +
                                            " " +
                                            this.stylize(this.getString("reAskDelimiter"), this._questionStyles["re-ask-delimiter"]) +
                                            " ";
                                }
                            }
                            else {
                                if (varType == "password") {
                                    this._stdin.removeListener("data", listener);
                                }
                                passed = true;
                            }
                            if (passed) {
                                this._inputs.set(varName, newInput);
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
    fail(reAsk, reAskMessage, attempts = "all", onFail, arg = {}) {
        this._questions[this._lastQuestion].reAsk = reAsk;
        if (onFail) {
            this._questionsFails[this._lastQuestion] = {
                func: onFail,
                args: arg,
            };
        }
        this._questions[this._lastQuestion].failPrompt = reAskMessage;
        if (attempts != "all") {
            this._questions[this._lastQuestion].attempts = attempts;
            this._questions[this._lastQuestion].fails = 0;
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
    ask(question, varName, varType, customName) {
        this._askedQuestions++;
        this._inputs.set(varName, undefined);
        question =
            this.stylize(this.getString("questionStart"), this._questionStyles["question-start"]) +
                this.stylize(question, this._questionStyles["question"]) +
                " " +
                this.stylize(this.getString("questionDelimiter"), this._questionStyles["delimiter"]) +
                " ";
        this._questions[question] = {
            varName: varName,
            varType: varType,
        };
        this._lastQuestion = question;
        if (customName) {
            this._questions[question].customName = customName;
        }
        return this;
    }
    /**# Get Input
     * ---
     * Get input from question
     * @param varName
     */
    getInput(varName) {
        return this._inputs.get(varName);
    }
    /** # If Input Isset
     * ---
     * If the input is set run a function.
     * @param varName The name of the input.
     * @param func The function to be run. Will be passed the value of the input and the args given.
     * @param args Args to be passed to the function.
     */
    ifInputIsset(varName, func, args = {}) {
        let v;
        if ((v = this._inputs.get(varName))) {
            if (typeof v !== "undefined") {
                func(v, args);
            }
        }
        return this;
    }
    /**# Clear Rows
     * ---
     * Clears console output for a given row range.
     * @param rowStart
     * @param rowEnd
     */
    clearRows(rowStart, rowEnd) {
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
    setRow(num) {
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
    /**# Minus
     * ---
     * Minus one row to the current console cursor.
     */
    minusRow() {
        this.currentRow--;
        return this;
    }
    /**# Get Row
     * ---
     * Gets the current row number that the output is on.
     */
    getCol() {
        return this.currentCol;
    }
    /**# Set Col
     *---
     * Sets the console cursor to a collumn.
     * @param num
     */
    setCol(num) {
        this.currentCol = num;
        this.rdl.cursorTo(process.stdout, this.currentCol, this.currentRow);
        return this;
    }
    /**# Add Col
     * ---
     * Add one to the current console cursor collumn.
     */
    addCol() {
        this.currentCol++;
        return this;
    }
    /**# Minus Collumn
     * ---
     * Minus one to the current console cursor collumn.
     */
    minusCol() {
        this.currentCol--;
        return this;
    }
    /**# New Service Bar
     * ---
     * Makes a continuous loading bar.
     * @param name
     */
    newServiceBar(name, serviceBarStyle = this._defaultServiceBarStyle) {
        const s = serviceBarStyle;
        const bar = new this.ServiceBar(this.rdl, this.currentRow, s.size, 0, s.interval, this.stylize(s.base, s.baseStyle), this.stylize(s.loadedOne, s.loadedOneStyle), this.stylize(s.loadedTwo, s.loadedTwoStyle), this.stylize(s.cap, s.capStyle));
        this.currentRow++;
        this._serviceBars[name] = bar;
        return this;
    }
    /**# Re Init Service Bar
     * ---
     * Restart a service bar.
     * @param name
     */
    reInitServiceBar(name) {
        this._serviceBars[name].reInit();
        return this;
    }
    /**# Destroy Service Bar
     * ---
     * Destroy a service bar.
     * @param name
     */
    destroyServiceBar(name) {
        const bar = this._serviceBars[name];
        const row = bar.rows;
        bar.clear();
        this.clearRows(row, row);
        this._serviceBars[name] = null;
        delete this._serviceBars[name];
        return this;
    }
    /**# New Progress Bar
     * ---
     * Makes a new progress loading bar.
     * @param name of bar to be used as an id
     */
    newProgressBar(name, progressBarStyle) {
        let d;
        if (progressBarStyle) {
            d = progressBarStyle;
        }
        else {
            d = this._defaultPrgoressBarStyle;
        }
        const bar = new this.ProgressBar(this.rdl, this.currentRow, d.size, d.interval, this.stylize(d.base, d.baseStyle), this.stylize(d.loaded, d.loadedStyle));
        this.currentRow++;
        bar.start();
        this._progressBars[name] = bar;
        return this;
    }
    /**# Increment Progress Bar
     * ---
     * Adds progress to the progress bar.
     * @param name name of bar to increase
     * @param amount amount to increase by
     */
    async incrementProgressBar(name, amount) {
        await this._progressBars[name].addProgressPerfect(amount);
        return this;
    }
    /**# Sleep
     * ---
     * Makes the program sleep via a loop.
     * @param ms miliseconds to sleep
     */
    sleep(ms) {
        var waitTill = new Date(new Date().getTime() + ms);
        while (waitTill > new Date()) { }
        return this;
    }
    /**# Async Sleep
     * ---
     * Makes the program sleep via a promsie.
     * @param ms miliseconds to sleep
     */
    asyncSleep(ms) {
        let self = this;
        return new Promise((resolve) => setTimeout(() => {
            resolve(self);
        }, ms));
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
    _getMessageArray(message) {
        if (message == undefined)
            return false;
        let messageArray = [];
        if (Array.isArray(message)) {
            for (const mem of message) {
                if (typeof mem === "number" || typeof mem === "string") {
                    messageArray.push(`${mem}`);
                }
                else if (typeof mem === "boolean") {
                    if (mem) {
                        messageArray.push(`true`);
                    }
                    else {
                        messageArray.push(`false`);
                    }
                }
                else if (typeof mem === "object") {
                    messageArray.push(JSON.stringify(mem, null, 5));
                }
            }
        }
        else {
            if (typeof message === "object") {
                messageArray[0] == JSON.stringify(message, null, 5);
            }
            else if (typeof message === "boolean") {
                if (message) {
                    messageArray.push(`true`);
                }
                else {
                    messageArray.push(`false`);
                }
            }
            else {
                messageArray[0] = `${message}`;
            }
        }
        return messageArray;
    }
    _processMessage(message, type = "none") {
        let output = message;
        if (type != "Raw" && type != "Data") {
            if (type != "none") {
                output = this.stylize(message, this._messageStyles[type]);
            }
            else {
                output = this.stylize(message, this._styleDelimiter);
            }
        }
        if (type == "Data") {
            output = JSON.stringify(message, null, 3);
        }
        return output;
    }
    _checkDebug() {
        if (this.debugMode && this._directives.debug)
            return true;
        if (!this.debugMode && this._directives.debug)
            return false;
        return true;
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
    showAtSleep(message, params = {
        row: this.currentRow,
        col: 0,
        type: "none",
        sleep: this._defaultSleepTime,
    }) {
        if (!this._checkDebug())
            return this;
        const messageArray = this._getMessageArray(message);
        if (!messageArray)
            return this;
        for (const mem of messageArray) {
            this.showAt(mem, {
                row: params.row,
                type: params.type,
                col: params.col,
            });
            let sleep = this._defaultSleepTime;
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
    showAt(message, params = {
        row: this.currentRow,
        col: 0,
        type: "none",
    }) {
        if (!this._checkDebug())
            return this;
        const messageArray = this._getMessageArray(message);
        if (!messageArray)
            return this;
        let col = 0;
        if (params.col) {
            col = params.col;
        }
        let row = this.currentRow;
        if (params.row) {
            row = params.row;
        }
        let type = "none";
        if (params.type) {
            type = params.type;
        }
        for (const mem of messageArray) {
            let output = this._processMessage(mem, type);
            const lines = this.countLines(`${output}`);
            this.rdl.cursorTo(process.stdout, col, row);
            this.currentRow += lines;
            if (!this._directives.trace) {
                console.log(output);
            }
            else {
                console.trace(output);
            }
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
    show(message, type = "none") {
        if (!this._checkDebug())
            return this;
        const messageArray = this._getMessageArray(message);
        if (!messageArray)
            return this;
        for (const mem of messageArray) {
            let output = this._processMessage(mem, type);
            const lines = this.countLines(`${output}`);
            this.rdl.cursorTo(process.stdout, this.currentCol, this.currentRow);
            this.currentRow += lines;
            if (!this._directives.trace) {
                console.log(output);
            }
            else {
                console.trace(output);
            }
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
    showSleep(message, type = "none", ms = this._defaultSleepTime) {
        if (!this._checkDebug())
            return this;
        const messageArray = this._getMessageArray(message);
        if (!messageArray)
            return this;
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
    log(message, type = "none") {
        if (!this._checkDebug())
            return this;
        const messageArray = this._getMessageArray(message);
        if (!messageArray)
            return this;
        for (const mem of messageArray) {
            let output = this._processMessage(mem, type);
            const lines = this.countLines(`${output}`);
            this.currentRow += lines;
            if (!this._directives.trace) {
                console.log(output);
            }
            else {
                console.trace(output);
            }
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
    logSleep(message, type = "none", ms = this._defaultSleepTime) {
        if (!this._checkDebug())
            return this;
        const messageArray = this._getMessageArray(message);
        if (!messageArray)
            return this;
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
    logTable(data, collumns) {
        if (!this._checkDebug())
            return this;
        if (data == undefined)
            return this;
        let dataArray = [];
        if (Array.isArray(data)) {
            dataArray = data;
        }
        else {
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
    showTable(data, collumns) {
        if (!this._checkDebug())
            return this;
        if (data == undefined)
            return this;
        let dataArray = [];
        if (Array.isArray(data)) {
            dataArray = data;
        }
        else {
            dataArray[0] = data;
        }
        for (const d of dataArray) {
            const lines = Object.keys(d).length + 2;
            this.rdl.cursorTo(process.stdout, this.currentCol, this.currentRow);
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
    getMessageStyled(type, message) {
        return this.stylize(message, this._messageStyles[type]);
    }
    /** # Count Lines
     * ---
     * Count the  numbers of new lines a string will add to the console.
     * @param message
     * @returns number
     */
    countLines(message) {
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
    defineSleepTime(sleep) {
        this._defaultSleepTime = sleep;
        return this;
    }
    /** # Define Validator
     * ---
     * Define a validate function for a question type.
     * @param type
     * @param func
     * @param name If using a custom question type you must set this param.
     */
    defineValidator(type, func, name) {
        if (type === "custom") {
            if (!name) {
                throw new Error("Must define name for custom question type.");
            }
            this._customValidators[name] = func;
        }
        else {
            this._validators[type] = func;
        }
        return this;
    }
    /**# Define Question Style
     * ---
     * Use a style object to define a questions style.
     * @param type "question" | "re-ask" | "delimiter"
     * @param styleString
     */
    defineQuestionStyle(type, styleObj) {
        this._questionStyles[type] = styleObj;
        return this;
    }
    /**# Define Message Style
     * ---
     * Use a style object to define a messages style.
     * @param type
     * @param styleString
     */
    defineMessageStyle(type, styleObj) {
        this._messageStyles[type] = styleObj;
        return this;
    }
    /**# Define Progress Bar Style
     * ---
     * Define the default progress bar style.
     * @param progressBarStyle
     */
    defineProgressBarStyle(progressBarStyle) {
        this._defaultPrgoressBarStyle = progressBarStyle;
        return this;
    }
    /**# Define Service Bar Style
     * ---
     * Define the default service bar style.
     * @param serviceBarStyle
     */
    defineServiceBarStyle(serviceBarStyle) {
        this._defaultServiceBarStyle = serviceBarStyle;
        return this;
    }
    /**# Define Program Title
     * ---
     * Define the programs title.
     * @param title
     */
    defineProgramTitle(title, styleObj) {
        this._strings["title"] = title;
        if (styleObj) {
            this._messageStyles["Title"] = styleObj;
        }
        return this;
    }
    /** # Define Help Text
     * ---
     * Defines the help text for the program.
     * @param text
     */
    defineHelpText(text) {
        this._strings["helpText"] = text;
        return this;
    }
    /**# Define Screen
     * ---
     * Define a function to be called for a screen.
     * @param screen
     * @param func
     */
    defineScreen(screen, func) {
        this._screens[screen] = func;
        return this;
    }
    /**# Display Screen
     * ---
     * Display a built in screen.
     * @param screen
     * @param args Args to be pased to screen. Default is an enpty object.
     */
    displayScreen(screen, args = {}) {
        this._screens[screen](args);
    }
    /**# Define Splash Screen
     * ---
     * Define a function to be called for the splash screen.
     * @param func
     */
    defineSplashScreen(func) {
        this._screens["splash"] = func;
        return this;
    }
    /**# Splash Screen
     * ---
     * Meant to show the programs title/splash screen.
     */
    splashScreen() {
        this._screens["splash"]();
        return this;
    }
    /** # Program Init Error Screen
     * ---
     * Screen to show if the program fails to get the right arguments.
     * @param message
     */
    promgramInitErrorScreen(message) {
        this._screens["programInitError"](message);
    }
    /** # Program Error Screen
     * ---
     * Screen to show if the program has an error.
     * @param message
     */
    errorScreen(message) {
        this._screens["error"](message);
    }
    /** # Program Crash Screen
     * ---
     * Screen to show if the program crashes.
     * @param message
     */
    crashScreen(message) {
        this._screens["crash"](message);
    }
    /**# Get String
     * ---
     * Get a built in string.
     * @param id
     */
    getString(id) {
        return this._strings[id];
    }
    /**# Set String
     * ---
     * Set a built in string.
     * @param id
     */
    setString(id, string) {
        this._strings[id] = string;
        return this;
    }
    _copyDefaultStyle() {
        return JSON.parse(JSON.stringify(this._defaultStyleDelimiter));
    }
    _copyMessageStyle(type) {
        return JSON.parse(JSON.stringify(this._messageStyles[type]));
    }
    //Quick Styles
    /**# Info
     * ---
     * Styles the text to be the "info" message style.
     * @returns string | this
     */
    info(text) {
        this._styleDelimiter = this._copyMessageStyle("Info");
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [INFO] Info
     * ---
     * Sets chain style to be the "info" message style..
     */
    get INFO() {
        this._styleDelimiter = this._copyMessageStyle("Info");
        return this;
    }
    /**# Good
     * ---
     * Styles the text to be the "good" message style.
     * @returns string | this
     */
    good(text) {
        this._styleDelimiter = this._copyMessageStyle("Good");
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [GOOD] Good
     * ---
     * Sets chain style to be the "good" message style..
     */
    get GOOD() {
        this._styleDelimiter = this._copyMessageStyle("Good");
        return this;
    }
    /**# Warning
     * ---
     * Styles the text to be the "warning" message style.
     * @returns string | this
     */
    warning(text) {
        this._styleDelimiter = this._copyMessageStyle("Warning");
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [WARNING] Warning
     * ---
     * Sets chain style to be the "warning" message style..
     */
    get WARNING() {
        this._styleDelimiter = this._copyMessageStyle("Warning");
        return this;
    }
    /**# Raw
     * ---
     * Styles the text to be the "raw" message style.
     * @returns string | this
     */
    raw(text) {
        this._styleDelimiter = this._copyMessageStyle("Raw");
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [RAW] Raw
     * ---
     * Sets chain style to be the "raw" message style..
     */
    get RAW() {
        this._styleDelimiter = this._copyMessageStyle("Raw");
        return this;
    }
    /**# Title
     * ---
     * Styles the text to be the "title" message style.
     * @returns string | this
     */
    title(text) {
        this._styleDelimiter = this._copyMessageStyle("Title");
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [TITLE] Raw
     * ---
     * Sets chain style to be the "title" message style..
     */
    get TITLE() {
        this._styleDelimiter = this._copyMessageStyle("Title");
        return this;
    }
    /**# Warning
     * ---
     * Styles the text to be the "error" message style.
     * @returns string | this
     */
    error(text) {
        this._styleDelimiter = this._copyMessageStyle("Error");
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [ERROR] Error
     * ---
     * Sets chain style to be the "error" message style..
     */
    get ERROR() {
        this._styleDelimiter = this._copyMessageStyle("Error");
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
        this._styleDelimiter = this._copyDefaultStyle();
        return this;
    }
    /**# [CL] Clear Line
     * ---
     * Clears the chain style.
     * Alias for clear()
     */
    get CL() {
        this._styleDelimiter = this._copyDefaultStyle();
        return this;
    }
    /**# [CLEAR] Clear Line
     * ---
     * Clears the chain style.
     * Alias for clear()
     */
    get CLEAR() {
        this._styleDelimiter = this._copyDefaultStyle();
        return this;
    }
    /**# Blink
     * ---
     * Styles the text to blink.
     * @returns string
     */
    blink(text) {
        this._styleDelimiter.blink = true;
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [BI] Blink
     * ---
     * Sets chain style to blink.
     */
    get BI() {
        this._styleDelimiter.blink = true;
        return this;
    }
    /**# [BLINK] Blink
     * ---
     * Sets chain style to blink.
     */
    get BLINK() {
        this._styleDelimiter.blink = true;
        return this;
    }
    /**# Hidden
     * ---
     * Styles the text to be hidden.
     * @returns string
     */
    hidden(text) {
        this._styleDelimiter.hidden = true;
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [H] Hidden
     * ---
     * Sets chain style to be hidden..
     */
    get H() {
        this._styleDelimiter.hidden = true;
        return this;
    }
    /**# [HIDDEN] Hidden
     * ---
     * Sets chain style to be hidden.
     */
    get HIDDEN() {
        this._styleDelimiter.hidden = true;
        return this;
    }
    /**# Underscore
     * ---
     * Styles the text to be underscored.
     * @returns string
     */
    underscore(text) {
        this._styleDelimiter.underscore = true;
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [U] Underscore
     * ---
     * Sets chain style to be underscored.
     */
    get U() {
        this._styleDelimiter.underscore = true;
        return this;
    }
    /**# [UNDERSCORE] Underscore
     * ---
     * Sets chain style to be underscored.
     */
    get UNDERSCORE() {
        this._styleDelimiter.underscore = true;
        return this;
    }
    /**# [UNDERLINE] Underscore
     * ---
     * Sets chain style to be underscored.
     */
    get UNDERLINE() {
        this._styleDelimiter.underscore = true;
        return this;
    }
    /** # Dim
     * ---
     * Returns a string styled to be dim.
     * @param text
     * @returns string
     */
    dim(text) {
        this._styleDelimiter.dim = true;
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [D] Dim
     * ---
     * Sets chain style to be dim.
     */
    get D() {
        this._styleDelimiter.dim = true;
        return this;
    }
    /**# [DIM] Dim
     * ---
     * Sets chain style to be dim.
     */
    get DIM() {
        this._styleDelimiter.dim = true;
        return this;
    }
    /** # Bright
     * ---
     * Returns a string styled to be bright.
     * @param text
     * @returns string
     */
    bright(text) {
        this._styleDelimiter.bright = true;
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [BR] Bright
     * ---
     * Sets chain style to be bright.
     */
    get BR() {
        this._styleDelimiter.bright = true;
        return this;
    }
    /**# [BRIGHT] Bright
     * ---
     * Sets chain style to be bright.
     */
    get BRIGHT() {
        this._styleDelimiter.bright = true;
        return this;
    }
    /** # Invert
     * ---
     * Returns a string styled to be reversed.
     * @param text
     * @returns string
     */
    invert(text) {
        this._styleDelimiter.reverse = true;
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [BRIGHT] Bright
     * ---
     * Sets chain style to be reversed.
     */
    get I() {
        this._styleDelimiter.reverse = true;
        return this;
    }
    /**# [BRIGHT] Bright
     * ---
     * Sets chain style to be reversed.
     */
    get INVERT() {
        this._styleDelimiter.reverse = true;
        return this;
    }
    /** # Red
     * ---
     * Returns a string styled to be red.
     * @param text
     * @returns string
     */
    red(text) {
        this._styleDelimiter.fg = "Red";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [R] Red
     * ---
     * Sets chain style to be red.
     */
    get R() {
        this._styleDelimiter.fg = "Red";
        return this;
    }
    /**# [RED] Red
     * ---
     * Sets chain style to be red.
     */
    get RED() {
        this._styleDelimiter.fg = "Red";
        return this;
    }
    /** # Green
     * ---
     * Returns a string styled to be green.
     * @param text
     * @returns string
     */
    green(text) {
        this._styleDelimiter.fg = "Green";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [G] Green
     * ---
     * Sets chain style to be green.
     */
    get G() {
        this._styleDelimiter.fg = "Green";
        return this;
    }
    /**# [GREEN] Green
     * ---
     * Sets chain style to be green.
     */
    get GREEN() {
        this._styleDelimiter.fg = "Green";
        return this;
    }
    /** # Blue
     * ---
     * Returns a string styled to be blue.
     * @param text
     * @returns string
     */
    blue(text) {
        this._styleDelimiter.fg = "Blue";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [B] Blue
     * ---
     * Sets chain style to be blue.
     */
    get B() {
        this._styleDelimiter.fg = "Blue";
        return this;
    }
    /**# [BLUE] Blue
     * ---
     * Sets chain style to be blue.
     */
    get BLUE() {
        this._styleDelimiter.fg = "Blue";
        return this;
    }
    /** # White
     * ---
     * Returns a string styled to be white.
     * @param text
     * @returns string
     */
    white(text) {
        this._styleDelimiter.fg = "White";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [W] White
     * ---
     * Sets chain style to be white.
     */
    get W() {
        this._styleDelimiter.fg = "White";
        return this;
    }
    /**# [WHITE] White
     * ---
     * Sets chain style to be white.
     */
    get WHITE() {
        this._styleDelimiter.fg = "White";
        return this;
    }
    /** # Black
     * ---
     * Returns a string styled to be black.
     * @param text
     * @returns string
     */
    black(text) {
        this._styleDelimiter.fg = "Black";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [BL] Black
     * ---
     * Sets chain style to be Black.
     */
    get BL() {
        this._styleDelimiter.fg = "Black";
        return this;
    }
    /**# [BLACK] Black
     * ---
     * Sets chain style to be Black.
     */
    get BLACK() {
        this._styleDelimiter.fg = "Black";
        return this;
    }
    /** # Cyan
     * ---
     * Returns a string styled to be cyan.
     * @param text
     * @returns string
     */
    cyan(text) {
        this._styleDelimiter.fg = "Cyan";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [C] Cyan
     * ---
     * Sets chain style to be cyan.
     */
    get C() {
        this._styleDelimiter.fg = "Cyan";
        return this;
    }
    /**# [CYAN] Cyan
     * ---
     * Sets chain style to be cyan.
     */
    get CYAN() {
        this._styleDelimiter.fg = "Cyan";
        return this;
    }
    /** # Magenta
     * ---
     * Returns a string styled to be magenta.
     * @param text
     * @returns string
     */
    magenta(text) {
        this._styleDelimiter.fg = "Magenta";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [M] Magenta
     * ---
     * Sets chain style to be magenta.
     */
    get M() {
        this._styleDelimiter.fg = "Magenta";
        return this;
    }
    /**# [MAGENTA] Magenta
     * ---
     * Sets chain style to be magenta.
     */
    get MAGENTA() {
        this._styleDelimiter.fg = "Magenta";
        return this;
    }
    /** # Yellow
     * ---
     * Returns a string styled to be yellow.
     * @param text
     * @returns string
     */
    yellow(text) {
        this._styleDelimiter.fg = "Yellow";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [Y] Yellow
     * ---
     * Sets chain style to be yellow.
     */
    get Y() {
        this._styleDelimiter.fg = "Yellow";
        return this;
    }
    /**# [YELLOW] Yellow
     * ---
     * Sets chain style to be yellow.
     */
    get YELLOW() {
        this._styleDelimiter.fg = "Yellow";
        return this;
    }
    /** # Red Background
     * ---
     * Returns a string styled to have a red background.
     * @param text
     * @returns string
     */
    redBG(text) {
        this._styleDelimiter.bg = "Red";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [RBG] Red Background
     * ---
     * Sets chain style to have a red background.
     */
    get RBG() {
        this._styleDelimiter.bg = "Red";
        return this;
    }
    /**# [REDBG] Red Background
     * ---
     * Sets chain style to have a red background.
     */
    get REDBG() {
        this._styleDelimiter.bg = "Red";
        return this;
    }
    /** # Green Background
     * ---
     * Returns a string styled to have a green background.
     * @param text
     * @returns string
     */
    greenBG(text) {
        this._styleDelimiter.bg = "Green";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [GBG] Green Background
     * ---
     * Sets chain style to have a green background..
     */
    get GBG() {
        this._styleDelimiter.bg = "Green";
        return this;
    }
    /**# [GREENBG] Green Background
     * ---
     * Sets chain style to have a green background..
     */
    get GREENBG() {
        this._styleDelimiter.bg = "Green";
        return this;
    }
    /** # Blue Background
     * ---
     * Returns a string styled to have a blue background.
     * @param text
     * @returns string
     */
    blueBG(text) {
        this._styleDelimiter.bg = "Blue";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [BBG] Blue Background
     * ---
     * Sets chain style to have a blue background.
     */
    get BBG() {
        this._styleDelimiter.bg = "Blue";
        return this;
    }
    /**# [BLUEBG] Blue Background
     * ---
     * Sets chain style to have a blue background.
     */
    get BLUEBG() {
        this._styleDelimiter.bg = "Blue";
        return this;
    }
    /** # White Background
     * ---
     * Returns a string styled to have a white background.
     * @param text
     * @returns string
     */
    whiteBG(text) {
        this._styleDelimiter.bg = "White";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [WBG] Blue Background
     * ---
     * Sets chain style to have a white background.
     */
    get WBG() {
        this._styleDelimiter.bg = "White";
        return this;
    }
    /**# [WHITEBG] Blue Background
     * ---
     * Sets chain style to have a white background.
     */
    get WHITEBG() {
        this._styleDelimiter.bg = "White";
        return this;
    }
    /** # Black Background
     * ---
     * Returns a string styled to have a black background.
     * @param text
     * @returns string
     */
    blackBG(text) {
        this._styleDelimiter.bg = "Black";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [BLBG] Black Background
     * ---
     * Sets chain style to have a black background.
     */
    get BLBG() {
        this._styleDelimiter.bg = "Black";
        return this;
    }
    /**# [BLACKBG] Black Background
     * ---
     * Sets chain style to have a black background.
     */
    get BLACKBG() {
        this._styleDelimiter.bg = "Black";
        return this;
    }
    /** # Cyan Background
     * ---
     *
     * Returns a string styled to have a cyan background.
     * @param text
     * @returns string
     */
    cyanBG(text) {
        this._styleDelimiter.bg = "Cyan";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [CBG] Cyan Background
     * ---
     * Sets chain style to have a cyan background.
     */
    get CBG() {
        this._styleDelimiter.bg = "Cyan";
        return this;
    }
    /**# [CYANBG] Cyan Background
     * ---
     * Sets chain style to have a cyan background.
     */
    get CYANBG() {
        this._styleDelimiter.bg = "Cyan";
        return this;
    }
    /** # Magenta Background
     * ---
     * Returns a string styled to have a magenta background.
     * @param text
     * @returns string
     */
    magentaBG(text) {
        this._styleDelimiter.bg = "Magenta";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [MBG] Magenta Background
     * ---
     * Sets chain style to have a magenta background.
     */
    get MBG() {
        this._styleDelimiter.bg = "Magenta";
        return this;
    }
    /**# [MAGENTABG] Magenta Background
     * ---
     * Sets chain style to have a magenta background.
     */
    get MAGENTABG() {
        this._styleDelimiter.bg = "Magenta";
        return this;
    }
    /** # Yellow Background
     * ---
     * Returns a string styled to have a yellow background.
     * @param text
     * @returns string
     */
    yellowBG(text) {
        this._styleDelimiter.bg = "Yellow";
        if (!text)
            return this;
        const string = this.stylize(text, this._styleDelimiter);
        this._styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    /**# [YBG] Yellow Background
     * ---
     * Sets chain style to have a yellow background.
     */
    get YBG() {
        this._styleDelimiter.bg = "Yellow";
        return this;
    }
    /**# [YBG] Yellow Background
     * ---
     * Sets chain style to have a yellow background.
     */
    get YELLOWBG() {
        this._styleDelimiter.bg = "Yellow";
        return this;
    }
    /**# Do
     * ---
     * Run a function in the chain of functions.
     * @param func
     * @param arg
     * @returns
     */
    do(func, arg) {
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
    newService(name, params) {
        const inte = setInterval(() => {
            params.run(params.args);
        }, params.interval);
        this._services[name] = inte;
        return this;
    }
    /** # Clear Service
     * ---
     * Stop a serivce from running.
     * @param name
     */
    clearService(name) {
        clearInterval(this._services[name]);
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
    get EXIT() {
        this.exit();
        return this;
    }
    /**# [END] Exit
     * ---
     * Makes the program exit.
     * Runs : process.exit(0)
     */
    get END() {
        this.exit();
        return this;
    }
    /**# [DIE] Exit
     * ---
     * Makes the program exit.
     * Runs : process.exit(0)
     */
    get DIE() {
        this.exit();
        return this;
    }
    /**# Done
     * ---
     * Shows the done screen and then exits.
     * Runs : process.exit(1)
     */
    done() {
        this._screens["done"]();
        this.exit();
    }
    /**# [DONE] Done
     * ---
     * Shows the done screen and then exits.
     * Runs : process.exit(1)
     */
    get DONE() {
        this.exit();
        return this;
    }
    //Other Directives
    /** # Debug
     * ---
     * Sets it to debug mode.
     * @param debug
     */
    debug(debug = true) {
        this.debugMode = debug;
        return this;
    }
    /**# [DEBUG] Toggle Debug
     * ---
     * Toggles the debug mode.
     */
    get DEBUG() {
        this._directives.debug = this._directives.debug ? false : true;
        return this;
    }
    /**# [DEBUGSTART] Debug Start
     * ---
     * Starts the debug directive.
     */
    get DEBUGSTART() {
        this._directives.debug = true;
        return this;
    }
    /**# [DEBUGEND] Debug End
     * ---
     * Ends the debug directive.
     */
    get DEBUGEND() {
        this._directives.debug = false;
        return this;
    }
    /**# Group
     * ---
     * Calls console.group to create an intented text.
     * If you supply a name it will print before the next output.
     * @param label
     * @returns this
     */
    group(label, styleObj) {
        if (!this._checkDebug()) {
            return this;
        }
        let nameStyled = false;
        if (label && styleObj) {
            nameStyled = this.stylize(label, styleObj);
        }
        if (label && !styleObj) {
            nameStyled = this._processMessage(label);
        }
        if (label) {
            this.currentRow += this.countLines(label);
            console.group(nameStyled);
        }
        else {
            this.currentRow++;
            console.group();
        }
        this._numOfGroups++;
        return this;
    }
    /**# [GROUP] Group
     * ---
     * This toggles the group feature.
     * Calls console.group to create an intented text.
     * @returns this
     */
    get GROUP() {
        this._directives.group = this._directives.group ? false : true;
        return this.group();
    }
    /**# [GROUPSTART] Group Start
     * ---
     * Calls console.group to create an intented text.
     * @returns this
     */
    get GROUPSTART() {
        this._directives.group = true;
        return this.group();
    }
    /**# [GRS] Group Start
     * ---
     * Calls console.group to create an intented text.
     * @returns this
     */
    get GRS() {
        return this.GROUPSTART;
    }
    /**# End Group
     * ---
     * Calls console.groupEnd to end a group.
     * @returns
     */
    endGroup() {
        console.groupEnd();
        this._numOfGroups--;
        if (this._numOfGroups <= 0) {
            this._numOfGroups = 0;
            if (this._directives.group) {
                this._directives.group = false;
            }
        }
        return this;
    }
    /**# [GROUPEND] Group End
     * ---
     * Calls console.groupEnd to end a group.
     * @returns this
     */
    get GROUPEND() {
        return this.endGroup();
    }
    /**# [GRE] Group End
     * ---
     * Calls console.groupEnd to end a group.
     * @returns this
     */
    get GRE() {
        return this.GROUPEND;
    }
    /**# End all groups
     * ---
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    endAllGroups() {
        while (this._numOfGroups) {
            this.endGroup();
        }
        this._directives.group = false;
        return this;
    }
    /**# Collapse All Groups
     * ---
     * Alias for endAllGroups
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    collapseAllGroups() {
        return this.endAllGroups();
    }
    /**# [COLLAPSEALLGROUPS] Collapse All Groups
     * ---
     * Alias for End All Groups
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    get COLLAPSEALLGROUPS() {
        return this.endAllGroups();
    }
    /**# [CAG] Collapse All Groups
     * ---
     * Alias for End All Groups
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    get CAG() {
        return this.endAllGroups();
    }
    /**# [GROUPENDALL] Group End ALL
     * ---
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    get GROUPENDALL() {
        return this.endAllGroups();
    }
    /**# [GREA] Group End ALL
     * ---
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    get GREA() {
        return this.GROUPENDALL;
    }
    /**# Trace
     * ---
     * All show and log functions will now use trace until it is turned off.
     * @returns this
     */
    trace(enable = true) {
        this._directives.trace = enable;
        return this;
    }
    /**# [TRACE] Trace
     * ---
     * Toggles the trace option.
     * @returns this
     */
    get TRACE() {
        this._directives.trace = this._directives.trace ? false : true;
        return this;
    }
    /**# [TRACESTART] Trace Start
     * ---
     * Starts tracing
     * @returns this
     */
    get TRACESTART() {
        this._directives.trace = true;
        return this;
    }
    /**# [TS] Trace Start
     * ---
     * Starts tracing
     * @returns this
     */
    get TS() {
        return this.TRACESTART;
    }
    /**# [TRACEEND] Trace End
     * ---
     * Stops tracing
     * @returns this
     */
    get TRACEEND() {
        this._directives.trace = false;
        return this;
    }
    /**# [TE] Trace End
     * ---
     * Strops tracing
     * @returns this
     */
    get TE() {
        return this.TRACEEND;
    }
    /**# Time
     * ---
     * Runs console.time with the provided label or default.
     * @param label
     * @returns this
     */
    time(label = "default") {
        console.time(label);
        return this;
    }
    /**# [TIME] TIME
     * ---
     * Runs time
     * @returns this
     */
    get TIME() {
        return this.time();
    }
    /**# Time End
     * ---
     * Runs console.timeEnd with the provided label or default.
     * @param label
     * @returns this
     */
    timeEnd(label = "default") {
        console.timeEnd(label);
        return this;
    }
    /**# [TIMEEND] TIME END
     * ---
     * Runs timeEND
     * @returns this
     */
    get TIMEEND() {
        return this.timeEnd();
    }
}
const rdl = require("readline");
const DS = new DSCommander(rdl);
module.exports = DS;
