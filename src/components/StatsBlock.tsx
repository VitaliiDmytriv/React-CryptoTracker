type Props = {
  children: React.ReactNode;
};

export function StatsBlock({ children }: Props) {
  return (
    <div className="border rounded-md shadow-around p-4 md:p-4 w-fit md:w-40 shrink-0">
      {children}
    </div>
  );
}
