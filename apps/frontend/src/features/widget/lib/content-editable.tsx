import { useEffect, useRef, ReactNode } from 'react';

type ContentEditableProps = {
	tag?: string;
	content: string;
	focused?: boolean;
	children?: ReactNode;
} & JSX.IntrinsicElements['div'];

export const ContentEditable = ({
	tag: Wrapper = 'div',
	content,
	focused,
	...props
}: ContentEditableProps) => {
	const wrapperRef = useRef<HTMLDivElement>();

	useEffect(() => {
		if (typeof focused === 'boolean' && !focused) {
			return;
		}

		const selection = window.getSelection();
		const range = window.document.createRange();

		if (wrapperRef.current && selection) {
			selection.removeAllRanges();
			range.selectNodeContents(wrapperRef.current);
			range.collapse(false);
			selection.addRange(range);
			wrapperRef.current.focus();
		}
	}, [content, focused]);

	return (
		<Wrapper
			ref={wrapperRef}
			contentEditable
			dangerouslySetInnerHTML={{ __html: content }}
			{...props}
		/>
	);
};
