import { cn } from "@/lib/utils";

export const CustomLabelWithValue = ({
  label,
  labelClassName,
  value,
  valueClassName,
}: {
  label: string;
  labelClassName?: string;
  value: string | number | undefined;
  valueClassName?: string;
}) => {
  if (!value) return null;

  return (
    <div className="space-x-1">
      <span className={labelClassName}>{label}:</span>
      <span className={cn("text-xl", valueClassName)}>{value}</span>
    </div>
  );
};
