import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Terminal } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Peace Haven UI Exception]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-charcoal-950 text-slate-200 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-charcoal-900 border border-sage-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient radiant highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-amber-400 to-rose-500" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase">
                  Runtime Protection Fault
                </span>
                <h1 className="font-heading text-xl font-bold text-white">
                  An Unexpected Display Exception Occurred
                </h1>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Peace Haven’s interface encountered an unexpected state. All client form progress and server-side operations remain protected. You can reload the view or return to the main dashboard.
            </p>

            {this.state.error && (
              <div className="bg-charcoal-950/90 border border-white/5 rounded-xl p-3 text-xs font-mono text-slate-400 overflow-x-auto space-y-1">
                <div className="flex items-center gap-2 text-rose-400 font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{this.state.error.name}: {this.state.error.message}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-charcoal-950 font-semibold text-sm transition-colors shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-slate-200 border border-slate-700 text-sm font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

