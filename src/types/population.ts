// 都道府県一覧に関するデータの返り値の型
export type PrefectureResponse = {
    prefCode: number;
    prefName: string;
};

// グラフの点が保持しているデータの型
export type PopulationDataPoint = {
    year: number;
    value: number;
    rate: number;
};

// 地域単位、年単位の年齢構成に関するデータの返り値の型
export type PopulationResponse = {
    message: string | null;
    result: {
        boundaryYear: number;
        data: {
            label: string;
            data: PopulationDataPoint[];
        }[];
    };
};
