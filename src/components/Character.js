import React, { useEffect } from "react";
import { useHttp } from "../hooks";
import Summary from "./Summary";

const Character = (props) => {
  const [isLoading, data] = useHttp(
    "https://swapi.dev/api/people/" + props.selectedChar,
    [props.selectedChar]
  );

  let loadedCharacter = null;

  if (data) {
    loadedCharacter = {
      id: props.selectedChar,
      name: data.name,
      height: data.height,
      colors: {
        hair: data.hair_color,
        skin: data.skin_color,
      },
      gender: data.gender,
      movieCount: data.films.length,
    };
  }

  useEffect(() => {
    return () => {
      console.log("clean...");
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);
