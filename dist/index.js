"use strict";
class DSLogger {
    constructor(rdl) {
        this.rdl = rdl;
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
            seperator: "-----------------------------",
            questionStart: "-->",
            questionDelimiter: ":",
            reAskStart: "X->",
            reAskText: "The input was not correct please re-enter",
            reAskDelimiter: ":"
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
        this.splash = () => { };
        this.ProgressBar = LoadingBar;
        this.ServiceBar = ServiceBar;
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
    }
    styleize(text, styleObj) {
        let front = "";
        if (styleObj.fg && styleObj.fg != "none") {
            front += this.consoleFGColors[styleObj.fg];
        }
        if (styleObj.bg && styleObj.bg != "none") {
            front += this.consoleBGColors[styleObj.bg];
        }
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
    defineHelpText(text) {
        this.strings["helpText"] = text;
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
                                    if (q.fails == q.attempts) {
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
    fail(reAsk, reAskMessage, attempts = "all", onFail, args = {}) {
        if (onFail) {
            this.questionsFails[this.lastQuestion] = {
                func: onFail,
                args: args
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
    newServiceBar(name) {
        const bar = new this.ServiceBar(this.rdl, this.currentRow, 31, 0, 80);
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
    newProgressBar(name) {
        const bar = new this.ProgressBar(this.rdl, this.currentRow, 30);
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
    showAt(message, type, row) {
        let output = message;
        if (type != "Raw" && type != "Data") {
            output = this._addColor(type, message);
        }
        if (type == "Data") {
            output = JSON.stringify(message, null, 3);
        }
        const lines = this._countLines(`${output}`);
        this.rdl.cursorTo(process.stdout, 0, row);
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
    showSleep(message, type, ms = 800) {
        this.show(message, type);
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
    defineProgramTitle(title, styleObj) {
        this.strings["title"] = title;
        if (styleObj) {
            this.messageStyles["Title"] = styleObj;
        }
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
        this.splash = func;
        return this;
    }
    splashScreen() {
        this.splash();
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
    green(text) {
        return this.styleize(text, {
            fg: "Green"
        });
    }
    blue(text) {
        return this.styleize(text, {
            fg: "Green"
        });
    }
    white(text) {
        return this.styleize(text, {
            fg: "White"
        });
    }
    black(text) {
        return this.styleize(text, {
            fg: "Black"
        });
    }
    cyan(text) {
        return this.styleize(text, {
            fg: "Cyan"
        });
    }
    magenta(text) {
        return this.styleize(text, {
            fg: "Magenta"
        });
    }
    yellow(text) {
        return this.styleize(text, {
            fg: "Yellow"
        });
    }
    brightRed(text) {
        return this.styleize(text, {
            fg: "Red",
            bright: true
        });
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
}
class LoadingBar {
    constructor(rdl, row, size) {
        this.rdl = rdl;
        this.row = row;
        this.size = size;
        this.done = false;
        this.cursor = 0;
        this.timer = null;
    }
    start() {
        for (let i = 0; i < this.size; i++) {
            process.stdout.write("-");
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
                }
            }, 1200);
        });
        return prom;
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
                    process.stdout.write("=");
                    console.log("\r");
                }
                else if (this.cursor >= num) {
                    process.stdout.write("=");
                    doneLocal = true;
                }
                else {
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
    constructor(rdl, rows = 0, size = 32, start = 2, interval = 150) {
        this.rdl = rdl;
        this.rows = rows;
        this.size = size;
        this.start = start;
        this.interval = interval;
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
