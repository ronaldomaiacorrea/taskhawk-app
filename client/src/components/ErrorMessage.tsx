interface ErrorMessageProps {
	error: Error | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
	return <>{error}</>;
};

export default ErrorMessage;
