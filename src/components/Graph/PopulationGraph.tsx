'use client';

import type { PopulationDataPoint } from '@/types/population';
import { fetchPerYearPopulation } from '@/utils/population/fetchPerYearPopulation';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

type PopulationChartProps = {
    prefCodes: string[]; // 人口データのグラフを表示する都道府県コードの配列
    dataType: number; // 表示する人口データの種類 (0: 総人口, 1: 年少人口, 2: 生産年齢人口, 3: 老年人口)
};

export const PopulationChart = ({ prefCodes, dataType }: PopulationChartProps) => {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seriesData = await Promise.all(
                    prefCodes.map(async (prefCode) => {
                        const data = await fetchPerYearPopulation(prefCode);
                        return {
                            type: 'line' as const,
                            name: data.result.data[dataType].label,
                            data: data.result.data[dataType].data.map(
                                (point: PopulationDataPoint) => [point.year, point.value],
                            ),
                        };
                    }),
                );
                console.log(seriesData);

                if (!seriesData) {
                    throw new Error('人口データの取得に失敗しました');
                }

                const options: Highcharts.Options = {
                    title: {
                        // TODO: 都道府県名を取得して 「都道府県別」 と差し替え
                        text: `都道府県別${seriesData[0].name}推移`,
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
                    series: seriesData,
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
    }, [prefCodes, dataType]);

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
