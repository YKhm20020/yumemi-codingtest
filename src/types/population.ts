// 都道府県に関するデータの型
export type PrefectureData = {
    prefCode: number; // 都道府県ごとに一意なID
    prefName: string; // 都道府県名
};

// 都道府県一覧に関するデータの返り値の型
export type PrefectureResponse = {
    message: string | null; // メッセージ
    result: PrefectureData[]; // 都道府県データの配列
};

// グラフの点が保持しているデータの型
export type PopulationDataPoint = {
    year: number; // 年
    value: number; // 人口
    rate: number; // 人口の変化率
};

// 地域単位、年単位の年齢構成に関するデータの返り値の型
export type PopulationResponse = {
    message: string | null; // メッセージ
    result: {
        boundaryYear: number; // 境界年
        data: {
            label: string; // ラベル
            data: PopulationDataPoint[]; // 人口データ
        }[];
    };
};
