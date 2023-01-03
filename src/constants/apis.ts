export const getSensors = process.env.NEXT_PUBLIC_BASE_API_URL + "/sensors";
export const getSensorLastSerie =
  process.env.NEXT_PUBLIC_BASE_API_URL + "/sensors/sensor/lastrecord/";
export const getSensorSeries =
  process.env.NEXT_PUBLIC_BASE_API_URL + "/sensors/sensor/xy/";
export const getSensorSeriesFilled =
  process.env.NEXT_PUBLIC_BASE_API_URL + "/sensors/sensor/withgranularity/";
export const getSensorSeriesFilledDateValue =
  process.env.NEXT_PUBLIC_BASE_API_URL + "/sensors/sensor/valuedate/";
export const getDevices = process.env.NEXT_PUBLIC_BASE_API_URL + "/devices";
