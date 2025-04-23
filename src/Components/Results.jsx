import React, { useEffect, useState } from "react";
import { supabase } from "../createClient";
import styles from "./Results.module.css";

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase.from("Results").select("*");

      if (error) {
        console.error("Error Fetching results:", error);
      } else {
        setResults(data);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz Results</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
