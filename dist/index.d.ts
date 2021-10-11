type ConsoleCodes = |
  "Reset" |
  "Bright" |
  "Dim" |
  "Underscore" |
  "Blink" |
  "Reverse" |
  "Hidden"
type ConsoleColors = |
  "Black" |
  "Red" |
  "Green" |
  "Yellow" |
  "Blue" |
  "Magenta" |
  "Cyan" |
  "White"
type StyleObject = {
  fg ? : ConsoleColors | "none",
  bg ? : ConsoleColors | "none",
  reverse ? : boolean,
  bright ? : boolean
  dim ? : boolean,
  underscore ? : boolean,
  blink ? : boolean,
  hidden ? : boolean
}
type DisplayScreens = |
  "splash" |
  "programInitError" |
  "helpScreen" |
  "crash" |
  "done" |
  "noInput"
type MessageTypes = |
  "Blink" |
  "Error" |
  "Title" |
  "Info" |
  "Good" |
  "Warning" |
  "Raw" |
  "Data";
type QuestionDisplayTypes = |
"question-start" |
  "question" |
  "delimiter" |
  "re-ask-start" |
  "re-ask" |
  "re-ask-delimiter"
type QuestionsTypes = |
  "string" |
  "number" |
  "digit" |
  "email" |
  "password" |
  "stringall" |
  "custom"
type ParamTypes = "boolean" | "string" | "number" | "stringall" | "string[]" | "stringAll[]" | "number[]";
type ProgramParams = {
  flag: string;
  name: string;
  desc: string;
  type: ParamTypes;
  required ? : boolean;
  valueNeeded ? : boolean;
}
type ProgramParamsDataTypes = number | boolean | string | string[] | number[] | undefined
type Strings = |
  "title" |
  "helpText" |
  "star" |
  "seperator" |
  "questionStart" |
  "questionDelimiter" |
  "reAskStart" |
  "reAskText" |
  "reAskDelimiter" 
type StoredQuestions ={
  varName: string,
  varType: QuestionsTypes,
  reAsk ?: boolean,
  failPrompt ?: string, 
  attempts ?: number | "all",
  fails ?: number
  customName ?: string
}
type ProgressBarStyle = {
  base : string,
  baseStyle : StyleObject,
  loaded : string,
  loadedStyle : StyleObject,
  size : number,
  interval : number
}
type ServiceBarStyle = {
  base : string,
  baseStyle : StyleObject,
  loadedOne : string,
  loadedOneStyle : StyleObject,
  loadedTwo : string,
  loadedTwoStyle : StyleObject,
  cap : string,
  capStyle : StyleObject
  size : number,
  interval : number
}
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
  constructor(rdl: any);
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
    args: any 
  )
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
  /**# Init Program Input
   * ---
   * Parses the arguments sent to the program and stores the values. 
   * Must run before you can access the values.
   */
  initProgramInput(): this;
  /**# Start Prompt
   * ---
   * Starts user input prompt.
   */
  startPrompt(): Promise < this > ;
  /**# Restart Prompt
   * ---
   * Restarat user input prompt.
   */
  restartPrompt(): Promise < this > ;

  /**# Ask
   * ---
   * Define a question to be asked by the pormpt
   * @param question 
   * @param varName 
   * @param varType 
   * @param customType The name used for the custom question type. 
   */
  ask(question: string, varName: string, varType: QuestionsTypes,customName?:string);
   /**# fail
   * --
   * Adds a fail case to the last asked question. 
   * @param reAsk 
   * @param reAskMessage 
   * @param onFail 
   * @param args 
   */
     fail(reAsk : boolean, reAskMessage : string,attempts : number |"all",onFail ?: Function,arg ?: any);
  /**# Get Input
   * ---
   * Get input from question
   * @param varName 
   */
  getInput(varName: string): string | number | undefined
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
  /*# Set Row
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
  newServiceBar(name: string): this;
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
  destroyServiceBar(name: string) : this;
  /**# New Progress Bar
   * ---
   * Makes a new progress loading bar.
   * @param name of bar to be used as an id
   */
  newProgressBar(name: string): this;
  /**# New Progress Bar
   * ---
   * Makes a new progress loading bar.
   * @param name name of bar to increase
   * @param amount amount to increase by
   */
  incrementProgressBar(name: string, amount: number): Promise < this > ;
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
  asyncSleep(ms: number): Promise < this > ;
  /** # New Screen
   * ---
   * Clears the screen and resets the row.
   */
  newScreen(): this;
  /**# Show At
   * ---
   * Shows a message at a specific row
   * @param message
   * @param type
   * @param row
   * @param col Default is 0 
   */
  showAt(message: any, type: MessageTypes, row: number, col ?: number): this;
  /**# Show
   * ---
   * Shows a message
   * @param message
   * @param type
   */
  show(message: any, type: MessageTypes): this;
  /**# Show Sleep
   * Shows a message and then sleeps
   *
   * @param message
   * @param type
   * @param ms
   */
  showSleep(message: any, type: MessageTypes, ms ?: number): this;
