import { Block } from '../../../entities/block/model/block';
import { Document } from '../../../entities/document/model/document';
import { TextWidget } from './text-widget';
import { TitleWidget } from './title-widget';

export interface WidgetProps {
	document: Document;
	block: Block;
	onChange: (params: { block: Block; document: Document }) => void;
	onNewLine: (params: { block: Block; document: Document }) => void;
}

const widgetsMap = {
	title: TitleWidget,
	text: TextWidget,
};

export const Widget = ({ block, ...props }: WidgetProps) => {
	const WidgetComponent = widgetsMap[block.type];

	return <WidgetComponent block={block} {...props} />;
};
