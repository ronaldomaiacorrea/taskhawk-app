export interface ErrorMessageProps {
  error: Error | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <>{error?.message}</>;
};

export default ErrorMessage;
