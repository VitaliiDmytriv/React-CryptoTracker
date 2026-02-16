import { useTxDialogStore } from "@/store/useTxDialogStore";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { EditTxContainer } from "@/features/coins/ui/EditTxContainer";
import { AddTxContainer } from "@/features/coins/ui/AddTxContainer";
import { MergeTxContainer } from "@/features/coins/ui/MergeTxContainer";

const MODAL_CONTENT = {
  edit: {
    title: "Edit Transaction",
    desc: "Edit the details of a transaction including quantity, price, date, fee, and sell price",
  },
  add: { title: "Add Transaction", desc: "Add a new transaction to your portfolio history" },
  merge: {
    title: "Merge Transactions",
    desc: "Combine multiple transactions into a single entry",
  },
};

export function TransactionDialog() {
  const { isOpen, close, modal } = useTxDialogStore();

  if (modal.type === null) return null;

  const content = MODAL_CONTENT[modal.type];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{content.title}</DialogTitle>
            <DialogDescription className="sr-only">{content.desc}</DialogDescription>
          </DialogHeader>
          {modal.type === "edit" && <EditTxContainer {...modal.props} />}
          {modal.type === "add" && <AddTxContainer {...modal.props} />}
          {modal.type === "merge" && <MergeTxContainer {...modal.props} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
