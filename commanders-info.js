import BasePlugin from "./base-plugin.js";
import y18n from "y18n";

export default class CommandersInfo extends BasePlugin {
  static get description() {
    return "The plugin outputs the CMD of the sides with a broadcast, if they are on both sides, outputs 1 time after a certain time";
  }

  static get defaultEnabled() {
    return false;
  }

  static get optionsSpecification() {
    return {
      language: {
        required: false,
        description: "The language of the plugin",
        default: "en",
      },
      startSearchTimeout: {
        required: false,
        description:
          "The timeout after the start of the match, after which the first check for the presence of the commanders of the sides for both teams takes place, in ms",
        default: 10 * 60 * 1000,
      },
      repeatSearchTimeout: {
        required: false,
        description:
          "Time out for repeated checks, and whether the commanders of the sides appeared for both teams, in ms",
        default: 5 * 60 * 1000,
      },
      countMaxSearch: {
        required: false,
        description: "Number of checks",
        default: 3,
      },
    };
  }

  constructor(server, options, connectors) {
    super(server, options, connectors);

    this.locale = y18n({
      locale: this.options.language,
      directory: "./squad-server/plugins/commanders-info-locales",
    }).__;

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
        this
          .locale`CMD of sides: ${commanders[0].name} VS ${commanders[1].name}!`
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
