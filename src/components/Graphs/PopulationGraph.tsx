'use client';

import { fetchPerYearPopulation } from '@/utils/population/fetchPerYearPopulation';
import type { PopulationDataPoint } from '@/types/population';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

type PopulationChartProps = {
    prefCode: string; // 都道府県コード
    dataType: number; // 0: 総人口, 1: 年少人口, 2: 生産年齢人口, 3: 老年人口
};

export const PopulationChart = ({ prefCode, dataType }: PopulationChartProps) => {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPerYearPopulation(prefCode);

                if (!data.result?.data) {
                    throw new Error('人口データの取得に失敗しました');
                }

                const populationData = data.result.data[0].data;

                const options: Highcharts.Options = {
                    title: {
                        // TODO: 都道府県名を取得して 「都道府県別」 と差し替え
                        text: `都道府県別${data.result.data[dataType].label}推移`,
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
                            name: data.result.data[dataType].label,
                            data: populationData.map((point: PopulationDataPoint) => [
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
    }, [prefCode, dataType]);

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
