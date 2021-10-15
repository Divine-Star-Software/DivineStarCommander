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
/**
  # DSLogger
  ---
  All in one CLI solution for Node.Js made by Divine Star
  @organization Divine Star LLC
  @author Luke Johnson
  @since 9-19-2021
  @version 1.0.1
  */
declare class DSLogger {
    rdl: any;
    defaultStyleDelimiter: StyleObject;
    styleDelimiter: StyleObject;
    defaultSleepTime: number;
    services: Record<string, any>;
    strings: Record<Strings, string>;
    defaultPrgoressBarStyle: ProgressBarStyle;
    defaultServiceBarStyle: ServiceBarStyle;
    consoleCodes: Record<ConsoleCodes, string>;
    consoleFGColors: Record<ConsoleColors, string>;
    consoleBGColors: Record<ConsoleColors, string>;
    questionStyles: Record<QuestionDisplayTypes, StyleObject>;
    messageStyles: Record<MessageTypes, StyleObject>;
    params: Map<string, ProgramParams>;
    paramValues: Map<string, ProgramParamsDataTypes>;
    requiredParams: Map<string, boolean>;
    inputs: Map<string, string | number | string[] | boolean | boolean[] | number[] | undefined>;
    lastQuestion: string;
    askedQuestions: number;
    questions: Record<string, StoredQuestions>;
    questionsFails: Record<string, {
        args: any;
        func: Function;
    }>;
    currentRow: number;
    rli: any;
    progressBars: Record<string, any>;
    serviceBars: Record<string, any>;
    arrayInputDelimiters: string[];
    booleanTrueStrings: string[];
    booleanFalseStrings: string[];
    validators: Record<QuestionsTypes, (input: string | string[], type?: string) => Promise<boolean>>;
    validInputTypes: string[];
    customValidators: Record<string, (input: any) => Promise<boolean>>;
    screens: Record<DisplayScreens, Function>;
    constructor(rdl: any);
    /** # Stylize
     * ---
     * Stylize the text with the given format.
     * @param text : string
     * @param styleObj : StyleObject
     */
    stylize(text: string, styleObj: StyleObject): string;
    /** # Get Raw Params
     * ---
     * Get the raw params submited to the program.
     * @returns
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
     */
    addParam(param: ProgramParams): this;
    /** # If Param Isset
     * ---
     * If the param is set run a function.
     * @param param Either the name or the flag of the param.
     * @param func The function to be run. Will be passed the value of the param and the args given.
     * @param args Args to be passed to the function.
     */
    ifParamIsset(param: string, func: (value: ProgramParamsDataTypes, args: any) => {}, args?: any): this;
    initalProgramArgs: string[];
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
     */
    restartPrompt(): this;
    /**# Start Prompt
     * ---
     * Starts user input prompt.
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
     */
    fail(reAsk: boolean, reAskMessage: string, attempts?: number | "all", onFail?: Function, arg?: any): this;
    /**# Ask
     * ---
     * Define a question to be asked by the pormpt
     * @param question
     * @param varName
     * @param varType
     * @param customType The name used for the custom question type.
     */
    ask(question: string, varName: string, varType: QuestionsTypes, customName?: string): this;
    /**# Get Input
     * ---
     * Get input from question
     * @param varName
     */
    getInput(varName: string): string | number | any[] | undefined | boolean;
    /**# Clear Rows
     * ---
     * Clears console output for a given row range.
     * @param rowStart
     * @param rowEnd
     */
    clearRows(rowStart: number, rowEnd: number): this;
    /**# Get Row
     * ---
     * Gets the current row number that the output is on.
     */
    getRow(): number;
    /**# Set Row
     *---
     * Sets the console cursor to a row.
     * @param num
     */
    setRow(num: number): this;
    /**# Add Row
     * ---
     * Add one row to the current console cursor.
     */
    addRow(): this;
    /**# New Service Bar
     * ---
     * Makes a continuous loading bar.
     * @param name
     */
    newServiceBar(name: string, serviceBarStyle?: ServiceBarStyle): this;
    /**# Re Init Service Bar
     * ---
     * Restart a service bar.
     * @param name
     */
    reInitServiceBar(name: string): this;
    /**# Destroy Service Bar
     * ---
     * Destroy a service bar.
     * @param name
     */
    destroyServiceBar(name: string): this;
    /**# New Progress Bar
     * ---
     * Makes a new progress loading bar.
     * @param name of bar to be used as an id
     */
    newProgressBar(name: string, progressBarStyle?: ProgressBarStyle): this;
    /**# Increment Progress Bar
     * ---
     * Adds progress to the progress bar.
     * @param name name of bar to increase
     * @param amount amount to increase by
     */
    incrementProgressBar(name: string, amount: number): Promise<this>;
    /**# Sleep
     * ---
     * Makes the program sleep via a loop.
     * @param ms miliseconds to sleep
     */
    sleep(ms: number): this;
    /**# Async Sleep
     * ---
     * Makes the program sleep via a promsie.
     * @param ms miliseconds to sleep
     */
    asyncSleep(ms: number): Promise<this>;
    /** # New Screen
     * ---
     * Clears the screen and resets the row.
     */
    newScreen(): this;
    /**# Get Message Array
     * ---
     * Returns back an array of strings with the given value.
     * Used display multi messsages.
     * @param message
     * @returns
     */
    _getMessageArray(message: string | number | object | any[]): string[] | false;
    _processMessage(message: string, type?: MessageTypes | "none"): string;
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
     *
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
     */
    show(message: string | number | object | any[], type?: MessageTypes | "none"): this;
    /**# Show Sleep
     * Shows a message and then sleeps
     *
     * @param message
     * @param type
     * @param ms
     */
    showSleep(message: string | number | object | any[], type?: MessageTypes | "none", ms?: number): this;
    /**# Log
     * ---
     * Log message without adjusting cursor position.
     * @param message
     * @param type
     */
    log(message: string | number | object | any[], type?: MessageTypes | "none"): this;
    /** # Log Sleep
     * ---
     * Log message and sleep without adjusting cursor position.
     * @param message
     * @param type
     * @param ms
     */
    logSleep(message: string | number | object | any[], type?: MessageTypes | "none", ms?: number): this;
    /** # Log Table
     * ---
     * Use console.table to show a table without adjusting cursor row position.
     * @param data
     * @param collumns
     * @returns
     */
    logTable(data: object | object[], collumns?: string[]): this;
    /** # Log Table
     * ---
     * Use console.table to show a table at current row position.
     * @param data
     * @param collumns
     * @returns
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
     */
    logSeparator(): this;
    /** # Log Program Title
     * ---
     * Logs program title
     */
    logProgramTitle(): this;
    /** # Show Seperator
     * ---
     * Show output seperator at current row.
     */
    showSeparator(): this;
    /** # Show Program Title
     * ---
     *  Show program serperator at current row.
     */
    showProgramTitle(): this;
    /**# Define Sleep Time
     * ---
     * Defines the default sleep time.
     * @param sleep
     */
    defineSleepTime(sleep: number): this;
    /** # Define Validator
     * ---
     * Define a validate function for a question type.
     * @param type
     * @param func
     * @param name If using a custom question type you must set this param.
     */
    defineValidator(type: QuestionsTypes, func: (input: any) => Promise<boolean>, name?: string): this;
    /**# Define Question Style
     * ---
     * Use a style object to define a questions style.
     * @param type "question" | "re-ask" | "delimiter"
     * @param styleString
     */
    defineQuestionStyle(type: QuestionDisplayTypes, styleObj: StyleObject): this;
    /**# Define Message Style
     * ---
     * Use a style object to define a messages style.
     * @param type
     * @param styleString
     */
    defineMessageStyle(type: MessageTypes, styleObj: StyleObject): this;
    /**# Define Progress Bar Style
     * ---
     * Define the default progress bar style.
     * @param progressBarStyle
     */
    defineProgressBarStyle(progressBarStyle: ProgressBarStyle): this;
    /**# Define Service Bar Style
     * ---
     * Define the default service bar style.
     * @param serviceBarStyle
     */
    defineServiceBarStyle(serviceBarStyle: ServiceBarStyle): this;
    /**# Define Program Title
     * ---
     * Define the programs title.
     * @param title
     */
    defineProgramTitle(title: string, styleObj?: StyleObject): this;
    /** # Define Help Text
     * ---
     * Defines the help text for the program.
     * @param text
     */
    defineHelpText(text: string): this;
    /**# Define Screen
     * ---
     * Define a function to be called for a screen.
     * @param screen
     * @param func
     */
    defineScreen(screen: DisplayScreens, func: Function): this;
    /**# Display Screen
     * ---
     * Display a built in screen.
     * @param screen
     * @param args Args to be pased to screen. Default is an enpty object.
     */
    displayScreen(screen: DisplayScreens, args?: any): void;
    /**# Define Splash Screen
     * ---
     * Define a function to be called for the splash screen.
     * @param func
     */
    defineSplashScreen(func: Function): this;
    /**# Splash Screen
     * ---
     * Meant to show the programs title/splash screen.
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
     */
    getString(id: Strings): string;
    /**# Set String
     * ---
     * Set a built in string.
     * @param id
     */
    setString(id: Strings, string: string): this;
    _copyDefaultStyle(): StyleObject;
    _copyMessageStyle(type: MessageTypes): StyleObject;
    /**# Info
     * ---
     * Styles the text to be the "info" message style.
     * @returns string | this
     */
    info(text?: string): this | string;
    /**# [INFO] Info
     * ---
     * Sets chain style to be the "info" message style..
     */
    get INFO(): this;
    /**# Good
     * ---
     * Styles the text to be the "good" message style.
     * @returns string | this
     */
    good(text?: string): string | this;
    /**# [GOOD] Good
     * ---
     * Sets chain style to be the "good" message style..
     */
    get GOOD(): this;
    /**# Warning
     * ---
     * Styles the text to be the "warning" message style.
     * @returns string | this
     */
    warning(text?: string): string | this;
    /**# [WARNING] Warning
     * ---
     * Sets chain style to be the "warning" message style..
     */
    get WARNING(): this;
    /**# Raw
     * ---
     * Styles the text to be the "raw" message style.
     * @returns string | this
     */
    raw(text?: string): string | this;
    /**# [RAW] Raw
     * ---
     * Sets chain style to be the "raw" message style..
     */
    get RAW(): this;
    /**# Title
     * ---
     * Styles the text to be the "title" message style.
     * @returns string | this
     */
    title(text?: string): string | this;
    /**# [TITLE] Raw
     * ---
     * Sets chain style to be the "title" message style..
     */
    get TITLE(): this;
    /**# Warning
     * ---
     * Styles the text to be the "error" message style.
     * @returns string | this
     */
    error(text?: string): string | this;
    /**# [ERROR] Error
     * ---
     * Sets chain style to be the "error" message style..
     */
    get ERROR(): this;
    /**# [NS] New Screen
     * ---
     * Clears the screen.
     * Alias for newScreen()
     */
    get NS(): this;
    /**# [NEWSCREEN] New Screen
     * ---
     * Clears the screen.
     * Alias for newScreen()
     */
    get NEWSCREEN(): this;
    /**# New Line
     * ---
     * Adds a new line to the console.
     */
    newLine(): void;
    /**# [NL] New Line
     * ---
     * Adds a new line to the console.
     * Alias for newLine()
     */
    get NL(): this;
    /**# [NEWLINE] New Line
     * ---
     * Adds a new line to the console.
     * Alias for newLine()
     */
    get NEWLINE(): this;
    /**# [RETRUN] New Line
     * ---
     * Adds a new line to the console.
     * Alias for newLine()
     */
    get RETURN(): this;
    /**# Clear
     * ---
     * Clears the chain style.
     */
    clear(): this;
    /**# [CL] Clear Line
     * ---
     * Clears the chain style.
     * Alias for clear()
     */
    get CL(): this;
    /**# [CLEAR] Clear Line
     * ---
     * Clears the chain style.
     * Alias for clear()
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
     */
    get BI(): this;
    /**# [BLINK] Blink
     * ---
     * Sets chain style to blink.
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
     * Sets chain style to be hidden..
     */
    get H(): this;
    /**# [HIDDEN] Hidden
     * ---
     * Sets chain style to be hidden.
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
     */
    get U(): this;
    /**# [UNDERSCORE] Underscore
     * ---
     * Sets chain style to be underscored.
     */
    get UNDERSCORE(): this;
    /**# [UNDERLINE] Underscore
   * ---
   * Sets chain style to be underscored.
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
     */
    get D(): this;
    /**# [DIM] Dim
     * ---
     * Sets chain style to be dim.
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
     */
    get BR(): this;
    /**# [BRIGHT] Bright
     * ---
     * Sets chain style to be bright.
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
     */
    get I(): this;
    /**# [BRIGHT] Bright
     * ---
     * Sets chain style to be reversed.
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
     */
    get R(): this;
    /**# [RED] Red
     * ---
     * Sets chain style to be red.
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
     */
    get G(): this;
    /**# [GREEN] Green
     * ---
     * Sets chain style to be green.
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
     */
    get B(): this;
    /**# [BLUE] Blue
     * ---
     * Sets chain style to be blue.
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
     */
    get W(): this;
    /**# [WHITE] White
     * ---
     * Sets chain style to be white.
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
     */
    get BL(): this;
    /**# [BLACK] Black
     * ---
     * Sets chain style to be Black.
     */
    get BLACK(): this;
    /** # Cyan
     * ---
     * Returns a string styled to be cyan.
     * @param text
     * @returns string
     */
    cyan(text?: string): string | this;
    /**# [C] Cyan
     * ---
     * Sets chain style to be cyan.
     */
    get C(): this;
    /**# [CYAN] Cyan
     * ---
     * Sets chain style to be cyan.
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
     */
    get M(): this;
    /**# [MAGENTA] Magenta
     * ---
     * Sets chain style to be magenta.
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
     */
    get Y(): this;
    /**# [YELLOW] Yellow
     * ---
     * Sets chain style to be yellow.
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
     */
    get RBG(): this;
    /**# [REDBG] Red Background
     * ---
     * Sets chain style to have a red background.
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
     * Sets chain style to have a green background..
     */
    get GBG(): this;
    /**# [GREENBG] Green Background
     * ---
     * Sets chain style to have a green background..
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
     */
    get BBG(): this;
    /**# [BLUEBG] Blue Background
     * ---
     * Sets chain style to have a blue background.
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
     */
    get WBG(): this;
    /**# [WHITEBG] Blue Background
     * ---
     * Sets chain style to have a white background.
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
     */
    get BLBG(): this;
    /**# [BLACKBG] Black Background
     * ---
     * Sets chain style to have a black background.
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
     */
    get CBG(): this;
    /**# [CYANBG] Cyan Background
     * ---
     * Sets chain style to have a cyan background.
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
     */
    get YBG(): this;
    /**# [YBG] Yellow Background
     * ---
     * Sets chain style to have a yellow background.
     */
    get YELLOWBG(): this;
    /**# Do
     * ---
     * Run a function in the chain of functions.
     * @param func
     * @param arg
     * @returns
     */
    do(func: (arg?: any) => any, arg: any): this;
    /**# New Service
     * ---
     * Run a function on an interval.
     * @param name
     * @param params \{interval : number,run : Function\}
     * @returns
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
     */
    get EXIT(): this;
    /**# Done
     * ---
     * Shows the done screen and then exits.
     * Runs : process.exit(1)
     */
    done(): void;
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
        new (rdl: any, row: number, size: number, interval?: number, base?: string, loaded?: string): {
            done: boolean;
            cursor: number;
            timer: any;
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
declare const DS: DSLogger;
