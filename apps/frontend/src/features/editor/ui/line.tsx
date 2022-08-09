import React, { useEffect, useRef } from 'react';
import { Block, BlockType } from '../../../entities/block/model/block';

export const Line = ({
	block,
	onChange,
	onNewLine,
}: {
	block: Block;
	onChange: (block: Block) => void;
	onNewLine: (block: Block) => void;
}) => {
	// const contentRef = useRef(block.content);
	const lineRef = useRef<HTMLElement>();

	useEffect(() => {
		const selection = window.getSelection();
		const range = document.createRange();  

		if (lineRef.current && selection) {
			selection.removeAllRanges();  
			range.selectNodeContents(lineRef.current);  
			range.collapse(false);  
			selection.addRange(range);  
			lineRef.current.focus();
		}
	});

	switch (block.type) {
		case 'title': {
			return (
				<h1
					// @ts-expect-error
					ref={lineRef}
					contentEditable
					dangerouslySetInnerHTML={{ __html: block.content }}
					onInput={(e) => {
						onChange({
							id: block.id,
							type: block.type,
							content: e.currentTarget.innerText,
						});
					}}
					onKeyDown={(e) => {
						if (e.code === 'Enter' && !e.shiftKey) {
							onNewLine(block);
							e.preventDefault();
						}
					}}
				/>
			);
		}
		case 'text': {
			return (
				<div
					// @ts-expect-error
					ref={lineRef}
					contentEditable
					dangerouslySetInnerHTML={{ __html: block.content }}
					onInput={(e) => {
						onChange({
							id: block.id,
							type: block.type,
							content: e.currentTarget.innerHTML,
						});
					}}
					onKeyDown={(e) => {
						if (e.code === 'Enter' && !e.shiftKey) {
							onNewLine(block);
							e.preventDefault();
						}
					}}
				/>
			);
		}
		default: {
			return null;
		}
	}
};
