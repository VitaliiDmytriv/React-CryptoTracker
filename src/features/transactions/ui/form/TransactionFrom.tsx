import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Transaction } from "@/types/global";
import { useTransactionForm } from "../../hooks/useTransactionForm";
import { formatMoney } from "@/lib/format";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  initialData: Transaction;
  onClose: () => void;
};

export function TransactionForm({ initialData, onClose }: Props) {
  const { form } = useTransactionForm(initialData);
  const { register } = form;

  return (
    <>
      <Dialog open={true} onOpenChange={(val) => !val && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <form className="" action="">
            <div className="grid gap-1 xs:grid-cols-2 sm:gap-2">
              <Field>
                <FieldLabel>Quantity</FieldLabel>
                <Input {...register("quantity")} type="number" />
              </Field>
              <Field>
                <FieldLabel>Price Per Coin</FieldLabel>
                <Input {...register("pricePerCoinBought")} type="number" />
              </Field>
              <Field>
                <FieldLabel>Date</FieldLabel>
                <Input {...register("date")} className="block" type="date" />
              </Field>
              <Field>
                <FieldLabel>Fee</FieldLabel>
                <Input {...register("fees")} type="number" />
              </Field>
              <Field>
                <FieldLabel>Sell Price</FieldLabel>
                <Input {...register("pricePerCoinSold")} type="number" />
              </Field>
              <FieldGroup className="col-span-full flex flex-row gap-1 sm:gap-2">
                <Field className="gap-1 sm:gap-2">
                  <FieldLabel>Total spent</FieldLabel>
                  <Input
                    value={formatMoney(initialData.totalSpent!)}
                    className="focus-visible:ring-0 cursor-auto"
                    readOnly
                  />
                </Field>
                <Field className="gap-1 sm:gap-2">
                  <FieldLabel>Profit</FieldLabel>
                  <Input
                    className="focus-visible:ring-0 cursor-auto"
                    value={formatMoney(initialData.profit!)}
                    readOnly
                  />
                </Field>
              </FieldGroup>
            </div>
          </form>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
