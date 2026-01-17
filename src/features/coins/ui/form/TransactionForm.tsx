import type { TransactionWithCoin } from "@/types/global";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import type { Modes } from "../../types/coin.types";
import { EditTransactionForm } from "./EditTransactionForm";

const title: Record<Modes, string> = {
  edit: "Edit Transaction",
  add: "Add Transaction",
  merge: "Merge Transaction",
};

// завжди передаємо тип в initialData як TransactionWithCoin
type Props = {
  initialData: TransactionWithCoin;
  onClose: () => void;
  mode: Modes;
};

export function TransactionForm({ initialData, onClose, mode }: Props) {
  const dialogTitle = title[mode];

  return (
    <>
      <Dialog open={true} onOpenChange={(val) => !val && onClose()}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription className="sr-only">
              «Edit the details of a transaction including quantity, price, date, fee, and sell
              price.»
            </DialogDescription>
          </DialogHeader>
          {mode === "edit" ? <EditTransactionForm initialData={initialData} /> : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
