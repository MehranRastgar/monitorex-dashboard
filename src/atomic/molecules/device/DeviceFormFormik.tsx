import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ThemeInput from 'src/atomic/atoms/ThemeInput/ThemeInput';
import { useTranslation } from 'react-i18next';
import classes from './formik.module.scss';
import FormFormik, {
  ContainerFormMapType,
  FormMapType,
} from '../forms/FormFormik';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import DeviceForm from 'src/atomic/organisms/device/deviceForm';
import Device from 'src/class/device';
import { useAppSelector } from 'src/store/hooks';
import { selectSelectedDevice } from 'src/store/slices/devicesSlice';

const dev = new Device();

const DeviceFormFormik = () => {
  const { t } = useTranslation();
  const [formdata, setFormData] = useState<DevicesReceiveType | undefined>(
    undefined,
  );
  const [formMap, setFormMap] = useState<ContainerFormMapType[] | undefined>(
    undefined,
  );
  const selectedDevice = useAppSelector(selectSelectedDevice);

  function createData() {
    setFormData(undefined);
    setTimeout(() => {
      setFormMap(dev.getFormMap());
      setFormData(selectedDevice);
    }, 50);
  }

  const device: DevicesReceiveType = {
    address: {
      multiPort: 0,
      sMultiPort: 0,
    },
  };

  async function createSensors() {
    setFormMap(await dev.createSensorByNumber(formdata?.numberOfPorts ?? 0));
    // console.log(dev.createSensorByNumber(formdata?.numberOfPorts ?? 0));
  }
  useEffect(() => {
    console.log(formdata);
    createSensors();
  }, [formdata, selectedDevice]);

  useEffect(() => {
    createData();
  }, [selectedDevice]);

  useEffect(() => {}, [selectedDevice]);
  return (
    <div className="flex flex-wrap min-w-[800px] mx-2 m-4 p-2 border border-[var(--border-color)] rounded-md">
      <div> {selectedDevice?.title}</div>
      {formMap && formdata ? (
        <FormFormik
          setFormData={setFormData}
          formMap={[...formMap]}
          // selectedForm={{
          //   ...selectedDevice,
          // }}
          initialValues={{
            ...formdata,
          }}
        />
      ) : (
        <>
          <div className="flex w-full flex-wrap m-4 min-w-full min-h-[400px]"></div>
        </>
      )}
    </div>
  );
};
export default DeviceFormFormik;
const deviceInfo: FormMapType[] = [
  {
    id: 'title',
    name: 'title',
    type: 'text',
    value: 'formik.values.title',
    suggestions: ['Cell 1', 'Cell 2', 'Cell N'],
  },
  {
    id: 'numberOfPorts',
    name: 'number of ports',
    type: 'number',
    suggestions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    value: 'formik.values.numberOfPorts',
    model: 'absolute',
    class: 'w-[75px]',
  },
  {
    id: 'type',
    name: 'type',
    model: 'select',
    opstions: ['Sensor Cotroller', 'Electrical panel'],
    type: 'text',
    value: 'formik.values.type',
    suggestions: ['Cell 1', 'Cell 2', 'Cell N'],
  },
  // {
  //   id: 'realTimeView',
  //   name: 'Real Time',
  //   model: 'absolute',
  //   type: 'checkbox',
  //   value: 'formik.values.realTimeView',
  // },
];

const addre: FormMapType[] = [
  {
    id: 'address.multiPort',
    name: 'Multi Port',
    type: 'number',
    opstions: [
      undefined,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
    ],
    value: 'formik.values.address.multiPort',
    model: 'select',
    class: 'w-[75px]',
  },
  {
    id: 'address.sMultiPort',
    name: 'Super Multi Port',
    type: 'number',
    opstions: [
      undefined,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
    ],
    value: 'formik.values.address.sMultiPort',
    model: 'select',
    class: 'w-[75px]',
  },
];
const sensor: FormMapType[] = [
  {
    id: 'sensors[0].title',
    name: 'number of ports',
    type: 'number',
    opstions: [
      undefined,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
    ],
    value: 'formik.values.sensors[0].title',
    model: 'select',
    class: 'w-[75px]',
  },
];
const DeviceWholeData: ContainerFormMapType[] = [
  {
    header: 'device Info',
    section: deviceInfo,
  },
  {
    header: 'Address',
    section: addre,
  },
  {
    header: 'Address',
    section: [
      {
        id: 'sensors?.[0].title',
        name: 'sensor title',
        type: 'string',
        value: 'formik.values.sensors?.[0].title',
        model: 'absolute',
        class: 'w-[75px]',
      },
    ],
  },
];
