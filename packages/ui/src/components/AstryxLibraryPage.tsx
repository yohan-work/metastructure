'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import {
  ChatMessage,
  ChatMessageBubble,
  ChatMessageList,
  ChatSystemMessage,
  ChatToolCalls
} from '@astryxdesign/core/Chat';
import { Heading } from '@astryxdesign/core/Heading';
import { Switch } from '@astryxdesign/core/Switch';
import { Table } from '@astryxdesign/core/Table';
import { proportional, type TableColumn } from '@astryxdesign/core/Table/utils';
import { Text } from '@astryxdesign/core/Text';
import { TextArea } from '@astryxdesign/core/TextArea';
import { TextInput } from '@astryxdesign/core/TextInput';

type ComponentRow = {
  component: string;
  packagePath: string;
  status: string;
};

const componentNav = [
  'Overview',
  'Button',
  'Card',
  'Badge',
  'Text Input',
  'Switch',
  'Table',
  'Chat',
  'Templates'
];

const templateLinks = [
  ['/examples/landing', 'Landing'],
  ['/examples/admin', 'Admin'],
  ['/examples/table', 'Table page'],
  ['/examples/detail', 'Detail page'],
  ['/examples/form', 'Form wizard'],
  ['/examples/chat', 'AI chat']
];

const tableRows: ComponentRow[] = [
  { component: 'Button', packagePath: '@astryxdesign/core/Button', status: 'exported' },
  { component: 'TextInput', packagePath: '@astryxdesign/core/TextInput', status: 'exported' },
  { component: 'Table', packagePath: '@astryxdesign/core/Table', status: 'exported' },
  { component: 'Chat', packagePath: '@astryxdesign/core/Chat', status: 'exported' }
];

export function AstryxLibraryPage() {
  const [query, setQuery] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState('Astryx components are now rendered through @repo/ui.');

  const columns = useMemo<Array<TableColumn<ComponentRow>>>(
    () => [
      { key: 'component', header: 'Component', width: proportional(1) },
      { key: 'packagePath', header: 'Package path', width: proportional(2) },
      {
        key: 'status',
        header: 'Status',
        width: proportional(1),
        renderCell: (row) => <Badge variant="success" label={row.status} />
      }
    ],
    []
  );

  return (
    <div className="astryx-shell">
      <aside className="astryx-sidebar">
        <a className="astryx-logo" href="/" aria-label="Astryx UI Kit home">
          <span />
          <span />
          <span />
          <span />
        </a>
        <TextInput
          label="Search components"
          isLabelHidden
          value={query}
          onChange={setQuery}
          placeholder="Search components..."
          width="100%"
        />
        <nav className="astryx-side-nav" aria-label="Rendered Astryx components">
          {componentNav.map((item) => (
            <a href={`#${slug(item)}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <div className="astryx-main">
        <header className="astryx-topbar">
          <nav aria-label="Primary">
            <a href="#overview">Docs</a>
            <a className="is-active" href="#components">Components</a>
            <a href="#templates">Templates</a>
            <a href="#overview">Themes</a>
            <a href="/examples/admin">Playground</a>
          </nav>
          <Button label="Get started" href="/examples/landing" variant="primary" />
        </header>

        <main className="astryx-content">
          <section id="overview" className="astryx-hero">
            <Heading level={1} type="display-1">Browse the library</Heading>
            <Text type="large" color="secondary">
              Official Astryx components, re-exported through @repo/ui and rendered in this playground.
            </Text>
            <Button label="Install core library" variant="primary" href="#components" />
          </section>

          <section id="components" className="astryx-section">
            <Heading level={2}>Rendered components</Heading>
            <div className="astryx-grid">
              <PreviewCard id="button" title="Button">
                <div className="astryx-row">
                  <Button label="Primary" variant="primary" />
                  <Button label="Secondary" variant="secondary" />
                  <Button label="Ghost" variant="ghost" />
                  <Button label="Destructive" variant="destructive" />
                </div>
              </PreviewCard>

              <PreviewCard id="card" title="Card">
                <Card variant="muted" padding={4} width="100%">
                  <Heading level={3}>Card content</Heading>
                  <Text color="secondary">This is the real Astryx Card component.</Text>
                  <div className="astryx-row">
                    <Badge label="neutral" />
                    <Badge variant="info" label="info" />
                    <Badge variant="success" label="success" />
                  </div>
                </Card>
              </PreviewCard>

              <PreviewCard id="badge" title="Badge">
                <div className="astryx-row">
                  <Badge label="Neutral" />
                  <Badge variant="warning" label="Warning" />
                  <Badge variant="error" label="Error" />
                  <Badge variant="purple" label="Purple" />
                </div>
              </PreviewCard>

              <PreviewCard id="text-input" title="Text Input">
                <TextInput
                  label="Component search"
                  value={query}
                  onChange={setQuery}
                  placeholder="Button, Table, Chat..."
                  width="100%"
                />
              </PreviewCard>

              <PreviewCard id="switch" title="Switch">
                <Switch
                  label="Enable neutral dark theme"
                  description="Controlled Astryx switch state"
                  value={enabled}
                  onChange={setEnabled}
                />
              </PreviewCard>

              <PreviewCard id="text-area" title="Text Area">
                <TextArea
                  label="Implementation note"
                  value={message}
                  onChange={setMessage}
                  rows={4}
                  width="100%"
                />
              </PreviewCard>
            </div>
          </section>

          <section id="table" className="astryx-section">
            <Heading level={2}>Table</Heading>
            <Card padding={4}>
              <Table
                data={tableRows}
                columns={columns}
                density="compact"
                dividers="grid"
                hasHover
              />
            </Card>
          </section>

          <section id="chat" className="astryx-section">
            <Heading level={2}>Chat</Heading>
            <Card padding={4}>
              <ChatMessageList>
                <ChatSystemMessage variant="divider">Today</ChatSystemMessage>
                <ChatMessage sender="user">
                  <ChatMessageBubble metadata="09:42">이 화면 Astryx 컴포넌트로 구성된 거 맞아?</ChatMessageBubble>
                </ChatMessage>
                <ChatMessage sender="assistant">
                  <ChatMessageBubble metadata="09:43">
                    네. Button, Card, Badge, TextInput, Switch, Table, Chat 컴포넌트를 실제 패키지에서 렌더링합니다.
                  </ChatMessageBubble>
                  <ChatToolCalls
                    calls={[
                      {
                        name: 'inspect_astryx_exports',
                        status: 'complete',
                        target: '@astryxdesign/core',
                        duration: '0.4s'
                      }
                    ]}
                  />
                </ChatMessage>
              </ChatMessageList>
            </Card>
          </section>

          <section id="templates" className="astryx-section">
            <Heading level={2}>Templates</Heading>
            <div className="astryx-template-grid">
              {templateLinks.map(([href, label]) => (
                <Card padding={4} key={href}>
                  <Text type="large" weight="semibold" display="block">{label}</Text>
                  <Text color="secondary" display="block">{href}</Text>
                  <Button label="Open" href={href} variant="secondary" size="sm" />
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function PreviewCard({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="astryx-preview">
      <div className="astryx-preview__stage">{children}</div>
      <Text color="secondary" display="block">{title}</Text>
    </section>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}
