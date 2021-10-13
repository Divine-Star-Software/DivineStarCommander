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
declare type QuestionsTypes = "string" | "number" | "digit" | "email" | "password" | "stringall" | "custom";
declare type ParamTypes = "boolean" | "string" | "number" | "stringall" | "string[]" | "stringAll[]" | "number[]";
declare type ProgramParams = {
    flag: string;
    name: string;
    desc: string;
    type: ParamTypes;
    required?: boolean;
    valueNeeded?: boolean;
};
declare type ProgramParamsDataTypes = number | boolean | string | string[] | number[] | undefined;
declare type Strings = "title" | "helpText" | "star" | "seperator" | "questionStart" | "questionDelimiter" | "reAskStart" | "reAskText" | "reAskDelimiter";
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
declare class DSLogger {
    rdl: any;
    defaultStyleDelimiter: StyleObject;
    styleDelimiter: StyleObject;
    defaultSleepTime: number;
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
    inputs: Map<string, string | number | undefined>;
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
    validators: Record<QuestionsTypes, (input: string, type?: string) => Promise<boolean>>;
    customValidators: Record<string, (input: any) => Promise<boolean>>;
    screens: Record<DisplayScreens, Function>;
    constructor(rdl: any);
    stylize(text: string, styleObj: StyleObject): string;
    getParam(name: string): ProgramParamsDataTypes;
    addParam(param: ProgramParams): this;
    ifParamIsset(param: string, func: (value: ProgramParamsDataTypes, args: any) => {}, args?: any): this;
    _isProgramArg(arg: string): boolean;
    initProgramInput(): this | undefined;
    restartPrompt(): this;
    startPrompt(): Promise<this>;
    _prompt(question: string, varName: string, varType: QuestionsTypes, custonName?: string): Promise<unknown>;
    fail(reAsk: boolean, reAskMessage: string, attempts?: number | "all", onFail?: Function, arg?: any): this;
    ask(question: string, varName: string, varType: QuestionsTypes, customName?: string): this;
    getInput(varName: string): string | number | undefined;
    clearRows(rowStart: number, rowEnd: number): this;
    getRow(): number;
    setRow(num: number): this;
    addRow(): this;
    newServiceBar(name: string, serviceBarStyle?: ServiceBarStyle): this;
    reInitServiceBar(name: string): this;
    destroyServiceBar(name: string): this;
    newProgressBar(name: string, progressBarStyle?: ProgressBarStyle): this;
    incrementProgressBar(name: string, amount: number): Promise<this>;
    sleep(ms: number): this;
    asyncSleep(ms: number): Promise<this>;
    newScreen(): this;
    _processMessage(message: string, type?: MessageTypes | "none"): string;
    showAtSleep(message: any, params?: {
        row: number;
        col: number;
        type: MessageTypes | "none";
        sleep: number;
    }): this;
    showAt(message: any, params?: {
        row: number;
        col: number;
        type: MessageTypes | "none";
    }): this;
    show(message: any, type?: MessageTypes | "none"): this;
    showSleep(message: any, type?: MessageTypes | "none", ms?: number): this;
    log(message: any, type?: MessageTypes | "none"): this;
    logSleep(message: any, type?: MessageTypes | "none", ms?: number): this;
    logTable(data: object, collumns?: string[]): this;
    showTable(data: any, collumns?: string[]): this;
    getMessageStyled(type: MessageTypes, message: any): string;
    countLines(message: string): number;
    logSeperator(): this;
    logProgramTitle(): this;
    defineSleepTime(sleep: number): this;
    defineValidator(type: QuestionsTypes, func: (input: any) => Promise<boolean>, name?: string): this;
    defineQuestionStyle(type: QuestionDisplayTypes, styleObj: StyleObject): this;
    defineMessageStyle(type: MessageTypes, styleObj: StyleObject): this;
    defineProgressBarStyle(progressBarStyle: ProgressBarStyle): this;
    defineServiceBarStyle(serviceBarStyle: ServiceBarStyle): this;
    defineProgramTitle(title: string, styleObj?: StyleObject): this;
    defineHelpText(text: string): this;
    defineScreen(screen: DisplayScreens, func: Function): this;
    displayScreen(screen: DisplayScreens, args?: any): void;
    defineSplashScreen(func: Function): this;
    splashScreen(): this;
    promgramInitErrorScreen(message: string): void;
    errorScreen(message: string): void;
    crashScreen(message: string): void;
    getString(id: Strings): string;
    setString(id: Strings, string: string): this;
    _copyDefaultStyle(): StyleObject;
    _copyMessageStyle(type: MessageTypes): StyleObject;
    info(text?: string): this | string;
    get INFO(): this;
    good(text?: string): string | this;
    get GOOD(): this;
    warning(text?: string): string | this;
    get WARNING(): this;
    raw(text?: string): string | this;
    get RAW(): this;
    title(text?: string): string | this;
    get TITLE(): this;
    error(text?: string): string | this;
    get ERROR(): this;
    get NS(): this;
    get NEWSCREEN(): this;
    newLine(): void;
    get NL(): this;
    get NEWLINE(): this;
    clear(): this;
    get CL(): this;
    get CLEAR(): this;
    blink(text?: string): string | this;
    get BI(): this;
    get BLINK(): this;
    hidden(text?: string): string | this;
    get H(): this;
    get HIDDEN(): this;
    underscore(text?: string): string | this;
    get U(): this;
    get UNDERSCORE(): this;
    dim(text?: string): string | this;
    get D(): this;
    get DIM(): this;
    bright(text?: string): string | this;
    get BR(): this;
    get BRIGHT(): this;
    invert(text?: string): string | this;
    get I(): this;
    get INVERT(): this;
    red(text?: string): string | this;
    get R(): this;
    get RED(): this;
    green(text?: string): string | this;
    get G(): this;
    get GREEN(): this;
    blue(text?: string): string | this;
    get B(): this;
    get BLUE(): this;
    white(text?: string): string | this;
    get W(): this;
    get WHITE(): this;
    black(text?: string): string | this;
    get BL(): this;
    get BLACK(): this;
    cyan(text?: string): string | this;
    get C(): this;
    get CYAN(): this;
    magenta(text?: string): string | this;
    get M(): this;
    get MAGENTA(): this;
    yellow(text?: string): string | this;
    get Y(): this;
    get YELLOW(): this;
    redBG(text?: string): string | this;
    get RBG(): this;
    get REDBG(): this;
    greenBG(text?: string): string | this;
    get GBG(): this;
    get GREENBG(): this;
    blueBG(text?: string): string | this;
    get BBG(): this;
    get BLUEBG(): this;
    whiteBG(text?: string): string | this;
    get WBG(): this;
    get WHITEBG(): this;
    blackBG(text?: string): string | this;
    get BLBG(): this;
    get BLACKBG(): this;
    cyanBG(text?: string): string | this;
    get CBG(): this;
    get CYANBG(): this;
    magentaBG(text?: string): string | this;
    get MBG(): this;
    get MAGENTABG(): this;
    yellowBG(text?: string): string | this;
    get YBG(): this;
    get YELLOWBG(): this;
    do(func: (arg?: any) => any, arg: any): this;
    exit(): void;
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
