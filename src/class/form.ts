import { topType, topUnits } from './../atomic/organisms/device/deviceForm';
import { ContainerFormMapType, FormMapType } from "src/atomic/molecules/forms/FormFormik";
import { SensorsReceiveTpe } from "src/components/pages/sensors/sensorsTable";
import { DevicesReceiveType } from "src/store/api/devicesApi";
// "title": "temp1",
//     "type": "Temperature",
//         "unit": "°C",
//             "maxAlarm": 50,
//                 "minAlarm": 0,
//                     "resolution": "minute",
export default class Formine {
    private device: DevicesReceiveType;
    private form: ContainerFormMapType[] = [
        ...DeviceForm
    ]
    constructor(Device?: DevicesReceiveType) {
        this.device = Device ?? {};
    }
    getFormMap(): ContainerFormMapType[] {
        return this.form;
    }
    getDeviceData(): DevicesReceiveType {
        return this.device;
    }
    async createArraysByNumberAndName(qty: number, name: string): Promise<ContainerFormMapType[]> {
        let newform: ContainerFormMapType[] = [...DeviceForm]
        for (let i = 0; i < qty; i++) {
            newform?.push({ header: `${name}-` + (i + 1).toString(), section: [...await this.everyC(TypeArray, i, name)] })
        }
        // console.log(newform)
        return this.form = [...newform];
    }
    addSensor(sensor: SensorsReceiveTpe): ContainerFormMapType[] {
        let newFormMap: ContainerFormMapType[] = []
        // if (this.form === undefined)
        // newFormMap = { ...this.device, sensors: [sensor] }
        // else
        // newFormMap = { ...this.device, sensors: [...this.device.sensors, sensor] }
        return newFormMap;
    }
    convertDataToNested(inputR: object) {
        const input = { "sensor[0].title": "sensor name", "sensor[1].title": "sensor name2" };
        let output = {}
        output = { ['sensor[0].title']: 'mehran' }
        //console.log(output); // { "sensor": [{ "title": "sensor name" }, { "title": "sensor name2" }] }

        let o1: Object = {};
        let o2: Object = Object.create({ 'sensor[0].title': "sensor name]" });
        //console.log(o2);
    }
    private async everyC(
        TypeFormArray: FormMapType[],
        n: number,
        type: string
    ) {
        const json: FormMapType[] = []
        await Promise.all(TypeFormArray.map((Object, index) => {
            json.push({
                id: `${type}[${n}].${Object.id}`,
                name: Object.name,
                type: Object.type ?? 'string',
                value: `formik.values?.${type}?.[${n}]?.${Object.id}`,
                model: 'absolute',
                class: Object.class,
                suggestions: Object.suggestions !== undefined ? Object?.suggestions : undefined
            })
        })
        )
        return json
    }
    private async sensorC(
        TypeFormArray: FormMapType[],
        n: number
    ) {
        const json: FormMapType[] = []
        await Promise.all(TypeFormArray.map((Object, index) => {
            json.push({
                id: `sensors[${n}].${Object.id}`,
                name: Object.name,
                type: Object.type ?? 'string',
                value: `formik.values.sensors?.[${n}]?.${Object.id}`,
                model: 'absolute',
                class: Object.class,
                suggestions: Object.suggestions !== undefined ? Object?.suggestions : undefined
            })
        })
        )
        return json
    }
}



const TypeArray: FormMapType[] = [
    {
        id: 'title',
        name: 'title',
        type: 'text',
        value: 'formik.values?.title',
        suggestions: ['Sens 1', 'Sens 2', 'Sens Temp', 'Sens Humi'],
        class: 'w-[120px]',

    },
    {
        id: 'type',
        name: 'type',
        type: 'text',
        suggestions: [...topType.map((item) => item.title)],
        value: 'formik.values?.type',
        model: 'absolute',
        // class: 'w-[75px]',
    },
    {
        id: 'unit',
        name: 'unit',
        model: 'absolute',
        suggestions: [...topUnits.map((item) => item.title)],
        type: 'text',
        value: 'formik.values?.unit',
        class: 'w-[200px]',

    },
    {
        id: 'maxAlarm',
        name: 'Max',
        model: 'absolute',
        type: 'number',
        value: 'formik.values?.maxAlarm',
        class: 'w-[75px]',

    },
    {
        id: 'minAlarm',
        name: 'Min',
        model: 'absolute',
        type: 'number',
        value: 'formik.values?.minAlarm',
        class: 'w-[75px]',
    },
    {
        id: 'realTimeView',
        name: 'Real Time',
        model: 'absolute',
        type: 'checkbox',
        value: 'formik.values?.realTimeView',
        class: 'flex justify-center w-[70px] ',

    },
]
const deviceInfo: FormMapType[] = [
    {
        id: 'title',
        name: 'title',
        type: 'text',
        value: 'formik.values?.title',
        suggestions: ['Cell 1', 'Cell 2', 'Cell N'],
    },
    {
        id: 'numberOfPorts',
        name: 'number of ports',
        type: 'number',
        suggestions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        value: 'formik.values?.numberOfPorts',
        model: 'absolute',
        class: 'w-[75px]',
    },
    {
        id: 'type',
        name: 'type',
        model: 'select',
        opstions: ['Sensor Cotroller', 'Electrical panel'],
        type: 'text',
        value: 'formik.values?.type',
        suggestions: ['Cell 1', 'Cell 2', 'Cell N'],
    },
    // {
    //     id: 'realTimeView',
    //     name: 'Real Time',
    //     model: 'absolute',
    //     type: 'checkbox',
    //     value: 'formik.values.realTimeView',
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
        value: 'formik.values?.address?.multiPort',
        model: 'absolute',
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
        value: 'formik.values?.address?.sMultiPort',
        model: 'absolute',
        class: 'w-[75px]',
    },
];


const DeviceForm: ContainerFormMapType[] = [
    {
        header: 'device Info',
        section: [...deviceInfo, ...addre],
    },


]