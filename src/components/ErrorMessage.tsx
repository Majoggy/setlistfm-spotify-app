type Props = {
  message: string;
};

export function ErrorMessage({ message }: Props) {
  return (
    <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
      <p className="text-red-200">{message}</p>
    </div>
  );
}
