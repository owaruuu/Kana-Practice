import {
    groupButtonChangeEventName,
    normalButtonClickEventName,
} from "./enums.js";

export const GroupButtonChangeEvent = new Event(groupButtonChangeEventName);

export const NormalButtonClickEvent = new Event(normalButtonClickEventName);
