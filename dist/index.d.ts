declare type ConsoleCodes = |
  "Reset" |
  "Bright" |
  "Dim" |
  "Underscore" |
  "Blink" |
  "Reverse" |
  "Hidden";
declare type ConsoleColors = |
  "Black" |
  "Red" |
  "Green" |
  "Yellow" |
  "Blue" |
  "Magenta" |
  "Cyan" |
  "White";
declare type DisplayScreens = "programInitError" | "helpScreen";
declare type MessageTypes = |
  "Blink" |
  "Error" |
  "Title" |
  "Info" |
  "Good" |
  "Warning" |
  "Raw" |
  "Data";
declare type QuestionsTypes = |
  "string" |
  "number" |
  "digit" |
  "email" |
  "password" |
  "stringall";
type ParamTypes = "boolean" | "string" | "number" | "stringall";
type ProgramParams = {
  flag: string;
  name: string;
  desc: string;
  type: ParamTypes;
  required ? : boolean;
  valueNeeded ? : boolean;
}
type ProgramParamsDataTypes = number | boolean | string | undefined
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
  strings: Record < string, string > ;
  splash: Function;
  ProgressBar: typeof LoadingBar;
  ServiceBar: typeof ServiceBar;
  currentRow: number;
  progressBars: Record < string, LoadingBar > ;
  serviceBars: Record < string, ServiceBar > ;
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
   */
  ask(question: string, varName: string, varType: QuestionsTypes);
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
   */
  showAt(message: any, type: MessageTypes, row: number): this;
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
  showSleep(message: any, type: MessageTypes, ms ? : number): this;
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
  /**# Define Message Style
   * ---
   * Use console code to styleize messages.
   * @param type
   * @param styleString
   */
  defineMessageStyle(type: MessageTypes, styleString: string): this;
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
  defineProgramTitle(title: string): this;
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
  /**# Get String
   * ---
   * Get a built in string.
   * @param id
   */
  getString(id: string): string;

  _addColor(type: MessageTypes, message: any): string;
  _countLines(message: string): number;
}
declare class LoadingBar {
  private rdl;
  row: number;
  size: number;
  done: boolean;
  cursor: number;
  timer: any;
  constructor(rdl: any, row: number, size: number);
  start(): void;
  autoFill(): Promise < unknown > ;
  /**Add Progress Percent
   * ---
   * Adds progress to the bar relative to the size.
   * @param percent Supply an int between 1 - 100
   */
  addProgressPerfect(percent: number): Promise < true > | Promise < unknown > ;
  addProgress(amount: number): Promise < true > | Promise < unknown > ;
  finish(): void;
}
declare class ServiceBar {
  private rdl;
  rows: number;
  size: number;
  start: number;
  interval: number;
  cursor: number;
  inte: any;
  constructor(
    rdl: any,
    rows ? : number,
    size ? : number,
    start ? : number,
    interval ? : number
  );
  clear(): void;
  reInit(): void;
  _init(): void;
  _O(): void;
  _X(): void;
  _Cap(): void;
  _Bar(): void;
}