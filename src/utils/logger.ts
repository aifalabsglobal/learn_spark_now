/**
 * Logger utility for consistent console output
 * Helps students debug and understand component lifecycle
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'success';

interface LogOptions {
  level?: LogLevel;
  data?: any;
  timestamp?: boolean;
}

/**
 * Color codes for console output
 */
const colors = {
  debug: 'color: #888; font-weight: bold;',
  info: 'color: #0066cc; font-weight: bold;',
  warn: 'color: #ff9900; font-weight: bold;',
  error: 'color: #cc0000; font-weight: bold;',
  success: 'color: #00cc00; font-weight: bold;',
};

const icons = {
  debug: '🔧',
  info: 'ℹ️',
  warn: '⚠️',
  error: '❌',
  success: '✅',
};

/**
 * Main logger function
 * @param message - The message to log
 * @param options - Logging options (level, data, timestamp)
 */
export function log(message: string, options: LogOptions = {}) {
  const { level = 'info', data, timestamp = true } = options;

  // Build timestamp
  const time = timestamp ? new Date().toLocaleTimeString() : '';
  const timeStr = time ? `[${time}]` : '';

  // Build message with icon
  const icon = icons[level];
  const prefix = `${icon} [Learn Spark]`;

  // Construct full message
  const fullMessage = `${prefix} ${message} ${timeStr}`;

  // Log to console with styling
  console.log(`%c${fullMessage}`, colors[level]);

  // Log additional data if provided
  if (data) {
    console.log('Details:', data);
  }
}

/**
 * Convenience methods for different log levels
 */
export const logger = {
  /**
   * Debug level - detailed information for diagnosing problems
   */
  debug: (message: string, data?: any) => {
    log(message, { level: 'debug', data });
  },

  /**
   * Info level - general informational messages
   */
  info: (message: string, data?: any) => {
    log(message, { level: 'info', data });
  },

  /**
   * Warn level - warning messages for potential issues
   */
  warn: (message: string, data?: any) => {
    log(message, { level: 'warn', data });
  },

  /**
   * Error level - error messages
   */
  error: (message: string, data?: any) => {
    log(message, { level: 'error', data });
  },

  /**
   * Success level - success messages
   */
  success: (message: string, data?: any) => {
    log(message, { level: 'success', data });
  },

  /**
   * Component lifecycle logging
   */
  componentMount: (componentName: string, props?: any) => {
    log(`📦 ${componentName} mounted`, { level: 'debug', data: props });
  },

  componentUnmount: (componentName: string) => {
    log(`📦 ${componentName} unmounted`, { level: 'debug' });
  },

  /**
   * Navigation logging
   */
  navigate: (from: string, to: string) => {
    log(`🧭 Navigation: ${from} → ${to}`, { level: 'info' });
  },

  /**
   * State change logging
   */
  stateChange: (componentName: string, stateName: string, value: any) => {
    log(`💾 ${componentName} state changed: ${stateName}`, {
      level: 'debug',
      data: value,
    });
  },

  /**
   * Error handling logging
   */
  errorOccurred: (componentName: string, errorMessage: string, error?: any) => {
    log(`Error in ${componentName}: ${errorMessage}`, {
      level: 'error',
      data: error,
    });
  },

  /**
   * Performance logging
   */
  performanceStart: (taskName: string) => {
    const startTime = performance.now();
    log(`⏱️ Starting: ${taskName}`, { level: 'debug' });
    return startTime;
  },

  performanceEnd: (taskName: string, startTime: number) => {
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    log(`⏱️ Completed: ${taskName} (${duration}ms)`, { level: 'debug' });
  },

  /**
   * Educational messages
   */
  concept: (conceptName: string, explanation: string) => {
    log(`📚 ${conceptName}: ${explanation}`, { level: 'info' });
  },
};

/**
 * Development-only logging
 * Only logs in development, not in production
 */
export function devLog(message: string, options: LogOptions = {}) {
  if (process.env.NODE_ENV === 'development') {
    log(message, { ...options, level: options.level || 'debug' });
  }
}

export default logger;
