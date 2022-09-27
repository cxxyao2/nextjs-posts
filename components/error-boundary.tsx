import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('uncaught error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>Oops...there was en error</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
