import Event from "types/Event";
import ChatHelper from "utils/ChatHelper";

export default class EventManager {
	public static registeredEvents: Event[] = [];

	public static registerEvents = (events: Event[]) => {
		this.registeredEvents = this.registeredEvents.concat(
			this.registeredEvents,
			events
		);

		events.forEach((event) => {
			if (
				"subscribe" in event.eventSignal &&
				typeof event.eventSignal.subscribe == "function"
			)
				event.eventSignal.subscribe(event.execute);
			else ChatHelper.broadcastMessage(`Failed to init ${event.name}`);
		});
		return this;
	};
}
