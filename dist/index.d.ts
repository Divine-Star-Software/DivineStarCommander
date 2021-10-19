declare type BlockChars = {
    "upper-1/2-block": string;
    "lower-1/8-block": string;
    "lower-1/4-block": string;
    "lower-1/3-block": string;
    "lower-1/2-block": string;
    "lower-5/8-block": string;
    "lower-3/4-block": string;
    "lower-7/8-block": string;
    "full-block": string;
    "left-7/8-block": string;
    "left-3/4-block": string;
    "left-5/8-block": string;
    "left-1/2-block": string;
    "left-3/8-block": string;
    "left-1/4-block": string;
    "left-1/8-block": string;
    "right-1/2-block": string;
    "light-shade": string;
    "medium-shade": string;
    "dark-shade": string;
    "upper-1/8-block": string;
    "right-1/8-block": string;
    "quad-lower-left": string;
    "quad-lower-right": string;
    "quad-upper-left": string;
    "quad-upper-left-lower-left-lower-right": string;
    "quad-upper-left-lower-right": string;
    "quad-upper-left-upper-right-lower-left": string;
    "quad-upper-left-upper-right-lower-right": string;
    "quad-upper-right": string;
    "quad-upper-right-lower-left": string;
    "quad-upper-right-lower-right": string;
};
declare type UserInputWatchObject = {
    run: (args: any) => {};
    args: any;
};
declare type UserInputKeys = "up" | "down" | "left" | "right" | "ctrl+c" | "ctrl+a" | "ctrl+b" | "ctrl+d" | "ctrl+e" | "ctrl+f" | "ctrl+g" | "ctrl+h" | "ctrl+i" | "ctrl+j" | "ctrl+k" | "ctrl+l" | "ctrl+m" | "ctrl+n" | "ctrl+o" | "ctrl+p" | "ctrl+q" | "ctrl+r" | "ctrl+s" | "ctrl+t" | "ctrl+u" | "ctrl+v" | "ctrl+w" | "ctrl+x" | "ctrl+y" | "ctrl+z" | "esc" | "del" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "f10" | "f12" | "insert" | "end" | "home" | "page-up" | "page-down" | "enter";
declare type ConsoleCodes = "Reset" | "Bright" | "Dim" | "Underscore" | "Blink" | "Reverse" | "Hidden";
declare type ConsoleColors = "Black" | "Red" | "Green" | "Yellow" | "Blue" | "Magenta" | "Cyan" | "White";
declare type StyleObject = {
    fg?: ConsoleColors | "none";
    bg?: ConsoleColors | "none";
    reverse?: boolean;
    bright?: boolean;
    dim?: boolean;
    underscore?: boolean;
    blink?: boolean;
    hidden?: boolean;
};
declare type DisplayScreens = "splash" | "programInitError" | "helpScreen" | "crash" | "error" | "done" | "noInput";
declare type MessageTypes = "Blink" | "Error" | "Title" | "Info" | "Good" | "Warning" | "Raw" | "Data";
declare type QuestionDisplayTypes = "question-start" | "question" | "delimiter" | "re-ask-start" | "re-ask" | "re-ask-delimiter";
declare type QuestionsTypes = "string" | "string[]" | "stringall" | "stringall[]" | "boolean" | "boolean[]" | "number" | "number[]" | "digit" | "email" | "password" | "custom";
declare type ParamTypes = "boolean" | "string" | "number" | "stringall" | "string[]" | "stringall[]" | "number[]" | "boolean[]";
declare type ProgramParams = {
    flag: string;
    name: string;
    desc: string;
    type: ParamTypes;
    required?: boolean;
    valueNeeded?: boolean;
};
declare type ProgramParamsDataTypes = number | boolean | string | string[] | number[] | undefined;
declare type Strings = "title" | "helpText" | "star" | "separator" | "questionStart" | "questionDelimiter" | "reAskStart" | "reAskText" | "reAskDelimiter";
declare type StoredQuestions = {
    varName: string;
    varType: QuestionsTypes;
    reAsk?: boolean;
    failPrompt?: string;
    attempts?: number | "all";
    fails?: number;
    customName?: string;
};
declare type ProgressBarStyle = {
    base: string;
    baseStyle: StyleObject;
    loaded: string;
    loadedStyle: StyleObject;
    size: number;
    interval: number;
};
declare type ServiceBarStyle = {
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
declare type BoxStyleNames = "light" | "heavy" | "doubleLines" | "fullBlock" | "halfBlock" | "lightShade" | "mediumShade" | "darkShade" | "curved" | "dashedLightDouble" | "dashedLightTriple" | "dashedLightQuad" | "dashedHeavyDouble" | "dashedHeavyTriple" | "dashedHeavyQuad";
declare type Directives = {
    debug: boolean;
    group: boolean;
    trace: boolean;
    box: {
        active: boolean;
        style: BoxStyleNames;
    };
};
declare type BoxData = {
    messageQue: string[];
    largestWidth: number;
    lengthMap: Record<string, number>;
    sleepMap: Record<string, number>;
    boxCreationObj: CreateBoxObject;
};
declare type BoxStyle = {
    bottomLine: string;
    bottomLineStyleObj: StyleObject;
    topLine: string;
    topLineStyleObj: StyleObject;
    westLine: string;
    westLineStyleObj: StyleObject;
    eastLine: string;
    eastLineStyleObj: StyleObject;
    southEastCorner: string;
    southEastStyleObj: StyleObject;
    southWestCorner: string;
    southWestStyleObj: StyleObject;
    northEastCorner: string;
    northEastStyleObj: StyleObject;
    northWestCorner: string;
    northWestStyleObj: StyleObject;
    cross: string;
    crossStyleObj: StyleObject;
};
declare type BoxStyles = Record<BoxStyleNames, BoxStyle>;
declare type CreateBoxObject = {
    boxStyle?: BoxStyleNames;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    customBoxStyle?: BoxStyle;
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
declare class DSCommander {
    rdl: any;
    _showEnabled: boolean;
    _debugMode: boolean;
    _numOfGroups: number;
    _directives: Directives;
    _defaultStyleDelimiter: StyleObject;
    _styleDelimiter: StyleObject;
    _defaultSleepTime: number;
    _services: Record<string, any>;
    _strings: Record<Strings, string>;
    _defaultPrgoressBarStyle: ProgressBarStyle;
    _defaultServiceBarStyle: ServiceBarStyle;
    _consoleCodes: Record<ConsoleCodes, string>;
    _consoleFGColors: Record<ConsoleColors, string>;
    _consoleBGColors: Record<ConsoleColors, string>;
    _questionStyles: Record<QuestionDisplayTypes, StyleObject>;
    _messageStyles: Record<MessageTypes, StyleObject>;
    _initalProgramArgs: string[];
    _params: Map<string, ProgramParams>;
    _paramValues: Map<string, ProgramParamsDataTypes>;
    _requiredParams: Map<string, boolean>;
    _inputs: Map<string, string | number | string[] | boolean | boolean[] | number[] | undefined>;
    _lastQuestion: string;
    _askedQuestions: number;
    _questions: Record<string, StoredQuestions>;
    _questionsFails: Record<string, {
        args: any;
        func: Function;
    }>;
    _currentRow: number;
    _currentCol: number;
    rli: any;
    _progressBars: Record<string, any>;
    _serviceBars: Record<string, any>;
    arrayInputDelimiters: string[];
    booleanTrueStrings: string[];
    booleanFalseStrings: string[];
    _validators: Record<QuestionsTypes, (input: string | string[], type?: string) => Promise<boolean>>;
    _validInputTypes: string[];
    _customValidators: Record<string, (input: any) => Promise<boolean>>;
    _screens: Record<DisplayScreens, Function>;
    _blockChars: BlockChars;
    _boxChars: {
        boxElemnts: {
            arcs: {
                downRight: string;
                downLeft: string;
                upLeft: string;
                upRight: string;
            };
            doubleLines: {
                corners: {
                    downRight: {
                        rightDouble: string;
                        downDouble: string;
                        double: string;
                    };
                    downLeft: {
                        leftDouble: string;
                        downDouble: string;
                        double: string;
                    };
                    upRight: {
                        rightDouble: string;
                        upDouble: string;
                        double: string;
                    };
                    upLeft: {
                        leftDouble: string;
                        downDouble: string;
                        double: string;
                    };
                };
                verticalRight: {
                    rightDouble: string;
                    verticalDouble: string;
                    double: string;
                };
                verticalLeft: {
                    leftDouble: string;
                    verticalDouble: string;
                    double: string;
                };
                horizontalDown: {
                    horizontalDouble: string;
                    downDouble: string;
                    double: string;
                };
                horizontalUp: {
                    horizontalDouble: string;
                    upDouble: string;
                    double: string;
                };
                cross: {
                    horizontalDouble: string;
                    verticalDouble: string;
                    double: string;
                };
            };
            solid: {
                verticalRight: {
                    light: string;
                    rightHeavy: string;
                    upHeavy: string;
                    downHeavy: string;
                    verticalHeavy: string;
                    rightUpHeavy: string;
                    rightDownHeavy: string;
                    heavy: string;
                };
                verticalLeft: {
                    light: string;
                    leftHeavy: string;
                    upHeavy: string;
                    downHeavy: string;
                    verticalHeavy: string;
                    leftUpHeavy: string;
                    leftDownHeavy: string;
                    heavy: string;
                };
                horizontalDown: {
                    light: string;
                    leftHeavy: string;
                    rightHeavy: string;
                    verticalHeavy: string;
                    downHeavy: string;
                    leftDownHeavy: string;
                    rightDownHeavy: string;
                    heavy: string;
                };
                horizontalUp: {
                    light: string;
                    leftHeavy: string;
                    rightHeavy: string;
                    verticalHeavy: string;
                    downHeavy: string;
                    leftDownHeavy: string;
                    rightDownHeavy: string;
                    heavy: string;
                };
                cross: {
                    light: string;
                    leftHeavy: string;
                    rightHeavy: string;
                    horitzontalHeavy: string;
                    upHeavy: string;
                    downHeavy: string;
                    verticalHeavy: string;
                    leftUpHeavy: string;
                    rightUpHeavy: string;
                    leftDownHeavy: string;
                    rightDownHeavy: string;
                    horizontalUpHeavy: string;
                    horizontalDownHeavy: string;
                    verticalLeftHeavy: string;
                    verticalRightHeavy: string;
                    heavy: string;
                };
                corners: {
                    downRight: {
                        light: string;
                        downLight: string;
                        downHeavy: string;
                        heavy: string;
                    };
                    downLeft: {
                        light: string;
                        downLight: string;
                        downHeavy: string;
                        heavy: string;
                    };
                    upRight: {
                        light: string;
                        upLight: string;
                        upHeavy: string;
                        heavy: string;
                    };
                    upLeft: {
                        light: string;
                        upLight: string;
                        upHeavy: string;
                        heavy: string;
                    };
                };
            };
        };
        lines: {
            solid: {
                horizontal: {
                    light: string;
                    heavy: string;
                };
                vertical: {
                    light: string;
                    heavy: string;
                };
            };
            dashedDouble: {
                horizontal: {
                    light: string;
                    heavy: string;
                };
                vertical: {
                    light: string;
                    heavy: string;
                };
            };
            dashedTriple: {
                horizontal: {
                    light: string;
                    heavy: string;
                };
                vertical: {
                    light: string;
                    heavy: string;
                };
            };
            dashedQuadruple: {
                horizontal: {
                    light: string;
                    heavy: string;
                };
                vertical: {
                    light: string;
                    heavy: string;
                };
            };
            doubleLines: {
                horizontal: string;
                vertical: string;
            };
            halfLines: {
                lightLeft: string;
                lightUp: string;
                lightRight: string;
                lightDown: string;
                heavyLeft: string;
                heavyUp: string;
                heavyRight: string;
                heavyDown: string;
            };
            mixedLines: {
                heavyRight: string;
                heavyDown: string;
                heavyLeft: string;
                heavyUp: string;
            };
        };
    };
    _boxStyles: BoxStyles;
    _defaultBoxStyle: CreateBoxObject;
    _boxData: BoxData;
    _keyMap: Record<UserInputKeys, string>;
    _stdinKeyWatch: Record<string, UserInputWatchObject[]>;
    _stdinCharWatch: Record<string, UserInputWatchObject[]>;
    _stdinInputWatcher: (char: string) => void;
    _stdin: any;
    constructor(rdl: any);
    /**# Start User Input Captcher
     * ---
     * Start capturing the users input for processing.
     * @returns this
     */
    startUserInputCaptcher(): this;
    /**# Stop User Input Captcher
     * ---
     * Stops the cature of the input from the user.
     * @returns this
     */
    stopUserInputCaptcher(): this;
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
    onUserInputChar(char: string, watcher: UserInputWatchObject): this;
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
    onUserInputKey(key: UserInputKeys, watcher: UserInputWatchObject): this;
    /** # Stylize
     * ---
     * Stylize the text with the given format.
     * @param text : string
     * @param styleObj : StyleObject
     * @returns string
     */
    stylize(text: string, styleObj: StyleObject): string;
    /** # Get Raw Params
     * ---
     * Get the raw params submited to the program.
     * @returns string[]
     */
    getRawParams(): string[];
    /**# Get Param
     * ---
     * Adds a command line arg to the program.
     * @param name Either the flag or the name of the param.
     */
    getParam(name: string): ProgramParamsDataTypes;
    /**# Add Param
     * ---
     * Adds a command line arg to the program.
     * @param param An object to specify the param.
     * @returns this
     */
    addParam(param: ProgramParams): this;
    /** # If Param Isset
     * ---
     * If the param is set run a function.
     * @param param Either the name or the flag of the param.
     * @param func The function to be run. Will be passed the value of the param and the args given.
     * @param args Args to be passed to the function.
     * @returns this
     */
    ifParamIsset(param: string, func: (value: ProgramParamsDataTypes, args: any) => any, args?: any): this;
    /**# Get Inital Program Args
     * ---
     * Get arugments that suplied to the program between the program name and the start of the flags.
     *
     * For instance if you run:
     *
     * node index.js -a
     *
     * It will return ["index.js"]
     * @returns string[]
     */
    getInitalProgramArgs(): string[];
    /**# Init Program Input
     * ---
     * Parses the arguments sent to the program and stores the values.
     *
     * __Must run before you can access the values.__
     * @returns Promise\<this\>
     */
    initProgramInput(): Promise<this>;
    _validateAllRequiredProgramParamsAreSet(): void;
    _isProgramArg(arg: string): boolean;
    _createStringFromParamArray(args: string[], argc: number): string;
    _getArrayValues(args: string[], argc: number): {
        newArgCount: number;
        value: string[];
    };
    _getStringAllArrayParamValue(param: ProgramParams, args: string[], argc: number): Promise<{
        newArgCount: number;
        value: string[];
    }>;
    _getStringArrayParamValue(param: ProgramParams, args: string[], argc: number): Promise<{
        newArgCount: number;
        value: string[];
    }>;
    _getNumberArrayParamValue(param: ProgramParams, args: string[], argc: number): Promise<{
        newArgCount: number;
        value: number[];
    }>;
    _getBooleanArrayParamValue(param: ProgramParams, args: string[], argc: number): Promise<{
        newArgCount: number;
        value: boolean[];
    }>;
    _getNumberParamValue(param: ProgramParams, args: string[], argc: number): Promise<number>;
    _getStringParamValue(param: ProgramParams, args: string[], argc: number): Promise<string>;
    _getStringAllParamValue(param: ProgramParams, args: string[], argc: number): Promise<string>;
    _getBooleanParamValue(param: ProgramParams, args: string[], argc: number): Promise<boolean>;
    /**# Restart Prompt
     * ---
     * Restarat user input prompt.
     * @returns this
     */
    restartPrompt(): this;
    /**# Start Prompt
     * ---
     * Starts user input prompt.
     * @returns this
     */
    startPrompt(): Promise<this>;
    _convertInput(varType: QuestionsTypes, input: string): Promise<string | string[]>;
    _prompt(question: string, varName: string, varType: QuestionsTypes, custonName?: string): Promise<unknown>;
    /**# fail
     * --
     * Adds a fail case to the last asked question.
     * @param reAsk
     * @param reAskMessage
     * @param onFail
     * @param args
     * @returns this
     */
    fail(reAsk: boolean, reAskMessage: string, attempts?: number | "all", onFail?: Function, arg?: any): this;
    /**# Ask
     * ---
     * Define a question to be asked by the pormpt
     * @param question
     * @param varName
     * @param varType
     * @param customType The name used for the custom question type.
     * @returns this
     */
    ask(question: string, varName: string, varType: QuestionsTypes, customName?: string): this;
    /**# Get Input
     * ---
     * Get input from question
     * @param varName
     * @returns input value or undefined
     */
    getInput(varName: string): string | number | any[] | undefined | boolean;
    /** # If Input Isset
     * ---
     * If the input is set run a function.
     * @param varName The name of the input.
     * @param func The function to be run. Will be passed the value of the input and the args given.
     * @param args Args to be passed to the function.
     * @returns this
     */
    ifInputIsset(varName: string, func: (value: string | number | any[] | undefined | boolean, args: any) => any, args?: any): this;
    /**# Clear Rows
     * ---
     * Clears console output for a given row range.
     * @param rowStart
     * @param rowEnd
     * @returns this
     */
    clearRows(rowStart: number, rowEnd: number): this;
    /**# Get Row
     * ---
     * Gets the current row number that the output is on.
     * @returns number
     */
    getRow(): number;
    /**# Set Row
     *---
     * Sets the console cursor to a row.
     * @param num
     * @returns this
     */
    setRow(num: number): this;
    /**# Add Row
     * ---
     * Add one row to the current console cursor.
     * @returns this
     */
    addRow(): this;
    /**# Minus
     * ---
     * Minus one row to the current console cursor.
     * @returns this
     */
    minusRow(): this;
    /**# Get Row
     * ---
     * Gets the current row number that the output is on.
     * @returns number
     */
    getCol(): number;
    /**# Set Col
     *---
     * Sets the console cursor to a collumn.
     * @param num
     * @returns this
     */
    setCol(num: number): this;
    /**# Add Col
     * ---
     * Add one to the current console cursor collumn.
     * @returns this
     */
    addCol(): this;
    /**# Minus Collumn
     * ---
     * Minus one to the current console cursor collumn.
     * @returns this
     */
    minusCol(): this;
    /**# New Service Bar
     * ---
     * Makes a continuous loading bar.
     * Show must be enabled in order for this to work.
     * @param name
     * @returns this
     */
    newServiceBar(name: string, serviceBarStyle?: ServiceBarStyle): this;
    /**# Re Init Service Bar
     * ---
     * Restart a service bar.
     * @param name
     * @returns this
     */
    reInitServiceBar(name: string): this;
    /**# Destroy Service Bar
     * ---
     * Destroy a service bar.
     * @param name
     * @returns this
     */
    destroyServiceBar(name: string): this;
    /**# New Progress Bar
     * ---
     * Makes a new progress loading bar.
     * @param name of bar to be used as an id
     * @returns this
     */
    newProgressBar(name: string, progressBarStyle?: ProgressBarStyle): this;
    /**# Increment Progress Bar
     * ---
     * Adds progress to the progress bar.
     * @param name name of bar to increase
     * @param amount amount to increase by
     * @returns this
     */
    incrementProgressBar(name: string, amount: number): Promise<this>;
    /**# Sleep
     * ---
     * Makes the program sleep via a loop.
     * @param ms miliseconds to sleep
     * @returns this
     */
    sleep(ms: number): this;
    /**# Async Sleep
     * ---
     * Makes the program sleep via a promsie.
     * @param ms miliseconds to sleep
     * @returns Promise\<self>
     */
    asyncSleep(ms: number): Promise<this>;
    /** # New Screen
     * ---
     * Clears the screen and resets the row.
     * @returns this
     */
    newScreen(): this;
    /**# Get Message Array
     * ---
     * Returns back an array of strings with the given value.
     * Used display multi messsages.
     * @param message
     */
    _getMessageArray(message: string | number | object | any[]): string[] | false;
    _processMessage(message: string, type?: MessageTypes | "none"): string;
    _checkDebug(): boolean;
    _chceckShow(): boolean;
    _checkBoxIn(message?: string, processMessage?: string): boolean;
    /**# Show At Sleep
     * ---
     * Shows a message at a specific row then sleeps. You can supply it arguments with the params object.
     * @param message
     * @param params
     * @property __type__ : MessageType or "none"
     * @property __row__ : The row to log message at.
     * @property __col__ : The collumn to log text at. Default is 0.
     * @property __sleep__ : The miliseconds to sleep.
     * @returns this
     */
    showAtSleep(message: string | number | object | any[], params?: {
        row?: number;
        col?: number;
        type?: MessageTypes | "none";
        sleep?: number;
    }): this;
    /**# Show At
     * ---
     * Shows a message at a specific row. You can supply it arguments with the params object.
     * @param message
     * @param params
     * @property __type__ : MessageType or "none"
     * @property __row__ : The row to log message at.
     * @property __col__ : The collumn to log text at. Default is 0.
     * @returns this
     */
    showAt(message: string | number | object | any[], params?: {
        row?: number;
        col?: number;
        type?: MessageTypes | "none";
    }): this;
    /**# Show
     * ---
     * Shows a message. If no message type is set it will use the pre-defined default style or the
     * one created from a style chain.
     * @param message
     * @param type
     * @returns this
     */
    show(message: string | number | object | any[], type?: MessageTypes | "none"): this;
    /**# Show Sleep
     * Shows a message and then sleeps
     *
     * @param message
     * @param type
     * @param ms
     * @returns this
     */
    showSleep(message: string | number | object | any[], type?: MessageTypes | "none", ms?: number): this;
    $enableShow(): this;
    get $ENABLESHOW(): this;
    /**# Log
     * ---
     * Log message without adjusting cursor position.
     * @param message
     * @param type
     * @returns this
     */
    log(message: string | number | object | any[], type?: MessageTypes | "none"): this;
    /** # Log Sleep
     * ---
     * Log message and sleep without adjusting cursor position.
     * @param message
     * @param type
     * @param ms
     * @returns this
     */
    logSleep(message: string | number | object | any[], type?: MessageTypes | "none", ms?: number): this;
    /** # Log Table
     * ---
     * Use console.table to show a table without adjusting cursor row position.
     * @param data
     * @param collumns
     * @returns this
     */
    logTable(data: object | object[], collumns?: string[]): this;
    /** # Log Table
     * ---
     * Use console.table to show a table at current row position.
     * @param data
     * @param collumns
     * @returns this
     */
    showTable(data: any, collumns?: string[]): this;
    /** Get Message Styled
     * ---
     * Return a string styled with one of the pre-defined message types.
     * @param type
     * @param message
     * @returns string
     */
    getMessageStyled(type: MessageTypes, message: any): string;
    /** # Count Lines
     * ---
     * Count the  numbers of new lines a string will add to the console.
     * @param message
     * @returns number
     */
    countLines(message: string): number;
    /** # Log Seperator
     * ---
     * Logs output seperator
     * @returns this
     */
    logSeparator(): this;
    /** # Log Program Title
     * ---
     * Logs program title
     * @returns this
     */
    logProgramTitle(): this;
    /** # Show Seperator
     * ---
     * Show output seperator at current row.
     * @returns this
     */
    showSeparator(): this;
    /** # Show Program Title
     * ---
     *  Show program serperator at current row.
     * @returns this
     */
    showProgramTitle(): this;
    /**# Define Sleep Time
     * ---
     * Defines the default sleep time.
     * @param sleep
     * @returns this
     */
    defineSleepTime(sleep: number): this;
    /** # Define Validator
     * ---
     * Define a validate function for a question type.
     * @param type
     * @param func
     * @param name If using a custom question type you must set this param.
     * @returns this
     */
    defineValidator(type: QuestionsTypes, func: (input: any) => Promise<boolean>, name?: string): this;
    /**# Define Question Style
     * ---
     * Use a style object to define a questions style.
     * @param type "question" | "re-ask" | "delimiter"
     * @param styleString
     * @returns this
     */
    defineQuestionStyle(type: QuestionDisplayTypes, styleObj: StyleObject): this;
    /**# Define Message Style
     * ---
     * Use a style object to define a messages style.
     * @param type
     * @param styleString
     * @returns this
     */
    defineMessageStyle(type: MessageTypes, styleObj: StyleObject): this;
    /**# Define Default Box Style
     * ---
     * Use a box creation object to define the default box sutle.
     * @param boxCreatoinObj CreateBoxObject
     * @returns this
     */
    defineDefaultBoxStyle(boxCreatoinObj: CreateBoxObject): this;
    /**# Define Progress Bar Style
     * ---
     * Define the default progress bar style.
     * @param progressBarStyle
     * @returns this
     */
    defineProgressBarStyle(progressBarStyle: ProgressBarStyle): this;
    /**# Define Service Bar Style
     * ---
     * Define the default service bar style.
     * @param serviceBarStyle
     * @returns this
     */
    defineServiceBarStyle(serviceBarStyle: ServiceBarStyle): this;
    /**# Define Program Title
     * ---
     * Define the programs title.
     * @param title
     * @returns this
     */
    defineProgramTitle(title: string, styleObj?: StyleObject): this;
    /** # Define Help Text
     * ---
     * Defines the help text for the program.
     * @param text
     * @returns this
     */
    defineHelpText(text: string): this;
    /**# Define Screen
     * ---
     * Define a function to be called for a screen.
     * @param screen
     * @param func
     * @returns this
     */
    defineScreen(screen: DisplayScreens, func: Function): this;
    /**# Display Screen
     * ---
     * Display a built in screen.
     * @param screen
     * @param args Args to be pased to screen. Default is an enpty object.
     * @returns this
     */
    displayScreen(screen: DisplayScreens, args?: any): this;
    /**# Define Splash Screen
     * ---
     * Define a function to be called for the splash screen.
     * @param func
     * @returns this
     */
    defineSplashScreen(func: Function): this;
    /**# Splash Screen
     * ---
     * Meant to show the programs title/splash screen.
     * @returns this
     */
    splashScreen(): this;
    /** # Program Init Error Screen
     * ---
     * Screen to show if the program fails to get the right arguments.
     * @param message
     */
    promgramInitErrorScreen(message: string): void;
    /** # Program Error Screen
     * ---
     * Screen to show if the program has an error.
     * @param message
     */
    errorScreen(message: string): void;
    /** # Program Crash Screen
     * ---
     * Screen to show if the program crashes.
     * @param message
     */
    crashScreen(message: string): void;
    /**# Get String
     * ---
     * Get a built in string.
     * @param id
     * @returns string
     */
    getString(id: Strings): string;
    /**# Set String
     * ---
     * Set a built in string.
     * @param id
     * @returns this
     */
    setString(id: Strings, string: string): this;
    _copyDefaultStyle(): StyleObject;
    _copyMessageStyle(type: MessageTypes): StyleObject;
    /**# Info
     * ---
     * Styles the text to be the "info" message style.
     * @returns string
     */
    info(text: string): string;
    /**# [INFO] Info
     * ---
     * Sets chain style to be the "info" message style.
     * @returns this
     */
    get INFO(): this;
    /**# Good
     * ---
     * Styles the text to be the "good" message style.
     * @returns string
     */
    good(text: string): string;
    /**# [GOOD] Good
     * ---
     * Sets chain style to be the "good" message style.
     * @returns this
     */
    get GOOD(): this;
    /**# Warning
     * ---
     * Styles the text to be the "warning" message style.
     * @returns string
     */
    warning(text: string): string;
    /**# [WARNING] Warning
     * ---
     * Sets chain style to be the "warning" message style.
     * @returns this
     */
    get WARNING(): this;
    /**# Raw
     * ---
     * Styles the text to be the "raw" message style.
     * @returns string
     */
    raw(text: string): string | this;
    /**# [RAW] Raw
     * ---
     * Sets chain style to be the "raw" message style.
     * @returns this
     */
    get RAW(): this;
    /**# Title
     * ---
     * Styles the text to be the "title" message style.
     * @returns string
     */
    title(text: string): string;
    /**# [TITLE] Raw
     * ---
     * Sets chain style to be the "title" message style.
     * @returns this
     */
    get TITLE(): this;
    /**# Warning
     * ---
     * Styles the text to be the "error" message style.
     * @returns string
     */
    error(text: string): string;
    /**# [ERROR] Error
     * ---
     * Sets chain style to be the "error" message style.
     * @returns this
     */
    get ERROR(): this;
    /**# [NS] New Screen
     * ---
     * Clears the screen.
     * Alias for newScreen()
     * @returns this
     */
    get NS(): this;
    /**# [NEWSCREEN] New Screen
     * ---
     * Clears the screen.
     * Alias for newScreen()
     * @returns this
     */
    get NEWSCREEN(): this;
    /**# New Line
     * ---
     * Adds a new line to the console.
     * @returns number
     */
    newLine(): void;
    /**# [NL] New Line
     * ---
     * Adds a new line to the console.
     * Alias for newLine()
     * @returns this
     */
    get NL(): this;
    /**# [NEWLINE] New Line
     * ---
     * Adds a new line to the console.
     * Alias for newLine()
     * @returns this
     */
    get NEWLINE(): this;
    /**# [RETRUN] New Line
     * ---
     * Adds a new line to the console.
     * Alias for newLine()
     * @returns this
     */
    get RETURN(): this;
    /**# Clear
     * ---
     * Clears the chain style.
     * @returns this
     */
    clear(): this;
    /**# [CL] Clear Line
     * ---
     * Clears the chain style.
     * Alias for clear()
     * @returns this
     */
    get CL(): this;
    /**# [CLEAR] Clear Line
     * ---
     * Clears the chain style.
     * Alias for clear()
     * @returns this
     */
    get CLEAR(): this;
    /**# Blink
     * ---
     * Styles the text to blink.
     * @returns string
     */
    blink(text?: string): string | this;
    /**# [BI] Blink
     * ---
     * Sets chain style to blink.
     * @returns this
     */
    get BI(): this;
    /**# [BLINK] Blink
     * ---
     * Sets chain style to blink.
     * @returns this
     */
    get BLINK(): this;
    /**# Hidden
     * ---
     * Styles the text to be hidden.
     * @returns string
     */
    hidden(text?: string): string | this;
    /**# [H] Hidden
     * ---
     * Sets chain style to be hidden.
     * @returns this
     */
    get H(): this;
    /**# [HIDDEN] Hidden
     * ---
     * Sets chain style to be hidden.
     * @returns this
     */
    get HIDDEN(): this;
    /**# Underscore
     * ---
     * Styles the text to be underscored.
     * @returns string
     */
    underscore(text?: string): string | this;
    /**# [U] Underscore
     * ---
     * Sets chain style to be underscored.
     * @returns this
     */
    get U(): this;
    /**# [UNDERSCORE] Underscore
     * ---
     * Sets chain style to be underscored.
     * @returns this
     */
    get UNDERSCORE(): this;
    /**# [UNDERLINE] Underscore
     * ---
     * Sets chain style to be underscored.
     * @returns this
     */
    get UNDERLINE(): this;
    /** # Dim
     * ---
     * Returns a string styled to be dim.
     * @param text
     * @returns string
     */
    dim(text?: string): string | this;
    /**# [D] Dim
     * ---
     * Sets chain style to be dim.
     * @returns this
     */
    get D(): this;
    /**# [DIM] Dim
     * ---
     * Sets chain style to be dim.
     * @returns this
     */
    get DIM(): this;
    /** # Bright
     * ---
     * Returns a string styled to be bright.
     * @param text
     * @returns string
     */
    bright(text?: string): string | this;
    /**# [BR] Bright
     * ---
     * Sets chain style to be bright.
     * @returns this
     */
    get BR(): this;
    /**# [BRIGHT] Bright
     * ---
     * Sets chain style to be bright.
     * @returns this
     */
    get BRIGHT(): this;
    /** # Invert
     * ---
     * Returns a string styled to be reversed.
     * @param text
     * @returns string
     */
    invert(text?: string): string | this;
    /**# [BRIGHT] Bright
     * ---
     * Sets chain style to be reversed.
     * @returns this
     */
    get I(): this;
    /**# [BRIGHT] Bright
     * ---
     * Sets chain style to be reversed.
     * @returns this
     */
    get INVERT(): this;
    /** # Red
     * ---
     * Returns a string styled to be red.
     * @param text
     * @returns string
     */
    red(text?: string): string | this;
    /**# [R] Red
     * ---
     * Sets chain style to be red.
     * @returns this
     */
    get R(): this;
    /**# [RED] Red
     * ---
     * Sets chain style to be red.
     * @returns this
     */
    get RED(): this;
    /** # Green
     * ---
     * Returns a string styled to be green.
     * @param text
     * @returns string
     */
    green(text?: string): string | this;
    /**# [G] Green
     * ---
     * Sets chain style to be green.
     * @returns this
     */
    get G(): this;
    /**# [GREEN] Green
     * ---
     * Sets chain style to be green.
     * @returns this
     */
    get GREEN(): this;
    /** # Blue
     * ---
     * Returns a string styled to be blue.
     * @param text
     * @returns string
     */
    blue(text?: string): string | this;
    /**# [B] Blue
     * ---
     * Sets chain style to be blue.
     * @returns this
     */
    get B(): this;
    /**# [BLUE] Blue
     * ---
     * Sets chain style to be blue.
     * @returns this
     */
    get BLUE(): this;
    /** # White
     * ---
     * Returns a string styled to be white.
     * @param text
     * @returns string
     */
    white(text?: string): string | this;
    /**# [W] White
     * ---
     * Sets chain style to be white.
     * @returns this
     */
    get W(): this;
    /**# [WHITE] White
     * ---
     * Sets chain style to be white.
     * @returns this
     */
    get WHITE(): this;
    /** # Black
     * ---
     * Returns a string styled to be black.
     * @param text
     * @returns string
     */
    black(text?: string): string | this;
    /**# [BL] Black
     * ---
     * Sets chain style to be Black.
     * @returns this
     */
    get BL(): this;
    /**# [BLACK] Black
     * ---
     * Sets chain style to be Black.
     * @returns this
     */
    get BLACK(): this;
    /** # Cyan
     * ---0
     * Returns a string styled to be cyan.
     * @param text
     * @returns string
     */
    cyan(text?: string): string | this;
    /**# [C] Cyan
     * ---
     * Sets chain style to be cyan.
     * @returns this
     */
    get C(): this;
    /**# [CYAN] Cyan
     * ---
     * Sets chain style to be cyan.
     * @returns this
     */
    get CYAN(): this;
    /** # Magenta
     * ---
     * Returns a string styled to be magenta.
     * @param text
     * @returns string
     */
    magenta(text?: string): string | this;
    /**# [M] Magenta
     * ---
     * Sets chain style to be magenta.
     * @returns this
     */
    get M(): this;
    /**# [MAGENTA] Magenta
     * ---
     * Sets chain style to be magenta.
     * @returns this
     */
    get MAGENTA(): this;
    /** # Yellow
     * ---
     * Returns a string styled to be yellow.
     * @param text
     * @returns string
     */
    yellow(text?: string): string | this;
    /**# [Y] Yellow
     * ---
     * Sets chain style to be yellow.
     * @returns this
     */
    get Y(): this;
    /**# [YELLOW] Yellow
     * ---
     * Sets chain style to be yellow.
     * @returns this
     */
    get YELLOW(): this;
    /** # Red Background
     * ---
     * Returns a string styled to have a red background.
     * @param text
     * @returns string
     */
    redBG(text?: string): string | this;
    /**# [RBG] Red Background
     * ---
     * Sets chain style to have a red background.
     * @returns this
     */
    get RBG(): this;
    /**# [REDBG] Red Background
     * ---
     * Sets chain style to have a red background.
     * @returns this
     */
    get REDBG(): this;
    /** # Green Background
     * ---
     * Returns a string styled to have a green background.
     * @param text
     * @returns string
     */
    greenBG(text?: string): string | this;
    /**# [GBG] Green Background
     * ---
     * Sets chain style to have a green background.
     * @returns this
     */
    get GBG(): this;
    /**# [GREENBG] Green Background
     * ---
     * Sets chain style to have a green background.
     * @returns this
     */
    get GREENBG(): this;
    /** # Blue Background
     * ---
     * Returns a string styled to have a blue background.
     * @param text
     * @returns string
     */
    blueBG(text?: string): string | this;
    /**# [BBG] Blue Background
     * ---
     * Sets chain style to have a blue background.
     * @returns this
     */
    get BBG(): this;
    /**# [BLUEBG] Blue Background
     * ---
     * Sets chain style to have a blue background.
     * @returns this
     */
    get BLUEBG(): this;
    /** # White Background
     * ---
     * Returns a string styled to have a white background.
     * @param text
     * @returns string
     */
    whiteBG(text?: string): string | this;
    /**# [WBG] Blue Background
     * ---
     * Sets chain style to have a white background.
     * @returns this
     */
    get WBG(): this;
    /**# [WHITEBG] Blue Background
     * ---
     * Sets chain style to have a white background.
     * @returns this
     */
    get WHITEBG(): this;
    /** # Black Background
     * ---
     * Returns a string styled to have a black background.
     * @param text
     * @returns string
     */
    blackBG(text?: string): string | this;
    /**# [BLBG] Black Background
     * ---
     * Sets chain style to have a black background.
     * @returns this
     */
    get BLBG(): this;
    /**# [BLACKBG] Black Background
     * ---
     * Sets chain style to have a black background.
     * @returns this
     */
    get BLACKBG(): this;
    /** # Cyan Background
     * ---
     *
     * Returns a string styled to have a cyan background.
     * @param text
     * @returns string
     */
    cyanBG(text?: string): string | this;
    /**# [CBG] Cyan Background
     * ---
     * Sets chain style to have a cyan background.
     * @returns this
     */
    get CBG(): this;
    /**# [CYANBG] Cyan Background
     * ---
     * Sets chain style to have a cyan background.
     * @returns this
     */
    get CYANBG(): this;
    /** # Magenta Background
     * ---
     * Returns a string styled to have a magenta background.
     * @param text
     * @returns string
     */
    magentaBG(text?: string): string | this;
    /**# [MBG] Magenta Background
     * ---
     * Sets chain style to have a magenta background.
     * @returns this
     */
    get MBG(): this;
    /**# [MAGENTABG] Magenta Background
     * ---
     * Sets chain style to have a magenta background.
     */
    get MAGENTABG(): this;
    /** # Yellow Background
     * ---
     * Returns a string styled to have a yellow background.
     * @param text
     * @returns string
     */
    yellowBG(text?: string): string | this;
    /**# [YBG] Yellow Background
     * ---
     * Sets chain style to have a yellow background.
     * @returns this
     */
    get YBG(): this;
    /**# [YBG] Yellow Background
     * ---
     * Sets chain style to have a yellow background.
     * @returns this
     */
    get YELLOWBG(): this;
    /** # Box
     * ---
     *
     * @return this;
     */
    boxIn(boxStyle: CreateBoxObject): this;
    boxStop(): this;
    _processBoxMessage(message: string, boxWidth: number, westCap: string, eastCap: string, boxCreationObj: CreateBoxObject): string;
    _calculateLongestMessage(messages: string[]): number;
    _wipeChars: string;
    _wipeCharLength: number;
    wipe(char?: string, direction?: "right" | "left" | "top" | "down"): Promise<void>;
    _wipeOne(char: string, rows: number, cols: number, direction: string): Promise<boolean>;
    _wipeTwo(char: string, rows: number, cols: number): Promise<void>;
    /**# Do
     * ---0
     * Run a function in the chain of functions.
     * @param func
     * @param arg
     * @returns this
     */
    do(func: (arg?: any) => any, arg: any): this;
    /**# New Service
     * ---
     * Run a function on an interval.
     * @param name
     * @param params \{interval : number,run : Function\}
     * @returns this
     */
    newService(name: string, params: {
        interval: number;
        run: Function;
        args: any;
    }): this;
    /** # Clear Service
     * ---
     * Stop a serivce from running.
     * @param name
     * @returns this
     */
    clearService(name: string): this;
    /**# Exit
     * ---
     * Makes the program exit.
     * Runs : process.exit(0)
     */
    exit(): void;
    /**# [EXIT] Exit
     * ---
     * Makes the program exit.
     * Runs : process.exit(0)
     * @returns this
     */
    get EXIT(): this;
    /**# [END] Exit
     * ---
     * Makes the program exit.
     * Runs : process.exit(0)
     * @returns this
     */
    get END(): this;
    /**# [DIE] Exit
     * ---
     * Makes the program exit.
     * Runs : process.exit(0)
     * @returns this
     */
    get DIE(): this;
    /**# Done
     * ---
     * Shows the done screen and then exits.
     * Runs : process.exit(1)
     * @returns this
     */
    done(): void;
    /**# [DONE] Done
     * ---
     * Shows the done screen and then exits.
     * Runs : process.exit(1)
     * @returns this
     */
    get DONE(): this;
    /** # Debug
     * ---
     * Sets it to debug mode.
     * @param debug
     * @returns this
     */
    debug(debug?: boolean): this;
    /**# [DEBUG] Toggle Debug
     * ---
     * Toggles the debug mode.
     * @returns this
     */
    get DEBUG(): this;
    /**# [DEBUGSTART] Debug Start
     * ---
     * Starts the debug directive.
     * @returns this
     */
    get DEBUGSTART(): this;
    /**# [DEBUGEND] Debug End
     * ---
     * Ends the debug directive.
     * @returns this
     */
    get DEBUGEND(): this;
    /**# Group
     * ---
     * Calls console.group to create an intented text.
     * If you supply a name it will print before the next output.
     * @param label
     * @returns this
     */
    group(label?: string, styleObj?: StyleObject): this;
    /**# [GROUP] Group
     * ---
     * This toggles the group feature.
     * Calls console.group to create an intented text.
     * @returns this
     */
    get GROUP(): this;
    /**# [GROUPSTART] Group Start
     * ---
     * Calls console.group to create an intented text.
     * @returns this
     */
    get GROUPSTART(): this;
    /**# [GRS] Group Start
     * ---
     * Calls console.group to create an intented text.
     * @returns this
     */
    get GRS(): this;
    /**# End Group
     * ---
     * Calls console.groupEnd to end a group.
     * @returns
     */
    endGroup(): this;
    /**# [GROUPEND] Group End
     * ---
     * Calls console.groupEnd to end a group.
     * @returns this
     */
    get GROUPEND(): this;
    /**# [GRE] Group End
     * ---
     * Calls console.groupEnd to end a group.
     * @returns this
     */
    get GRE(): this;
    /**# End all groups
     * ---
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    endAllGroups(): this;
    /**# Collapse All Groups
     * ---
     * Alias for endAllGroups
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    collapseAllGroups(): this;
    /**# [COLLAPSEALLGROUPS] Collapse All Groups
     * ---
     * Alias for End All Groups
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    get COLLAPSEALLGROUPS(): this;
    /**# [CAG] Collapse All Groups
     * ---
     * Alias for End All Groups
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    get CAG(): this;
    /**# [GROUPENDALL] Group End ALL
     * ---
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    get GROUPENDALL(): this;
    /**# [GREA] Group End ALL
     * ---
     * Calls console.groupEnd to end all groups.
     * @returns this
     */
    get GREA(): this;
    /**# Trace
     * ---
     * All show and log functions will now use trace until it is turned off.
     * @returns this
     */
    trace(enable?: boolean): this;
    /**# [TRACE] Trace
     * ---
     * Toggles the trace option.
     * @returns this
     */
    get TRACE(): this;
    /**# [TRACESTART] Trace Start
     * ---
     * Starts tracing
     * @returns this
     */
    get TRACESTART(): this;
    /**# [TS] Trace Start
     * ---
     * Starts tracing
     * @returns this
     */
    get TS(): this;
    /**# [TRACEEND] Trace End
     * ---
     * Stops tracing
     * @returns this
     */
    get TRACEEND(): this;
    /**# [TE] Trace End
     * ---
     * Strops tracing
     * @returns this
     */
    get TE(): this;
    /**# Time
     * ---
     * Runs console.time with the provided label or default.
     * @pa0ram label
     * @returns this
     */
    time(label?: string): this;
    /**# [TIME] TIME
     * ---
     * Runs time
     * @returns this
     */
    get TIME(): this;
    /**# Time End
     * ---
     * Runs console.timeEnd with the provided label or default.
     * @param label
     * @returns this
     */
    timeEnd(label?: string): this;
    /**# [TIMEEND] TIME END
     * ---
     * Runs timeEND
     * @returns this
     */
    get TIMEEND(): this;
    ServiceBar: {
        new (rdl: any, rows?: number, size?: number, start?: number, interval?: number, base?: string, loadedOne?: string, loadedTwo?: string, cap?: string): {
            cursor: number;
            inte: any;
            rdl: any;
            rows: number;
            size: number;
            start: number;
            interval: number;
            base: string;
            loadedOne: string;
            loadedTwo: string;
            cap: string;
            clear(): void;
            reInit(): void;
            _init(): void;
            _X(): void;
            _O(): void;
            _Bar(): void;
            _Cap(): void;
        };
    };
    ProgressBar: {
        new (show: boolean, rdl: any, row: number, size: number, interval?: number, base?: string, loaded?: string): {
            done: boolean;
            cursor: number;
            timer: any;
            show: boolean;
            rdl: any;
            row: number;
            size: number;
            interval: number;
            base: string;
            loaded: string;
            start(): void;
            addProgressPerfect(percent: number): Promise<true> | Promise<unknown>;
            addProgress(amount: number): Promise<true> | Promise<unknown>;
            finish(): void;
        };
    };
}
declare const rdl: any;
declare const DS: DSCommander;
