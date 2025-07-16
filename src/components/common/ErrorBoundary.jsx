// src/components/common/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="bg-red-800 bg-opacity-30 border border-red-600 rounded-lg p-8 max-w-lg text-center">
            <h2 className="text-red-400 text-2xl font-bold mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-red-200 mb-4">
              An error occurred in the application. Please refresh the page.
            </p>
            {import.meta.env.DEV && (
              <details className="mt-4 text-left bg-gray-800 p-4 rounded text-xs">
                <summary className="cursor-pointer text-red-300">
                  Error Details (Dev)
                </summary>
                <pre className="mt-2 text-red-200">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
