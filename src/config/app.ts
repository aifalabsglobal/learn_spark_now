/**
 * Enterprise app configuration — single source of truth for branding, legal, and support.
 */

export const APP = {
  name: 'Learn Spark Now',
  shortName: 'Learn Spark',
  tagline: 'Enterprise learning platform for data engineering & analytics',
  version: '1.0.0',
  description: 'Structured courses for Apache Spark, Kafka, Docker, Git, Python, PostgreSQL, Azure Data Factory, and Databricks. From fundamentals to production projects.',
} as const;

export const SUPPORT = {
  email: 'support@example.com',
  docsUrl: '#',
  statusUrl: '#',
  feedbackUrl: '#',
} as const;

export const LEGAL = {
  termsUrl: '/terms',
  privacyUrl: '/privacy',
  copyright: `© ${new Date().getFullYear()} ${APP.name}. All rights reserved.`,
} as const;

export const COURSES = [
  { id: 'spark', name: 'Apache Spark' },
  { id: 'kafka', name: 'Apache Kafka' },
  { id: 'docker', name: 'Docker' },
  { id: 'databricks', name: 'Databricks' },
  { id: 'datafactory', name: 'Azure Data Factory' },
  { id: 'git', name: 'Git' },
  { id: 'python', name: 'Python' },
  { id: 'postgres', name: 'PostgreSQL & SQL' },
] as const;
