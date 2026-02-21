import type { TransactionWithCoin } from "@/types/global";
import { TransactionForm } from "./form/TransactionForm";
import { useUpdateTxForm } from "../hooks/useUpdateTxForm";
import { cn } from "@/lib/utils";
import { SplitTxForm } from "./form/SplitTxForm";

type Props = {
  initialData: TransactionWithCoin;
};

export function EditTxContainer({ initialData }: Props) {
  const { form, onSubmit, actionMutation, onDelete, deleteMutation } = useUpdateTxForm({
    initialData,
  });
  const [isSplit, setIsSplit] = useState(false);

  const isLoading = actionMutation.isPending || deleteMutation.isPending;
  const isSuccess = actionMutation.isSuccess || deleteMutation.isSuccess;

  return (
    <div className="overflow-hidden w-full">
      {/* Окремий компонент */}
      <div className="flex border rounded-sm text-center cursor-pointer relative mb-2">
        <div
          className={cn(
            "absolute top-0 bottom-0 w-1/2 bg-primary transition-transform duration-300 ease-in-out rounded-sm",
            isSplit && "translate-x-full",
          )}
        >
          s
        </div>
        <div
          onClick={() => setIsSplit(false)}
          className={cn("flex-1 z-10 transition-colors duration-100", !isSplit && "text-white")}
        >
          Edit
        </div>
        <div
          onClick={() => setIsSplit(true)}
          className={cn("flex-1 z-10 transition-colors duration-100", isSplit && "text-white")}
        >
          Split
        </div>
      </div>

      <div
        className={cn(
          "flex w-[200%] gap-1 transition-transform duration-300 ease-in-out",
          isSplit ? "-translate-x-[calc(50%+2px)]" : "translate-x-0",
        )}
      >
        <div className="w-1/2 p-1">
          <TransactionForm
            form={form}
            mode="edit"
            isLoading={isLoading}
            isSuccess={isSuccess}
            onSubmit={onSubmit}
            onDelete={onDelete}
          />
        </div>
        <div className="w-1/2 p-1">
          <SplitTxForm transaction={initialData} />
        </div>
      </div>
    </div>
  );
}
