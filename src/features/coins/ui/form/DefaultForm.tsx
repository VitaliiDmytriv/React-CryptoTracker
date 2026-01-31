import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { preventNonNumericInput } from "../../utils/helpFunctions";
import { type UseFormReturn } from "react-hook-form";
import type { createTxForm, updTxForm } from "../../utils/transaction.schema";
import type { Modes } from "../../types/coin.types";
import { SummaryField } from "../SummaryField";
import { FormActionOverlay } from "../FormActionOverlay";
import { ConfirmDialog } from "../ConfirmDialog";

type Props = {
  form: UseFormReturn<updTxForm | createTxForm>;
  onSubmit: () => void;
  onDelete?: () => void;
  mode: Modes;
  isLoading: boolean;
  isSuccess: boolean;
};

const buttonsText: Record<Modes, string> = {
  add: "Add ",
  edit: "Edit",
  merge: "Merge",
};

export function DefaultForm({ form, onSubmit, mode, isLoading, isSuccess, onDelete }: Props) {
  const btnTxt = buttonsText[mode];
  const {
    register,
    formState: { errors, isDirty },
    control,
  } = form;

  return (
    <div className="relative">
      <FormActionOverlay isLoading={isLoading} isSuccess={isSuccess} />

      <form className="" onSubmit={onSubmit}>
        <div
          className={`grid gap-1 xs:grid-cols-2 sm:gap-2 ${isLoading || isSuccess ? " opacity-55 pointer-events-none" : ""}`}
        >
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
              className="submit-actions"
              {...register("pricePerCoinSold")}
              type="number"
              step="any"
              inputMode="decimal"
              onKeyDown={preventNonNumericInput}
            />
          </Field>
          <FieldGroup className="col-span-full flex flex-row gap-1 sm:gap-2">
            <SummaryField control={control} mode="spent" />
            <SummaryField control={control} mode="profit" />
          </FieldGroup>
          <Field className="gap-1 sm:gap-2 col-span-full flex-row [&>*]:w-auto">
            <Button
              type="submit"
              className={`flex-1 submit-actions ${!isDirty ? "opacity-55" : "disabled:opacity-100"} `}
              disabled={!isDirty || isLoading}
            >
              {btnTxt}
            </Button>
            {mode === "edit" && <ConfirmDialog actionFn={onDelete ? onDelete : () => {}} />}
          </Field>
        </div>
      </form>
    </div>
  );
}
