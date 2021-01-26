import config from "../config";
import EventEmitter from "eventemitter3";
import StarWarsUniverse from "./custom/StarWarsUniverse";

const EVENTS = {
  APP_READY: "app_ready",
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  constructor() {
    super();

    this.config = config;
    this.data = {};

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.

    //task-1
    const fetchPlanets = async () => {
      const planetsResult = await fetch("https://swapi.dev/api/planets/");
      const parsedPlanets = await planetsResult.json();
      this.data.planets = parsedPlanets.results;
      this.data.count = parsedPlanets.count;
      let currentPlanet = parsedPlanets;
      while (currentPlanet.next) {
        currentPlanet = await (await fetch(currentPlanet.next)).json();
        this.data.planets = [...this.data.planets, ...currentPlanet.results];
      }
    };
    await fetchPlanets();
    //task-2 task-3
    const universe = new StarWarsUniverse();
    await universe.init();
    this.data.universe = universe;
    this.emit(Application.events.APP_READY);
  }
}
