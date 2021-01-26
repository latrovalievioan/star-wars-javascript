import Entity from "./Entity";

export default class StarWarsUniverse {
  constructor() {
    this.entities = [];
  }

  async init() {
    const root = await fetch("https://swapi.dev/api/");
    const data = await root.json();
    for (let node in data) {
      const currentNode = await fetch(`${data[node]}`);
      const currentNodeData = await currentNode.json();
      const currentNodeName = node;

      const entity = new Entity(currentNodeName, currentNodeData);
      this.entities.push(entity);
    }
  }
}
