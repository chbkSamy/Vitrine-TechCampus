import React from 'react';

// Define types for Strapi's blocks structure
interface Block {
  type: string;
  children: BlockChild[];
  format?: string; // For text formatting like bold, italic
  level?: number; // For headings
}

interface BlockChild {
  type: string;
  text?: string;
  children?: BlockChild[]; // For nested elements like links
  // Text formatting attributes
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface BlocksRendererProps {
  content: Block[];
}

const TextNode: React.FC<{ node: BlockChild }> = ({ node }) => {
  let renderedText: React.ReactNode = node.text;

  if (node.bold) renderedText = <strong>{renderedText}</strong>;
  if (node.italic) renderedText = <em>{renderedText}</em>;
  if (node.underline) renderedText = <u>{renderedText}</u>;
  if (node.strikethrough) renderedText = <del>{renderedText}</del>;
  if (node.code) renderedText = <code>{renderedText}</code>;

  return <>{renderedText}</>;
};

const BlocksRenderer: React.FC<BlocksRendererProps> = ({ content }) => {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null;
  }

  return (
    <>
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={index}>
              {block.children.map((child, childIndex) => (
                <TextNode key={childIndex} node={child} />
              ))}
            </p>;
          case 'heading':
            const HeadingTag = `h${block.level || 1}` as React.ElementType;
            return <HeadingTag key={index}>
              {block.children.map((child, childIndex) => (
                <TextNode key={childIndex} node={child} />
              ))}
            </HeadingTag>;
          // Add more block types as needed (list, quote, image, etc.)
          default:
            // Fallback for unsupported block types
            return <p key={index}>
              {block.children.map((child, childIndex) => (
                <TextNode key={childIndex} node={child} />
              ))}
            </p>;
        }
      })}
    </>
  );
};

export default BlocksRenderer;
