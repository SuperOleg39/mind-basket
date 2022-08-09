import { useEvent } from 'effector-react';
import { Block } from '../../../entities/block/model/block';
import { Document } from '../../../entities/document/model/document';
import { Widget } from '../../../features/widget';
import {
	titleChangedEvent,
	lineChangedEvent,
	newLineEvent,
} from '../model/editor';

export const Editor = ({
	document,
	blocks,
}: {
	document: Document;
	blocks: Record<string, Block>;
}) => {
	const [handleTitleChange, handleLineChange, handleNewLine] = useEvent([
		titleChangedEvent,
		lineChangedEvent,
		newLineEvent,
	]);

	return (
		<>
			<Widget
				key={document.id}
				document={document}
				block={{
					id: document.id,
					type: 'title',
					content: document.title,
				}}
				onChange={handleTitleChange}
				onNewLine={handleNewLine}
			/>
			{document.blocks.map((block) =>
				blocks[block] ? (
					<Widget
						document={document}
						key={blocks[block].id}
						block={blocks[block]}
						onChange={handleLineChange}
						onNewLine={handleNewLine}
					/>
				) : (
					false
				)
			)}
		</>
	);
};
