import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-gray-950 p-8 border border-gray-800 rounded-2xl text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <span className="text-red-500 text-3xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-serif text-[#C8A45E] mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-8 max-w-md">
            {this.state.error?.message || "An unexpected error occurred while loading this component."}
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-2.5 bg-[#C8A45E] text-gray-950 font-medium rounded-full hover:bg-[#E2C882] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A45E]/50"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
