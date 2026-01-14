export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function preventNonNumericInput(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "-" || e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
}
