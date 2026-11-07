export async function findPlayerByName(name) {
  const result = await fetch("http://[::1]:3000/players?name=" + name);

  if (!result.ok) {
    throw new Error(
      chalk.red(`something went wrong while fetching player ${name}`),
    );
  }

  const player = await result.json();

  return player[0];
}

export async function createPlayer(name) {
  const result = await fetch("http://[::1]:3000/players", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      lowestTime: null,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!result.ok) {
    throw new Error(
      chalk.red(`something went wrong while adding player ${name} to the db`),
    );
  }

  return await result.json();
}

export async function updatePlayer(player) {
  const result = await fetch("http://localhost:3000/players/" + player.id, {
    method: "PUT",
    body: JSON.stringify({
      id: 4,
      name: "Zohar",
      lowestTime: 2.209,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!result.ok) {
    throw new Error(
      chalk.red(
        `something wenr wrong while updating the player ${player.id} - ${player.name} `,
      ),
    );
  }

  return await result.json();
}

export async function getAllPlayers() {
  const result = await fetch("http://[::1]:3000/players");

  if (!result.ok) {
    throw new Error(
      chalk.red("something went wrong while trying to fetch all players"),
    );
  }
  const all_players = await result.json();

  return all_players;
}
