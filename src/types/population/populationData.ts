// 都道府県に関するデータ型
export type PrefectureData = {
    prefCode: number; // 都道府県ごとに一意なID
    prefName: string; // 都道府県名
};

// 都道府県一覧に関するデータの返り値の型
export type PrefectureResponse = {
    message: string | null; // メッセージ
    result: PrefectureData[]; // 都道府県データの配列
};

// グラフの点が保持しているデータ型
export type PopulationDataPoint = {
    year: number; // 年
    value: number; // 人口
    rate: number | null; // 人口種別ごとの全人口に対する割合、総人口の場合は null
};

// 年ごとの人口データについてのデータ型
export type PopulationDataPerYear = {
    boundaryYear: number; // 実績値と推計値の区切り年
    data: {
        label: string; // ラベル
        data: PopulationDataPoint[]; // 人口データ
    }[];
};

// 地域単位、年ごとの人口データ取得時の返り値の型
export type PopulationDataPerYearResponse = {
    message: string | null; // メッセージ
    result: PopulationDataPerYear; // 年ごとの人口データ
};
