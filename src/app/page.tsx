import { PopulationChart } from '@/components/Graphs/PopulationGraph';
import { CheckBoxList } from '@/components/Lists/CheckBoxList';

export default function Home() {
    return (
        <main className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>都道府県別人口推移</h1>
            <CheckBoxList />
            <PopulationChart prefCode='1' dataType={1} />
        </main>
    );
}
