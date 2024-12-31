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
