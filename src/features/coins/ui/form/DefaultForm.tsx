import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/format";
import { preventNonNumericInput } from "../../utils/helpFunctions";
import type { UseFormReturn } from "react-hook-form";
import type { createTxInputForm, updTxInputForm } from "../../utils/transaction.schema";
import type { Modes } from "../../types/coin.types";

type Props = {
  form: UseFormReturn<updTxInputForm | createTxInputForm>;
  onSubmit: () => void;
  mode: Modes;
};

const buttonsText: Record<Modes, string> = {
  add: "Add ",
  edit: "Edit",
  merge: "Merge",
};

export function DefaultForm({ form, onSubmit, mode }: Props) {
  const btnTxt = buttonsText[mode];
  const {
    register,
    formState: { errors, isSubmitting, isDirty },
  } = form;

  return (
    <form className="" onSubmit={onSubmit}>
      <div className="grid gap-1 xs:grid-cols-2 sm:gap-2">
        {"name" in form.getValues() && (
          <Field>
            <FieldLabel className="relative" htmlFor="quantity">
              <span>Select coin</span>
            </FieldLabel>
            Selec option
          </Field>
        )}
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
            <Input value={formatMoney(200)} className="focus-visible:ring-0 cursor-auto" readOnly />
          </Field>
          <Field className="gap-1 sm:gap-2">
            <FieldLabel>Profit</FieldLabel>
            <Input className="focus-visible:ring-0 cursor-auto" value={formatMoney(200)} readOnly />
          </Field>
        </FieldGroup>
        <Field className="gap-1 sm:gap-2 col-span-full flex-row [&>*]:w-auto">
          <Button type="submit" className="flex-1" disabled={!isDirty || isSubmitting}>
            {btnTxt}
          </Button>
          {mode === "edit" && <Button className="">Delete</Button>}
        </Field>
      </div>
    </form>
  );
}
