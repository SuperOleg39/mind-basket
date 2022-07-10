import { useEvent } from 'effector-react';
import React from 'react';
import {
	Block,
	blockAdded,
	blockContentChanged,
	createBlock,
} from '../../../entities/block/model/block';
import {
	Document,
	documentBlockAdded,
	documentTitleChanged,
} from '../../../entities/document/model/document';
import { createUniqueId } from '../../../shared/unique-id';
import { Line } from './line';

export const Editor = ({
	document,
	blocks,
}: {
	document: Document;
	blocks: Record<string, Block>;
}) => {
	const [changeDocumentTitle, changeBlockContent, addBlockToDocument, addBlock] = useEvent([
		documentTitleChanged,
		blockContentChanged,
		documentBlockAdded,
		blockAdded,
	]);

	const handleDocumentChange = (block: Block) => {
		changeDocumentTitle({ id: block.id, title: block.content });
	};

	const handleBlockChange = (block: Block) => {
		changeBlockContent(block);
	};

	const handleNewLine = (block: Block) => {
		let position: number;

		if (block.type === 'title') {
			position = 0;
		} else {
      position = document.blocks.indexOf(block.id) + 1;
		}

		const nextBlock = createBlock({
			id: createUniqueId('block-'),
			type: 'text',
		});

		addBlock(nextBlock);
		addBlockToDocument({ position, id: document.id, block: nextBlock });
	};

	return (
		<>
			<Line
				block={{ id: document.id, type: 'title', content: document.title }}
				onChange={handleDocumentChange}
				onNewLine={handleNewLine}
			/>

			{document.blocks.map((block) =>
				blocks[block] ? (
					<Line
						key={blocks[block].id}
						block={blocks[block]}
						onChange={handleBlockChange}
						onNewLine={handleNewLine}
					/>
				) : (
					false
				)
			)}
		</>
	);
};
