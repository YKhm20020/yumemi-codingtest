// 人口データの種類についての定数
export const PopulationTypes = {
    TOTAL: 0,
    YOUNG: 1,
    WORKING: 2,
    ELDERLY: 3,
};

// 人口データの種別に対応するラベル
export const PopulationTypeLabels = {
    [PopulationTypes.TOTAL]: '総人口',
    [PopulationTypes.YOUNG]: '年少人口',
    [PopulationTypes.WORKING]: '生産年齢人口',
    [PopulationTypes.ELDERLY]: '老年人口',
};

