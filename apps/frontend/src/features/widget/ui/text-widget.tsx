import { WidgetProps } from './widget';
import { ContentEditable } from '../lib/content-editable';

export type TextWidgetProps = {
	tag?: string;
} & WidgetProps;

export const TextWidget = ({
	document,
	block,
	tag,
	focused,
	onChange,
	onNewLine,
	onDeleteLine,
	onFocus,
	onBlur,
}: TextWidgetProps) => {
	return (
		<ContentEditable
			tag={tag}
			content={block.content}
			focused={focused}
			onInput={(e) => {
				onChange({
					document,
					block: {
						id: block.id,
						type: block.type,
						content: e.currentTarget.innerText,
					},
				});
			}}
			onKeyDown={(e) => {
				if (e.code === 'Enter' && !e.shiftKey) {
					onNewLine({ document, block });
					e.preventDefault();
				} else if (
					e.code === 'Backspace' &&
					!e.shiftKey &&
					e.currentTarget.innerText.length === 0
				) {
					onDeleteLine({ document, block });
					e.preventDefault();
				}
			}}
			onFocus={(e) => {
				onFocus({ document, block });
			}}
			onBlur={(e) => {
				onBlur({ document, block });
			}}
		/>
	);
};
