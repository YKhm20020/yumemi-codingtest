import { PopulationDashboard } from '@/components/Dashboard/PopulationDashboard';

export default function Home() {
    return (
        <main className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>都道府県別人口推移</h1>
            <PopulationDashboard />
        </main>
    );
}
