import React from "react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({ title, description, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-6 animate-fadeInUp">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          {breadcrumbs.map((b, index) => (
            <React.Fragment key={index}>
              {b.href ? (
                <Link href={b.href} className="hover:text-primary transition-colors">
                  {b.label}
                </Link>
              ) : (
                <span className="text-slate-700 font-medium">{b.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Header Layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h1>
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
        
        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
