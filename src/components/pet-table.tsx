import {Button} from "@/components/ui/button"
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table"
import {Pet} from "@/lib/types.ts";
import {Link} from "react-router-dom";
import {AddPetModal} from "@/components/add-pet-modal.tsx";

type Props = {
  pets: Pet[]
}

export function PetTable(props: Props) {
  return (
    <div className="w-full p-4">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Pet Progress</h2>
        <AddPetModal/>
      </div>
      <div className="relative w-full overflow-auto border rounded-lg bg-white shadow-lg p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Pet Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {props.pets.length === 0 && (
            <div className="flex items-center justify-center h-12">
              <p className="text-gray-500 dark:text-gray-400">No pets found</p>
            </div>
          )}
          <TableBody>
            {props.pets.length > 0 && (
              props.pets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell className="font-medium">{pet.pet_name}</TableCell>
                    <TableCell>{pet.age} years old</TableCell>
                    <TableCell>{new Date(pet.created_at).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        <Link to={`/u/pets/${pet.id}`}>
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
