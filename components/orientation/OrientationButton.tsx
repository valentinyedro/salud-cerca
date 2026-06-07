"use client";

type OrientationButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function OrientationButton({
  isOpen,
  onClick,
}: OrientationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-2 rounded bg-[#0072b8] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#005a91] cursor-pointer shadow-sm"
    >
      {isOpen ? (
        <i className="fa fa-eye-slash" aria-hidden="true"></i>
      ) : (
        <i className="fa fa-compass animate-pulse text-base" aria-hidden="true"></i>
      )}
      <span>      
        {isOpen ? "Ocultar orientación" : "Orientación automática"}
      </span>
    </button>
  );
}