import { fetchPerYearPopulation } from '@/app/utils/Population/fetchPerYearPopulation';
import type { PopulationDataPoint } from '@/types/population';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type PopulationChartProps = {
    prefCode: string;
};

export async function PopulationChart({ prefCode }: PopulationChartProps) {
    try {
        const data = await fetchPerYearPopulation();

        if (!data.result?.data?.[0]?.data) {
            throw new Error('人口データの取得に失敗しました');
        }

        const totalPopulation = data.result.data[0].data;

        const options: Highcharts.Options = {
            title: {
                text: '都道府県別総人口推移',
            },
            xAxis: {
                title: {
                    text: '年度',
                },
                crosshair: true,
            },
            yAxis: {
                title: {
                    text: '人口数',
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(Number(this.value), 0, '', ',');
                    },
                },
            },
            tooltip: {
                formatter: function () {
                    return `${this.series.name}<br/>${this.x}年: ${Highcharts.numberFormat(Number(this.y) || 0, 0, '', ',')}人`;
                },
            },
            series: [
                {
                    type: 'line',
                    name: '総人口',
                    data: totalPopulation.map((point: PopulationDataPoint) => [
                        point.year,
                        point.value,
                    ]),
                },
            ],
            credits: {
                enabled: false,
            },
        };

        return (
            <div className='w-full h-[600px]'>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching population data:', error);
        return <div>データの取得に失敗しました。</div>;
    }
}
