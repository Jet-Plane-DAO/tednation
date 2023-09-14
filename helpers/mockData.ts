const activity = Array(10)
  .fill("_")
  .map((_: any, i: number) => ({
    image: "https://placekitten.com/100/100",
    name: "John Doe",
    action: "Equiped Something",
    time: "1 hour ago",
  }));

const leaderboard = Array(20)
  .fill("_")
  .map((_: any, i: number) => ({
    image: "https://placekitten.com/300/300",
    row: i,
    name: `Person ${i}`,
    info1: "Information",
    info2: "Information",
  }));

const craftableItems = Array(4)
  .fill("_")
  .map((_: any, i: number) => ({
    image: "https://placekitten.com/300/300",
    row: i,
    name: `Item ${i}`,
    stat: "Stat Information",
  }));

const myAssets = Array(5)
  .fill("_")
  .map((_: any, i: number) => ({
    image: "https://placekitten.com/500/500",
    xp: 200,
    name: `Ardus of Purp`,
    stat: "Information here",
  }));

const myInventory = Array(10)
  .fill("_")
  .map((_: any, i: number) => ({
    image: "https://placekitten.com/300/300",
    row: i,
    name: `Item ${i}`,
    stat: "Stat Information",
  }));

const compilePlans = Array(5)
  .fill("_")
  .map((_: any, i: number) => ({
    image: "https://placekitten.com/500/500",
    attr: "attr",
    name: `Item Name`,
    stat: "Information here",
  }));

const myHistory = Array(20)
  .fill("_")
  .map((_: any, i: number) => ({
    image: "https://placekitten.com/300/300",
    row: i,
    action: `Equiped something ${i}`,
    time: "1 hour ago",
  }));

export {
  activity,
  leaderboard,
  craftableItems,
  myAssets,
  myInventory,
  compilePlans,
  myHistory,
};
