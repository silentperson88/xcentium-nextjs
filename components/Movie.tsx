import { useEffect, useState } from "react";
import Link from "next/link";
import { Movie } from "../types/movie";
import Image from "next/image";
import styles from "../styles/Movie.module.scss";

const movieTitles = [
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Joker",
  "Avengers",
  "Fast X",
];

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await Promise.all(
        movieTitles.map(async (title) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_OMDB_BASE_URL}/?t=${title}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
          );
          const data: Movie = await response.json();
          return data;
        })
      );
      setMovies(fetchedMovies);
    };
    fetchMovies();
  }, []);

  return (
    <section className={styles.movie_list}>
      {movies.map((movie) => (
        <Link
          key={movie.imdbID}
          href={`/movie/details/${movie.imdbID}`}
          passHref
          className={styles.movie_container}
        >
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            height={450}
          />
          <h2 className={styles.movie_title}>{movie.Title}</h2>
        </Link>
      ))}
    </section>
  );
}
