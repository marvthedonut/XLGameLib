import Event from "../types/Event";
import ChatHelper, { LOG_LEVEL } from "../utils/ChatHelper";

export default class EventManager {
    public static registeredEvents: Event[] = [];

    public static registerEvents = (events: Event[]) => {
        this.registeredEvents = this.registeredEvents.concat(
            this.registeredEvents,
            events
        );
        const ids: number[] = [];

        events.forEach((event) => {
            if (
                "subscribe" in event.eventSignal &&
                typeof event.eventSignal.subscribe == "function"
            )
                ids.push(event.eventSignal.subscribe(event.execute));
            else
                ChatHelper.log(`Failed to init ${event.name}`, LOG_LEVEL.ERROR);
        });
        return ids;
    };
}
