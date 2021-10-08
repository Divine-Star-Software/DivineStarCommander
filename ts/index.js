"use strict";
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
exports.__esModule = true;
exports.DSLogger = void 0;
/**
  # DSLogger
  ---
  Helper class for the programs output.
  
  @author Luke Johnson
  @since 9-19-2021
  @version 0.0.1
  */
var DSLogger = /** @class */ (function () {
    function DSLogger(rdl) {
        this.rdl = rdl;
        //strings
        this.strings = {
            title: "[ Divine Star Logger ]",
            star: "            \u001B[1m\u001B[35m.\u001B[0m\n           \u001B[1m\u001B[35m,\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m,\u001B[0m\n          \u001B[1m\u001B[35m,\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m,\u001B[0m\n    \u001B[1m\u001B[35m'\u001B[0m\u001B[1m\u001B[35mx\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mo\u001B[0m\u001B[1m\u001B[35mx\u001B[0m\u001B[1m\u001B[35m'\u001B[0m\n      \u001B[1m\u001B[35m`\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m`\u001B[0m\n        \u001B[1m\u001B[35m`\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m`\u001B[0m\n        \u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m'\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\n       \u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m'\u001B[0m   \u001B[1m\u001B[35m'\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35mO\u001B[0m\u001B[1m\u001B[35mX\u001B[0m\n      \u001B[1m\u001B[35mX\u001B[0m\u001B[1m\u001B[35m'\u001B[0m         \u001B[1m\u001B[35m'\u001B[0m\u001B[1m\u001B[35mX\u001B[0m",
            seperator: "-----------------------------",
            blinkStyle: "\x1b[5m",
            titleStyle: "\x1b[37m\x1b[1m\x1b[45m",
            errorStyle: "\x1b[1m\x1b[41m\x1b[37m",
            warningStyle: "\x1b[1m\x1b[37m\x1b[43m",
            infoStyle: "\x1b[1m\x1b[37m\x1b[46m",
            goodStyle: "\x1b[1m\x1b[37m\x1b[42m"
        };
        this.splash = function () { };
        this.ProgressBar = LoadingBar;
        this.ServiceBar = ServiceBar;
        this.currentRow = 0;
        this.progressBars = {};
        this.serviceBars = {};
    }
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
        this.rdl.cursorTo(process.stdout, 0, row);
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
        var lines = this._countLines(output);
        this.rdl.cursorTo(process.stdout, 0, this.currentRow);
        this.currentRow += lines;
        console.log(output);
        return this;
    };
    DSLogger.prototype.showSleep = function (message, type, sleep) {
        if (sleep === void 0) { sleep = 800; }
        this.show(message, type);
        this.sleep(sleep);
        return this;
    };
    DSLogger.prototype._addColor = function (type, message) {
        var returnString = "";
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
    };
    DSLogger.prototype._countLines = function (message) {
        return message.split(/\r\n|\r|\n/).length;
    };
    DSLogger.prototype.logSeperator = function () {
        this.show("{-----------------------------}", "Info");
        return this;
    };
    DSLogger.prototype.logProgramTitle = function () {
        this.show(this.getString("title"), "Title");
        return this;
    };
    DSLogger.prototype.defineMessageStyle = function (type, styleString) {
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
    };
    DSLogger.prototype.defineProgramTitle = function (title) {
        this.strings['title'] = title;
        return this;
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
    return DSLogger;
}());
exports.DSLogger = DSLogger;
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
