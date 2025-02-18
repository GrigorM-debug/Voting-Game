type ErrorProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorProps) {
  return <div className="error-message">Error: {message}</div>;
}
