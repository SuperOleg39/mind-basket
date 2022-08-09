import { WidgetProps } from './widget';
import { TextWidget } from './text-widget';

type TitleWidgetProps = Omit<WidgetProps, 'tag'>;

export const TitleWidget = (props: TitleWidgetProps) => {
	return <TextWidget tag="h1" {...props} />;
};
