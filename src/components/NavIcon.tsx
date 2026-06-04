export type NavIconName = "home" | "person" | "grid" | "mail";

const paths: Record<NavIconName, string> = {
  home: "M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z",
  person:
    "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H5z",
  grid: "M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z",
  mail: "M4 4h16v16H4V4zm0 0l8 6 8-6",
};

export default function NavIcon({
  name,
  className = "h-4 w-4",
}: {
  name: NavIconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
