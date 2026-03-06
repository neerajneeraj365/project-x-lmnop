import { cn } from "@/lib/utils";

const Wrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-1.5 md:px-14", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
