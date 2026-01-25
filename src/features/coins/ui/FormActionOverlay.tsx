import Lottie from "lottie-react";
import { Loader } from "lucide-react";
import Success from "@/assets/animation/Success.json";

type Props = {
  isLoading: boolean; // true
  isSuccess: boolean; // false
};

export function FormActionOverlay({ isLoading, isSuccess }: Props) {
  if (!isLoading && !isSuccess) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      {isLoading && <Loader size={40} strokeWidth={1.5} className="animate-spin" />}
      {isSuccess && <Lottie animationData={Success} loop style={{ height: 80 }} />}
    </div>
  );
}
