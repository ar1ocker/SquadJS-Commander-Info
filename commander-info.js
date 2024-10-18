import BasePlugin from "./base-plugin.js";

export default class CommandersInfo extends BasePlugin {
  static get description() {
    return "Плагин выводящий броадкастом CMD сторон если они есть с двух сторон, выводит 1 раз через определенное время";
  }

  static get defaultEnabled() {
    return false;
  }

  static get optionsSpecification() {
    return {
      startSearchTimeout: {
        required: false,
        description:
          "Таймаут после начала матча, после которого идёт первая проверка на наличие командиров сторон за обе команды, в мс",
        default: 10 * 60 * 1000,
      },
      repeatSearchTimeout: {
        required: false,
        description:
          "Таймаут для повторных проверок, а появились ли командиры сторон за обе команды, в мс",
        default: 5 * 60 * 1000,
      },
      countMaxSearch: {
        required: false,
        description: "Количество проверок",
        default: 3,
      },
    };
  }

  constructor(server, options, connectors) {
    super(server, options, connectors);

    this.searchCommanders = this.searchCommanders.bind(this);
    this.searchCommandersTimeout = null;

    this.count_searches = 0;
  }

  async searchCommanders() {
    if (this.searchCommandersTimeout)
      clearTimeout(this.searchCommandersTimeout);
    if (this.count_searches >= this.options.countMaxSearch) return;

    this.count_searches++;

    let commanders = this.server.players.filter((player) => {
      return player.isLeader && player.squad.squadName === "Command Squad";
    });

    if (commanders.length === 2 && commanders[0].name && commanders[1].name) {
      await this.server.rcon.broadcast(
        `CMD сторон: ${commanders[0].name} и ${commanders[1].name}!`
      );
      return;
    }

    this.searchCommandersTimeout = setTimeout(
      this.searchCommanders,
      this.options.repeatSearchTimeout
    );
  }

  async mount() {
    this.server.on("NEW_GAME", () => {
      this.count_searches = 0;
      if (this.searchCommandersTimeout) {
        clearTimeout(this.searchCommandersTimeout);
      }

      this.searchCommandersTimeout = setTimeout(
        this.searchCommanders,
        this.options.startSearchTimeout
      );
    });
  }
}
