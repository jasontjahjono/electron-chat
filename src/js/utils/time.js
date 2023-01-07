import { timestamp } from "../db/firestore";

export const createTimestamp = () => timestamp.now().toMillis().toString();
