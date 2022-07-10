import React from 'react';
import { Block } from '../../../entities/block/model/block';

export const Line = ({ block }: { block: Block }) => {
	switch (block.type) {
		case 'title': {
			return (
				<h1
					contentEditable
					dangerouslySetInnerHTML={{ __html: block.content }}
				/>
			);
		}
		case 'text': {
			return (
				<div
					contentEditable
					dangerouslySetInnerHTML={{ __html: block.content }}
				/>
			);
		}
		default: {
			return null;
		}
	}
};
