import { createDefaultTx } from "@/lib/utils";
import { Button } from "./ui/button";
import { useTxDialogStore } from "@/store/useTxDialogStore";
import { MergeCoinButton } from "@/features/coins";

type Props = {
  title: string;
  isMerge: boolean;
};

export function EntityListHeader({ title, isMerge }: Props) {
  const openDialog = useTxDialogStore((s) => s.open);
  return (
    <div className="flex items-center gap-2 my-3">
      <div className="flex-1 font-bold">{title}</div>
      <div className="flex gap-2 justify-center">
        {isMerge && <MergeCoinButton />}
        <Button
          onClick={() => openDialog({ type: "add", props: { initialData: createDefaultTx() } })}
          className="h-auto py-2 text-xs md:text-sm px-3 sm:px-4 sm:py-2"
        >
          Add transaction
        </Button>
      </div>
    </div>
  );
}
