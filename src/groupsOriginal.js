const groupsOriginal = [
  {
    from: "Home",
    to: "Salsa",
    connections: [
      { from: "Zürich, Seebach", to: "Zürich Oerlikon, Bahnhof Ost" },
      { from: "Zürich Oerlikon", to: "Zürich Hardbrücke" },
    ],
  },
  {
    from: "Home",
    to: "HB",
    connections: [
      { from: "Zürich, Seebach", to: "Zürich Oerlikon, Bahnhof Ost" },
      { from: "Zürich Oerlikon", to: "Zürich HB" },
    ],
  },
  {
    from: "Home",
    to: "Altstetten",
    connections: [
      { from: "Zürich, Seebach", to: "Zürich Oerlikon, Bahnhof Ost" },
      { from: "Zürich Oerlikon", to: "Zürich Altstetten" },
    ],
  },
  {
    from: "Home",
    to: "Airport",
    connections: [{ from: "Zürich, Seebach", to: "Zürich Flughafen" }],
  },
];

export default groupsOriginal;
