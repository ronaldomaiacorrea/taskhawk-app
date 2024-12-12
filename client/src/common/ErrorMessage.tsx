export interface ErrorMessageProps {
  error: Error | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => <>{error?.message}</>;

export default ErrorMessage;
