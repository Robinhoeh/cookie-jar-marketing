// Shared product data used by Slack frames on the marketing site.
// Mirrors the data shown in real /cookie shelf and /cookie me output.

export interface ShelfTool {
  name: string
  owner: string | null
  policy: 'auto' | 'manual'
}

export const SHELF_TOOLS: ShelfTool[] = [
  { name: '1password', owner: null,    policy: 'manual' },
  { name: 'aws',       owner: 'priya', policy: 'manual' },
  { name: 'bitwarden', owner: 'priya', policy: 'manual' },
  { name: 'claude',    owner: 'priya', policy: 'manual' },
  { name: 'cursor',    owner: null,    policy: 'manual' },
  { name: 'datadog',   owner: 'priya', policy: 'manual' },
  { name: 'figma',     owner: null,    policy: 'manual' },
  { name: 'github',    owner: null,    policy: 'manual' },
  { name: 'jira',      owner: null,    policy: 'manual' },
  { name: 'linear',    owner: 'priya', policy: 'manual' },
  { name: 'notion',    owner: null,    policy: 'manual' },
  { name: 'stripe',    owner: null,    policy: 'manual' },
  { name: 'vercel',    owner: null,    policy: 'auto'   },
]

export interface JarItem {
  tool: string
  grantor: 'mention' | 'name'
}

export const ROBIN_JAR: JarItem[] = [
  { tool: 'figma',     grantor: 'mention' },
  { tool: 'loom',      grantor: 'name'    },
  { tool: 'github',    grantor: 'name'    },
  { tool: 'notion',    grantor: 'mention' },
  { tool: 'cursor',    grantor: 'mention' },
  { tool: 'aws',       grantor: 'name'    },
  { tool: 'claude',    grantor: 'name'    },
  { tool: 'stripe',    grantor: 'mention' },
  { tool: 'sentry',    grantor: 'name'    },
  { tool: 'pagerduty', grantor: 'name'    },
  { tool: 'bitwarden', grantor: 'mention' },
  { tool: 'vercel',    grantor: 'mention' },
  { tool: 'datadog',   grantor: 'mention' },
  { tool: 'jira',      grantor: 'mention' },
]
