interface Props {
  children: React.ReactNode;
  title: string;
}

export const WidgetItem = ({ title, children }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
        <div>
          <h5 className="text-xl text-gray-600 text-center">{title}</h5>
          <div className="mt-2 flex flex-col justify-center gap-4">
            {children}
          </div>
          <span className="block text-center text-gray-500">
            Compared to last week $13,988
          </span>
        </div>
      </div>
    </div>
  );
};
