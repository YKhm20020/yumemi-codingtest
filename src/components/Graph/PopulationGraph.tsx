'use client';

import type { PopulationDataPoint, PrefectureData } from '@/types/population';
import { PopulationTypeLabels } from '@/types/population/populationType';
import { fetchPerYearPopulation } from '@/utils/population/fetchPerYearPopulation';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef, useState } from 'react';
type PopulationGraphProps = {
    prefectureData: PrefectureData[]; // 選択された都道府県データ、prefCode と 都道府県名の組の配列
    dataType: number; // 表示する人口データの種類 (0: 総人口, 1: 年少人口, 2: 生産年齢人口, 3: 老年人口)
};

export const PopulationGraph = ({ prefectureData, dataType }: PopulationGraphProps) => {
    // 人口データを表示するグラフのオプション
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

    // エラーを表示するための state
    const [error, setError] = useState<string | null>(null);

    // 前回の prefectureData を保持するための ref オブジェクト
    const prevPrefectureDataRef = useRef<PrefectureData[]>([]);
    // キャッシュ用のオブジェクト
    const populationDataCache = useRef<{ [key: number]: PopulationDataPoint[] }>({});

    // 人口種別が変更された時にタイトルを更新
    useEffect(() => {
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            title: {
                text: `都道府県別${PopulationTypeLabels[dataType]}推移のグラフ`,
            },
        }));
    }, [dataType]);

    useEffect(() => {
        // 指定している人口データの種類が 0 から 3 の範囲外の場合はエラーを返す
        if (dataType < 0 || dataType > 3) {
            throw new Error('指定した種類のデータが取得できませんでした。');
        }

        // 前回の prefectureData を取得
        const prevPrefectureData = prevPrefectureDataRef.current;

        // 新しくチェックが入った都道府県を特定
        const newPrefecture = prefectureData.find(
            (pref) => !prevPrefectureData.some((prevPref) => prevPref.prefCode === pref.prefCode),
        );

        // チェックが外れた都道府県を特定
        const removedPrefectures = prevPrefectureData.filter(
            (prevPref) => !prefectureData.some((pref) => pref.prefCode === prevPref.prefCode),
        );

        // グラフに表示する人口データを更新する関数
        // キャッシュを確認して、キャッシュにある場合はキャッシュを使用し、キャッシュにない場合は新たにデータを取得する
        const updateSeriesData = async () => {
            try {
                const newSeriesData: Highcharts.SeriesLineOptions[] = [];
                if (newPrefecture) {
                    // キャッシュを確認
                    if (populationDataCache.current[newPrefecture.prefCode]) {
                        newSeriesData.push({
                            type: 'line' as const,
                            name: newPrefecture.prefName,
                            data: populationDataCache.current[newPrefecture.prefCode].map(
                                (point: PopulationDataPoint) => [point.year, point.value],
                            ),
                        });
                    } else {
                        // キャッシュにない場合はデータを取得
                        const data = await fetchPerYearPopulation(
                            newPrefecture.prefCode.toString(),
                        );

                        if (data.result.data[dataType].data.length === 0) {
                            throw new Error('指定した種類の人口データが取得できませんでした。');
                        }

                        // キャッシュに保存
                        populationDataCache.current[newPrefecture.prefCode] =
                            data.result.data[dataType].data;

                        newSeriesData.push({
                            type: 'line' as const,
                            name: newPrefecture.prefName,
                            data: data.result.data[dataType].data.map(
                                (point: PopulationDataPoint) => [point.year, point.value],
                            ),
                        });
                    }
                }

                setChartOptions((defaultOptions) => ({
                    ...defaultOptions,
                    series: [
                        ...(defaultOptions.series || []).filter(
                            (series) =>
                                !removedPrefectures.some((pref) => pref.prefName === series.name),
                        ),
                        ...newSeriesData,
                    ],
                }));
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('データの取得に失敗しました。');
                }
            }
        };

        updateSeriesData();

        // 現在の prefectureData をキャッシュ
        prevPrefectureDataRef.current = prefectureData;
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
