import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";
 


export default function Homepage() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <VStack w="100vw">
      {props?.books?.map((book) => (
        <Books key={`${book.id} ${book.title}`} {...book} />
      ))}
    </VStack>
  );
}

export async function getServerSideProps(){

  try {
    const books = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      }
    });
    return {
      props: {
        books,
      }
    }
  } catch (error) {
    console.log(err);
    return resizeBy.status(400).json({ message: "something went wrong"});
  }
}
