import { useEffect, useRef, ReactNode } from 'react';

type ContentEditableProps = {
	tag?: string;
	content: string;
	children?: ReactNode;
} & JSX.IntrinsicElements['div'];

export const ContentEditable = ({
	tag: Wrapper = 'div',
	content,
	...props
}: ContentEditableProps) => {
	const wrapperRef = useRef<HTMLDivElement>();

	useEffect(() => {
		const selection = window.getSelection();
		const range = window.document.createRange();

		if (wrapperRef.current && selection) {
			selection.removeAllRanges();
			range.selectNodeContents(wrapperRef.current);
			range.collapse(false);
			selection.addRange(range);
			wrapperRef.current.focus();
		}
	}, [content]);

	return (
		<Wrapper
			ref={wrapperRef}
			contentEditable
			dangerouslySetInnerHTML={{ __html: content }}
			{...props}
		/>
	);
};
