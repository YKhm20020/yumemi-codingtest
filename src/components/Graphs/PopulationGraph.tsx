'use client';

import { fetchPerYearPopulation } from '@/app/utils/Population/fetchPerYearPopulation';
import type { PopulationDataPoint } from '@/types/population';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

type PopulationChartProps = {
    prefCode: string;
};

export const PopulationChart = ({ prefCode }: PopulationChartProps) => {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPerYearPopulation(prefCode);

                if (!data.result?.data) {
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

                setChartOptions(options);
            } catch (error) {
                setError('データの取得に失敗しました。');
            }
        };

        fetchData();
    }, [prefCode]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!chartOptions) {
        return <div>読み込み中...</div>;
    }

    return (
        <div className='w-full h-full'>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};
