import { useEvent, useStore } from 'effector-react';
import { Block } from '../../../entities/block/model/block';
import { Document } from '../../../entities/document/model/document';
import { Widget } from '../../../features/widget';
import {
	titleChangedEvent,
	lineChangedEvent,
	newLineEvent,
	deleteLineEvent,
	blockFocusedEvent,
	$focusedBlock,
} from '../model/editor';

export const Editor = ({
	document,
	blocks,
}: {
	document: Document;
	blocks: Record<string, Block>;
}) => {
	const focusedBlockId = useStore($focusedBlock);

	const [
		handleTitleChange,
		handleLineChange,
		handleNewLine,
		handleDeleteLine,
		handleFocus,
	] = useEvent([
		titleChangedEvent,
		lineChangedEvent,
		newLineEvent,
		deleteLineEvent,
		blockFocusedEvent,
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
				focused={document.id === focusedBlockId}
				onChange={handleTitleChange}
				onNewLine={handleNewLine}
				onDeleteLine={handleDeleteLine}
				onFocus={() => handleFocus(document.id)}
				onBlur={() => handleFocus(null)}
			/>
			{document.blocks.map((block) =>
				blocks[block] ? (
					<Widget
						document={document}
						key={blocks[block].id}
						block={blocks[block]}
						focused={block === focusedBlockId}
						onChange={handleLineChange}
						onNewLine={handleNewLine}
						onDeleteLine={handleDeleteLine}
						onFocus={() => handleFocus(block)}
						onBlur={() => handleFocus(null)}
					/>
				) : (
					false
				)
			)}
		</>
	);
};
