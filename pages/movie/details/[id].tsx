import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Movie } from "../../../types/movie";
import styles from "../../../styles/Movie.module.scss"; // Import your SCSS file

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_OMDB_BASE_URL}/?i=${id}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
        );
        const data: Movie = await response.json();
        setMovie(data);
      };
      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <main className={styles.movie_container}>
      <article className={styles.movie_details}>
        <figure className={styles.image_container}>
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            height={450}
            className={styles.poster}
          />
          <figcaption>{movie.Title}</figcaption>
        </figure>
        <div className={styles.info_container}>
          <h1 className={styles.title}>{movie.Title}</h1>
          <div className={styles.metadata}>
            <p className={styles.content}>
              <strong className={styles.label}>Year:</strong> {movie.Year}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Rated:</strong> {movie.Rated}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Released:</strong>{" "}
              {movie.Released}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Runtime:</strong> {movie.Runtime}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Genre:</strong> {movie.Genre}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Director:</strong>{" "}
              {movie.Director}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Writer:</strong> {movie.Writer}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Actors:</strong> {movie.Actors}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Awards:</strong> {movie.Awards}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Language:</strong>{" "}
              {movie.Language}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Country:</strong> {movie.Country}
            </p>
            <p className={styles.content}>
              <strong className={styles.label}>Box Office:</strong>{" "}
              {movie.BoxOffice}
            </p>
          </div>
          <h2 className={styles.subheading}>Plot</h2>
          <p className={styles.plot}>{movie.Plot}</p>
          <h2 className={styles.subheading}>Ratings</h2>
          <ul className={styles.ratings}>
            {movie.Ratings.map((rating) => (
              <li key={rating.Source}>
                <strong className={styles.label}>{rating.Source}:</strong>{" "}
                {rating.Value}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
}