/**# Log
 * ---
 * Log message without adjusting cursor position.
 * @param message 
 * @param type 
 */
  log(message : any,type : MessageTypes) : this;
/** # Log Sleep
 * ---
 * Log message and sleep without adjusting cursor position.
 * @param message 
 * @param type 
 * @param ms 
 */
  logSleep(message : any,type : MessageTypes, ms ?: number) : this;
  /** # Log Seperator
   * ---
   * Logs output seperator
   */
  logSeperator(): this;
  /** # Log Program Title
   * ---
   * Logs program title
   */
  logProgramTitle(): this;

  /** # Define Validator
   * ---
   * Define a validate function for a question type.
   * @param type 
   * @param func 
   * @param name 
   */
  defineValidator(type : QuestionsTypes,func : (input:any)=>boolean,name?:string)
    /**# Define Question Style
   * ---
   * Use a style object to define a questions style. 
   * @param type "question" | "re-ask" | "delimiter"
   * @param styleString
   */
   defineQustionStyle(type: QuestionDisplayTypes, styleObj ?: StyleObject): this;
  /**# Define Message Style
   * ---
   * Use a style object to define a messages style. 
   * @param type
   * @param styleString
   */
  defineMessageStyle(type: MessageTypes, styleObj ?: StyleObject): this;
/**# Define Progress Bar Style
 * ---
 * Define the default progress bar style.
 * @param progressBarStyle 
 */
  defineProgressBarStyle(progressBarStyle : ProgressBarStyle) : this;
