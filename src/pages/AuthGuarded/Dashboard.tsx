import {Navbar} from "@/components/navbar.tsx";
import {PetTable} from "@/components/pet-table.tsx";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase.ts";
import {Pet} from "@/lib/types.ts";

function Dashboard() {
  const [pets, setPets] = useState<Pet[]>([]);


  useEffect(() => {
    async function getPets() {
      const { data: { user } } = await supabase.auth.getUser()

      const response = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', user!.id);

      const pets = response.data as Pet[];

      setPets(pets)
    }

    getPets().then(() => {})
  }, [])

  return (
    <>
      <Navbar type='auth'/>
      <main>
        <PetTable pets={pets}/>
      </main>
    </>
  );
}

export default Dashboard;