import {
    groupButtonChangeEventName,
    normalButtonChangeEventName,
} from "./enums.js";

export const GroupButtonChangeEvent = new Event(groupButtonChangeEventName);

export const NormalButtonChangeEvent = new Event(normalButtonChangeEventName);
