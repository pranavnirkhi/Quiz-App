import React, { useEffect, useState } from "react";
import { supabase } from "../createClient";
import Papa from "papaparse";
import styles from "./ManageQ.module.css";

const ManageQ = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizQuestions, setNewQuizQuestions] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const { data, error } = await supabase.from("QuizQuestions").select("*");
      if (error) {
        console.error("Error fetching quizzes:", error);
      } else {
        setQuizzes(data);
      }
    };
    fetchQuizzes();
  }, []);

  const handleAddQuiz = async () => {
    if (!newQuizTitle || newQuizQuestions <= 0) {
      setMessage("Please enter a valid quiz title and number of questions.");
      setIsError(true);
      return;
    }

    const { data, error } = await supabase
      .from("QuizQuestions")
      .insert([{ title: newQuizTitle, question: newQuizQuestions }]);

    if (error) {
      console.error("Error adding quiz:", error);
      setMessage("Failed to add quiz.");
      setIsError(true);
    } else {
      setQuizzes([...quizzes, ...data]);
      setNewQuizTitle("");
      setNewQuizQuestions(0);
      setMessage("Quiz added successfully!");
      setIsError(false);
    }
  };

  const handleDeleteQuiz = async (id) => {
    const { error } = await supabase
      .from("QuizQuestions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting quiz:", error);
      setMessage("Failed to delete quiz.");
      setIsError(true);
    } else {
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
      setMessage("Quiz deleted successfully.");
      setIsError(false);
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const parsedData = results.data;

        const { data, error } = await supabase
          .from("QuizQuestions")
          .insert(parsedData);

        if (error) {
          console.error("Upload Error:", error);
          setMessage("Failed to upload questions.");
          setIsError(true);
        } else {
          setQuizzes([...quizzes, ...data]);
          setMessage("CSV questions uploaded successfully!");
          setIsError(false);
        }
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>Manage Quizzes</h1>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>Add New Quiz</h2>
          <input
            type="text"
            placeholder="Quiz Title"
            value={newQuizTitle}
            onChange={(e) => setNewQuizTitle(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Number of Questions"
            value={newQuizQuestions}
            onChange={(e) => setNewQuizQuestions(Number(e.target.value))}
            className={styles.input}
          />
          <button className={styles.addButton} onClick={handleAddQuiz}>
            Add New Quiz
          </button>

          {/* Quiz Folder Container */}
          <div className={styles.quizFolder}>
            <h3 className={styles.folderTitle}>📁 Current Quizzes</h3>
            {quizzes.length === 0 ? (
              <p className={styles.emptyState}>No quizzes added yet.</p>
            ) : (
              <ul className={styles.quizList}>
                {quizzes.map((quiz) => (
                  <li key={quiz.id} className={styles.quizItem}>
                    <span>
                      <strong>{quiz.title}</strong> – {quiz.question}
                    </span>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteQuiz(quiz.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* CSV Upload Section */}
        <div className={styles.section}>
          <h2>Upload Questions via CSV</h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className={styles.input}
          />
        </div>
      </div>

      {/* Feedback Message */}
      {message && (
        <div
          className={styles.message}
          style={{
            color: isError ? "red" : "green",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ManageQ;
