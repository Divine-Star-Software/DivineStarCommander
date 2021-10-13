"use strict";
class DSLogger {
    constructor(rdl) {
        this.rdl = rdl;
        this.defaultStyleDelimiter = {};
        this.styleDelimiter = {};
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
            separator: "{-----------------------------}",
            questionStart: "-->",
            questionDelimiter: ":",
            reAskStart: "X->",
            reAskText: "The input was not correct please re-enter",
            reAskDelimiter: ":",
        };
        this.defaultPrgoressBarStyle = {
            base: "-",
            baseStyle: {},
            loaded: "=",
            loadedStyle: {},
            size: 30,
            interval: 15,
        };
        this.defaultServiceBarStyle = {
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
        this.messageStyles = {
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
            number: async (input) => {
                const reg = /^\d+$/;
                return reg.test(input);
            },
            digit: async (input) => {
                const reg = /^[0-9]$/;
                return reg.test(input);
            },
            string: async (input) => {
                const reg = /^[a-zA-Z]+$/;
                return reg.test(input);
            },
            email: async (input) => {
                const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return reg.test(input);
            },
            password: async (input) => {
                return true;
            },
            stringall: async (input) => {
                return true;
            },
            custom: async (input, type) => {
                if (!type) {
                    return false;
                }
                return this.customValidators[type](input);
            },
        };
        this.customValidators = {};
        this.screens = {
            splash: () => { },
            helpScreen: () => {
                console.log(this.getMessageStyled("Title", this.getString("title")) + "\n");
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
                this.newScreen()
                    .show("The program crashed.", "Raw")
                    .show(message, "Error");
            },
            error: (message) => {
                this.newScreen()
                    .show("The program had an error.", "Raw")
                    .show(message, "Error");
            },
            noInput: () => {
                this.log("Please run --help to learn how to use this program.", "Info");
            },
            done: (message) => {
                this.log("The program is done running.", "Info").log(message);
                process.exit(0);
            },
        };
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
    stylize(text, styleObj) {
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
                    let stdin;
                    let listener;
                    if (varType == "password") {
                        stdin = process.openStdin();
                        listener = (char) => {
                            char = char + "";
                            switch (char) {
                                case "\n":
                                case "\r":
                                case "\u0004":
                                    stdin.removeListener("data", listener);
                                default:
                                    process.stdout.clearLine(1);
                                    this.rdl.cursorTo(process.stdout, 0);
                                    process.stdout.write(question +
                                        this.consoleCodes["Hidden"] +
                                        Array(this.rli.line.length + 1).join("*") +
                                        this.consoleCodes["Reset"]);
                                    break;
                            }
                        };
                        process.stdin.on("data", listener);
                    }
                    else {
                        process.stdin.on("data", () => { });
                    }
                    this.rli.question(question, (input) => {
                        this.rli.history.slice(1);
                        this.currentRow += this.countLines(question);
                        this.rdl.cursorTo(process.stdout, 0, this.currentRow);
                        (async () => {
                            asked = true;
                            gotinput = true;
                            let valid = false;
                            if (varType != "custom") {
                                valid = await this.validators[varType](input);
                            }
                            else {
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
                                    q.fails++;
                                    if (q.fails == q.attempts || !q.reAsk) {
                                        this.questionsFails[qID].func(this.questionsFails[qID].args);
                                    }
                                }
                                if (q.failPrompt) {
                                    question =
                                        this.stylize(this.getString("reAskStart"), this.questionStyles["re-ask-start"]) +
                                            this.stylize(q.failPrompt, this.questionStyles["re-ask"]) +
                                            " " +
                                            this.stylize(this.getString("reAskDelimiter"), this.questionStyles["re-ask-delimiter"]) +
                                            " ";
                                }
                                else {
                                    question =
                                        this.stylize(this.getString("reAskStart"), this.questionStyles["re-ask-start"]) +
                                            this.stylize(this.getString("reAskText"), this.questionStyles["re-ask"]) +
                                            " " +
                                            this.stylize(this.getString("reAskDelimiter"), this.questionStyles["re-ask-delimiter"]) +
                                            " ";
                                }
                            }
                            else {
                                if (varType == "password") {
                                    stdin.removeListener("data", listener);
                                }
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
            }, 10);
        });
        return prom;
    }
    fail(reAsk, reAskMessage, attempts = "all", onFail, arg = {}) {
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
    ask(question, varName, varType, customName) {
        this.askedQuestions++;
        this.inputs.set(varName, undefined);
        question =
            this.stylize(this.getString("questionStart"), this.questionStyles["question-start"]) +
                this.stylize(question, this.questionStyles["question"]) +
                " " +
                this.stylize(this.getString("questionDelimiter"), this.questionStyles["delimiter"]) +
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
    newServiceBar(name, serviceBarStyle = this.defaultServiceBarStyle) {
        const s = serviceBarStyle;
        const bar = new this.ServiceBar(this.rdl, this.currentRow, s.size, 0, s.interval, this.stylize(s.base, s.baseStyle), this.stylize(s.loadedOne, s.loadedOneStyle), this.stylize(s.loadedTwo, s.loadedTwoStyle), this.stylize(s.cap, s.capStyle));
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
        const bar = new this.ProgressBar(this.rdl, this.currentRow, d.size, d.interval, this.stylize(d.base, d.baseStyle), this.stylize(d.loaded, d.loadedStyle));
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
    _processMessage(message, type = "none") {
        let output = message;
        if (type != "Raw" && type != "Data") {
            if (type != "none") {
                output = this.stylize(message, this.messageStyles[type]);
            }
            else {
                output = this.stylize(message, this.styleDelimiter);
            }
        }
        if (type == "Data") {
            output = JSON.stringify(message, null, 3);
        }
        return output;
    }
    showAtSleep(message, params = {
        row: this.currentRow,
        col: 0,
        type: "none",
        sleep: this.defaultSleepTime,
    }) {
        this.showAt(message, {
            row: params.row,
            type: params.type,
            col: params.col,
        });
        return this.sleep(params.sleep);
    }
    showAt(message, params = {
        row: this.currentRow,
        col: 0,
        type: "none",
    }) {
        let output = this._processMessage(message, params.type);
        const lines = this.countLines(`${output}`);
        this.rdl.cursorTo(process.stdout, params.col, params.row);
        this.currentRow += lines;
        console.log(output);
        return this;
    }
    show(message, type = "none") {
        let output = this._processMessage(message, type);
        const lines = this.countLines(`${output}`);
        this.rdl.cursorTo(process.stdout, 0, this.currentRow);
        this.currentRow += lines;
        console.log(output);
        return this;
    }
    showSleep(message, type = "none", ms = this.defaultSleepTime) {
        this.show(message, type);
        this.sleep(ms);
        return this;
    }
    log(message, type = "none") {
        let output = this._processMessage(message, type);
        const lines = this.countLines(`${output}`);
        this.currentRow += lines;
        console.log(output);
        return this;
    }
    logSleep(message, type = "none", ms = this.defaultSleepTime) {
        this.log(message, type);
        this.sleep(ms);
        return this;
    }
    logTable(data, collumns) {
        const lines = Object.keys(data).length + 2;
        this.currentRow += lines;
        console.table(data, collumns);
        return this;
    }
    showTable(data, collumns) {
        const lines = Object.keys(data).length + 2;
        this.rdl.cursorTo(process.stdout, 0, this.currentRow);
        console.table(data, collumns);
        this.currentRow += lines;
        return this;
    }
    getMessageStyled(type, message) {
        return this.stylize(message, this.messageStyles[type]);
    }
    countLines(message) {
        return message.split(/\r\n|\r|\n/).length;
    }
    logSeparator() {
        this.show(this.getString("separator"), "Info");
        return this;
    }
    logProgramTitle() {
        this.show(this.getString("title"), "Title");
        return this;
    }
    defineSleepTime(sleep) {
        this.defaultSleepTime = sleep;
        return this;
    }
    defineValidator(type, func, name) {
        if (type === "custom") {
            if (!name) {
                throw new Error("Must define name for custom question type.");
            }
            this.customValidators[name] = func;
        }
        else {
            this.validators[type] = func;
        }
        return this;
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
    promgramInitErrorScreen(message) {
        this.screens["programInitError"](message);
    }
    errorScreen(message) {
        this.screens["error"](message);
    }
    crashScreen(message) {
        this.screens["crash"](message);
    }
    getString(id) {
        return this.strings[id];
    }
    setString(id, string) {
        this.strings[id] = string;
        return this;
    }
    _copyDefaultStyle() {
        return JSON.parse(JSON.stringify(this.defaultStyleDelimiter));
    }
    _copyMessageStyle(type) {
        return JSON.parse(JSON.stringify(this.messageStyles[type]));
    }
    info(text) {
        this.styleDelimiter = this._copyMessageStyle("Info");
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get INFO() {
        this.styleDelimiter = this._copyMessageStyle("Info");
        return this;
    }
    good(text) {
        this.styleDelimiter = this._copyMessageStyle("Good");
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get GOOD() {
        this.styleDelimiter = this._copyMessageStyle("Good");
        return this;
    }
    warning(text) {
        this.styleDelimiter = this._copyMessageStyle("Warning");
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get WARNING() {
        this.styleDelimiter = this._copyMessageStyle("Warning");
        return this;
    }
    raw(text) {
        this.styleDelimiter = this._copyMessageStyle("Raw");
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get RAW() {
        this.styleDelimiter = this._copyMessageStyle("Raw");
        return this;
    }
    title(text) {
        this.styleDelimiter = this._copyMessageStyle("Title");
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get TITLE() {
        this.styleDelimiter = this._copyMessageStyle("Title");
        return this;
    }
    error(text) {
        this.styleDelimiter = this._copyMessageStyle("Error");
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get ERROR() {
        this.styleDelimiter = this._copyMessageStyle("Error");
        return this;
    }
    get NS() {
        this.newScreen();
        return this;
    }
    get NEWSCREEN() {
        this.newScreen();
        return this;
    }
    newLine() {
        console.log("\n");
        this.currentRow++;
    }
    get NL() {
        this.newLine();
        return this;
    }
    get NEWLINE() {
        this.newLine();
        return this;
    }
    clear() {
        this.styleDelimiter = this._copyDefaultStyle();
        return this;
    }
    get CL() {
        this.styleDelimiter = this._copyDefaultStyle();
        return this;
    }
    get CLEAR() {
        this.styleDelimiter = this._copyDefaultStyle();
        return this;
    }
    blink(text) {
        this.styleDelimiter.blink = true;
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get BI() {
        this.styleDelimiter.blink = true;
        return this;
    }
    get BLINK() {
        this.styleDelimiter.blink = true;
        return this;
    }
    hidden(text) {
        this.styleDelimiter.hidden = true;
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get H() {
        this.styleDelimiter.hidden = true;
        return this;
    }
    get HIDDEN() {
        this.styleDelimiter.hidden = true;
        return this;
    }
    underscore(text) {
        this.styleDelimiter.underscore = true;
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get U() {
        this.styleDelimiter.underscore = true;
        return this;
    }
    get UNDERSCORE() {
        this.styleDelimiter.underscore = true;
        return this;
    }
    dim(text) {
        this.styleDelimiter.dim = true;
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get D() {
        this.styleDelimiter.dim = true;
        return this;
    }
    get DIM() {
        this.styleDelimiter.dim = true;
        return this;
    }
    bright(text) {
        this.styleDelimiter.bright = true;
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get BR() {
        this.styleDelimiter.bright = true;
        return this;
    }
    get BRIGHT() {
        this.styleDelimiter.bright = true;
        return this;
    }
    invert(text) {
        this.styleDelimiter.reverse = true;
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get I() {
        this.styleDelimiter.reverse = true;
        return this;
    }
    get INVERT() {
        this.styleDelimiter.reverse = true;
        return this;
    }
    red(text) {
        this.styleDelimiter.fg = "Red";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get R() {
        this.styleDelimiter.fg = "Red";
        return this;
    }
    get RED() {
        this.styleDelimiter.fg = "Red";
        return this;
    }
    green(text) {
        this.styleDelimiter.fg = "Green";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get G() {
        this.styleDelimiter.fg = "Green";
        return this;
    }
    get GREEN() {
        this.styleDelimiter.fg = "Green";
        return this;
    }
    blue(text) {
        this.styleDelimiter.fg = "Blue";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get B() {
        this.styleDelimiter.fg = "Blue";
        return this;
    }
    get BLUE() {
        this.styleDelimiter.fg = "Blue";
        return this;
    }
    white(text) {
        this.styleDelimiter.fg = "White";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get W() {
        this.styleDelimiter.fg = "White";
        return this;
    }
    get WHITE() {
        this.styleDelimiter.fg = "White";
        return this;
    }
    black(text) {
        this.styleDelimiter.fg = "Black";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get BL() {
        this.styleDelimiter.fg = "Black";
        return this;
    }
    get BLACK() {
        this.styleDelimiter.fg = "Black";
        return this;
    }
    cyan(text) {
        this.styleDelimiter.fg = "Cyan";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get C() {
        this.styleDelimiter.fg = "Cyan";
        return this;
    }
    get CYAN() {
        this.styleDelimiter.fg = "Cyan";
        return this;
    }
    magenta(text) {
        this.styleDelimiter.fg = "Magenta";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get M() {
        this.styleDelimiter.fg = "Magenta";
        return this;
    }
    get MAGENTA() {
        this.styleDelimiter.fg = "Magenta";
        return this;
    }
    yellow(text) {
        this.styleDelimiter.fg = "Yellow";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get Y() {
        this.styleDelimiter.fg = "Yellow";
        return this;
    }
    get YELLOW() {
        this.styleDelimiter.fg = "Yellow";
        return this;
    }
    redBG(text) {
        this.styleDelimiter.bg = "Red";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get RBG() {
        this.styleDelimiter.bg = "Red";
        return this;
    }
    get REDBG() {
        this.styleDelimiter.bg = "Red";
        return this;
    }
    greenBG(text) {
        this.styleDelimiter.bg = "Green";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get GBG() {
        this.styleDelimiter.bg = "Green";
        return this;
    }
    get GREENBG() {
        this.styleDelimiter.bg = "Green";
        return this;
    }
    blueBG(text) {
        this.styleDelimiter.bg = "Blue";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get BBG() {
        this.styleDelimiter.bg = "Blue";
        return this;
    }
    get BLUEBG() {
        this.styleDelimiter.bg = "Blue";
        return this;
    }
    whiteBG(text) {
        this.styleDelimiter.bg = "White";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get WBG() {
        this.styleDelimiter.bg = "White";
        return this;
    }
    get WHITEBG() {
        this.styleDelimiter.bg = "White";
        return this;
    }
    blackBG(text) {
        this.styleDelimiter.bg = "Black";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get BLBG() {
        this.styleDelimiter.bg = "Black";
        return this;
    }
    get BLACKBG() {
        this.styleDelimiter.bg = "Black";
        return this;
    }
    cyanBG(text) {
        this.styleDelimiter.bg = "Cyan";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get CBG() {
        this.styleDelimiter.bg = "Cyan";
        return this;
    }
    get CYANBG() {
        this.styleDelimiter.bg = "Cyan";
        return this;
    }
    magentaBG(text) {
        this.styleDelimiter.bg = "Magenta";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get MBG() {
        this.styleDelimiter.bg = "Magenta";
        return this;
    }
    get MAGENTABG() {
        this.styleDelimiter.bg = "Magenta";
        return this;
    }
    yellowBG(text) {
        this.styleDelimiter.bg = "Yellow";
        if (!text)
            return this;
        const string = this.stylize(text, this.styleDelimiter);
        this.styleDelimiter = this._copyDefaultStyle();
        return string;
    }
    get YBG() {
        this.styleDelimiter.bg = "Yellow";
        return this;
    }
    get YELLOWBG() {
        this.styleDelimiter.bg = "Yellow";
        return this;
    }
    do(func, arg) {
        func(arg);
        return this;
    }
    exit() {
        process.exit(0);
    }
    done() {
        this.screens["done"]();
        this.exit();
    }
}
const rdl = require("readline");
const DS = new DSLogger(rdl);
module.exports = DS;
