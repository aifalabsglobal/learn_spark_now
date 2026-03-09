import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Mail } from 'lucide-react';
import { APP, SUPPORT } from '../config/app';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Enterprise error boundary — catches React tree errors and shows a recovery UI.
 * Prevents full white-screen and offers try-again + support.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (typeof window !== 'undefined' && window.console) {
      console.error('[Learn Spark] ErrorBoundary caught:', error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200 p-6"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" aria-hidden />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-slate-400 text-sm mb-6">
              We've recorded this error. Please try again or contact support if it continues.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-slate-700 hover:bg-slate-600 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-spark focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <RefreshCw size={18} />
                Try again
              </button>
              <a
                href={`mailto:${SUPPORT.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-slate-800 border border-slate-600 hover:border-slate-500 text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-spark focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Mail size={18} />
                Contact support
              </a>
            </div>
            <p className="text-slate-500 text-xs mt-8">
              {APP.name} v{APP.version}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
