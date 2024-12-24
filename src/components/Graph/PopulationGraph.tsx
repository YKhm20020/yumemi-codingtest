'use client';

import type { PopulationDataPoint, PrefectureData } from '@/types/population';
import { fetchPerYearPopulation } from '@/utils/population/fetchPerYearPopulation';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

type PopulationGraphProps = {
    prefectureData: PrefectureData[]; // 選択された都道府県データ、prefCode と 都道府県名の組の配列
    dataType: number; // 表示する人口データの種類 (0: 総人口, 1: 年少人口, 2: 生産年齢人口, 3: 老年人口)
};

export const PopulationGraph = ({ prefectureData, dataType }: PopulationGraphProps) => {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        title: {
            text: '都道府県別人口推移のグラフ',
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
        series: [], // 初期表示はデータなし
        credits: {
            enabled: false,
        },
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!prefectureData?.length) {
            // チェックボックスが選択されていない場合、デフォルトの軸のみを表示
            setChartOptions((defaultOptions) => ({
                ...defaultOptions,
                series: [],
            }));
            return;
        }

        // TODO: データ取得がチェックが入っているデータの数だけ起こってしまう。
        // 新たにチェックが入ったデータだけを取得するようにする。
        const fetchData = async () => {
            try {
                // 選択された全都道府県データを取得し、グラフを作成
                const seriesData = await Promise.all(
                    prefectureData.map(async (prefecture) => {
                        const data = await fetchPerYearPopulation(prefecture.prefCode.toString());
                        return {
                            type: 'line' as const,
                            name: prefecture.prefName,
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

                setChartOptions((defaultOptions) => ({
                    ...defaultOptions,
                    series: seriesData,
                }));
            } catch (error) {
                setError('データの取得に失敗しました。');
            }
        };

        fetchData();
    }, [prefectureData, dataType]);

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
