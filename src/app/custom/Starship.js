export default class Starship {
  constructor(name, _consumables, _passengers) {
    this.name = name;
    this._consumables = _consumables;
    this._passengers = _passengers;
  }
  parseConsumables() {
    const currentConsumable = this._consumables.split(" ");
    if (currentConsumable[1] === "years" || currentConsumable[1] === "year") {
      this._consumables = Number(currentConsumable[0]) * 365;
    } else if (
      currentConsumable[1] === "months" ||
      currentConsumable[1] === "month"
    ) {
      this._consumables = Number(currentConsumable[0]) * 12;
    } else if (
      currentConsumable[1] === "weeks" ||
      currentConsumable[1] === "week"
    ) {
      this._consumables = Number(currentConsumable[0]) * 7;
    }
  }

  parsePassengers() {
    this._passengers = Number(this._passengers.replace(",", ""));
  }

  get maxDaysInSpace() {
    return this._consumables / this._passengers;
  }
}
