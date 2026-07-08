import type { ReactNode } from 'react';

export type AppShellProps = {
  title?: string;
  sidebar?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
};

export function AppShell({ title, sidebar, header, children }: AppShellProps) {
  return (
    <div className="ui-app-shell">
      {sidebar ? <aside className="ui-app-shell__sidebar">{sidebar}</aside> : null}
      <div className="ui-app-shell__main">
        {header || title ? (
          <div className="ui-app-shell__header">{header ?? <strong>{title}</strong>}</div>
        ) : null}
        <main className="ui-app-shell__content">{children}</main>
      </div>
    </div>
  );
}
