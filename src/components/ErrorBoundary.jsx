import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
                        <p className="text-gray-600 mb-4">
                            We're sorry, but the application encountered an unexpected error.
                        </p>
                        <details className="bg-gray-50 p-4 rounded text-sm text-gray-700 overflow-auto max-h-48 mb-4">
                            <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
                            <pre>{this.state.error && this.state.error.toString()}</pre>
                            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                        </details>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
