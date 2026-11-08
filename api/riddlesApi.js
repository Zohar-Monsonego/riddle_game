import chalk from "chalk";

export async function getAllRiddles() {
  const result = await fetch("http://localhost:3000/riddles");

  if (!result.ok) {
    throw new Error(
      chalk.red("something went wrong with fetching all riddles"),
    );
  } else {
    const all_riddles = await result.json();
    return all_riddles;
  }
}

export async function createRiddle(riddle) {
  const result = await fetch("http://[::1]:3000/riddles", {
    method: "POST",
    body: JSON.stringify(riddle),
    headers: {
      "content-type": "application/json",
      Connection: "close",
    },
  });

  if (!result.ok) {
    throw new Error(
      chalk.red("Something went wrong when trying to add new riddle to the db"),
    );
  } else {
    return await result.json(); //returns the new riddle that was created and its id
  }
}

export async function updateRiddle(id, riddle) {
  const result = await fetch("http://[::1]:3000/riddles/" + id, {
    method: "PUT",
    body: JSON.stringify(riddle),
    headers: {
      "Content-type": "application/json",
      Connection: "close",
    },
  });

  if (!result.ok) {
    throw new Error(
      chalk.red(
        `something went wrong when trying to update the riddle with the id ${id}`,
      ),
    );
  } else {
    return await result.json();
  }
}

export async function deleteRiddle(id) {
  const result = await fetch("http://localhost:3000/riddles/" + id, {
    method: "DELETE",
  });

  if (!result.ok) {
    throw new Error(
      chalk.red(
        `Something went wrong when trying to delete the riddle with the id: ${id}`,
      ),
    );
  } else {
    return true;
  }
}
