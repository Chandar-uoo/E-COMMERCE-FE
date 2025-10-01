import React from "react";


class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = { hasError:false , error : null};
    }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error,errorInfo){
      console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render(){
    if(this.state.hasError){
           return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ color: "red" }}>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
      return this.props.children;
  }
}
export default ErrorBoundary;