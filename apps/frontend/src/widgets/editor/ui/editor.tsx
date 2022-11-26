import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
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
import { undoEvent } from '../model/local-history';

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
		handleUndo,
	] = useEvent([
		titleChangedEvent,
		lineChangedEvent,
		newLineEvent,
		deleteLineEvent,
		blockFocusedEvent,
		undoEvent,
	]);

	useEffect(() => {
		const callback = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
				event.preventDefault();
				handleUndo({ document });
			}
		};

		window.document.addEventListener('keydown', callback);

		return () => window.document.removeEventListener('keydown', callback);
	}, [handleUndo, document]);

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
