// Blog Feature - Notion Block Renderer
// Converts Notion API blocks to styled JSX for the ebook reader

import type { NotionBlock, NotionRichText } from '../data/blog-types';

function RichText({ richText }: { richText: NotionRichText[] }) {
  if (!richText?.length) return null;

  return (
    <>
      {richText.map((text, i) => {
        let element: React.ReactNode = text.plain_text;
        const { annotations } = text;

        if (annotations?.code) {
          element = (
            <code className="rounded bg-[var(--reader-code-bg)] px-1.5 py-0.5 font-mono text-[0.875em]">
              {element}
            </code>
          );
        }
        if (annotations?.bold) element = <strong>{element}</strong>;
        if (annotations?.italic) element = <em>{element}</em>;
        if (annotations?.strikethrough) element = <s>{element}</s>;
        if (annotations?.underline) element = <u>{element}</u>;

        if (text.href) {
          element = (
            <a
              href={text.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[var(--reader-muted)] underline-offset-2 transition-colors hover:decoration-[var(--reader-fg)]"
            >
              {element}
            </a>
          );
        }

        return <span key={i}>{element}</span>;
      })}
    </>
  );
}

function BlockRenderer({ block }: { block: NotionBlock }) {
  const content = block[block.type];

  switch (block.type) {
    case 'paragraph':
      if (!content?.rich_text?.length) return <div className="h-4" />;
      return (
        <p className="mb-6 leading-[inherit]">
          <RichText richText={content.rich_text} />
        </p>
      );

    case 'heading_1':
      return (
        <h2
          id={block.id}
          className="mb-4 mt-12 scroll-mt-24 text-[1.75em] font-bold tracking-tight first:mt-0"
        >
          <RichText richText={content.rich_text} />
        </h2>
      );

    case 'heading_2':
      return (
        <h3
          id={block.id}
          className="mb-3 mt-10 scroll-mt-24 text-[1.375em] font-semibold tracking-tight first:mt-0"
        >
          <RichText richText={content.rich_text} />
        </h3>
      );

    case 'heading_3':
      return (
        <h4
          id={block.id}
          className="mb-2 mt-8 scroll-mt-24 text-[1.125em] font-semibold first:mt-0"
        >
          <RichText richText={content.rich_text} />
        </h4>
      );

    case 'bulleted_list_item':
      return (
        <li className="mb-2 ml-6 list-disc leading-[inherit]">
          <RichText richText={content.rich_text} />
          {block.children && (
            <ul className="mt-2">
              {block.children.map((child) => (
                <BlockRenderer key={child.id} block={child} />
              ))}
            </ul>
          )}
        </li>
      );

    case 'numbered_list_item':
      return (
        <li className="mb-2 ml-6 list-decimal leading-[inherit]">
          <RichText richText={content.rich_text} />
          {block.children && (
            <ol className="mt-2">
              {block.children.map((child) => (
                <BlockRenderer key={child.id} block={child} />
              ))}
            </ol>
          )}
        </li>
      );

    case 'to_do':
      return (
        <div className="mb-2 flex items-start gap-3">
          <div
            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
              content.checked
                ? 'border-[var(--reader-fg)] bg-[var(--reader-fg)]'
                : 'border-[var(--reader-muted)]'
            }`}
          >
            {content.checked && (
              <svg className="h-3 w-3 text-[var(--reader-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className={content.checked ? 'line-through opacity-60' : ''}>
            <RichText richText={content.rich_text} />
          </span>
        </div>
      );

    case 'code': {
      const language = content.language || '';
      const codeText = content.rich_text?.map((t: NotionRichText) => t.plain_text).join('') || '';
      return (
        <div className="group relative my-6">
          {language && (
            <div className="absolute right-3 top-3 rounded bg-[var(--reader-muted)]/20 px-2 py-0.5 font-mono text-xs text-[var(--reader-muted)]">
              {language}
            </div>
          )}
          <pre className="overflow-x-auto rounded-lg border border-[var(--reader-border)] bg-[var(--reader-code-bg)] p-4 font-mono text-[0.875em] leading-relaxed">
            <code>{codeText}</code>
          </pre>
          {content.caption?.length > 0 && (
            <p className="mt-2 text-center text-sm text-[var(--reader-muted)]">
              <RichText richText={content.caption} />
            </p>
          )}
        </div>
      );
    }

    case 'image': {
      const src =
        content.type === 'external'
          ? content.external?.url
          : content.file?.url;
      if (!src) return null;
      const caption = content.caption?.[0]?.plain_text || '';
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={caption}
            className="w-full rounded-lg border border-[var(--reader-border)]"
            loading="lazy"
          />
          {caption && (
            <figcaption className="mt-3 text-center text-sm text-[var(--reader-muted)]">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'divider':
      return (
        <hr className="my-10 border-t border-[var(--reader-border)]" />
      );

    case 'quote':
      return (
        <blockquote className="my-6 border-l-4 border-[var(--reader-fg)] pl-6 italic opacity-90">
          <RichText richText={content.rich_text} />
        </blockquote>
      );

    case 'callout': {
      const emoji = content.icon?.emoji || '';
      return (
        <div className="my-6 flex gap-4 rounded-lg border border-[var(--reader-border)] bg-[var(--reader-code-bg)] p-5">
          {emoji && <span className="shrink-0 text-xl">{emoji}</span>}
          <div className="leading-[inherit]">
            <RichText richText={content.rich_text} />
          </div>
        </div>
      );
    }

    case 'bookmark':
      return (
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="my-4 block rounded-lg border border-[var(--reader-border)] p-4 transition-colors hover:bg-[var(--reader-code-bg)]"
        >
          <span className="text-sm text-[var(--reader-muted)]">{content.url}</span>
          {content.caption?.length > 0 && (
            <p className="mt-1 text-sm">
              <RichText richText={content.caption} />
            </p>
          )}
        </a>
      );

    case 'toggle':
      return (
        <details className="my-4 rounded-lg border border-[var(--reader-border)] p-4">
          <summary className="cursor-pointer font-medium">
            <RichText richText={content.rich_text} />
          </summary>
          {block.children && (
            <div className="mt-3 pl-4">
              {block.children.map((child) => (
                <BlockRenderer key={child.id} block={child} />
              ))}
            </div>
          )}
        </details>
      );

    case 'table':
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse rounded-lg border border-[var(--reader-border)]">
            <tbody>
              {block.children?.map((row, rowIndex) => (
                <tr key={row.id} className={rowIndex === 0 && content.has_column_header ? 'font-semibold' : ''}>
                  {row.table_row?.cells?.map((cell: NotionRichText[], cellIndex: number) => {
                    const Tag = (rowIndex === 0 && content.has_column_header) || (cellIndex === 0 && content.has_row_header) ? 'th' : 'td';
                    return (
                      <Tag
                        key={cellIndex}
                        className="border border-[var(--reader-border)] p-3 text-left"
                      >
                        <RichText richText={cell} />
                      </Tag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'embed':
    case 'video': {
      const url = content.type === 'external' ? content.external?.url : content.url;
      if (!url) return null;
      return (
        <div className="my-6 aspect-video overflow-hidden rounded-lg border border-[var(--reader-border)]">
          <iframe
            src={url}
            className="h-full w-full"
            allowFullScreen
            loading="lazy"
            title="Embedded content"
          />
        </div>
      );
    }

    default:
      return null;
  }
}

/**
 * Groups consecutive list items into proper <ul> / <ol> wrappers
 */
function groupBlocks(blocks: NotionBlock[]): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === 'bulleted_list_item') {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(blocks[i]);
        i++;
      }
      result.push(
        <ul key={items[0].id} className="my-4">
          {items.map((item) => (
            <BlockRenderer key={item.id} block={item} />
          ))}
        </ul>
      );
    } else if (block.type === 'numbered_list_item') {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(blocks[i]);
        i++;
      }
      result.push(
        <ol key={items[0].id} className="my-4">
          {items.map((item) => (
            <BlockRenderer key={item.id} block={item} />
          ))}
        </ol>
      );
    } else if (block.type === 'to_do') {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === 'to_do') {
        items.push(blocks[i]);
        i++;
      }
      result.push(
        <div key={items[0].id} className="my-4">
          {items.map((item) => (
            <BlockRenderer key={item.id} block={item} />
          ))}
        </div>
      );
    } else {
      result.push(<BlockRenderer key={block.id} block={block} />);
      i++;
    }
  }

  return result;
}

export function NotionBlockRenderer({ blocks }: { blocks: NotionBlock[] }) {
  return <>{groupBlocks(blocks)}</>;
}
