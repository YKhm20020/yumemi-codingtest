import { PopulationDashboard } from '@/components/Dashboard/PopulationDashboard';
import { Header } from '@/components/Header/Header';

export default function Home() {
    return (
        <>
            <Header title='都道府県別人口推移' />
            <main className='container mx-auto pt-30 px-4'>
                <PopulationDashboard />
            </main>
        </>
    );
}
