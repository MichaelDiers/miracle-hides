import { LogLevel } from "@nestjs/common";

export class LogEntry {
    constructor(public message: string, public stack?: string){}
}
