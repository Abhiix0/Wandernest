/**
 * Centralized logging utility
 * In production, this can be configured to send logs to external services
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: Date;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private log(level: LogLevel, message: string, data?: unknown): void {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
    };

    // Only log in development
    if (this.isDevelopment) {
      const logMethod = level === 'error' ? console.error : 
                       level === 'warn' ? console.warn : 
                       level === 'info' ? console.info : 
                       console.log;

      logMethod(`[${level.toUpperCase()}] ${message}`, data);
    }

    // In production, you could send to external logging service
    // this.sendToExternalService(entry);
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  // Method to replace console.error calls
  routeError(pathname: string): void {
    this.error(`404 Error: User attempted to access non-existent route: ${pathname}`);
  }

  // Method for API errors
  apiError(endpoint: string, error: unknown): void {
    this.error(`API Error for ${endpoint}:`, error);
  }
}

export const logger = new Logger();
