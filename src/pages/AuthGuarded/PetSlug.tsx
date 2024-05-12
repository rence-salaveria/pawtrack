import {useParams} from "react-router-dom";
import {Navbar} from "@/components/navbar.tsx";
import {SlugTable} from "@/components/slug-table.tsx";

function PetSlug() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Navbar type='auth' />
      <main>
        <SlugTable id={id!}/>
      </main>
    </>
  );
}

export default PetSlug;