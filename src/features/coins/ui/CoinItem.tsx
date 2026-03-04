export type Props = {
  image: string;
  name: string;
  symbol: string;
};

export function CointItem({ image, name, symbol }: Props) {
  return (
    <div className="flex gap-1 sm:gap-2 items-center cursor-pointer w-full">
      <div className="w-3 xs:w-4 sm:w-5 shrink-0">
        <img src={image} alt="" />
      </div>
      <div className="min-w-0">
        <p className="mr-2 truncate text-left">
          <span>{name}</span>
        </p>
      </div>
      <p className="uppercase truncate text-tertiary shrink-0 mr-3">{symbol}</p>
    </div>
  );
}
