declare type MessageTypes = "Blink" | "Error" | "Title" | "Info" | "Good" | "Warning" | "Raw" | "Data";
/**
  # DSLogger
  ---
  Helper class for the programs output.
  
  @author Luke Johnson
  @since 9-19-2021
  @version 0.0.1
  */
export declare class DSLogger {
    private rdl;
    strings: Record<string, string>;
    splash: Function;
    ProgressBar: typeof LoadingBar;
    ServiceBar: typeof ServiceBar;
    currentRow: number;
    progressBars: Record<string, LoadingBar>;
    serviceBars: Record<string, ServiceBar>;
    constructor(rdl: any);
    clearRows(rowStart: number, rowEnd: number): this;
    getRow(): number;
    setRow(num: number): this;
    addRow(): this;
    newServiceBar(name: string): this;
    reInitServiceBar(name: string): this;
    newProgressBar(name: string): this;
    incrementProgressBar(name: string, amount: number): Promise<this>;
    sleep(ms: number): this;
    asyncSleep(ms: number): Promise<this>;
    newScreen(): this;
    showAt(message: any, type: MessageTypes, row: number): this;
    show(message: any, type: MessageTypes): this;
    showSleep(message: any, type: MessageTypes, sleep?: number): this;
    _addColor(type: MessageTypes, message: any): string;
    _countLines(message: string): number;
    logSeperator(): this;
    logProgramTitle(): this;
    defineMessageStyle(type: MessageTypes, styleString: string): this;
    defineProgramTitle(title: string): this;
    defineSplashScreen(func: Function): this;
    splashScreen(): this;
    getString(id: string): string;
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
    autoFill(): Promise<unknown>;
    /**Add Progress Percent
     * ---
     * Adds progress to the bar relative to the size.
     * @param percent Supply an int between 1 - 100
     */
    addProgressPerfect(percent: number): Promise<true> | Promise<unknown>;
    addProgress(amount: number): Promise<true> | Promise<unknown>;
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
    constructor(rdl: any, rows?: number, size?: number, start?: number, interval?: number);
    clear(): void;
    reInit(): void;
    _init(): void;
    _O(): void;
    _X(): void;
    _Cap(): void;
    _Bar(): void;
}
export {};
