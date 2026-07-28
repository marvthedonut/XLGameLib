import { system, world } from "@minecraft/server";

export enum LOG_LEVEL {
    ERROR = 3,
    WARN = 2,
    VERBOSE = 1,
    DEBUG = 0,
}

export default class ChatHelper {
    private static level: LOG_LEVEL = LOG_LEVEL.ERROR;

    public static broadcastMessage = (message: string) => {
        world.sendMessage(`<Server> ${message}`);
    };

    public static log(message: string, level?: LOG_LEVEL) {
        system.run(() => {
            if (level === undefined) {
                level = LOG_LEVEL.VERBOSE;
            }

            if (level >= this.level) {
                switch (level) {
                    case LOG_LEVEL.ERROR:
                        world.sendMessage(
                            `<Server> ${Colors.RED}${Colors.BOLD}ERROR:${Colors.RESET} ${message}`,
                        );
                        break;
                    case LOG_LEVEL.WARN:
                        world.sendMessage(
                            `<Server> ${Colors.MATERIAL_COPPER}${Colors.BOLD}WARN:${Colors.RESET} ${message}`,
                        );
                        break;
                    case LOG_LEVEL.VERBOSE:
                        world.sendMessage(
                            `<Server> ${Colors.GRAY}${Colors.BOLD}VERBOSE:${Colors.RESET} ${message}`,
                        );
                        break;
                    case LOG_LEVEL.DEBUG:
                        world.sendMessage(
                            `<Server> ${Colors.DARK_GRAY}${Colors.BOLD}DEBUG:${Colors.RESET}${Colors.GRAY}${Colors.ITALIC} ${message}`,
                        );
                        break;
                }
            }
        });
    }

    public static setLogLevel = (level: LOG_LEVEL) => {
        this.level = level;
    };
}

export enum Colors {
    BLACK = "§0",
    DARK_BLUE = "§1",
    DARK_GREEN = "§2",
    DARK_AQUA = "§3",
    DARK_RED = "§4",
    DARK_PURPLE = "§5",
    GOLD = "§6",
    GRAY = "§7",
    DARK_GRAY = "§8",
    BLUE = "§9",
    GREEN = "§a",
    AQUA = "§b",
    RED = "§c",
    LIGHT_PURPLE = "§d",
    YELLOW = "§e",
    WHITE = "§f",
    MINECON_GOLD = "§g",
    MATIERAL_QUARTZ = "§h",
    MATERIAL_IRON = "§i",
    MATERIAL_NETHERITE = "§j",
    MATERIAL_REDSTONE = "§m",
    MATERIAL_COPPER = "§n",
    MATERIAL_GOLD = "§p",
    MATERIAL_EMERALD = "§q",
    MATERIAL_DIAMOND = "§s",
    MATERIAL_LAPIS = "§t",
    MATERIAL_AMETHYST = "§u",
    MATERIAL_RESIN = "§v",
    OBFUSCATED = "§k",
    BOLD = "§l",
    STRIKETHROUGH = "§m",
    UNDERLINE = "§n",
    ITALIC = "§o",
    RESET = "§r",
}
