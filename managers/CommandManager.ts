import { world, system, ChatSendBeforeEvent } from "@minecraft/server";
import Command from "../types/Command";

export default class CommandManager {
    private static registeredCommands: Command[] = [];
    private static config: CommandManagerConfigData;

    public static registerCommands = (commands: Command[]) => {
        this.registeredCommands = this.registeredCommands.concat(
            this.registeredCommands,
            commands
        );
        return this;
    };

    public static setConfig = (data: CommandManagerConfigData) => {
        this.config = data;
        return this;
    };

    private static chatSendBefore = (event: ChatSendBeforeEvent) => {
        let message = event.message;

        if (!message.startsWith(this.config.prefix)) return;

        let commandName = message
            .slice(this.config.prefix.length)
            .split(" ")[0];
        event.cancel = true;

        this.registeredCommands.forEach((command) => {
            if (command.name == commandName) {
                system.run(() => {
                    let status = command.execute(event);
                    switch (status) {
                        case -1:
                            event.sender.sendMessage("§cSomething went wrong");
                            break;
                    }
                });
            }
        });
    };

    public static init = () => {
        if (!this.config)
            throw Error("Command Manager initialized before configured.");
        world.beforeEvents.chatSend.subscribe(this.chatSendBefore);
    };
}

type CommandManagerConfigData = {
    prefix: string;
};