/**# Service Bar Style
 * ---
 * Define the default service bar style. 
 * @param serviceBarStyle 
 */
  defineServiceBarStyle(serviceBarStyle : ServiceBarStyle) : this;
  /** # Define Help Text
   * ---
   * Defines the help text for the program. 
   * @param text 
   */
  defineHelpText(text : string ): this;
  /**# Define Program Title
   * ---
   * Define the programs title.
   * @param title
   */
  defineProgramTitle(title: string,styleObj ?: StyleObject): this;
  /**# Define Splash Screen
   * ---
   * Define a function to be called for the splash screen.
   * @param func
   */
  defineSplashScreen(func: Function): this;
    /**# Define Screen 
   * ---
   * Define a function to be called for a screen.
   * @param screen 
   * @param func
   */
  defineScreen(screen : DisplayScreens, func: Function): this;
  /**# Display Screen
   * ---
   * Display a built in screen. 
   * @param screen 
   * @param args Args to be pased to screen. Default is an enpty object. 
   */
  displayScreen(screen : DisplayScreens, args ?: any )
  /**# Splash Screen
   * ---
   * Meant to show the programs title/splash screen.
   */
  splashScreen(): this;
  /**# Program Init Error Screen
   * ---
   * Error screen for when the program fails to init. 
   * @param message 
   */
  promgramInitErrorScreen(message : string) : this;
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
  setString(id: Strings,string : string): string;
  //Quick Style Functions
  red(text: string): string;
  green(text: string) : string;
  blue(text: string) : string;
  white(text: string) : string;
  black(text: string) : string;
  cyan(text: string) : string;
  magenta(text: string): string;
  yellow(text: string) : string;
  //Bright
  brightRed(text: string) : string;
  brightGreen(text: string) : string;
  brightBlue(text: string): string;
  brightWhite(text: string) : string;
  brightBlack(text: string): string;
  brightCyan(text: string): string;
  brightMagenta(text: string): string;
  brightYellow(text: string): string;
  //Invert
  redInvert(text: string,bg : ConsoleColors | "none" ) : string;
  greenInvert(text: string,bg : ConsoleColors | "none") : string;
  blueInvert(text: string,bg : ConsoleColors | "none" ) : string;
  whiteInvert(text: string,bg : ConsoleColors | "none" ): string;
  blackInvert(text: string,bg : ConsoleColors | "none"): string;
  cyanInvert(text: string,bg : ConsoleColors | "none"): string;
  magentaInvert(text: string,bg : ConsoleColors | "none") : string;
  yellowInvert(text: string,bg : ConsoleColors | "none") : string;
  //Invert Bright
  brightRedInvert(text: string,bg : ConsoleColors | "none") : string;
  brightGreenInvert(text: string,bg : ConsoleColors | "none") : string;
  brightBlueInvert(text: string,bg : ConsoleColors | "none") : string;
  brightWhiteInvert(text: string,bg : ConsoleColors | "none") : string;
  brightBlackInvert(text: string,bg : ConsoleColors | "none") : string;
  brightCyanInvert(text: string,bg : ConsoleColors | "none"): string;
  brightMagentaInvert(text: string,bg : ConsoleColors | "none") : string;
  brightYellowInvert(text: string,bg : ConsoleColors | "none") : string;
  //BG
  redBG(text: string,fg : ConsoleColors | "none" ) : string;
  greenBG(text: string,fg : ConsoleColors | "none") : string;
  blueBG(text: string,fg : ConsoleColors | "none" ) : string;
  whiteBG(text: string,fg : ConsoleColors | "none" ): string;
  blackBG(text: string,fg : ConsoleColors | "none"): string;
  cyanBG(text: string,fg : ConsoleColors | "none"): string;
  magentaBG(text: string,fg : ConsoleColors | "none") : string;
  yellowBG(text: string,fg : ConsoleColors | "none") : string;
  //Bright
  brightRedBG(text: string,fg : ConsoleColors | "none") : string;
  brightGreenBG(text: string,fg : ConsoleColors | "none") : string;
  brightBlueBG(text: string,fg : ConsoleColors | "none") : string;
  brightWhiteBG(text: string,fg : ConsoleColors | "none") : string;
  brightBlackBG(text: string,fg : ConsoleColors | "none") : string;
  brightCyanBG(text: string,fg : ConsoleColors | "none"): string;
  brightMagentaBG(text: string,fg : ConsoleColors | "none") : string;
  brightYellowBG(text: string,fg : ConsoleColors | "none") : string;
  //Invert
  redInvertBG(text: string,fg : ConsoleColors | "none" ) : string;
  greenInvertBG(text: string,fg : ConsoleColors | "none") : string;
  blueInvertBG(text: string,fg : ConsoleColors | "none" ) : string;
  whiteInvertBG(text: string,fg : ConsoleColors | "none" ): string;
  WIBG : typeof this.whiteInvertBG;
  blackInvertBG(text: string,fg : ConsoleColors | "none"): string;
  cyanInvertBG(text: string,fg : ConsoleColors | "none"): string;
  magentaInvertBG(text: string,fg : ConsoleColors | "none") : string;
  yellowInvertBG(text: string,fg : ConsoleColors | "none") : string;
  //Invert Bright
  brightRedInvertBG(text: string,fg : ConsoleColors | "none") : string;
  brightGreenInvertBG(text: string,fg : ConsoleColors | "none") : string;
  brightBlueInvertBG(text: string,fg : ConsoleColors | "none") : string;
  brightWhiteInvertBG(text: string,fg : ConsoleColors | "none") : string;
  brightBlackInvertBG(text: string,fg : ConsoleColors | "none") : string;
  brightCyanInvertBG(text: string,fg : ConsoleColors | "none"): string;
  brightMagentaInvertBG(text: string,fg : ConsoleColors | "none") : string;
  brightYellowInvertBG(text: string,fg : ConsoleColors | "none") : string;

  /**# Exit
   * ---
   * Calls process.exit
   */
  exit()

  _addColor(type: MessageTypes, message: any): string;
  _countLines(message: string): number;
}

