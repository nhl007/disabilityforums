interface BorderBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BorderBox = ({ children, ...props }: BorderBoxProps) => {
  return (
    <div
      className="p-[20px] rounded-xl border-[1px] border-gray-500"
      {...props}
    >
      {children}
    </div>
  );
};

export default BorderBox;
