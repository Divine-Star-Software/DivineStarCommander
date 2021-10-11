"use strict";
class DSLogger {
    constructor(rdl) {
        this.rdl = rdl;
        this.defaultSleepTime = 800;
        this.strings = {
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
            questionStart: "-->",
            questionDelimiter: ":",
            reAskStart: "X->",
            reAskText: "The input was not correct please re-enter",
            reAskDelimiter: ":"
        };
        this.defaultPrgoressBarStyle = {
            base: "-",
            baseStyle: {},
            loaded: "=",
            loadedStyle: {},
            size: 30,
            interval: 15
        };
        this.defaultServiceBarStyle = {
            base: "X",
            baseStyle: { bg: "Blue", fg: "White" },
            loadedOne: "|",
            loadedOneStyle: { bg: "Blue", fg: "White" },
            loadedTwo: "0",
            loadedTwoStyle: { bg: "Magenta", fg: "White" },
            cap: "}",
            capStyle: { bg: "Yellow", fg: "White" },
            size: 30,
            interval: 80
        };
        this.consoleCodes = {
            Reset: "\x1b[0m",
            Bright: "\x1b[1m",
            Dim: "\x1b[2m",
            Underscore: "\x1b[4m",
            Blink: "\x1b[5m",
            Reverse: "\x1b[7m",
            Hidden: "\x1b[8m",
        };
        this.consoleFGColors = {
            Black: "\x1b[30m",
            Red: "\x1b[31m",
            Green: "\x1b[32m",
            Yellow: "\x1b[33m",
            Blue: "\x1b[34m",
            Magenta: "\x1b[35m",
            Cyan: "\x1b[36m",
            White: "\x1b[37m",
        };
        this.consoleBGColors = {
            Black: "\x1b[40m",
            Red: "\x1b[41m",
            Green: "\x1b[42m",
            Yellow: "\x1b[43m",
            Blue: "\x1b[44m",
            Magenta: "\x1b[45m",
            Cyan: "\x1b[46m",
            White: "\x1b[47m",
        };
        this.questionStyles = {
            "delimiter": {
                fg: "Cyan",
                bright: true
            },
            "question-start": {},
            "question": {},
            "re-ask-start": {
                fg: "Red",
                bright: true
            },
            "re-ask": {},
            "re-ask-delimiter": {
                fg: "White",
                bright: true
            }
        };
        this.messageStyles = {
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
        };
        this.params = new Map();
        this.paramValues = new Map();
        this.requiredParams = new Map();
        this.inputs = new Map();
        this.lastQuestion = "";
        this.askedQuestions = 0;
        this.questions = {};
        this.questionsFails = {};
        this.currentRow = 0;
        this.progressBars = {};
        this.serviceBars = {};
        this.validators = {
            number: (input) => {
                const reg = /^\d+$/;
                return reg.test(input);
            },
            digit: (input) => {
                const reg = /^[0-9]$/;
                return reg.test(input);
            },
            string: (input) => {
                const reg = /^[a-zA-Z]+$/;
                return reg.test(input);
            },
            email: (input) => {
                const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return reg.test(input);
            },
            password: (input) => {
                return true;
            },
            stringall: (input) => {
                return true;
            },
            custom: (input, type) => {
                if (!type) {
                    return false;
                }
                return this.customValidators[type](input);
            }
        };
        this.customValidators = {};
        this.screens = {
            splash: () => {
            },
            helpScreen: () => {
                console.log(this._addColor("Title", this.getString("title")) + "\n");
                console.log(this.getString("helpText") + "\n");
                const ii = " ";
                for (let pk of this.paramValues.keys()) {
                    let start = "   ";
                    let param = this.params.get(pk);
                    if (!param)
                        return;
                    if (param.required) {
                        start = " * ";
                    }
                    const message = `${start}-${param.flag}, --${param.name} [${param.type}] ${ii}| ${param.desc}`;
                    console.log(message);
                }
                console.log("\n");
                process.exit(1);
            },
            programInitError: (message) => {
                this.newScreen()
                    .show(message, "Error")
                    .show("Run --help for more info.", "Raw");
                process.exit(0);
            },
            crash: (message) => {
            },
            noInput: (message) => {
            },
            done: (message) => {
            }
        };
        this.R = this.red;
        this.G = this.green;
        this.B = this.blue;
        this.W = this.white;
        this.BL = this.black;
        this.C = this.cyan;
        this.M = this.magenta;
        this.Y = this.yellow;
        this.BR = this.brightRed;
        this.BG = this.brightGreen;
        this.BB = this.brightBlue;
        this.BW = this.brightWhite;
        this.BBL = this.brightBlack;
        this.BC = this.brightCyan;
        this.BM = this.brightMagenta;
        this.BY = this.brightYellow;
        this.BLI = this.blackInvert;
        this.RI = this.redInvert;
        this.GI = this.greenInvert;
        this.YI = this.yellowInvert;
        this.BI = this.blueInvert;
        this.MI = this.magentaInvert;
        this.CI = this.cyanInvert;
        this.WI = this.whiteInvert;
        this.BBLI = this.brightBlackInvert;
        this.BRI = this.brightRedInvert;
        this.BGI = this.brightGreenInvert;
        this.BYI = this.brightYellowInvert;
        this.BBI = this.brightBlackInvert;
        this.BMI = this.brightBlueInvert;
        this.BCI = this.brightCyanInvert;
        this.BWI = this.brightWhiteInvert;
        this.RBG = this.redBG;
        this.GBG = this.greenBG;
        this.BBG = this.blueBG;
        this.BLBG = this.blackBG;
        this.CBG = this.cyanBG;
        this.MBG = this.magentaBG;
        this.YBG = this.yellowBG;
        this.BRBG = this.brightRedBG;
        this.BGBG = this.brightGreenBG;
        this.BBBG = this.brightBlueBG;
        this.BWBG = this.brightWhiteBG;
        this.BBLBG = this.brightBlackBG;
        this.BCBG = this.brightCyanBG;
        this.BMBG = this.brightMagentaBG;
        this.BYBG = this.brightYellowBG;
        this.BLIBG = this.blackInvertBG;
        this.RIBG = this.redInvertBG;
        this.GIBG = this.greenInvertBG;
        this.YIGB = this.yellowInvertBG;
        this.BIBG = this.blueInvertBG;
        this.MIBG = this.magentaInvertBG;
        this.CIBG = this.cyanInvertBG;
        this.WIBG = this.whiteInvertBG;
        this.BBLIBG = this.brightBlackInvertBG;
        this.BRIBG = this.brightRedInvertBG;
        this.BGIBG = this.brightGreenInvertBG;
        this.BYIBG = this.BG;
        this.BBIBG = this.brightBlueInvertBG;
        this.BMIBG = this.brightMagentaInvertBG;
        this.BCIBG = this.brightCyanInvertBG;
        this.BWIBG = this.brightWhiteInvertBG;
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
    styleize(text, styleObj) {
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
    getParam(name) {
        let p;
        if ((p = this.params.get(name))) {
            if (typeof this.paramValues.get(p.flag) !== "undefined") {
                return this.paramValues.get(p.flag);
            }
        }
        return undefined;
    }
    ifParamIsset(param, func, args = {}) {
        let p;
        if ((p = this.params.get(param))) {
            const v = this.paramValues.get(p.flag);
            if (typeof v !== "undefined") {
                func(v, {});
            }
        }
        return this;
    }
    _isProgramArg(arg) {
        const reg1 = /^-/;
        const reg2 = /^--/;
        return reg1.test(arg) || reg2.test(arg);
    }
    promgramInitErrorScreen(message) {
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
                    if (!param)
                        return;
                    let value = "";
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
                            }
                            else {
                                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Either leave blank or use true or false. `);
                            }
                        }
                        else {
                            value = true;
                        }
                    }
                    if (param.type == "string") {
                        if (args[argc + 1]) {
                            const ahead = args[argc + 1];
                            if (!this.validators["string"](ahead)) {
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
                    }
                    if (param.type == "stringall") {
                        if (args[argc + 1]) {
                            const ahead = args[argc + 1];
                            if (!this.validators["stringall"](ahead)) {
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
                    }
                    if (param.type == "number") {
                        if (args[argc + 1]) {
                            const ahead = args[argc + 1];
                            if (!this.validators["number"](ahead)) {
                                this.promgramInitErrorScreen(`${param.name} was supplied with the wrong value type. Please enter a valid number.`);
                            }
                            else {
                                value = ahead;
                            }
                        }
                        else if (param.valueNeeded || param.required) {
                            this.promgramInitErrorScreen(`${param.name} was not supplied with a value.`);
                        }
                        else {
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
                if (!param)
                    return;
                this.promgramInitErrorScreen(`${param.name} is required was not supplied with a value.`);
            }
        }
        return this;
    }
    addParam(param) {
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
            await this._prompt(q, this.questions[q].varName, this.questions[q].varType, this.questions[q].customName);
        }
        this.rli.close();
        return this;
    }
    _prompt(question, varName, varType, custonName) {
        let passed = true;
        let gotinput = false;
        let asked = false;
        const q = this.questions[question];
        const qID = question;
        const prom = new Promise((resolve) => {
            if (varType == "password") {
                const stdin = process.openStdin();
                const listener = (char) => {
                    char = char + "";
                    switch (char) {
                        case "\n":
                        case "\r":
                        case "\u0004":
                            stdin.removeListener("data", listener);
                        default:
                            process.stdout.clearLine(1);
                            this.rdl.cursorTo(process.stdout, 0);
                            process.stdout.write(question + this.consoleCodes['Hidden'] + Array(this.rli.line.length + 1).join("*") + this.consoleCodes["Reset"]);
                            break;
                    }
                };
                process.stdin.on("data", listener);
            }
            else {
                process.stdin.on("data", (char) => { });
            }
            let inte;
            const go = () => {
                if (passed && gotinput) {
                    resolve(true);
                    clearInterval(inte);
                }
                else if (asked) { }
                else {
                    asked = true;
                    this.rli.question(question, (input) => {
                        this.rli.history.slice(1);
                        this.currentRow += this._countLines(question);
                        this.rdl.cursorTo(process.stdout, 0, this.currentRow);
                        (async () => {
                            asked = true;
                            gotinput = true;
                            let valid = false;
                            if (varType != "custom") {
                                valid = this.validators[varType](input);
                            }
                            else {
                                valid = this.validators[varType](input, custonName);
                            }
                            if (!valid) {
                                passed = false;
                                gotinput = false;
                                asked = false;
                                if (q.attempts && q.attempts != "all") {
                                    q.fails++;
                                    if (q.fails == q.attempts || !q.reAsk) {
                                        this.questionsFails[qID].func(this.questionsFails[qID].args);
                                    }
                                }
                                if (q.failPrompt) {
                                    question =
                                        this.styleize(this.getString("reAskStart"), this.questionStyles["re-ask-start"]) +
                                            this.styleize(q.failPrompt, this.questionStyles["re-ask"]) + " " +
                                            this.styleize(this.getString("reAskDelimiter"), this.questionStyles["re-ask-delimiter"]) + " ";
                                }
                                else {
                                    question =
                                        this.styleize(this.getString("reAskStart"), this.questionStyles["re-ask-start"]) +
                                            this.styleize(this.getString("reAskText"), this.questionStyles["re-ask"]) + " " +
                                            this.styleize(this.getString("reAskDelimiter"), this.questionStyles["re-ask-delimiter"]) + " ";
                                }
                            }
                            else {
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
    fail(reAsk, reAskMessage, attempts = "all", onFail, arg = {}) {
        this.questions[this.lastQuestion].reAsk = reAsk;
        if (onFail) {
            this.questionsFails[this.lastQuestion] = {
                func: onFail,
                args: arg
            };
        }
        this.questions[this.lastQuestion].failPrompt = reAskMessage;
        if (attempts != "all") {
            this.questions[this.lastQuestion].attempts = attempts;
            this.questions[this.lastQuestion].fails = 0;
        }
        return this;
    }
    ask(question, varName, varType, customName) {
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
        if (customName) {
            this.questions[question].customName = customName;
        }
        return this;
    }
    getInput(varName) {
        return this.inputs.get(varName);
    }
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
    getRow() {
        return this.currentRow;
    }
    setRow(num) {
        this.currentRow = num;
        this.rdl.cursorTo(process.stdout, 0, this.currentRow);
        return this;
    }
    addRow() {
        this.currentRow++;
        return this;
    }
    newServiceBar(name, serviceBarStyle) {
        let s;
        if (serviceBarStyle) {
            s = serviceBarStyle;
        }
        else {
            s = this.defaultServiceBarStyle;
        }
        const bar = new this.ServiceBar(this.rdl, this.currentRow, s.size, 0, s.interval, this.styleize(s.base, s.baseStyle), this.styleize(s.loadedOne, s.loadedOneStyle), this.styleize(s.loadedTwo, s.loadedTwoStyle), this.styleize(s.cap, s.capStyle));
        this.currentRow++;
        this.serviceBars[name] = bar;
        return this;
    }
    reInitServiceBar(name) {
        this.serviceBars[name].reInit();
        return this;
    }
    destroyServiceBar(name) {
        const bar = this.serviceBars[name];
        const row = bar.rows;
        bar.clear();
        this.clearRows(row, row);
        this.serviceBars[name] = null;
        delete this.serviceBars[name];
        return this;
    }
    newProgressBar(name, progressBarStyle) {
        let d;
        if (progressBarStyle) {
            d = progressBarStyle;
        }
        else {
            d = this.defaultPrgoressBarStyle;
        }
        const bar = new this.ProgressBar(this.rdl, this.currentRow, d.size, d.interval, this.styleize(d.base, d.baseStyle), this.styleize(d.loaded, d.loadedStyle));
        this.currentRow++;
        bar.start();
        this.progressBars[name] = bar;
        return this;
    }
    async incrementProgressBar(name, amount) {
        await this.progressBars[name].addProgressPerfect(amount);
        return this;
    }
    sleep(ms) {
        var waitTill = new Date(new Date().getTime() + ms);
        while (waitTill > new Date()) { }
        return this;
    }
    asyncSleep(ms) {
        let self = this;
        return new Promise((resolve) => setTimeout(() => {
            resolve(self);
        }, ms));
    }
    newScreen() {
        console.clear();
        this.currentRow = 0;
        return this;
    }
    showAt(message, type, row, col = 0) {
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
    show(message, type) {
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
    showSleep(message, type, ms = this.defaultSleepTime) {
        this.show(message, type);
        this.sleep(ms);
        return this;
    }
    log(message, type) {
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
    logSleep(message, type, ms = this.defaultSleepTime) {
        this.log(message, type);
        this.sleep(ms);
        return this;
    }
    _addColor(type, message) {
        return this.styleize(message, this.messageStyles[type]);
    }
    _countLines(message) {
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
    defineValidator(type, func, name) {
        if (type === "custom") {
            if (!name)
                return;
            this.customValidators[name] = func;
        }
        else {
            this.validators[type] = func;
        }
    }
    defineQuestionStyle(type, styleObj) {
        this.questionStyles[type] = styleObj;
        return this;
    }
    defineMessageStyle(type, styleObj) {
        this.messageStyles[type] = styleObj;
        return this;
    }
    defineProgressBarStyle(progressBarStyle) {
        this.defaultPrgoressBarStyle = progressBarStyle;
        return this;
    }
    defineServiceBarStyle(serviceBarStyle) {
        this.defaultServiceBarStyle = serviceBarStyle;
        return this;
    }
    defineProgramTitle(title, styleObj) {
        this.strings["title"] = title;
        if (styleObj) {
            this.messageStyles["Title"] = styleObj;
        }
        return this;
    }
    defineHelpText(text) {
        this.strings["helpText"] = text;
        return this;
    }
    defineScreen(screen, func) {
        this.screens[screen] = func;
        return this;
    }
    displayScreen(screen, args = {}) {
        this.screens[screen](args);
    }
    defineSplashScreen(func) {
        this.screens["splash"] = func;
        return this;
    }
    splashScreen() {
        this.screens["splash"]();
        return this;
    }
    getString(id) {
        return this.strings[id];
    }
    setString(id, string) {
        this.strings[id] = string;
        return this;
    }
    red(text) {
        return this.styleize(text, {
            fg: "Red"
        });
    }
    sR(text) {
        return this.show(this.R(text), "Raw");
    }
    ssR(text) {
        return this.showSleep(this.R(text), "Raw");
    }
    saR(text, row, col = 0) {
        return this.showAt(this.R(text), "Raw", row, col);
    }
    lR(text) {
        return this.log(this.R(text), "Raw");
    }
    lsR(text) {
        return this.logSleep(this.R(text), "Raw");
    }
    green(text) {
        return this.styleize(text, {
            fg: "Green"
        });
    }
    sG(text) {
        return this.show(this.G(text), "Raw");
    }
    ssG(text) {
        return this.showSleep(this.G(text), "Raw");
    }
    saG(text, row, col = 0) {
        return this.showAt(this.G(text), "Raw", row, col);
    }
    lG(text) {
        return this.log(this.G(text), "Raw");
    }
    lsG(text) {
        return this.logSleep(this.G(text), "Raw");
    }
    blue(text) {
        return this.styleize(text, {
            fg: "Green"
        });
    }
    sB(text) {
        return this.show(this.B(text), "Raw");
    }
    ssB(text) {
        return this.showSleep(this.B(text), "Raw");
    }
    saB(text, row, col = 0) {
        return this.showAt(this.B(text), "Raw", row, col);
    }
    lB(text) {
        return this.log(this.B(text), "Raw");
    }
    lsB(text) {
        return this.logSleep(this.B(text), "Raw");
    }
    white(text) {
        return this.styleize(text, {
            fg: "White"
        });
    }
    sW(text) {
        return this.show(this.W(text), "Raw");
    }
    ssW(text) {
        return this.showSleep(this.W(text), "Raw");
    }
    saW(text, row, col = 0) {
        return this.showAt(this.W(text), "Raw", row, col);
    }
    lW(text) {
        return this.log(this.W(text), "Raw");
    }
    lsW(text) {
        return this.logSleep(this.W(text), "Raw");
    }
    black(text) {
        return this.styleize(text, {
            fg: "Black"
        });
    }
    sBL(text) {
        return this.show(this.BL(text), "Raw");
    }
    ssBL(text) {
        return this.showSleep(this.BL(text), "Raw");
    }
    saBL(text, row, col = 0) {
        return this.showAt(this.BL(text), "Raw", row, col);
    }
    lBL(text) {
        return this.log(this.BL(text), "Raw");
    }
    lsBL(text) {
        return this.logSleep(this.BL(text), "Raw");
    }
    cyan(text) {
        return this.styleize(text, {
            fg: "Cyan"
        });
    }
    sC(text) {
        return this.show(this.C(text), "Raw");
    }
    ssC(text) {
        return this.showSleep(this.C(text), "Raw");
    }
    saC(text, row, col = 0) {
        return this.showAt(this.C(text), "Raw", row, col);
    }
    lC(text) {
        return this.log(this.C(text), "Raw");
    }
    lsC(text) {
        return this.logSleep(this.C(text), "Raw");
    }
    magenta(text) {
        return this.styleize(text, {
            fg: "Magenta"
        });
    }
    sM(text) {
        return this.show(this.M(text), "Raw");
    }
    ssM(text) {
        return this.showSleep(this.M(text), "Raw");
    }
    saM(text, row, col = 0) {
        return this.showAt(this.M(text), "Raw", row, col);
    }
    lM(text) {
        return this.log(this.M(text), "Raw");
    }
    lsM(text) {
        return this.logSleep(this.M(text), "Raw");
    }
    yellow(text) {
        return this.styleize(text, {
            fg: "Yellow"
        });
    }
    sY(text) {
        return this.show(this.Y(text), "Raw");
    }
    ssY(text) {
        return this.showSleep(this.Y(text), "Raw");
    }
    saY(text, row, col = 0) {
        return this.showAt(this.Y(text), "Raw", row, col);
    }
    lY(text) {
        return this.log(this.Y(text), "Raw");
    }
    lsY(text) {
        return this.logSleep(this.Y(text), "Raw");
    }
    brightRed(text) {
        return this.styleize(text, {
            fg: "Red",
            bright: true
        });
    }
    sBR(text) {
        return this.show(this.BR(text), "Raw");
    }
    ssBR(text) {
        return this.showSleep(this.BR(text), "Raw");
    }
    saBR(text, row, col = 0) {
        return this.showAt(this.BR(text), "Raw", row, col);
    }
    lBR(text) {
        return this.log(this.BR(text), "Raw");
    }
    lsBR(text) {
        return this.logSleep(this.BR(text), "Raw");
    }
    brightGreen(text) {
        return this.styleize(text, {
            fg: "Green",
            bright: true
        });
    }
    brightBlue(text) {
        return this.styleize(text, {
            fg: "Green",
            bright: true
        });
    }
    brightWhite(text) {
        return this.styleize(text, {
            fg: "White",
            bright: true
        });
    }
    brightBlack(text) {
        return this.styleize(text, {
            fg: "Black",
            bright: true
        });
    }
    brightCyan(text) {
        return this.styleize(text, {
            fg: "Cyan",
            bright: true
        });
    }
    brightMagenta(text) {
        return this.styleize(text, {
            fg: "Magenta",
            bright: true
        });
    }
    brightYellow(text) {
        return this.styleize(text, {
            fg: "Yellow",
            bright: true
        });
    }
    blackInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Black",
            bg: bg,
            reverse: true
        });
    }
    redInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Red",
            bg: bg,
            reverse: true
        });
    }
    greenInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Green",
            bg: bg,
            reverse: true
        });
    }
    yellowInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Yellow",
            bg: bg,
            reverse: true
        });
    }
    blueInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Blue",
            bg: bg,
            reverse: true
        });
    }
    magentaInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Magenta",
            bg: bg,
            reverse: true
        });
    }
    cyanInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Cyan",
            bg: bg,
            reverse: true
        });
    }
    whiteInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "White",
            bg: bg,
            reverse: true
        });
    }
    brightBlackInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Black",
            bg: bg,
            reverse: true,
            bright: true
        });
    }
    brightRedInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Red",
            bg: bg,
            reverse: true,
            bright: true
        });
    }
    brightGreenInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Green",
            bg: bg,
            reverse: true,
            bright: true
        });
    }
    brightYellowInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Yellow",
            bg: bg,
            reverse: true,
            bright: true
        });
    }
    brightBlueInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Blue",
            bg: bg,
            reverse: true,
            bright: true
        });
    }
    brightMagentaInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Magenta",
            bg: bg,
            reverse: true,
            bright: true
        });
    }
    brightCyanInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "Cyan",
            bg: bg,
            reverse: true,
            bright: true
        });
    }
    brightWhiteInvert(text, bg = "none") {
        return this.styleize(text, {
            fg: "White",
            bg: bg,
            reverse: true,
            bright: true
        });
    }
    redBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Red",
            fg: fg
        });
    }
    greenBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Green",
            fg: fg
        });
    }
    blueBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Green",
            fg: fg
        });
    }
    whiteBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "White",
            fg: fg
        });
    }
    blackBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Black",
            fg: fg
        });
    }
    cyanBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Cyan",
            fg: fg
        });
    }
    magentaBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Magenta",
            fg: fg
        });
    }
    yellowBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Yellow",
            fg: fg
        });
    }
    brightRedBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Red",
            fg: fg
        });
    }
    brightGreenBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Green",
            fg: fg
        });
    }
    brightBlueBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Green",
            fg: fg
        });
    }
    brightWhiteBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "White",
            fg: fg
        });
    }
    brightBlackBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Black",
            fg: fg
        });
    }
    brightCyanBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Cyan",
            fg: fg
        });
    }
    brightMagentaBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Magenta",
            fg: fg
        });
    }
    brightYellowBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Yellow",
            fg: fg
        });
    }
    blackInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Black",
            fg: fg,
            reverse: true
        });
    }
    redInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Red",
            fg: fg,
            reverse: true
        });
    }
    greenInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Green",
            fg: fg,
            reverse: true
        });
    }
    yellowInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Yellow",
            fg: fg,
            reverse: true
        });
    }
    blueInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Blue",
            fg: fg,
            reverse: true
        });
    }
    magentaInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Magenta",
            fg: fg,
            reverse: true
        });
    }
    cyanInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Cyan",
            fg: fg,
            reverse: true
        });
    }
    whiteInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "White",
            fg: fg,
            reverse: true
        });
    }
    brightBlackInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Black",
            fg: fg,
            reverse: true,
            bright: true
        });
    }
    brightRedInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Red",
            fg: fg,
            reverse: true,
            bright: true
        });
    }
    brightGreenInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Green",
            fg: fg,
            reverse: true,
            bright: true
        });
    }
    brightYellowInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Yellow",
            fg: fg,
            reverse: true,
            bright: true
        });
    }
    brightBlueInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Blue",
            fg: fg,
            reverse: true,
            bright: true
        });
    }
    brightMagentaInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Magenta",
            fg: fg,
            reverse: true,
            bright: true
        });
    }
    brightCyanInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "Cyan",
            fg: fg,
            reverse: true,
            bright: true
        });
    }
    brightWhiteInvertBG(text, fg = "none") {
        return this.styleize(text, {
            bg: "White",
            fg: fg,
            reverse: true,
            bright: true
        });
    }
    exit() {
        process.exit(0);
    }
}
const rdl = require("readline");
const DS = new DSLogger(rdl);
module.exports = DS;
