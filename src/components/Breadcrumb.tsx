import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
    const allItems = [{ label: "Home", href: "/" }, ...items];

    return (
          <nav
                  aria-label="Breadcrumb"
                  className={`flex items-center gap-1 text-xs text-muted-foreground ${className}`}
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
                                                                                                                                className="hover:text-foreground transition-colors"
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
                                                                                                                                className="hover:text-foreground transition-colors"
                                                                                                                                itemProp="item"
                                                                                                                              >
                                                                                                                              <span itemProp="name">{item.label}</span>
                                                                                                          </Link>
                                                                                                      ) : (
                                                                                                        <span
                                                                                                                                className={isLast ? "font-medium text-foreground" : ""}
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
