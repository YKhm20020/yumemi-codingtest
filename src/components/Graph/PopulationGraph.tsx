'use client';

import type { PopulationDataPoint } from '@/types/population/populationData';
import { PopulationTypeLabels } from '@/types/population/populationType';
import type { PrefectureData } from '@/types/prefecture/prefectureData';
import { fetchPerYearPopulation } from '@/utils/population/fetchPerYearPopulation';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef, useState } from 'react';

type PopulationGraphProps = {
    prefectureData: PrefectureData[]; // 選択された都道府県データ、prefCode と 都道府県名の組の配列
    populationType: number; // 表示する人口データの種類 (0: 総人口, 1: 年少人口, 2: 生産年齢人口, 3: 老年人口)
};

export const PopulationGraph = ({ prefectureData, populationType }: PopulationGraphProps) => {
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
        tooltip: {
            // ここだけどうしても型定義がうまくいかなかった
            formatter: function (this: any): string {
                const point = this.point as { x: number; y: number; rate?: number | null };
                const baseText = `${this.series.name}<br/>
                    ${point.x}年: ${Highcharts.numberFormat(point.y, 0, '', ',')}人`;

                // 総人口以外の場合は割合も表示
                if (populationType !== 0 && point.rate != null) {
                    return `${baseText}<br/>
                    割合: ${point.rate.toFixed(1)}%`;
                }
                return baseText;
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

    // 人口種別が変更された時の処理
    useEffect(() => {
        // 指定している人口データの種類が 0 から 3 の範囲外の場合はエラーを返す
        if (populationType < 0 || populationType > 3) {
            throw new Error('指定した種類のデータ取得には対応していません。');
        }

        // 前回選択時の人口種別の人口データを表示しないようにするため、キャッシュをクリア
        populationDataCache.current = {};

        // グラフのタイトルを更新
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            title: {
                text: `都道府県別${PopulationTypeLabels[populationType]}推移のグラフ`,
            },
        }));
    }, [populationType]);

    // チェック状態が変更された時の処理
    useEffect(() => {
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
                // 新しく表示する人口データを格納する配列
                const newSeriesData: Highcharts.SeriesLineOptions[] = [];

                // 新しく都道府県が選択された場合
                if (newPrefecture) {
                    // キャッシュを確認
                    if (populationDataCache.current[newPrefecture.prefCode]) {
                        // キャッシュにある場合はキャッシュの人口データをグラフに表示
                        // キャッシュするデータは、現在の年度以前のデータにフィルタリング済みのため、再度フィルタリングする必要はない
                        newSeriesData.push({
                            type: 'line' as const,
                            name: newPrefecture.prefName,
                            data: populationDataCache.current[newPrefecture.prefCode].map(
                                (point: PopulationDataPoint) => [point.year, point.value],
                            ),
                        });
                    } else {
                        // キャッシュにない場合は新たに人口データを取得
                        const data = await fetchPerYearPopulation(
                            newPrefecture.prefCode.toString(),
                        );

                        // 取得した人口データの配列が空の場合はエラーを返す
                        if (data.result.data[populationType].data.length === 0) {
                            throw new Error('指定した種類の人口データが取得できませんでした。');
                        }

                        // 実績値のみ（区切り年以前のデータ）をフィルタリング
                        const filteredData = data.result.data[populationType].data.filter(
                            (point: PopulationDataPoint) => point.year <= data.result.boundaryYear,
                        );

                        // キャッシュに保存
                        populationDataCache.current[newPrefecture.prefCode] = filteredData;

                        // グラフに人口データを表示
                        newSeriesData.push({
                            type: 'line' as const,
                            name: newPrefecture.prefName,
                            data: filteredData.map((point: PopulationDataPoint) => ({
                                x: point.year,
                                y: point.value,
                                rate: point.rate,
                            })),
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
                    setError('人口データの取得に失敗しました。'); // ユーザー向けのエラーメッセージ
                } else {
                    setError('予期しないエラーが発生しました。');
                }
            }
        };

        // グラフに表示する人口データを更新
        updateSeriesData();

        // 現在の prefectureData をキャッシュ
        prevPrefectureDataRef.current = prefectureData;
    }, [prefectureData, populationType]);

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
