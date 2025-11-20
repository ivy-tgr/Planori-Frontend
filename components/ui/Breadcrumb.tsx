interface BreadcrumbProps {
  items: string[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <header className="border-b px-8 py-4">
      <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
        <span>$</span>
        {items.map((item, index) => (
          <span key={item}>
            <span className="mx-2">/</span>
            <span className={index === items.length - 1 ? "text-gray-900" : ""}>
              {item}
            </span>
          </span>
        ))}
      </nav>
    </header>
  );
}
