export type Measurement = {
    time: Date;
    deviceId: string; // configurable in app settings, default is UUID generated on first start
    tags?: RuuviTag[]
    tag?: RuuviTag;
    eventId: string;   // UUID for this request
}
export type RuuviTag = {
    [key: string]: any; //indexer
    id: string;     // mac adress
    url?: string;    // if tag is in URL mode
    rssi: number;
    updateAt: string, // when the tag was last seen
    dataFormat: number;
    name: string;   // if a name was set in tag settings
    temperature: number;
    humidity: number;
    pressure: number;

    // data format 3 & 5
    accelX?: number;
    accelY?: number;
    accelZ?: number;
    voltage?: number;

    // data format 5
    txPower?: number;
    movementCounter?: number;
    measurementSequenceNumber?: number;
}