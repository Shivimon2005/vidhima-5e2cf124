import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
    /** "dark" = rendered over a dark hero background */
    tone?: "light" | "dark";
}

const Breadcrumb = ({ items, className = "", tone = "light" }: BreadcrumbProps) => {
    const allItems = [{ label: "Home", href: "/" }, ...items];
    const dark = tone === "dark";
    const baseText = dark ? "text-primary-foreground/80" : "text-muted-foreground";
    const hoverText = dark ? "hover:text-primary-foreground" : "hover:text-foreground";
    const currentText = dark ? "font-medium text-primary-foreground" : "font-medium text-foreground";

    return (
          <nav
                  aria-label="Breadcrumb"
                  className={`flex items-center gap-1 text-xs ${baseText} ${className}`}
                >
                <ol
                          className="flex flex-wrap items-center gap-1"
                          itemScope
                          itemType="https://schema.org/BreadcrumbList"
                        >
                  {allItems.map((item, index) => {
                                    const isLast = index === allItems.length - 1;
                                    const position = index + 1;
                          
                                    return (
                                                  <li
                                                                  key={index}
                                                                  className="flex items-center gap-1"
                                                                  itemProp="itemListElement"
                                                                  itemScope
                                                                  itemType="https://schema.org/ListItem"
                                                                >
                                                    {index === 0 ? (
                                                                                  <span className="flex items-center gap-1">
                                                                                                    <Home className="w-3 h-3" aria-hidden="true" />
                                                                                    {item.href && !isLast ? (
                                                                                                        <Link
                                                                                                                                to={item.href}
                                                                                                                                className={`${hoverText} transition-colors`}
                                                                                                                                itemProp="item"
                                                                                                                              >
                                                                                                                              <span itemProp="name">{item.label}</span>
                                                                                                          </Link>
                                                                                                      ) : (
                                                                                                        <span itemProp="name" aria-current={isLast ? "page" : undefined}>
                                                                                                          {item.label}
                                                                                                          </span>
                                                                                                    )}
                                                                                  </span>
                                                                                ) : (
                                                                                  <>
                                                                                                    <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
                                                                                    {item.href && !isLast ? (
                                                                                                        <Link
                                                                                                                                to={item.href}
                                                                                                                                className={`${hoverText} transition-colors`}
                                                                                                                                itemProp="item"
                                                                                                                              >
                                                                                                                              <span itemProp="name">{item.label}</span>
                                                                                                          </Link>
                                                                                                      ) : (
                                                                                                        <span
                                                                                                                                className={isLast ? currentText : ""}
                                                                                                                                itemProp="name"
                                                                                                                                aria-current={isLast ? "page" : undefined}
                                                                                                                              >
                                                                                                          {item.label}
                                                                                                          </span>
                                                                                                    )}
                                                                                  </>
                                                                                )}
                                                                <meta itemProp="position" content={String(position)} />
                                                  </li>
                                                );
                        })}
                </ol>
          </nav>
        );
};

export default Breadcrumb;
