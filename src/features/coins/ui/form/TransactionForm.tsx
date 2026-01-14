import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Transaction } from "@/types/global";
import { useTransactionForm } from "../../hooks/useTransactionForm";
import { formatMoney } from "@/lib/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { preventNonNumericInput } from "../../utils/helpFunctions";

type Props = {
  initialData: Transaction;
  onClose: () => void;
};

export function TransactionForm({ initialData, onClose }: Props) {
  const { form, onSubmit } = useTransactionForm(initialData);
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <Dialog open={true} onOpenChange={(val) => !val && onClose()}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription className="sr-only">
              «Edit the details of a transaction including quantity, price, date, fee, and sell
              price.»
            </DialogDescription>
          </DialogHeader>
          <form className="" onSubmit={onSubmit}>
            <div className="grid gap-1 xs:grid-cols-2 sm:gap-2">
              <Field className="">
                <FieldLabel className="relative" htmlFor="quantity">
                  <span>Quantity</span>
                  <FieldError className="justify-self-center font-light fieldError">
                    {errors.quantity?.message ?? ""}
                  </FieldError>
                </FieldLabel>
                <Input
                  id="quantity"
                  {...register("quantity")}
                  type="number"
                  step="any"
                  inputMode="decimal"
                  onKeyDown={preventNonNumericInput}
                />
              </Field>
              <Field>
                <FieldLabel className="relative">
                  <span>Price Per Coin</span>
                  <FieldError className="justify-self-center font-light fieldError">
                    {errors.pricePerCoinBought?.message ?? ""}
                  </FieldError>
                </FieldLabel>
                <Input
                  {...register("pricePerCoinBought")}
                  type="number"
                  step="any"
                  inputMode="decimal"
                  onKeyDown={preventNonNumericInput}
                />
              </Field>
              <Field>
                <FieldLabel>Date</FieldLabel>
                <Input {...register("date")} className="block" type="date" inputMode="decimal" />
              </Field>
              <Field>
                <FieldLabel className="relative">
                  <span>Fee</span>
                  <FieldError className="justify-self-center font-light fieldError">
                    {errors.fees?.message ?? ""}
                  </FieldError>
                </FieldLabel>
                <Input
                  {...register("fees")}
                  type="number"
                  step="any"
                  inputMode="decimal"
                  onKeyDown={preventNonNumericInput}
                />
              </Field>
              <Field>
                <FieldLabel className="relative">
                  Sell Price
                  <FieldError className="justify-self-center font-light fieldError">
                    {errors.pricePerCoinSold?.message ?? ""}
                  </FieldError>
                </FieldLabel>

                <Input
                  {...register("pricePerCoinSold")}
                  type="number"
                  step="any"
                  inputMode="decimal"
                  onKeyDown={preventNonNumericInput}
                />
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
              <Field className="gap-1 sm:gap-2 col-span-full flex-row [&>*]:w-auto">
                <Button type="submit" className="flex-1">
                  Edit
                </Button>
                <Button className="">Delete</Button>
              </Field>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
