import { PopulationChart } from '@/components/Graph/PopulationGraph';
import { CheckBoxList } from '@/components/List/CheckBoxList';

export const PopulationDashboard = () => {
    return (
        <div>
            <CheckBoxList />
            <PopulationChart prefCodes={['1', '2', '3']} dataType={1} />
        </div>
    );
};
