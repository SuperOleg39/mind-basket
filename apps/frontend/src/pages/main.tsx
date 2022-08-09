import { Workspace } from '../features/workspace';
import { Layout } from '../shared/ui/layout/layout';

export const MainPage = () => {
    return <Layout sidebar={<Workspace />} main={null} />;
};
