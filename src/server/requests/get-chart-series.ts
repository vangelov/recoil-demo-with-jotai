import { Lib } from "lib";

type Series = Array<number>;

const cache = new Map<string, Series>();

function createRandomSeries(): Series {
  const bins = Lib.getRandomInteger(8, 17);
  const series = [];

  for (let i = 0; i < bins; i++) series.push(Lib.getRandomNumber(0, 1));

  return series;
}

export async function getChartSeries(id: string) {
  await Lib.delay(2000);

  let series = cache.get(id);
  if (!series) {
    series = createRandomSeries();
    cache.set(id, series);
  }

  return series;
}
