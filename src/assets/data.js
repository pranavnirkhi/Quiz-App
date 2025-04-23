import { supabase } from "../createClient";

export const fetchData = async () => {
  const { data, error } = await supabase.from("QuizQuestions").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data.map((item) => ({
    question: item.question,
    option1: item.option1,
    option2: item.option2,
    option3: item.option3,
    option4: item.option4,
    answer: Number(item.answer),
  }));
};
