const groupsOriginal = [
  {
    from: "Home",
    to: "Hardbrücke",
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
  {
    from: "Home",
    to: "Oerlikon",
    connections: [
      { from: "Zürich, Seebach", to: "Zürich Oerlikon, Bahnhof Ost" },
    ],
  },
  {
    from: "Home",
    to: "Uetlihof",
    connections: [
      { from: "Zürich, Seebach", to: "Zürich Bahnhofquai/HB" },
      { from: "Zürich Bahnhofquai/HB", to: "Zürich Uetlihof" },
    ],
  },
];

export default groupsOriginal;
