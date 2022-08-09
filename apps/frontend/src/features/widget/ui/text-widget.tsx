import { WidgetProps } from './widget';
import { ContentEditable } from '../lib/content-editable';

export type TextWidgetProps = {
	tag?: string;
} & WidgetProps;

export const TextWidget = ({
	document,
	block,
	tag,
	onChange,
	onNewLine,
}: TextWidgetProps) => {
	return (
		<ContentEditable
			tag={tag}
			content={block.content}
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
				}
			}}
		/>
	);
};
