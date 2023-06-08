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

export default class Device {
    private device: DevicesReceiveType;
    private sensor: SensorsReceiveTpe = {
        title: ''
    };
    private form: ContainerFormMapType[] = [
        ...DeviceForm
    ]
    constructor(Device?: DevicesReceiveType) {
        this.device = Device ?? {};

    }
    getFormMap(): ContainerFormMapType[] {
        return this.form;
    }

    getDeviceData(): DeviceType {
        let dev: DeviceType = {
            address: { ... this?.device?.address },
            sensors: [...this?.device?.sensors ?? [{
                title: '',
                type: '',
                unit: '',
                isRealTime: false,
                maxAlarm: undefined,
                minAlarm: undefined
            }]],
            title: this.device.title,
            numberOfPorts: this?.device?.sensors?.length ?? 1,
            factors: [...this?.device?.factors ?? []],
            electricals: [...this?.device?.electricals ?? []]
        }

        return dev;
    }
    async createArraysByNumberAndName(qty: number, name: string): Promise<ContainerFormMapType[]> {
        let newform: ContainerFormMapType[] = [...DeviceForm]
        for (let i = 0; i < qty; i++) {
            newform?.push({ header: `${name}-` + (i + 1).toString(), section: [...await this.everyC(TypeArray, i, name)] })
        }
        console.log(newform)
        return this.form = [...newform];
    }
    async createSensorByNumber(qty: number): Promise<ContainerFormMapType[]> {
        let newform: ContainerFormMapType[] = [...DeviceForm]
        for (let i = 0; i < qty; i++) {
            newform?.push({ header: 'Sensors-' + (i + 1).toString(), section: [...await this.sensorC(TypeArray, i)] })
        }
        console.log(newform)
        return this.form = newform;
    }
    addSensor(sensor: SensorsReceiveTpe): ContainerFormMapType[] {
        let newFormMap: ContainerFormMapType[] = []
        // if (this.form === undefined)
        // newFormMap = { ...this.device, sensors: [sensor] }
        // else
        // newFormMap = { ...this.device, sensors: [...this.device.sensors, sensor] }
        return newFormMap;
    }
    async removeSensor() {
    }
    async emptySensor() {
        this.device.sensors = []
    }
    async cleareDevice() {
        this.device = {}
    }
    async setDeviceData(data: DevicesReceiveType): Promise<DevicesReceiveType> {
        this.device = data
        return this.device
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







//===============================================================
// To parse this data:
//
//   import { Convert, Device } from "./file";
//
//   const device = Convert.toDevice(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface DeviceType {
    _id?: string;
    title?: string;
    address?: Address;
    type?: string;
    DeviceUniqueName?: string;
    numberOfPorts?: number;
    factors?: Factor[];
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    sensors?: Sensor[];
    sensorLastSerie?: SensorLastSerie[];
    electricalId?: string;
    electricalPort?: number;
    electricals?: any[];
}

export interface Address {
    multiPort?: number;
    sMultiPort?: number;
    _id?: string;
}

export interface Factor {
    factorName?: string;
    factorPosition?: number;
    _id?: string;
}

export interface SensorLastSerie {
    metaField?: MetaField;
    timestamp?: Date;
    sensorId?: string;
    _id?: string;
}

export interface MetaField {
    incremental?: number;
    value?: number;
    max?: number;
    min?: number;
    average?: number;
}

export interface Sensor {
    title?: string;
    port?: number;
    type?: string;
    unit?: string;
    resolution?: string;
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    maxAlarm?: number;
    minAlarm?: number;
    isRealTime?: boolean
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public toDevice(json: string): Device {
        return cast(JSON.parse(json), r("Device"));
    }

    public deviceToJson(value: Device): string {
        return JSON.stringify(uncast(value, r("Device")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Device": o([
        { json: "_id", js: "_id", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "address", js: "address", typ: u(undefined, r("Address")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "DeviceUniqueName", js: "DeviceUniqueName", typ: u(undefined, "") },
        { json: "numberOfPorts", js: "numberOfPorts", typ: u(undefined, 0) },
        { json: "factors", js: "factors", typ: u(undefined, a(r("Factor"))) },
        { json: "createdAt", js: "createdAt", typ: u(undefined, Date) },
        { json: "updatedAt", js: "updatedAt", typ: u(undefined, Date) },
        { json: "__v", js: "__v", typ: u(undefined, 0) },
        { json: "sensors", js: "sensors", typ: u(undefined, a(r("Sensor"))) },
        { json: "sensorLastSerie", js: "sensorLastSerie", typ: u(undefined, a(r("SensorLastSerie"))) },
        { json: "electricalId", js: "electricalId", typ: u(undefined, "") },
        { json: "electricalPort", js: "electricalPort", typ: u(undefined, 0) },
        { json: "electricals", js: "electricals", typ: u(undefined, a("any")) },
    ], false),
    "Address": o([
        { json: "multiPort", js: "multiPort", typ: u(undefined, 0) },
        { json: "sMultiPort", js: "sMultiPort", typ: u(undefined, 0) },
        { json: "_id", js: "_id", typ: u(undefined, "") },
    ], false),
    "Factor": o([
        { json: "factorName", js: "factorName", typ: u(undefined, "") },
        { json: "factorPosition", js: "factorPosition", typ: u(undefined, 0) },
        { json: "_id", js: "_id", typ: u(undefined, "") },
    ], false),
    "SensorLastSerie": o([
        { json: "metaField", js: "metaField", typ: u(undefined, r("MetaField")) },
        { json: "timestamp", js: "timestamp", typ: u(undefined, Date) },
        { json: "sensorId", js: "sensorId", typ: u(undefined, "") },
        { json: "_id", js: "_id", typ: u(undefined, "") },
    ], false),
    "MetaField": o([
        { json: "incremental", js: "incremental", typ: u(undefined, 0) },
        { json: "value", js: "value", typ: u(undefined, 3.14) },
        { json: "max", js: "max", typ: u(undefined, 3.14) },
        { json: "min", js: "min", typ: u(undefined, 3.14) },
        { json: "average", js: "average", typ: u(undefined, 3.14) },
    ], false),
    "Sensor": o([
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "port", js: "port", typ: u(undefined, 0) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "unit", js: "unit", typ: u(undefined, "") },
        { json: "resolution", js: "resolution", typ: u(undefined, "") },
        { json: "_id", js: "_id", typ: u(undefined, "") },
        { json: "createdAt", js: "createdAt", typ: u(undefined, Date) },
        { json: "updatedAt", js: "updatedAt", typ: u(undefined, Date) },
        { json: "maxAlarm", js: "maxAlarm", typ: u(undefined, 0) },
        { json: "minAlarm", js: "minAlarm", typ: u(undefined, 0) },
    ], false),
};









