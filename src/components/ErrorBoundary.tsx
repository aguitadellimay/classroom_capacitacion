import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Clasito } from './Clasito';
import { RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 text-center">
          <div className="bg-white dark:bg-slate-900 border-4 border-amber-400 dark:border-amber-500 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-pop-in text-slate-800 dark:text-slate-100">
            <div className="flex justify-center">
              <Clasito mood="wrong" size="lg" speechText="¡Ups! Algo no salió como esperábamos, pero no te preocupes." />
            </div>

            <div>
              <span className="text-3xl block mb-1">😅 🔧</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
                ¡UPS... ALGO NO SALIÓ BIEN!
              </h3>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                {this.props.fallbackMessage || 'No te preocupes. ¡Volvamos a intentarlo juntos!'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 btn-game-primary bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 py-3 rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <RefreshCw className="w-4 h-4" />
                <span>VOLVER A INTENTARLO</span>
              </button>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-game-amber bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-4 py-3 rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Home className="w-4 h-4" />
                <span>INICIO</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
