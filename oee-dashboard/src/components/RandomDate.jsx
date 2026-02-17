const months = [
  "янв.", "фев.", "март", "апр.", "май", "июнь",
  "июль", "авг.", "сен.", "окт.", "нояб.", "дек."
];

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeSeries(name) {
  return {
    name,
    data: months.map(() => rnd(20, 100)),
  };
}

function makePie(series) {
  return series.map((s) => ({
    name: s.name,
    y: s.data.reduce((sum, v) => sum + v, 0),
  }));
}

function filterByRange(categories, series, range) {
  if (!range || !range.from || !range.to) {
    return { categories, series };
  }

  const fromMonth = new Date(range.from).getMonth();
  const toMonth = new Date(range.to).getMonth();

  const start = Math.min(fromMonth, toMonth);
  const end = Math.max(fromMonth, toMonth);

  return {
    categories: categories.slice(start, end + 1),
    series: series.map((s) => ({
      ...s,
      data: s.data.slice(start, end + 1),
    })),
  };
}

export function makeBlockData(range = null, seed = 1) {ь

  const baseCategories = months;
  const baseSeries = [makeSeries("Факт"), makeSeries("План")];

  // фильтр по диапазону
  const filtered = filterByRange(baseCategories, baseSeries, range);

  const chartCommon = {
    categories: filtered.categories,
    series: filtered.series,
    pieData: makePie(filtered.series),
  };

  return {
    // графики
    oeeSeries: chartCommon,
    loadSeries: chartCommon,
    metricsSeries: chartCommon,
    downtimeSeries: chartCommon,

    oeeTable: {
      columns: ["Показатель", "Значение"],
      rows: [
        ["Количество оборудования на контроле", rnd(5, 30)],
        ["Коэффициент доступности оборудования", rnd(70, 99) + "%"],
        ["Коэффициент производительности оборудования", rnd(60, 98) + "%"],
        ["Коэффициент качества", rnd(80, 99) + "%"],
        ["Показатель OEE", rnd(40, 95) + "%"],
        ["Плановый показатель OEE", rnd(50, 95) + "%"],
      ],
    },

    loadTable: {
      columns: ["Месяц", "Загрузка %"],
      rows: months.map((m) => [m, rnd(20, 100) + "%"]),
    },

    metricsTable: {
      columns: ["Метрика", "Значение"],
      rows: [
        ["Качество", rnd(70, 99) + "%"],
        ["Простой", rnd(0, 25) + "%"],
      ],
    },

    downtimeTable: {
      columns: ["Месяц", "Минуты"],
      rows: months.map((m) => [m, rnd(0, 500)]),
    },
  };
}
