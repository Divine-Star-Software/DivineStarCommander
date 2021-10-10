var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var DSLogger = /** @class */ (function () {
    function DSLogger(rdl) {
        var _this = this;
        this.rdl = rdl;
        //strings
        this.strings = {
            title: "[ Divine Star Logger ]",
            helpText: "",
            star: "            \u001B[1m\u001B[35m.\u001B[0m\n           \u001B[1m\u001B[35m,\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m,\u001B[0m\n          \u001B[1m\u001B[35m,\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m,\u001B[0m\n    \u001B[1m\u001B[35m'\u001B[0m\u001B[1m\u001B[35mx\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mx\u001B[0m\u001B[1m\u001B[35m'\u001B[0m\n      \u001B[1m\u001B[35m`\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m`\u001B[0m\n        \u001B[1m\u001B[35m`\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m`\u001B[0m\n        \u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m'\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\n       \u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m'\u001B[0m   \u001B[1m\u001B[35m'\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\n      \u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m'\u001B[0m         \u001B[1m\u001B[35m'\u001B[0m\u001B[1m\u001B[35mX\u001B[0m",
            seperator: "-----------------------------",
            questionDelimiter: ":"
        };
        this.consoleCodes = {
            Reset: "\x1b[0m",
            Bright: "\x1b[1m",
            Dim: "\x1b[2m",
            Underscore: "\x1b[4m",
            Blink: "\x1b[5m",
            Reverse: "\x1b[7m",
            Hidden: "\x1b[8m"
        };
        this.consoleFGColors = {
            Black: "\x1b[30m",
            Red: "\x1b[31m",
            Green: "\x1b[32m",
            Yellow: "\x1b[33m",
            Blue: "\x1b[34m",
            Magenta: "\x1b[35m",
            Cyan: "\x1b[36m",
            White: "\x1b[37m"
        };
        this.consoleBGColors = {
            Black: "\x1b[40m",
            Red: "\x1b[41m",
            Green: "\x1b[42m",
            Yellow: "\x1b[43m",
            Blue: "\x1b[44m",
            Magenta: "\x1b[45m",
            Cyan: "\x1b[46m",
            White: "\x1b[47m"
        };
        this.questionStyles = {
            "delimiter": {
                fg: "Cyan",
                bright: true
            },
            "question": {},
            "re-ask": {}
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
        this.splash = function () { };
        this.ProgressBar = LoadingBar;
        this.ServiceBar = ServiceBar;
        this.params = new Map();
        this.paramValues = new Map();
        this.requiredParams = new Map();
        this.inputs = new Map();
        this.askedQuestions = 0;
        this.questions = {};
        this.currentRow = 0;
        this.progressBars = {};
        this.serviceBars = {};
        this.validators = {
            number: function (input) {
                var reg = /^\d+$/;
                return reg.test(input);
            },
            digit: function (input) {
                var reg = /^[0-9]$/;
                return reg.test(input);
            },
            string: function (input) {
                var reg = /^[a-zA-Z]+$/;
                return reg.test(input);
            },
            email: function (input) {
                var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return reg.test(input);
            },
            password: function (input) {
                return true;
            },
            stringall: function (input) {
                return true;
            },
            custom: function (input, type) {
                if (!type) {
                    return false;
                }
                return _this.customValidators[type](input);
            }
        };
        this.customValidators = {};
        this.screens = {
            splash: function () {
            },
            helpScreen: function () {
                console.log(_this._addColor("Title", _this.getString("title")) + "\n");
                console.log(_this.getString("helpText") + "\n");
                var ii = " ";
                for (var _i = 0, _a = _this.paramValues.keys(); _i < _a.length; _i++) {
                    var pk = _a[_i];
                    var start = "   ";
                    var param = _this.params.get(pk);
                    if (!param)
                        return;
                    if (param.required) {
                        start = " * ";
                    }
                    var message = start + "-" + param.flag + ", --" + param.name + " [" + param.type + "] " + ii + "| " + param.desc;
                    console.log(message);
                }
                console.log("\n");
                process.exit(1);
            },
            programInitError: function (message) {
                _this.newScreen()
                    .show(message, "Error")
                    .show("Run --help for more info.", "Raw");
                process.exit(0);
            },
            crash: function (message) {
            },
            noInput: function (message) {
            },
            done: function (message) {
            }
        };
    }
    DSLogger.prototype.styleize = function (text, styleObj) {
        var front = "";
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
    };
    DSLogger.prototype.getParam = function (name) {
        var p;
        if ((p = this.params.get(name))) {
            if (typeof this.paramValues.get(p.flag) !== "undefined") {
                return this.paramValues.get(p.flag);
            }
        }
        return undefined;
    };
    DSLogger.prototype.ifParamIsset = function (param, func, args) {
        if (args === void 0) { args = {}; }
        var p;
        if ((p = this.params.get(param))) {
            var v = this.paramValues.get(p.flag);
            if (typeof v !== "undefined") {
                func(v, {});
            }
        }
        return this;
    };
    DSLogger.prototype._isProgramArg = function (arg) {
        var reg1 = /^-/;
        var reg2 = /^--/;
        return reg1.test(arg) || reg2.test(arg);
    };
    DSLogger.prototype.promgramInitErrorScreen = function (message) {
        this.screens["programInitError"](message);
    };
    DSLogger.prototype.initProgramInput = function () {
        var args = process.argv;
        var argsLength = args.length;
        var argc = 0;
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            if (this._isProgramArg(arg)) {
                if (arg == "--help") {
                    this.screens["helpScreen"]();
                }
                var inputString = arg.replace(/-/g, "");
                if (this.params.get(inputString)) {
                    var param = this.params.get(inputString);
                    if (!param)
                        return;
                    var value = "";
                    if (param.type == "boolean") {
                        if (args[argc + 1]) {
                            var ahead = args[argc + 1];
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
                                this.promgramInitErrorScreen(param.name + " was supplied with the wrong value type. Either leave blank or use true or false. ");
                            }
                        }
                        else {
                            value = true;
                        }
                    }
                    if (param.type == "string") {
                        if (args[argc + 1]) {
                            var ahead = args[argc + 1];
                            if (!this.validators["string"](ahead)) {
                                this.promgramInitErrorScreen(param.name + " was supplied with the wrong value type. Please enter a valid string with no numbers.");
                            }
                            else {
                                value = ahead;
                            }
                        }
                        else if (param.valueNeeded || param.required) {
                            this.promgramInitErrorScreen(param.name + " was not supplied with a value.");
                        }
                        else {
                            value = "";
                        }
                    }
                    if (param.type == "stringall") {
                        if (args[argc + 1]) {
                            var ahead = args[argc + 1];
                            if (!this.validators["stringall"](ahead)) {
                                this.promgramInitErrorScreen(param.name + " was supplied with the wrong value type. Please enter a valid string.");
                            }
                            else {
                                value = ahead;
                            }
                        }
                        else if (param.valueNeeded || param.required) {
                            this.promgramInitErrorScreen(param.name + " was not supplied with a value.");
                        }
                        else {
                            value = "";
                        }
                    }
                    if (param.type == "number") {
                        if (args[argc + 1]) {
                            var ahead = args[argc + 1];
                            if (!this.validators["number"](ahead)) {
                                this.promgramInitErrorScreen(param.name + " was supplied with the wrong value type. Please enter a valid number.");
                            }
                            else {
                                value = ahead;
                            }
                        }
                        else if (param.valueNeeded || param.required) {
                            this.promgramInitErrorScreen(param.name + " was not supplied with a value.");
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
        for (var _a = 0, _b = this.requiredParams.keys(); _a < _b.length; _a++) {
            var pk = _b[_a];
            if (!this.requiredParams.get(pk)) {
                var param = this.params.get(pk);
                if (!param)
                    return;
                this.promgramInitErrorScreen(param.name + " is required was not supplied with a value.");
            }
        }
        return this;
    };
    DSLogger.prototype.defineHelpText = function (text) {
        this.strings["helpText"] = text;
        return this;
    };
    DSLogger.prototype.addParam = function (param) {
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
    };
    DSLogger.prototype.restartPrompt = function () {
        this.questions = {};
        this.inputs = new Map();
        return this;
    };
    DSLogger.prototype.startPrompt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, q;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.rli = rdl.createInterface({
                            input: process.stdin,
                            output: process.stdout
                        });
                        _i = 0, _a = Object.keys(this.questions);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        q = _a[_i];
                        return [4 /*yield*/, this._prompt(q, this.questions[q].varName, this.questions[q].varType, this.questions[q].customName)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.rli.close();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    DSLogger.prototype._prompt = function (question, varName, varType, custonName) {
        var _this = this;
        var passed = true;
        var gotinput = false;
        var asked = false;
        var prom = new Promise(function (resolve) {
            if (varType == "password") {
                var stdin_1 = process.openStdin();
                var listener_1 = function (char) {
                    char = char + "";
                    switch (char) {
                        case "\n":
                        case "\r":
                        case "\u0004":
                            stdin_1.removeListener("data", listener_1);
                        default:
                            process.stdout.clearLine(1);
                            _this.rdl.cursorTo(process.stdout, 0);
                            process.stdout.write(question + Array(_this.rli.line.length + 1).join("*"));
                            break;
                    }
                };
                process.stdin.on("data", listener_1);
            }
            else {
                process.stdin.on("data", function (char) { });
            }
            var inte;
            var go = function () {
                if (passed && gotinput) {
                    resolve(true);
                    clearInterval(inte);
                }
                else if (asked) { }
                else {
                    asked = true;
                    _this.rli.question(question, function (input) {
                        _this.currentRow += _this._countLines(question);
                        _this.rdl.cursorTo(process.stdout, 0, _this.currentRow);
                        (function () { return __awaiter(_this, void 0, void 0, function () {
                            var valid;
                            return __generator(this, function (_a) {
                                asked = true;
                                gotinput = true;
                                valid = false;
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
                                    question = "Please re-enter:";
                                }
                                else {
                                    passed = true;
                                }
                                if (passed) {
                                    this.inputs.set(varName, input);
                                    resolve(passed);
                                }
                                return [2 /*return*/];
                            });
                        }); })();
                    });
                }
            };
            go();
            inte = setInterval(function () {
                go();
            }, 100);
        });
        return prom;
    };
    DSLogger.prototype.ask = function (question, varName, varType, customName) {
        this.askedQuestions++;
        this.inputs.set(varName, undefined);
        question =
            this.styleize(question, this.questionStyles["question"]) + " " +
                this.styleize(this.getString("questionDelimiter"), this.questionStyles["delimiter"]) +
                " ";
        this.questions[question] = {
            varName: varName,
            varType: varType
        };
        if (customName) {
            this.questions[question].customName = customName;
        }
        return this;
    };
    DSLogger.prototype.getInput = function (varName) {
        return this.inputs.get(varName);
    };
    DSLogger.prototype.clearRows = function (rowStart, rowEnd) {
        while (rowStart < rowEnd) {
            var i = 50;
            while (i--) {
                this.rdl.cursorTo(process.stdout, i, rowStart);
                process.stdout.write(" ");
            }
            rowStart++;
        }
        return this;
    };
    DSLogger.prototype.getRow = function () {
        return this.currentRow;
    };
    DSLogger.prototype.setRow = function (num) {
        this.currentRow = num;
        this.rdl.cursorTo(process.stdout, 0, this.currentRow);
        return this;
    };
    DSLogger.prototype.addRow = function () {
        this.currentRow++;
        return this;
    };
    DSLogger.prototype.newServiceBar = function (name) {
        var bar = new this.ServiceBar(this.rdl, this.currentRow, 31, 0, 80);
        this.currentRow++;
        this.serviceBars[name] = bar;
        return this;
    };
    DSLogger.prototype.reInitServiceBar = function (name) {
        this.serviceBars[name].reInit();
        return this;
    };
    DSLogger.prototype.destroyServiceBar = function (name) {
        var bar = this.serviceBars[name];
        var row = bar.rows;
        bar.clear();
        this.clearRows(row, row);
        this.serviceBars[name] = null;
        delete this.serviceBars[name];
        return this;
    };
    DSLogger.prototype.newProgressBar = function (name) {
        var bar = new this.ProgressBar(this.rdl, this.currentRow, 30);
        this.currentRow++;
        bar.start();
        this.progressBars[name] = bar;
        return this;
    };
    DSLogger.prototype.incrementProgressBar = function (name, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.progressBars[name].addProgressPerfect(amount)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    DSLogger.prototype.sleep = function (ms) {
        var waitTill = new Date(new Date().getTime() + ms);
        while (waitTill > new Date()) { }
        return this;
    };
    DSLogger.prototype.asyncSleep = function (ms) {
        var self = this;
        return new Promise(function (resolve) {
            return setTimeout(function () {
                resolve(self);
            }, ms);
        });
    };
    DSLogger.prototype.newScreen = function () {
        console.clear();
        this.currentRow = 0;
        return this;
    };
    DSLogger.prototype.showAt = function (message, type, row) {
        var output = message;
        if (type != "Raw" && type != "Data") {
            output = this._addColor(type, message);
        }
        if (type == "Data") {
            output = JSON.stringify(message, null, 3);
        }
        var lines = this._countLines("" + output);
        this.rdl.cursorTo(process.stdout, 0, row);
        this.currentRow += lines;
        console.log(output);
        return this;
    };
    DSLogger.prototype.show = function (message, type) {
        var output = message;
        if (type != "Raw" && type != "Data") {
            output = this._addColor(type, message);
        }
        if (type == "Data") {
            output = JSON.stringify(message, null, 3);
        }
        var lines = this._countLines("" + output);
        this.rdl.cursorTo(process.stdout, 0, this.currentRow);
        this.currentRow += lines;
        console.log(output);
        return this;
    };
    DSLogger.prototype.showSleep = function (message, type, ms) {
        if (ms === void 0) { ms = 800; }
        this.show(message, type);
        this.sleep(ms);
        return this;
    };
    DSLogger.prototype._addColor = function (type, message) {
        return this.styleize(message, this.messageStyles[type]);
    };
    DSLogger.prototype._countLines = function (message) {
        return message.split(/\r\n|\r|\n/).length;
    };
    DSLogger.prototype.logSeperator = function () {
        this.show(this.getString("seperator"), "Info");
        return this;
    };
    DSLogger.prototype.logProgramTitle = function () {
        this.show(this.getString("title"), "Title");
        return this;
    };
    DSLogger.prototype.defineValidator = function (type, func, name) {
        if (type === "custom") {
            if (!name)
                return;
            this.customValidators[name] = func;
        }
        else {
            this.validators[type] = func;
        }
    };
    DSLogger.prototype.defineQuestionStyle = function (type, styleObj) {
        this.questionStyles[type] = styleObj;
        return this;
    };
    DSLogger.prototype.defineMessageStyle = function (type, styleObj) {
        this.messageStyles[type] = styleObj;
        return this;
    };
    DSLogger.prototype.defineProgramTitle = function (title, styleObj) {
        this.strings["title"] = title;
        if (styleObj) {
            this.messageStyles["Title"] = styleObj;
        }
        return this;
    };
    DSLogger.prototype.defineScreen = function (screen, func) {
        this.screens[screen] = func;
        return this;
    };
    DSLogger.prototype.displayScreen = function (screen, args) {
        if (args === void 0) { args = {}; }
        this.screens[screen](args);
    };
    DSLogger.prototype.defineSplashScreen = function (func) {
        this.splash = func;
        return this;
    };
    DSLogger.prototype.splashScreen = function () {
        this.splash();
        return this;
    };
    DSLogger.prototype.getString = function (id) {
        return this.strings[id];
    };
    DSLogger.prototype.setString = function (id, string) {
        this.strings[id] = string;
        return this;
    };
    //Quick Styles
    //FG 
    DSLogger.prototype.red = function (text) {
        return this.styleize(text, {
            fg: "Red"
        });
    };
    DSLogger.prototype.green = function (text) {
        return this.styleize(text, {
            fg: "Green"
        });
    };
    DSLogger.prototype.blue = function (text) {
        return this.styleize(text, {
            fg: "Green"
        });
    };
    DSLogger.prototype.white = function (text) {
        return this.styleize(text, {
            fg: "White"
        });
    };
    DSLogger.prototype.black = function (text) {
        return this.styleize(text, {
            fg: "Black"
        });
    };
    DSLogger.prototype.cyan = function (text) {
        return this.styleize(text, {
            fg: "Cyan"
        });
    };
    DSLogger.prototype.magenta = function (text) {
        return this.styleize(text, {
            fg: "Magenta"
        });
    };
    DSLogger.prototype.yellow = function (text) {
        return this.styleize(text, {
            fg: "Yellow"
        });
    };
    //Bright
    DSLogger.prototype.brightRed = function (text) {
        return this.styleize(text, {
            fg: "Red",
            bright: true
        });
    };
    DSLogger.prototype.brightGreen = function (text) {
        return this.styleize(text, {
            fg: "Green",
            bright: true
        });
    };
    DSLogger.prototype.brightBlue = function (text) {
        return this.styleize(text, {
            fg: "Green",
            bright: true
        });
    };
    DSLogger.prototype.brightWhite = function (text) {
        return this.styleize(text, {
            fg: "White",
            bright: true
        });
    };
    DSLogger.prototype.brightBlack = function (text) {
        return this.styleize(text, {
            fg: "Black",
            bright: true
        });
    };
    DSLogger.prototype.brightCyan = function (text) {
        return this.styleize(text, {
            fg: "Cyan",
            bright: true
        });
    };
    DSLogger.prototype.brightMagenta = function (text) {
        return this.styleize(text, {
            fg: "Magenta",
            bright: true
        });
    };
    DSLogger.prototype.brightYellow = function (text) {
        return this.styleize(text, {
            fg: "Yellow",
            bright: true
        });
    };
    //BG
    DSLogger.prototype.redBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Red",
            fg: fg
        });
    };
    DSLogger.prototype.greenBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Green",
            fg: fg
        });
    };
    DSLogger.prototype.blueBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Green",
            fg: fg
        });
    };
    DSLogger.prototype.whiteBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "White",
            fg: fg
        });
    };
    DSLogger.prototype.blackBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Black",
            fg: fg
        });
    };
    DSLogger.prototype.cyanBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Cyan",
            fg: fg
        });
    };
    DSLogger.prototype.magentaBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Magenta",
            fg: fg
        });
    };
    DSLogger.prototype.yellowBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Yellow",
            fg: fg
        });
    };
    //Bright
    DSLogger.prototype.brightRedBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Red",
            fg: fg
        });
    };
    DSLogger.prototype.brightGreenBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Green",
            fg: fg
        });
    };
    DSLogger.prototype.brightBlueBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Green",
            fg: fg
        });
    };
    DSLogger.prototype.brightWhiteBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "White",
            fg: fg
        });
    };
    DSLogger.prototype.brightBlackBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Black",
            fg: fg
        });
    };
    DSLogger.prototype.brightCyanBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Cyan",
            fg: fg
        });
    };
    DSLogger.prototype.brightMagentaBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Magenta",
            fg: fg
        });
    };
    DSLogger.prototype.brightYellowBG = function (text, fg) {
        if (fg === void 0) { fg = "none"; }
        return this.styleize(text, {
            bg: "Yellow",
            fg: fg
        });
    };
    return DSLogger;
}());
var LoadingBar = /** @class */ (function () {
    function LoadingBar(rdl, row, size) {
        this.rdl = rdl;
        this.row = row;
        this.size = size;
        this.done = false;
        this.cursor = 0;
        this.timer = null;
    }
    LoadingBar.prototype.start = function () {
        //    process.stdout.write("\x1B[?25l")
        for (var i = 0; i < this.size; i++) {
            process.stdout.write("-");
            //process.stdout.write("=");
        }
        this.rdl.cursorTo(process.stdout, 0, this.row);
    };
    LoadingBar.prototype.autoFill = function () {
        var _this = this;
        this.rdl.cursorTo(process.stdout, 0, this.row);
        var prom = new Promise(function (resolve) {
            _this.start();
            _this.rdl.cursorTo(process.stdout, 0, _this.row);
            _this.timer = setInterval(function () {
                _this.addProgress(1);
                if (_this.cursor >= _this.size) {
                    clearInterval(_this.timer);
                    resolve(true);
                    //  rdl.cursorTo(process.stdout, this.cursor, done);
                }
            }, 1200);
        });
        return prom;
    };
    /**Add Progress Percent
     * ---
     * Adds progress to the bar relative to the size.
     * @param percent Supply an int between 1 - 100
     */
    LoadingBar.prototype.addProgressPerfect = function (percent) {
        var num = this.size * (percent / 100);
        return this.addProgress(num);
    };
    LoadingBar.prototype.addProgress = function (amount) {
        var _this = this;
        this.rdl.cursorTo(process.stdout, this.cursor, this.row);
        var doneLocal = false;
        var prom = new Promise(function (resolve) {
            var num = _this.cursor + amount;
            var timer = setInterval(function () {
                if (_this.done || doneLocal) {
                    clearInterval(timer);
                    resolve(true);
                    return;
                }
                _this.cursor++;
                if (_this.cursor >= _this.size) {
                    _this.done = true;
                    process.stdout.write("=");
                    console.log("\r");
                }
                else if (_this.cursor >= num) {
                    process.stdout.write("=");
                    doneLocal = true;
                }
                else {
                    process.stdout.write("=");
                }
            }, 20);
        });
        return prom;
    };
    LoadingBar.prototype.finish = function () {
        var left = this.size - this.cursor;
        this.addProgress(left);
    };
    return LoadingBar;
}());
var ServiceBar = /** @class */ (function () {
    function ServiceBar(rdl, rows, size, start, interval) {
        if (rows === void 0) { rows = 0; }
        if (size === void 0) { size = 32; }
        if (start === void 0) { start = 2; }
        if (interval === void 0) { interval = 150; }
        this.rdl = rdl;
        this.rows = rows;
        this.size = size;
        this.start = start;
        this.interval = interval;
        this.cursor = 0;
        this._init();
    }
    ServiceBar.prototype.clear = function () {
        clearInterval(this.inte);
    };
    ServiceBar.prototype.reInit = function () {
        clearInterval(this.inte);
        this._init();
    };
    ServiceBar.prototype._init = function () {
        var _this = this;
        this.rdl.cursorTo(process.stdout, this.start, this.rows);
        for (var i = this.start; i < this.size; i++) {
            this._X();
        }
        this.cursor = this.start;
        this.inte = setInterval(function () {
            _this.rdl.cursorTo(process.stdout, _this.cursor, _this.rows);
            _this.cursor++;
            if (_this.cursor % 2) {
                _this._Bar();
            }
            else {
                _this._O();
            }
            if (_this.cursor == _this.size) {
                _this.cursor = _this.start;
                _this._Cap();
                _this.rdl.cursorTo(process.stdout, _this.start, _this.rows);
                for (var i = _this.start; i < _this.size; i++) {
                    _this._X();
                }
            }
        }, this.interval);
    };
    ServiceBar.prototype._O = function () {
        var char = "0";
        process.stdout.write("\u001B[37m\u001B[45m" + char + "\u001B[0m");
    };
    ServiceBar.prototype._X = function () {
        process.stdout.write("\x1b[37m\x1b[44mX\x1b[0m");
    };
    ServiceBar.prototype._Cap = function () {
        process.stdout.write("\x1b[37m\x1b[43m}\x1b[0m");
    };
    ServiceBar.prototype._Bar = function () {
        process.stdout.write("\x1b[37m\x1b[44m|\x1b[0m");
    };
    return ServiceBar;
}());
var rdl = require("readline");
var DS = new DSLogger(rdl);
module.exports = DS;
