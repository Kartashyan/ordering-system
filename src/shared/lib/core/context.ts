import { EventManager } from "../types";
import ServerEventManager from "./server-event-manager";

export const platform = {
    isNodeJs: (process: any) => typeof process !== 'undefined',
    isBrowser: (window: any) => typeof window !== 'undefined',
}

export abstract class Context {
    private static eventManager: EventManager;
    static events(): EventManager {
        if (Context.eventManager) return Context.eventManager;
        if (platform.isNodeJs(global?.process)) {
            Context.eventManager = ServerEventManager.instance();
        } else {
            throw new Error('Could not define platform');
        }
        return Context.eventManager;
    }
}

export default Context;
