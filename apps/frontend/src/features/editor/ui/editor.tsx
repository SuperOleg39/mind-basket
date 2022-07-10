import React from 'react';
import { useStore } from 'effector-react';
import { $blocks } from '../../../entities/block/model/block';
import { Document } from '../../../entities/document/model/document';
import { Line } from './line';

export const Editor = ({ document }: { document: Document }) => {
	const blocks = useStore($blocks);

	return (
		<>
			<Line
				block={{ id: 'title', type: 'title', content: document.title }}
			/>

			{document.blocks.map((block) =>
				blocks[block] ? <Line key={blocks[block].id} block={blocks[block]} /> : false
			)}
		</>
	);
};
